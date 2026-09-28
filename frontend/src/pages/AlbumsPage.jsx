import React from 'react';
import {
  Home,
  Compass,
  Disc,
  Radio,
  Clock,
  PlayCircle,
  Heart,
  ListMusic,
  PlusCircle,
  Settings,
  LogOut,
  ArrowLeft,
  User,
  MoreHorizontal,
  Play,
  Globe,
  Camera,
  Phone
} from 'lucide-react';

const trackList = [
  { id: 1, title: 'Surfcore', artist: 'The Neighbourhood', releaseDate: 'Nov 4, 2023', album: 'Hard to Imagine Neighbourhood Ever Changing', time: '3:29', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop' },
  { id: 2, title: 'Skyfall Beats', artist: 'nightmre', releaseDate: 'Oct 26, 2023', album: 'nightmre', time: '2:45', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop' },
  { id: 3, title: 'Greedy', artist: 'Tate McRae', releaseDate: 'Nov 30, 2023', album: 'Greedy', time: '2:11', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&auto=format&fit=crop' },
  { id: 4, title: 'Lovin On Me', artist: 'Jack Harlow', releaseDate: 'Dec 11, 2023', album: 'Lovin On Me', time: '2:18', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop' },
  { id: 5, title: 'Paint The Town Red', artist: 'Doja Cat', releaseDate: 'Dec 21, 2023', album: 'Paint The Town Red', time: '3:51', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop' },
  { id: 6, title: 'Dance On Night', artist: 'Dua Lipa', releaseDate: 'May 27, 2023', album: 'Dance The Night (From Barbie Movie)', time: '2:56', cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=150&auto=format&fit=crop' },
  { id: 7, title: 'Water', artist: 'Tyla', releaseDate: 'Oct 21, 2023', album: 'Water', time: '3:20', cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop' },
  { id: 8, title: 'Push Your Limits', artist: 'Workout Beat', releaseDate: 'Jan 2, 2024', album: 'Push Your Limits', time: '3:34', cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop' },
  { id: 9, title: 'Houdini', artist: 'Dua Lipa', releaseDate: 'Dec 12, 2023', album: 'Houdini', time: '3:05', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop' },
  { id: 10, title: 'Lala', artist: 'Myke Towers', releaseDate: 'Nov 20, 2023', album: 'La vida es una', time: '3:17', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=150&auto=format&fit=crop' },
  { id: 11, title: 'I Wanna Be Yours', artist: 'Arctic Monkeys', releaseDate: 'Sep 9, 2023', album: 'AM', time: '3:03', cover: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=150&auto=format&fit=crop' },
  { id: 12, title: 'Paradise', artist: 'Anabel', releaseDate: 'Jul 5, 2023', album: 'Paradise', time: '3:33', cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop' },
  { id: 13, title: 'As It Was', artist: 'Harry Styles', releaseDate: 'Sep 14, 2022', album: 'As It Was', time: '2:47', cover: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop' },
  { id: 14, title: 'Another Love', artist: 'Tom Odell', releaseDate: 'Dec 11, 2013', album: 'Another Love', time: '4:06', cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&auto=format&fit=crop' },
  { id: 15, title: 'Daylight', artist: 'David Kushner', releaseDate: 'Jun 16, 2022', album: 'Daylight', time: '3:32', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop' },
  { id: 16, title: 'Beggin', artist: 'Måneskin', releaseDate: 'Feb 27, 2017', album: 'Chosen', time: '3:31', cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=150&auto=format&fit=crop' },
  { id: 17, title: 'What Was I Made For', artist: 'Billie Eilish', releaseDate: 'Sep 6, 2023', album: 'What Was I Made For', time: '3:42', cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop' },
  { id: 18, title: 'Daddy Issues', artist: 'The Neighbourhood', releaseDate: 'Aug 21, 2015', album: 'Wiped Out!', time: '4:20', cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150&auto=format&fit=crop' },
  { id: 19, title: 'Rolling In The Deep', artist: 'Adele', releaseDate: 'Jun 5, 2011', album: 'Adele 21', time: '3:48', cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop' },
  { id: 20, title: 'OneShot', artist: 'mxi', releaseDate: 'Dec 14, 2023', album: 'Toca Donka', time: '1:15', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&auto=format&fit=crop' },
];

export default function AlbumsPage() {
  return (
    <div className="flex min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white">
      {/* Sidebar Navigation */}
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content Area */}
        <main className="p-8 space-y-8 flex-1">
          {/* Banner Container */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0d3859] via-[#124d77] to-[#153448] p-8 border border-secondary/20 shadow-xl">
            {/* Top Bar inside Banner */}
            <div className="flex items-center justify-between mb-8">
              <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-6 text-sm font-medium text-white/90">
                <a href="#share" className="hover:text-white transition-colors">Share</a>
                <a href="#upload" className="hover:text-white transition-colors">Upload</a>
                <a href="#premium" className="hover:text-white transition-colors">Premium</a>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <User size={18} />
                </div>
              </div>
            </div>

            {/* Banner Details */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop"
                    alt="Trending Songs Mix"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                    Trending songs <span className="text-primary">mix</span>
                  </h1>
                  <p className="text-xs text-text-secondary max-w-md leading-relaxed">
                    tate mcrae, nightmares, the neighbourhood, doja cat and ...
                  </p>
                  <p className="text-xs font-semibold text-text-muted flex items-center gap-2">
                    <span>20 songs</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span>1h 35m</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary tracking-wide">Play All</span>
                <button className="w-12 h-12 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                  <Play size={22} fill="white" className="ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Tracklist Table */}
          <div className="bg-surface/60 rounded-2xl p-4 border border-border/60">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-text-muted border-b border-border/50">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Release Date</div>
              <div className="col-span-3">Album</div>
              <div className="col-span-2 text-right pr-4">Time</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border/20">
              {trackList.map((track) => (
                <div
                  key={track.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-card/60 transition-colors rounded-xl group cursor-pointer"
                >
                  <div className="col-span-1 text-center font-bold text-xs text-secondary group-hover:text-primary transition-colors">
                    {track.id}
                  </div>

                  <div className="col-span-4 flex items-center gap-3 min-w-0">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-text truncate group-hover:text-primary transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-[10px] text-text-muted truncate">{track.artist}</p>
                    </div>
                  </div>

                  <div className="col-span-2 text-xs text-text-muted truncate">
                    {track.releaseDate}
                  </div>

                  <div className="col-span-3 text-xs text-text-muted truncate">
                    {track.album}
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-3 text-xs text-text-muted">
                    <button className="hover:text-primary transition-colors">
                      <Heart size={14} />
                    </button>
                    <span>{track.time}</span>
                    <button className="hover:text-text transition-colors">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 bg-surface border-t border-border px-12 py-12">
          <div className="grid grid-cols-5 gap-8 items-start">
            <div className="col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-text">About</h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                Melodies is a website that has been created for over <span className="text-primary font-semibold">5 years</span> now and it is one of the most famous music player websites in the world. In this website you can listen and download songs for free, also if you want no limitation you can buy our <a href="#premium" className="text-primary underline font-medium hover:text-primary-hover">premium pass</a>.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">Melodies</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Songs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Radio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Podcast</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">Access</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Explore</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Artists</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Playlist</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Albums</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Trending</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">Contact</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">Melodies</h2>
            <div className="flex items-center gap-4 text-text-muted">
              <a href="#" className="p-2 hover:text-primary transition-colors"><Globe size={18} /></a>
              <a href="#" className="p-2 hover:text-primary transition-colors"><Camera size={18} /></a>
              <a href="#" className="p-2 hover:text-primary transition-colors"><Camera size={18} /></a>
              <a href="#" className="p-2 hover:text-primary transition-colors"><Phone size={18} /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, textSecondary = false }) {
  return (
    <button
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
        active
          ? 'bg-primary text-white shadow-md shadow-primary/30'
          : textSecondary
          ? 'text-secondary hover:bg-card hover:text-secondary-hover'
          : 'text-text-secondary hover:bg-card hover:text-text'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}