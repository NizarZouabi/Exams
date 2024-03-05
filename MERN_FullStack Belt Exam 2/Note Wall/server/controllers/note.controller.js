const NoteSchema = require("../models/note.model");
const Note = require("../models/note.model");

module.exports.getAllNotes = (req, res) => {
  Note.find()
    .then((AllNotes) => {
      console.log(AllNotes);
      res.json({ AllNotes });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.writeNewNote = (req, res) => {
  Note.create(req.body)
    .then((WriteNote) => {
      console.log(WriteNote);
      res.json({ newNote: WriteNote });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.getOneNote = (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then((Note) => {
      console.log(Note);
      res.json({ Note });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.updateNote = (req, res) => {
  Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((UpdatedNote) => {
      res.json({ UpdatedNote });
    })
    .catch((err) => res.status(400).json(err));
};

module.exports.removeNote = (req, res) => {
  Note.deleteOne({ _id: req.params.id })
    .then((DeletedNote) => {
      res.json({ DeletedNote });
    })
    .catch((err) => res.status(400).json(err));
};
