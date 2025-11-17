const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  from: String,
  to: String,
  description: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, default: 'Muhammad Abdullah' },
  description: { type: String, default: '' },
  location: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  github: { type: String, default: '' },
  experiences: { type: [ExperienceSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
