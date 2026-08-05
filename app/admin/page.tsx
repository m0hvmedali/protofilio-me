'use client';

import { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '@/lib/firebase';
import { signInWithPopup, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Project, Course } from '@/lib/schema';
import { Plus, Edit2, Trash2, LogOut, CheckCircle, BookOpen, Briefcase, User as UserIcon } from 'lucide-react';

type DBProject = {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  techStack: string[];
  liveLink: string | null;
  repoLink: string | null;
};

type DBCourse = {
  id: number;
  title: string;
  provider: string;
  date: string;
  keyTakeaway: string;
};

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'courses'>('projects');
  
  // Profile state
  const [profileFormData, setProfileFormData] = useState<any>({});
  
  // Projects state
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<DBProject>>({});
  
  // Courses state
  const [courses, setCourses] = useState<DBCourse[]>([]);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [courseFormData, setCourseFormData] = useState<Partial<DBCourse>>({});
  
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user && user.email === 'mohamedalix546@gmail.com') {
        fetchProfile();
        fetchProjects();
        fetchCourses();
      }
    });
    return unsub;
  }, []);

  const fetchProfile = async () => {
    const res = await fetch('/api/profile');
    if (res.ok) {
      setProfileFormData(await res.json());
    }
  };

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    if (res.ok) {
      setProjects(await res.json());
    }
  };

  const fetchCourses = async () => {
    const res = await fetch('/api/courses');
    if (res.ok) {
      setCourses(await res.json());
    }
  };

  const handleLogin = async () => {
    try {
      setError('');
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setProjects([]);
  };

  const saveProfile = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileFormData)
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to save profile');
      }
      alert('Profile updated successfully');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const saveProject = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          techStack: typeof formData.techStack === 'string' 
            ? (formData.techStack as string).split(',').map(s => s.trim()) 
            : formData.techStack
        })
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to save');
      }

      setEditingId(null);
      setFormData({});
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteProject = async (id: number) => {
    if (!user || !confirm('Are you sure?')) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const saveCourse = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const method = editingCourseId ? 'PUT' : 'POST';
      const url = editingCourseId ? `/api/courses/${editingCourseId}` : '/api/courses';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseFormData)
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to save');
      }

      setEditingCourseId(null);
      setCourseFormData({});
      fetchCourses();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteCourse = async (id: number) => {
    if (!user || !confirm('Are you sure?')) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchCourses();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;

  if (!user || user.email !== 'mohamedalix546@gmail.com') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary px-4">
        <div className="glass p-8 rounded-2xl max-w-md w-full text-center border border-white/10">
          <h1 className="text-2xl font-bold mb-4 text-accent">Admin Gateway</h1>
          <p className="text-secondary mb-8">Restricted access area. Please authenticate to continue.</p>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-primary text-background font-bold rounded-lg hover:bg-white/90 transition-colors"
          >
            Authenticate with Google
          </button>
          {user && user.email !== 'mohamedalix546@gmail.com' && (
            <p className="mt-4 text-red-400 text-sm">Account {user.email} is not authorized.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Control Panel</h1>
            <p className="text-secondary mt-1">Manage your premium portfolio assets.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'profile' ? 'bg-accent text-background' : 'glass hover:bg-white/10'}`}
          >
            <UserIcon className="w-5 h-5" /> Profile
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'projects' ? 'bg-accent text-background' : 'glass hover:bg-white/10'}`}
          >
            <Briefcase className="w-5 h-5" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'courses' ? 'bg-accent text-background' : 'glass hover:bg-white/10'}`}
          >
            <BookOpen className="w-5 h-5" /> Courses
          </button>
        </div>

        {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-lg border border-red-500/20 mb-8">{error}</div>}

        {activeTab === 'profile' && (
          <div className="glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-accent"/> Edit Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Name" 
                  value={profileFormData.name || ''}
                  onChange={e => setProfileFormData({...profileFormData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="Role (e.g. Full-Stack Developer)" 
                  value={profileFormData.role || ''}
                  onChange={e => setProfileFormData({...profileFormData, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="Location" 
                  value={profileFormData.location || ''}
                  onChange={e => setProfileFormData({...profileFormData, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <textarea 
                  placeholder="Bio" 
                  value={profileFormData.bio || ''}
                  onChange={e => setProfileFormData({...profileFormData, bio: e.target.value})}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Avatar Image URL" 
                  value={profileFormData.avatarUrl || ''}
                  onChange={e => setProfileFormData({...profileFormData, avatarUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="Resume URL" 
                  value={profileFormData.resumeUrl || ''}
                  onChange={e => setProfileFormData({...profileFormData, resumeUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="Email" 
                  value={profileFormData.email || ''}
                  onChange={e => setProfileFormData({...profileFormData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="LinkedIn URL" 
                  value={profileFormData.linkedinUrl || ''}
                  onChange={e => setProfileFormData({...profileFormData, linkedinUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="GitHub URL" 
                  value={profileFormData.githubUrl || ''}
                  onChange={e => setProfileFormData({...profileFormData, githubUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <input 
                  type="text" placeholder="WhatsApp (e.g. +201281320192)" 
                  value={profileFormData.whatsapp || ''}
                  onChange={e => setProfileFormData({...profileFormData, whatsapp: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div className="mt-8">
              <button 
                onClick={saveProfile}
                className="w-full md:w-auto bg-accent text-background font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Save Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl border border-white/10 sticky top-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  {editingId ? <Edit2 className="w-5 h-5 text-accent"/> : <Plus className="w-5 h-5 text-accent"/>}
                  {editingId ? 'Edit Project' : 'New Project'}
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Project Title" 
                    value={formData.title || ''}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <textarea 
                    placeholder="Description" 
                    value={formData.description || ''}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Poster Image URL" 
                    value={formData.posterUrl || ''}
                    onChange={e => setFormData({...formData, posterUrl: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Tech Stack (comma separated)" 
                    value={Array.isArray(formData.techStack) ? formData.techStack.join(', ') : (formData.techStack || '')}
                    onChange={e => setFormData({...formData, techStack: e.target.value as any})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Live Link URL (optional)" 
                    value={formData.liveLink || ''}
                    onChange={e => setFormData({...formData, liveLink: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Repo Link URL (optional)" 
                    value={formData.repoLink || ''}
                    onChange={e => setFormData({...formData, repoLink: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={saveProject}
                      className="flex-1 bg-accent text-background font-bold py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" /> {editingId ? 'Update' : 'Save'}
                    </button>
                    {editingId && (
                      <button 
                        onClick={() => { setEditingId(null); setFormData({}); }}
                        className="flex-1 glass font-bold py-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {projects.map(p => (
                <div key={p.id} className="glass p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-48 h-32 rounded-lg bg-surface overflow-hidden shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.posterUrl} alt={p.title} className="w-full h-full object-cover opacity-70" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-accent">{p.title}</h3>
                    <p className="text-sm text-secondary line-clamp-2 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.techStack.map(t => (
                        <span key={t} className="px-2 py-1 bg-white/5 rounded text-xs text-secondary border border-white/5">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <button 
                      onClick={() => { setEditingId(p.id); setFormData(p); }}
                      className="p-3 glass rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteProject(p.id)}
                      className="p-3 glass rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="glass p-12 rounded-2xl border border-white/10 text-center text-secondary">
                  No projects found. Create one to get started.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="glass p-6 rounded-2xl border border-white/10 sticky top-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  {editingCourseId ? <Edit2 className="w-5 h-5 text-accent"/> : <Plus className="w-5 h-5 text-accent"/>}
                  {editingCourseId ? 'Edit Course' : 'New Course'}
                </h2>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Course Title" 
                    value={courseFormData.title || ''}
                    onChange={e => setCourseFormData({...courseFormData, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Provider / Certification Body" 
                    value={courseFormData.provider || ''}
                    onChange={e => setCourseFormData({...courseFormData, provider: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Date (e.g. 2023, Recent)" 
                    value={courseFormData.date || ''}
                    onChange={e => setCourseFormData({...courseFormData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <textarea 
                    placeholder="Key Takeaway" 
                    value={courseFormData.keyTakeaway || ''}
                    onChange={e => setCourseFormData({...courseFormData, keyTakeaway: e.target.value})}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={saveCourse}
                      className="flex-1 bg-accent text-background font-bold py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" /> {editingCourseId ? 'Update' : 'Save'}
                    </button>
                    {editingCourseId && (
                      <button 
                        onClick={() => { setEditingCourseId(null); setCourseFormData({}); }}
                        className="flex-1 glass font-bold py-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {courses.map(c => (
                <div key={c.id} className="glass p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-accent">{c.title}</h3>
                      <span className="px-2 py-1 bg-white/5 rounded text-xs text-secondary border border-white/5">{c.date}</span>
                    </div>
                    <p className="text-sm font-medium text-white/80 mb-2">{c.provider}</p>
                    <p className="text-sm text-secondary">{c.keyTakeaway}</p>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <button 
                      onClick={() => { setEditingCourseId(c.id); setCourseFormData(c); }}
                      className="p-3 glass rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteCourse(c.id)}
                      className="p-3 glass rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {courses.length === 0 && (
                <div className="glass p-12 rounded-2xl border border-white/10 text-center text-secondary">
                  No courses found. Create one to get started.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
