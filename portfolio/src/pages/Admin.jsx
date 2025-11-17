import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
function Admin() {

  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', whatsapp: '', github: '', description: '', experiences: []
  });

  // project add form state (was missing)
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [newProjectFeatures, setNewProjectFeatures] = useState([]);
  const [newFeatureText, setNewFeatureText] = useState('');

  const projectsKey = 'portfolio_projects';
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
   const {user, setUser, projects, setProjects, skills, setSkills} = useContext(DataContext);
  // helper to get stable id from backend objects (they may use `_id`) or fallback to index
  const idOf = (obj, idx) => (obj && (obj.id ?? obj._id)) ?? idx;
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/auth');
      return;
    }
 
  }, [navigate]);

  const save = (items) => {
    setProjects(items);
    localStorage.setItem(projectsKey, JSON.stringify(items));
  };

  // --- Skills state & handlers (use DataContext's skills)
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(60);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingSkillForm, setEditingSkillForm] = useState({ name: '', level: 0 });

  const addSkill = (e) => {
    e.preventDefault();
    const payload = { name: newSkillName, level: Number(newSkillLevel) };
    fetch(`${API_BASE}/api/skills`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(created => {
        setSkills([...(skills || []), { id: created._id || created.id, name: created.name, level: created.level }]);
        setNewSkillName(''); setNewSkillLevel(60);
      }).catch(() => {
        const fallback = { id: Date.now(), name: payload.name, level: payload.level };
        setSkills([...(skills || []), fallback]);
        setNewSkillName(''); setNewSkillLevel(60);
      });
  };

  const startEditSkill = (s, idx) => {
    const id = idOf(s, idx);
    setEditingSkillId(id);
    setEditingSkillForm({ name: s.name || '', level: s.level || 0 });
  };

  const cancelEditSkill = () => {
    setEditingSkillId(null);
    setEditingSkillForm({ name: '', level: 0 });
  };

  const saveSkillEdit = (e) => {
    e.preventDefault();
    const id = editingSkillId;
    const payload = { name: editingSkillForm.name, level: Number(editingSkillForm.level) };
    fetch(`${API_BASE}/api/skills/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(updated => {
        setSkills((skills || []).map(s => ((s.id ?? s._id) === id) ? { id: updated._id || updated.id, name: updated.name, level: updated.level } : s));
        cancelEditSkill();
      }).catch(() => {
        setSkills((skills || []).map(s => ((s.id ?? s._id) === id) ? { ...s, name: payload.name, level: payload.level } : s));
        cancelEditSkill();
      });
  };

  const deleteSkill = (id) => {
    fetch(`${API_BASE}/api/skills/${id}`, { method: 'DELETE' })
      .then(r => {
        setSkills((skills || []).filter(s => (s.id ?? s._id) !== id));
      }).catch(() => setSkills((skills || []).filter(s => (s.id ?? s._id) !== id)));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const payload = { title, subtitle, description, features: newProjectFeatures, gradient: 'from-blue-500 to-indigo-600' };
    // POST to backend
    fetch(`${API_BASE}/api/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(created => {
        const next = [{ id: created._id || created.id, title: created.title, subtitle: created.subtitle, description: created.description, features: created.features || [], gradient: created.gradient }, ...projects];
        save(next);
        setTitle(''); setSubtitle(''); setDescription('');
        setNewProjectFeatures([]);
        setNewFeatureText('');
      })
      .catch(() => {
        // fallback to local add
        const newProj = { id: Date.now(), title, subtitle, description, features: newProjectFeatures };
        const next = [newProj, ...projects];
        save(next);
        setTitle(''); setSubtitle(''); setDescription('');
        setNewProjectFeatures([]);
      });
  };

  const handleDelete = (id) => {
    // attempt delete on backend
    fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' })
      .then(r => {
        if (r.ok) {
          const next = projects.filter(p => (p.id ?? p._id) !== id);
          save(next);
        } else {
          // fallback local delete
          const next = projects.filter(p => (p.id ?? p._id) !== id);
          save(next);
        }
      }).catch(() => {
        const next = projects.filter(p => (p.id ?? p._id) !== id);
        save(next);
      });
  };

  // project edit state
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectForm, setEditingProjectForm] = useState({ title: '', subtitle: '', description: '', features: [] });

  const startEditProject = (p, idx) => {
    const id = idOf(p, idx);
    setEditingProjectId(id);
    setEditingProjectForm({ title: p.title || '', subtitle: p.subtitle || '', description: p.description || '', features: Array.isArray(p.features) ? p.features : [] });
  };

  // Add/remove/update features for new project
  const addNewFeatureToList = () => {
    if (!newFeatureText.trim()) return;
    setNewProjectFeatures(prev => [...prev, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const updateNewFeature = (idx, val) => {
    setNewProjectFeatures(prev => prev.map((f, i) => i === idx ? val : f));
  };

  const removeNewFeature = (idx) => {
    setNewProjectFeatures(prev => prev.filter((_, i) => i !== idx));
  };

  // Edit-mode feature helpers
  const addEditingFeature = () => {
    setEditingProjectForm(prev => ({ ...prev, features: [...(prev.features || []), ''] }));
  };

  const updateEditingFeature = (idx, val) => {
    setEditingProjectForm(prev => ({ ...prev, features: prev.features.map((f, i) => i === idx ? val : f) }));
  };

  const removeEditingFeature = (idx) => {
    setEditingProjectForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setEditingProjectForm({ title: '', subtitle: '', description: '', features: [] });
  };

  const saveProjectEdit = (e) => {
    e.preventDefault();
    const id = editingProjectId;
    const payload = { title: editingProjectForm.title, subtitle: editingProjectForm.subtitle, description: editingProjectForm.description, features: editingProjectForm.features || [] };
    fetch(`${API_BASE}/api/projects/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(updated => {
        const next = projects.map(p => ((p.id ?? p._id) === id ? { ...p, title: updated.title, subtitle: updated.subtitle, description: updated.description, features: updated.features || payload.features || [] } : p));
        save(next);
        cancelEditProject();
      }).catch(() => {
        // fallback local update
        const next = projects.map(p => ((p.id ?? p._id) === id ? { ...p, title: payload.title, subtitle: payload.subtitle, description: payload.description, features: payload.features || [] } : p));
        save(next);
        cancelEditProject();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  const handleFormChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleExperienceChange = (idx, key, val) => {
    const exp = [...form.experiences];
    exp[idx] = { ...exp[idx], [key]: val };
    setForm(prev => ({ ...prev, experiences: exp }));
  };

  const addExperience = () => {
    setForm(prev => ({ ...prev, experiences: [...prev.experiences, { title: '', company: '', from: '', to: '', description: '' }] }));
  };

  const removeExperience = (idx) => {
    const exp = form.experiences.filter((_, i) => i !== idx);
    setForm(prev => ({ ...prev, experiences: exp }));
  };

  const saveUserToBackend = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
      if (res.ok) {
        const updated = await res.json();
        setUser(updated);
        setEditing(false);
        alert('User updated');
      } else {
        alert('Failed to update user');
      }
    } catch (e) {
      alert('Error updating user');
    }
  };

  // initialize edit form from context user before editing
  const startEditProfile = () => {
    if (!user) return;
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      whatsapp: user.whatsapp || '',
      github: user.github || '',
      description: user.description || '',
      experiences: Array.isArray(user.experiences) ? user.experiences : []
    });
    setEditing(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="space-x-2">
            <button onClick={() => navigate('/')} className="px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded">View Site</button>
            <button onClick={handleLogout} className="px-3 py-2 bg-red-600 text-white rounded">Logout</button>
          </div>
        </div>

        <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          {user ? (
            <div>
              {!editing ? (
                <div>
                  <div className="mb-2"><strong>Name:</strong> {user.name}</div>
                  <div className="mb-2"><strong>Email:</strong> {user.email}</div>
                  <div className="mb-2"><strong>Phone:</strong> {user.phone}</div>
                  <div className="mb-2"><strong>Whatsapp:</strong> {user.whatsapp}</div>
                  <div className="mb-2"><strong>GitHub:</strong> {user.github}</div>
                  <div className="mb-2"><strong>Description:</strong> {user.description}</div>
                  <div className="mb-2">
                    <strong>Experiences:</strong>
                    <ul className="list-disc ml-6 mt-2">
                      {(user.experiences || []).map((e, i) => (
                        <li key={i}><strong>{e.title}</strong> — {e.company} ({e.from} - {e.to})</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <button onClick={startEditProfile} className="px-3 py-2 bg-blue-600 text-white rounded">Edit Profile</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <input value={form.name} onChange={e => handleFormChange('name', e.target.value)} className="w-full p-2 rounded border" placeholder="Name" />
                  <input value={form.email} onChange={e => handleFormChange('email', e.target.value)} className="w-full p-2 rounded border" placeholder="Email" />
                  <input value={form.phone} onChange={e => handleFormChange('phone', e.target.value)} className="w-full p-2 rounded border" placeholder="Phone" />
                  <input value={form.whatsapp} onChange={e => handleFormChange('whatsapp', e.target.value)} className="w-full p-2 rounded border" placeholder="Whatsapp" />
                  <input value={form.github} onChange={e => handleFormChange('github', e.target.value)} className="w-full p-2 rounded border" placeholder="GitHub" />
                  <textarea value={form.description} onChange={e => handleFormChange('description', e.target.value)} className="w-full p-2 rounded border" placeholder="Description" />

                  <div>
                    <h4 className="font-semibold">Experiences</h4>
                    {form.experiences.map((exp, idx) => (
                      <div key={idx} className="p-3 border rounded mb-2">
                        <input value={exp.title} onChange={e => handleExperienceChange(idx, 'title', e.target.value)} className="w-full p-2 rounded border mb-1" placeholder="Title" />
                        <input value={exp.company} onChange={e => handleExperienceChange(idx, 'company', e.target.value)} className="w-full p-2 rounded border mb-1" placeholder="Company" />
                        <div className="flex gap-2">
                          <input value={exp.from} onChange={e => handleExperienceChange(idx, 'from', e.target.value)} className="w-1/2 p-2 rounded border" placeholder="From" />
                          <input value={exp.to} onChange={e => handleExperienceChange(idx, 'to', e.target.value)} className="w-1/2 p-2 rounded border" placeholder="To" />
                        </div>
                        <textarea value={exp.description} onChange={e => handleExperienceChange(idx, 'description', e.target.value)} className="w-full p-2 rounded border mt-1" placeholder="Description" />
                        <div className="mt-2 text-right"><button onClick={() => removeExperience(idx)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button></div>
                      </div>
                    ))}
                    <div className="mt-2"><button onClick={addExperience} className="px-3 py-2 bg-green-500 text-white rounded">Add Experience</button></div>
                  </div>

                  <div className="mt-4">
                    <button onClick={saveUserToBackend} className="px-3 py-2 bg-blue-600 text-white rounded mr-2">Save</button>
                    <button onClick={() => setEditing(false)} className="px-3 py-2 bg-gray-300 rounded">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading user...</p>
          )}
        </section>
        
        <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Skills</h2>
          <form onSubmit={addSkill} className="flex gap-2 items-center mb-4">
            <input placeholder="Skill name" value={newSkillName} onChange={e => setNewSkillName(e.target.value)} className="p-2 rounded border flex-1" required />
            <input type="number" min="0" max="100" value={newSkillLevel} onChange={e => setNewSkillLevel(e.target.value)} className="w-24 p-2 rounded border" />
            <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
          </form>

          <div>
            {(!skills || skills.length === 0) ? (
              <p className="text-sm text-gray-500">No skills yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((s, idx) => (
                  <div key={idOf(s, idx)} className="p-3 border rounded bg-gray-50 dark:bg-gray-700">
                    {editingSkillId === idOf(s, idx) ? (
                      <form onSubmit={saveSkillEdit} className="space-y-2">
                        <input value={editingSkillForm.name} onChange={e => setEditingSkillForm(prev => ({ ...prev, name: e.target.value }))} className="w-full p-2 rounded border" />
                        <input type="number" min="0" max="100" value={editingSkillForm.level} onChange={e => setEditingSkillForm(prev => ({ ...prev, level: e.target.value }))} className="w-full p-2 rounded border" />
                        <div className="flex justify-end gap-2">
                          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                          <button type="button" onClick={cancelEditSkill} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-sm text-gray-505">Level: {s.level}</div>
                        <div className="mt-3 flex justify-end gap-2">
                          <button onClick={() => startEditSkill(s, idx)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                          <button onClick={() => deleteSkill(idOf(s, idx))} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mb-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Projects</h2>
          <form onSubmit={handleAddProject} className="space-y-3">
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 rounded border" required />
            <input placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full p-2 rounded border" />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 rounded border" />
            <div>
              <label className="block text-sm font-medium mb-1">Features</label>
              <div className="space-y-2">
                {newProjectFeatures.map((f, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input value={f} onChange={e => updateNewFeature(idx, e.target.value)} className="flex-1 p-2 rounded border" />
                    <button type="button" onClick={() => removeNewFeature(idx)} className="px-3 py-2 bg-red-500 text-white rounded">Remove</button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input placeholder="New feature" value={newFeatureText} onChange={e => setNewFeatureText(e.target.value)} className="flex-1 p-2 rounded border" />
                  <button type="button" onClick={addNewFeatureToList} className="px-3 py-2 bg-green-600 text-white rounded">Add Feature</button>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add Project</button>
            </div>
          </form>

          <div className="mt-6">
            {(!projects || projects.length === 0) ? (
              <p className="text-sm text-gray-500">No projects yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p, idx) => (
                  <div key={idOf(p, idx)} className="p-4 border rounded bg-gray-50 dark:bg-gray-700">
                    {editingProjectId === idOf(p, idx) ? (
                      <form onSubmit={saveProjectEdit} className="space-y-2">
                        <input value={editingProjectForm.title} onChange={e => setEditingProjectForm(prev => ({ ...prev, title: e.target.value }))} className="w-full p-2 rounded border" />
                        <input value={editingProjectForm.subtitle} onChange={e => setEditingProjectForm(prev => ({ ...prev, subtitle: e.target.value }))} className="w-full p-2 rounded border" />
                        <textarea value={editingProjectForm.description} onChange={e => setEditingProjectForm(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 rounded border" />
                          <div>
                            <label className="block text-sm font-medium mb-1">Features</label>
                            <div className="space-y-2">
                              {(editingProjectForm.features || []).map((f, i) => (
                                <div key={i} className="flex gap-2">
                                  <input value={f} onChange={e => updateEditingFeature(i, e.target.value)} className="flex-1 p-2 rounded border" />
                                  <button type="button" onClick={() => removeEditingFeature(i)} className="px-3 py-2 bg-red-500 text-white rounded">Remove</button>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <button type="button" onClick={addEditingFeature} className="px-3 py-2 bg-green-600 text-white rounded">Add Feature</button>
                              </div>
                            </div>
                          </div>
                        <div className="flex justify-end gap-2">
                          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                          <button type="button" onClick={cancelEditProject} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-sm text-gray-500">{p.subtitle}</div>
                        <div className="mt-2 text-sm">{p.description}</div>
                        {(p.features && p.features.length > 0) && (
                          <ul className="mt-2 list-disc ml-6 text-sm">
                            {p.features.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        )}
                        <div className="mt-3 flex justify-end gap-2">
                          <button onClick={() => startEditProject(p, idx)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                          <button onClick={() => handleDelete(idOf(p, idx))} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;
