const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    filename: String,
    path: String,
    size: Number,
    mimetype: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    task: { type: Schema.Types.ObjectId, ref: "Task", default: null }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
