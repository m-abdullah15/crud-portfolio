const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  features: { type: [String], default: [] },
  gradient: { type: String, default: 'from-blue-500 to-indigo-600' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
