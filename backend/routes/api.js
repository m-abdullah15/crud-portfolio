const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// GET User (returns first user)
router.get('/user', async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = new User();
      await user.save();
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST/PUT User
router.post('/user', async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = new User();
    }
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET all Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new Project
router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT Project by ID
router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE Project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET all Skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new Skill
router.post('/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT Skill by ID
router.put('/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE Skill by ID
router.delete('/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
