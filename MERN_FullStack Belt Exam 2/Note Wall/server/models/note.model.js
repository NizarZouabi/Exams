const mongoose = require("mongoose");

const Note = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            minlength: [2, "Title must contain 2 characters."],
            maxlength: [45, "Title must contain max of 45 characters."],
        },
        body: {
            type: String,
            required: [true, "Body is required."],
            minlength: [2, "Body must contain 2 characters."],
            maxlength: [255, "Body must contain max of 255 characters."],
        },
    }, { timestamps: true }
);

const NoteSchema = mongoose.model("NoteSchema", Note);
module.exports = NoteSchema;
