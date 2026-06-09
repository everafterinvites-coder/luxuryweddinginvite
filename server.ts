import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Enable JSON bodies with 50mb limit to handle base64 image data-urls
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const rsvpPath = path.join(process.cwd(), "src", "data", "db_rsvps.json");
const candidPath = path.join(process.cwd(), "src", "data", "db_candids.json");
const settingsPath = path.join(process.cwd(), "src", "data", "db_settings.json");

// Helper to safely read settings
function readSettingsFile(): any {
  try {
    if (!fs.existsSync(settingsPath)) {
      const defaultSettings = { photoUploadUrl: "https://photos.app.goo.gl/AlexandraAndDylan2027" };
      fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2), "utf-8");
      return defaultSettings;
    }
    const content = fs.readFileSync(settingsPath, "utf-8");
    return JSON.parse(content || "{}");
  } catch (err) {
    console.error(`Error reading settings:`, err);
    return { photoUploadUrl: "https://photos.app.goo.gl/AlexandraAndDylan2027" };
  }
}

// Helper to safely write settings
function writeSettingsFile(data: any) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing settings:`, err);
  }
}

// Helper to safely read files
function readDataFile(filePath: string): any[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
      return [];
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Helper to safely write files
function writeDataFile(filePath: string, data: any[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
  }
}

// --- API ENDPOINTS ---

// 0. Get and Save global settings
app.get("/api/settings", (req, res) => {
  const settings = readSettingsFile();
  res.json(settings);
});

app.post("/api/settings", (req, res) => {
  const { photoUploadUrl } = req.body;
  const settings = readSettingsFile();
  if (photoUploadUrl !== undefined) {
    settings.photoUploadUrl = photoUploadUrl.trim();
  }
  writeSettingsFile(settings);
  res.json(settings);
});

// 1. Get all RSVPs
app.get("/api/rsvps", (req, res) => {
  const data = readDataFile(rsvpPath);
  res.json(data);
});

// 2. Submit new RSVP
app.post("/api/rsvps", (req, res) => {
  const { fullName, email, attending, guestsCount, dietaryNotes, wellWishes } = req.body;
  
  if (!fullName || !email) {
    return res.status(400).json({ error: "Full name and email are required." });
  }

  const rsvps = readDataFile(rsvpPath);
  
  const newRSVP = {
    id: "rsvp-" + Date.now(),
    fullName: fullName.trim(),
    email: email.trim(),
    attending,
    guestsCount: attending === "yes" ? Number(guestsCount) || 1 : 0,
    dietaryNotes: dietaryNotes?.trim() || undefined,
    wellWishes: wellWishes?.trim() || undefined,
    submittedAt: new Date().toISOString()
  };

  rsvps.push(newRSVP);
  writeDataFile(rsvpPath, rsvps);

  res.status(201).json(newRSVP);
});

// 3. Clear/Reset RSVPs
app.post("/api/rsvps/reset", (req, res) => {
  writeDataFile(rsvpPath, []);
  res.json({ success: true, message: "RSVPs database reset successfully." });
});

// 4. Get all Candids
app.get("/api/candids", (req, res) => {
  const data = readDataFile(candidPath);
  res.json(data);
});

// 5. Submit a Candid photo (base64)
app.post("/api/candids", (req, res) => {
  const { sender, caption, imgData } = req.body;

  if (!imgData) {
    return res.status(400).json({ error: "Image data is required." });
  }

  const candids = readDataFile(candidPath);

  const newCandid = {
    id: `candid_${Date.now()}`,
    sender: sender?.trim() || "Lovely Guest",
    caption: caption?.trim() || undefined,
    imgData,
    timestamp: "Just now",
    approved: true, // Auto-approved on upload; can be moderated through Organizer Dashboard
    likes: 0
  };

  // Add to front of the list, so newer photos appear first
  const updated = [newCandid, ...candids];
  writeDataFile(candidPath, updated);

  res.status(201).json(newCandid);
});

// 6. Like a Candid photo
app.post("/api/candids/:id/like", (req, res) => {
  const { id } = req.params;
  const candids = readDataFile(candidPath);
  let updated = false;

  const newList = candids.map((c) => {
    if (c.id === id) {
      updated = true;
      return { ...c, likes: (c.likes || 0) + 1 };
    }
    return c;
  });

  if (updated) {
    writeDataFile(candidPath, newList);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

// 7. Toggle Approval state (Hide/Show)
app.post("/api/candids/:id/approve", (req, res) => {
  const { id } = req.params;
  const candids = readDataFile(candidPath);
  let found = false;

  const newList = candids.map((c) => {
    if (c.id === id) {
      found = true;
      return { ...c, approved: c.approved === false ? true : false };
    }
    return c;
  });

  if (found) {
    writeDataFile(candidPath, newList);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

// 8. Delete a Candid photo
app.delete("/api/candids/:id", (req, res) => {
  const { id } = req.params;
  const candids = readDataFile(candidPath);
  const filtered = candids.filter((c) => c.id !== id);

  if (candids.length !== filtered.length) {
    writeDataFile(candidPath, filtered);
    res.json({ success: true, message: "Photo deleted." });
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

// --- VITE MIDDLEWARE OR STATIC FILES ---

async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start server", err);
});
