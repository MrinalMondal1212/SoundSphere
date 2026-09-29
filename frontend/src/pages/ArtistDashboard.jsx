import React, { useState } from 'react';
import {
  Music,
  Disc,
  Plus,
  Edit2,
  Trash2,
  Play,
  TrendingUp,
  Users,
  DollarSign,
  Search,
  MoreVertical,
  X,
  Upload,
  BarChart3
} from 'lucide-react';

const initialTracks = [
  { id: 1, title: 'Surfcore', album: 'Hard to Imagine', releaseDate: 'Nov 4, 2023', streams: '1.2M', duration: '3:29', status: 'Published' },
  { id: 2, title: 'Skyfall Beats', album: 'Nightmre Vol 1', releaseDate: 'Oct 26, 2023', streams: '840K', duration: '2:45', status: 'Published' },
  { id: 3, title: 'Midnight Echoes', album: 'Single', releaseDate: 'Dec 10, 2023', streams: '310K', duration: '3:12', status: 'Published' },
  { id: 4, title: 'Neon Dreams (Unreleased)', album: 'Future Sounds', releaseDate: 'Pending', streams: '0', duration: '2:50', status: 'In Review' },
];

export default function ArtistDashboard() {
  const [tracks, setTracks] = useState(initialTracks);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    album: '',
    duration: '',
    status: 'Published'
  });

  const handleOpenModal = (track = null) => {
    if (track) {
      setEditingTrack(track);
      setFormData({ title: track.title, album: track.album, duration: track.duration, status: track.status });
    } else {
      setEditingTrack(null);
      setFormData({ title: '', album: '', duration: '', status: 'Published' });
    }
    setIsModalOpen(true);
  };

  const handleSaveTrack = (e) => {
    e.preventDefault();
    if (editingTrack) {
      setTracks(tracks.map(t => t.id === editingTrack.id ? { ...t, ...formData } : t));
    } else {
      const newTrack = {
        id: Date.now(),
        ...formData,
        releaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        streams: '0'
      };
      setTracks([newTrack, ...tracks]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTrack = (id) => {
    if (window.confirm('Are you sure you want to delete this track?')) {
      setTracks(tracks.filter(t => t.id !== id));
    }
  };

  const filteredTracks = tracks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Artist Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your music library, release new singles, and monitor performance</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#ee10b0] hover:bg-[#c80d94] text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#ee10b0]/25 transition-all self-start md:self-auto"
        >
          <Plus size={18} />
          <span>Upload New Track</span>
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<TrendingUp className="text-[#ee10b0]" />} title="Total Streams" value="2.35M" change="+14.2%" />
        <StatCard icon={<Users className="text-[#ee10b0]" />} title="Monthly Listeners" value="184.5K" change="+8.1%" />
        <StatCard icon={<DollarSign className="text-[#ee10b0]" />} title="Estimated Revenue" value="$4,820.00" change="+12.5%" />
        <StatCard icon={<Music className="text-[#ee10b0]" />} title="Total Tracks" value={tracks.length.toString()} change="Active" />
      </div>

      {/* Main Content / Table */}
      <div className="bg-[#181818] rounded-2xl border border-white/10 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Disc size={20} className="text-[#ee10b0]" /> Your Uploaded Tracks
          </h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search track or album..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#222] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ee10b0]"
            />
          </div>
        </div>

        {/* Tracks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase bg-[#222] text-gray-400 border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Album</th>
                <th className="py-3 px-4">Release Date</th>
                <th className="py-3 px-4">Streams</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTracks.map((track) => (
                <tr key={track.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#282828] rounded-lg flex items-center justify-center text-[#ee10b0]">
                      <Play size={14} fill="#ee10b0" />
                    </div>
                    {track.title}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{track.album}</td>
                  <td className="py-3 px-4 text-gray-400">{track.releaseDate}</td>
                  <td className="py-3 px-4 font-semibold text-white">{track.streams}</td>
                  <td className="py-3 px-4 text-gray-400">{track.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      track.status === 'Published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {track.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(track)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrack(track.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                      >
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

      {/* Create / Edit Track Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#181818] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingTrack ? 'Edit Track' : 'Upload New Track'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTrack} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400">Track Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Neon Sunset"
                  className="w-full bg-[#222] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400">Album / EP</label>
                <input
                  type="text"
                  required
                  value={formData.album}
                  onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                  placeholder="e.g. Single or Album Name"
                  className="w-full bg-[#222] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400">Duration</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="3:45"
                    className="w-full bg-[#222] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#222] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ee10b0] mt-1"
                  >
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:border-[#ee10b0]/50 transition-colors">
                <Upload className="mx-auto text-[#ee10b0] mb-2" size={28} />
                <p className="text-xs font-semibold text-white">Click to upload audio file (MP3, WAV)</p>
                <p className="text-[10px] text-gray-500 mt-1">Maximum file size: 50MB</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#222] text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#ee10b0] hover:bg-[#c80d94] text-white shadow-lg shadow-[#ee10b0]/30"
                >
                  {editingTrack ? 'Save Changes' : 'Upload Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, change }) {
  return (
    <div className="bg-[#181818] border border-white/10 rounded-2xl p-5 shadow-lg flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-xs text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-extrabold text-white">{value}</p>
        <span className="text-[10px] font-bold text-green-400">{change}</span>
      </div>
      <div className="w-12 h-12 rounded-xl bg-[#ee10b0]/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}