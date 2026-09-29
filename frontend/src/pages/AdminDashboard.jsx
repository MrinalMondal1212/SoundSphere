import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Music,
  Disc,
  CheckCircle,
  Search,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Play,
  X,
  XCircle,
  TrendingUp,
  AlertTriangle,
  Upload,
  LogOut,
  ShieldCheck,
  Filter
} from 'lucide-react';

// Sample Initial Data
const initialStats = {
  totalUsers: 1248920,
  activeArtists: 14200,
  totalSongs: 482100,
  pendingApprovals: 3
};

const initialUsers = [
  { id: 1, name: 'Tate McRae', email: 'tate@melodies.com', role: 'Artist', status: 'Active', joined: 'Jan 2023', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop' },
  { id: 2, name: 'Alex Johnson', email: 'alex@gmail.com', role: 'Listener', status: 'Active', joined: 'Mar 2023', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop' },
  { id: 3, name: 'Sarah Parker', email: 'sarah@yahoo.com', role: 'Listener', status: 'Banned', joined: 'Nov 2022', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop' },
  { id: 4, name: 'The Neighbourhood', email: 'thenbhd@music.com', role: 'Artist', status: 'Active', joined: 'Feb 2021', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop' },
];

const initialSongs = [
  { id: 101, title: 'Surfcore', artist: 'The Neighbourhood', album: 'Hard to Imagine', releaseDate: 'Nov 4, 2023', plays: '1.2M', duration: '3:29', status: 'Published' },
  { id: 102, title: 'Greedy', artist: 'Tate McRae', album: 'Greedy', releaseDate: 'Nov 30, 2023', plays: '3.4M', duration: '2:11', status: 'Published' },
  { id: 103, title: 'Skyfall Beats', artist: 'nightmre', album: 'nightmre', releaseDate: 'Oct 26, 2023', plays: '840K', duration: '2:45', status: 'Published' },
  { id: 104, title: 'Water', artist: 'Tyla', album: 'Water', releaseDate: 'Oct 21, 2023', plays: '2.1M', duration: '3:20', status: 'Published' },
];

const initialAlbums = [
  { id: 201, title: 'Hard to Imagine', artist: 'The Neighbourhood', releaseYear: '2023', tracksCount: 12, genre: 'Alternative' },
  { id: 202, title: 'Greedy', artist: 'Tate McRae', releaseYear: '2023', tracksCount: 8, genre: 'Pop' },
  { id: 203, title: 'AM', artist: 'Arctic Monkeys', releaseYear: '2013', tracksCount: 12, genre: 'Indie Rock' },
];

const initialApprovals = [
  { id: 301, title: 'Hyper Drive', artist: 'Neon Rider', album: 'Cyberpunk Vol 1', genre: 'Synthwave', duration: '3:15' },
  { id: 302, title: 'Velvet Rain', artist: 'Luna Breeze', album: 'Acoustic Sessions', genre: 'Indie Pop', duration: '2:48' },
  { id: 303, title: 'Bass Cannon 2026', artist: 'DJ Overload', album: 'Single', genre: 'EDM', duration: '4:02' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data States
  const [users, setUsers] = useState(initialUsers);
  const [songs, setSongs] = useState(initialSongs);
  const [albums, setAlbums] = useState(initialAlbums);
  const [approvals, setApprovals] = useState(initialApprovals);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals States
  const [songModalOpen, setSongModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [songForm, setSongForm] = useState({ title: '', artist: '', album: '', duration: '', status: 'Published' });

  const [albumModalOpen, setAlbumModalOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [albumForm, setAlbumForm] = useState({ title: '', artist: '', releaseYear: '', genre: '', tracksCount: '' });

  // SONG CRUD HANDLERS
  const handleOpenSongModal = (song = null) => {
    if (song) {
      setEditingSong(song);
      setSongForm({ title: song.title, artist: song.artist, album: song.album, duration: song.duration, status: song.status });
    } else {
      setEditingSong(null);
      setSongForm({ title: '', artist: '', album: '', duration: '', status: 'Published' });
    }
    setSongModalOpen(true);
  };

  const handleSaveSong = (e) => {
    e.preventDefault();
    if (editingSong) {
      setSongs(songs.map(s => s.id === editingSong.id ? { ...s, ...songForm } : s));
    } else {
      const newSong = {
        id: Date.now(),
        ...songForm,
        releaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        plays: '0'
      };
      setSongs([newSong, ...songs]);
    }
    setSongModalOpen(false);
  };

  const handleDeleteSong = (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      setSongs(songs.filter(s => s.id !== id));
    }
  };

  // ALBUM CRUD HANDLERS
  const handleOpenAlbumModal = (album = null) => {
    if (album) {
      setEditingAlbum(album);
      setAlbumForm({ title: album.title, artist: album.artist, releaseYear: album.releaseYear, genre: album.genre, tracksCount: album.tracksCount });
    } else {
      setEditingAlbum(null);
      setAlbumForm({ title: '', artist: '', releaseYear: new Date().getFullYear().toString(), genre: '', tracksCount: '1' });
    }
    setAlbumModalOpen(true);
  };

  const handleSaveAlbum = (e) => {
    e.preventDefault();
    if (editingAlbum) {
      setAlbums(albums.map(a => a.id === editingAlbum.id ? { ...a, ...albumForm } : a));
    } else {
      const newAlbum = { id: Date.now(), ...albumForm };
      setAlbums([newAlbum, ...albums]);
    }
    setAlbumModalOpen(false);
  };

  const handleDeleteAlbum = (id) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      setAlbums(albums.filter(a => a.id !== id));
    }
  };

  // USER HANDLERS
  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u));
  };

  // APPROVAL HANDLERS
  const handleApproveSong = (approval) => {
    const newSong = {
      id: Date.now(),
      title: approval.title,
      artist: approval.artist,
      album: approval.album,
      releaseDate: 'Today',
      plays: '0',
      duration: approval.duration,
      status: 'Published'
    };
    setSongs([newSong, ...songs]);
    setApprovals(approvals.filter(a => a.id !== approval.id));
  };

  const handleRejectSong = (id) => {
    setApprovals(approvals.filter(a => a.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#0e0e0e] text-white font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#141414] border-r border-white/10 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ee10b0] flex items-center justify-center text-white shadow-lg shadow-[#ee10b0]/30 font-bold text-lg">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">Melodies</h1>
              <span className="text-[10px] font-bold text-[#ee10b0] tracking-widest uppercase">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => { setActiveTab('overview'); setSearchQuery(''); }}
            />
            <SidebarItem
              icon={<Users size={18} />}
              label="Users & Artists"
              active={activeTab === 'users'}
              onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
            />
            <SidebarItem
              icon={<Music size={18} />}
              label="Songs Manager"
              active={activeTab === 'songs'}
              onClick={() => { setActiveTab('songs'); setSearchQuery(''); }}
            />
            <SidebarItem
              icon={<Disc size={18} />}
              label="Albums Manager"
              active={activeTab === 'albums'}
              onClick={() => { setActiveTab('albums'); setSearchQuery(''); }}
            />
            <SidebarItem
              icon={<ShieldCheck size={18} />}
              label="Approvals Queue"
              badge={approvals.length}
              active={activeTab === 'approvals'}
              onClick={() => { setActiveTab('approvals'); setSearchQuery(''); }}
            />
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#1f1f1f] border border-white/5 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#ee10b0] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-gray-400 truncate">admin@melodies.com</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={16} /> Exit Panel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#141414]/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold capitalize text-white">
              {activeTab === 'users' ? 'Users & Artists Management' : activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {activeTab !== 'overview' && activeTab !== 'approvals' && (
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl py-1.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ee10b0]"
                />
              </div>
            )}
            
            {activeTab === 'songs' && (
              <button
                onClick={() => handleOpenSongModal()}
                className="bg-[#ee10b0] hover:bg-[#c80d94] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-[#ee10b0]/20 transition-all"
              >
                <Plus size={16} /> Add New Song
              </button>
            )}

            {activeTab === 'albums' && (
              <button
                onClick={() => handleOpenAlbumModal()}
                className="bg-[#ee10b0] hover:bg-[#c80d94] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-[#ee10b0]/20 transition-all"
              >
                <Plus size={16} /> Add New Album
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Section Rendering */}
        <div className="p-8 space-y-8 flex-1">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Users className="text-[#ee10b0]" />} title="Total Listeners" value="1.24M" sub="+12.4% this month" />
                <StatCard icon={<Music className="text-[#ee10b0]" />} title="Active Artists" value="14,200" sub="+320 new" />
                <StatCard icon={<Disc className="text-[#ee10b0]" />} title="Total Songs" value="482.1K" sub="98.5% published" />
                <StatCard icon={<AlertTriangle className="text-yellow-400" />} title="Pending Approvals" value={approvals.length.toString()} sub="Action required" />
              </div>

              {/* Quick Actions & Recent Approvals Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Approvals Section */}
                <div className="lg:col-span-2 bg-[#141414] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck size={18} className="text-[#ee10b0]" /> Pending Track Reviews
                    </h3>
                    <button onClick={() => setActiveTab('approvals')} className="text-xs text-[#ee10b0] font-semibold hover:underline">
                      View All
                    </button>
                  </div>

                  {approvals.length === 0 ? (
                    <p className="text-xs text-gray-500 py-6 text-center">No pending songs for review.</p>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {approvals.slice(0, 3).map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-white">{item.title}</p>
                            <p className="text-xs text-gray-400">{item.artist} • <span className="text-[#ee10b0]">{item.genre}</span></p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApproveSong(item)}
                              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
                            >
                              <CheckCircle size={14} /> Approve
                            </button>
                            <button
                              onClick={() => handleRejectSong(item.id)}
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
                            >
                              <XCircle size={14} /> Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white">Quick Control Shortcuts</h3>
                  <button onClick={() => handleOpenSongModal()} className="w-full bg-[#1f1f1f] hover:bg-white/10 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-white transition-colors">
                    <span className="flex items-center gap-2"><Music size={16} className="text-[#ee10b0]" /> Upload & Publish Song</span>
                    <Plus size={16} />
                  </button>
                  <button onClick={() => handleOpenAlbumModal()} className="w-full bg-[#1f1f1f] hover:bg-white/10 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-white transition-colors">
                    <span className="flex items-center gap-2"><Disc size={16} className="text-[#ee10b0]" /> Create New Album</span>
                    <Plus size={16} />
                  </button>
                  <button onClick={() => setActiveTab('users')} className="w-full bg-[#1f1f1f] hover:bg-white/10 border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-white transition-colors">
                    <span className="flex items-center gap-2"><Users size={16} className="text-[#ee10b0]" /> Manage User Accounts</span>
                    <Filter size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. USERS & ARTISTS TAB */}
          {activeTab === 'users' && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-xs uppercase bg-[#1a1a1a] text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">User / Artist</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Joined Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Access Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users
                      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                            <div>
                              <p className="font-bold text-white text-xs">{user.name}</p>
                              <p className="text-[11px] text-gray-400">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              user.role === 'Artist' ? 'bg-[#ee10b0]/20 text-[#ee10b0]' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-400">{user.joined}</td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              user.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                                user.status === 'Active'
                                  ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                                  : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                              }`}
                            >
                              {user.status === 'Active' ? <Lock size={16} /> : <Unlock size={16} />}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. SONGS MANAGER TAB */}
          {activeTab === 'songs' && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-xs uppercase bg-[#1a1a1a] text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Artist</th>
                      <th className="py-3 px-4">Album</th>
                      <th className="py-3 px-4">Plays</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {songs
                      .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.artist.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((song) => (
                        <tr key={song.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                            <Play size={12} fill="#ee10b0" className="text-[#ee10b0]" />
                            {song.title}
                          </td>
                          <td className="py-3 px-4 text-gray-300">{song.artist}</td>
                          <td className="py-3 px-4 text-gray-400 text-xs">{song.album}</td>
                          <td className="py-3 px-4 text-xs font-semibold text-white">{song.plays}</td>
                          <td className="py-3 px-4 text-xs text-gray-400">{song.duration}</td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                              {song.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleOpenSongModal(song)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDeleteSong(song.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. ALBUMS MANAGER TAB */}
          {activeTab === 'albums' && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-xs uppercase bg-[#1a1a1a] text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Album Title</th>
                      <th className="py-3 px-4">Artist</th>
                      <th className="py-3 px-4">Genre</th>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Tracks</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {albums
                      .filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.artist.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((album) => (
                        <tr key={album.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{album.title}</td>
                          <td className="py-3 px-4 text-gray-300">{album.artist}</td>
                          <td className="py-3 px-4 text-xs text-gray-400">{album.genre}</td>
                          <td className="py-3 px-4 text-xs text-gray-400">{album.releaseYear}</td>
                          <td className="py-3 px-4 text-xs font-semibold text-white">{album.tracksCount} Songs</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleOpenAlbumModal(album)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDeleteAlbum(album.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. APPROVALS QUEUE TAB */}
          {activeTab === 'approvals' && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              {approvals.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle size={40} className="mx-auto text-green-500/50 mb-3" />
                  <p className="text-sm font-medium">All pending tracks have been reviewed!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="text-xs uppercase bg-[#1a1a1a] text-gray-400 border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Track Title</th>
                        <th className="py-3 px-4">Artist</th>
                        <th className="py-3 px-4">Genre</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4 text-right">Moderation Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {approvals.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{item.title}</td>
                          <td className="py-3 px-4 text-gray-300">{item.artist}</td>
                          <td className="py-3 px-4"><span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">{item.genre}</span></td>
                          <td className="py-3 px-4 text-xs text-gray-400">{item.duration}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApproveSong(item)}
                                className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
                              >
                                <CheckCircle size={14} /> Approve
                              </button>
                              <button
                                onClick={() => handleRejectSong(item.id)}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
                              >
                                <XCircle size={14} /> Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* SONG CRUD MODAL */}
      {songModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">{editingSong ? 'Edit Song' : 'Publish New Song'}</h3>
              <button onClick={() => setSongModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveSong} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400">Song Title</label>
                <input
                  type="text"
                  required
                  value={songForm.title}
                  onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                  className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400">Artist</label>
                <input
                  type="text"
                  required
                  value={songForm.artist}
                  onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                  className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400">Album</label>
                  <input
                    type="text"
                    required
                    value={songForm.album}
                    onChange={(e) => setSongForm({ ...songForm, album: e.target.value })}
                    className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="3:20"
                    value={songForm.duration}
                    onChange={(e) => setSongForm({ ...songForm, duration: e.target.value })}
                    className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setSongModalOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1f1f1f] text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#ee10b0] text-white">Save Song</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ALBUM CRUD MODAL */}
      {albumModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#141414] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">{editingAlbum ? 'Edit Album' : 'Create New Album'}</h3>
              <button onClick={() => setAlbumModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveAlbum} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400">Album Title</label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400">Artist</label>
                <input
                  type="text"
                  required
                  value={albumForm.artist}
                  onChange={(e) => setAlbumForm({ ...albumForm, artist: e.target.value })}
                  className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400">Genre</label>
                  <input
                    type="text"
                    required
                    value={albumForm.genre}
                    onChange={(e) => setAlbumForm({ ...albumForm, genre: e.target.value })}
                    className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400">Release Year</label>
                  <input
                    type="text"
                    required
                    value={albumForm.releaseYear}
                    onChange={(e) => setAlbumForm({ ...albumForm, releaseYear: e.target.value })}
                    className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400">Track Count</label>
                  <input
                    type="number"
                    required
                    value={albumForm.tracksCount}
                    onChange={(e) => setAlbumForm({ ...albumForm, tracksCount: e.target.value })}
                    className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setAlbumModalOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1f1f1f] text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#ee10b0] text-white">Save Album</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponents
function SidebarItem({ icon, label, badge, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
        active
          ? 'bg-[#ee10b0] text-white shadow-lg shadow-[#ee10b0]/20'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {badge > 0 && (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${active ? 'bg-white text-[#ee10b0]' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, title, value, sub }) {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-lg flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-extrabold text-white">{value}</p>
        <p className="text-[10px] text-gray-500 font-medium">{sub}</p>
      </div>
      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}