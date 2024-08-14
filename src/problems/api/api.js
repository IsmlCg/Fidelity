const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let reminders = []; // In-memory storage

// Add a reminder
app.post("/reminders", (req, res) => {
  const { text, creationDate, dueDate, priority } = req.body;
  const id = new Date().getTime().toString(); // Unique ID
  const reminder = { id, text, creationDate, dueDate, priority };
  reminders.push(reminder);
  res.status(201).json(id);
});

// Retrieve a reminder by ID
app.get("/reminders/:id", (req, res) => {
  const reminder = reminders.find((r) => r.id === req.params.id);
  if (reminder) {
    res.json(reminder);
  } else {
    res.status(404).send("Reminder not found");
  }
});

// Find all reminders
app.get("/reminders", (req, res) => {
  res.json(reminders);
});

// Find all reminders within a creation date range
app.get("/reminders/creation-range", (req, res) => {
  const { start, end } = req.query;
  const filteredReminders = reminders
    .filter(
      (r) =>
        new Date(r.creationDate) >= new Date(start) &&
        new Date(r.creationDate) <= new Date(end)
    )
    .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
  res.json(filteredReminders);
});

// Find all reminders within a due date range
app.get("/reminders/due-range", (req, res) => {
  const { start, end } = req.query;
  const filteredReminders = reminders
    .filter(
      (r) =>
        new Date(r.dueDate) >= new Date(start) &&
        new Date(r.dueDate) <= new Date(end)
    )
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  res.json(filteredReminders);
});

// Find all reminders by priority
app.get("/reminders/priority", (req, res) => {
  const { priority } = req.query;
  const filteredReminders = reminders.filter((r) => r.priority === priority);
  res.json(filteredReminders);
});

// Remove a reminder by ID
app.delete("/reminders/:id", (req, res) => {
  reminders = reminders.filter((r) => r.id !== req.params.id);
  res.send("Reminder deleted successfully.");
});

// Update a reminder by ID
app.put("/reminders/:id", (req, res) => {
  const { text, dueDate, priority } = req.body;
  const reminderIndex = reminders.findIndex((r) => r.id === req.params.id);
  if (reminderIndex !== -1) {
    reminders[reminderIndex] = {
      ...reminders[reminderIndex],
      text,
      dueDate,
      priority,
    };
    res.json(reminders[reminderIndex]);
  } else {
    res.status(404).send("Reminder not found");
  }
});

// Find URGENT reminders
app.get("/reminders/urgent", (req, res) => {
  const { fromDate } = req.query;
  const urgentReminders = reminders
    .filter(
      (r) =>
        new Date(r.dueDate) <=
          new Date(new Date(fromDate).getTime() + 7 * 24 * 60 * 60 * 1000) &&
        r.priority === "high"
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  res.json(urgentReminders);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
