const NoteController = require("../controllers/note.controller");

module.exports = (app) => {
    app.get("/notes", NoteController.getAllNotes);
    app.get("/notes/:id", NoteController.getOneNote);
    app.post("/notes/new", NoteController.writeNewNote);
    app.patch("/notes/edit/:id", NoteController.updateNote);
    app.delete("/notes/:id", NoteController.removeNote);
};
