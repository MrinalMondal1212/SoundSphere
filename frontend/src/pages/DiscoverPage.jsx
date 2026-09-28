// import React from 'react';
// import {
//   Home,
//   Compass,
//   Disc,
//   Radio,
//   Clock,
//   PlayCircle,
//   Heart,
//   ListMusic,
//   PlusCircle,
//   Settings,
//   LogOut,
//   Search,
//   ChevronRight,
//   ChevronLeft,
//   ChevronDown,
//   Camera,
//   Phone,
//   Globe,
//   Disc3,
//   Mic2,
//   Music2
// } from 'lucide-react';

// export default function DiscoverPage() {
//   const mainNavItems = [
//   { label: 'Home',    icon: Home,    path: '/' },
//   { label: 'Discover', icon: Compass, path: '/discover' },
//   { label: 'Albums',  icon: Disc3,   path: '/albums' },
//   { label: 'Artists', icon: Mic2,    path: '/artists' },
// ]
// const libraryNavItems = [
//   { label: 'Recently Added', icon: Clock,     path: '/recent' },
//   { label: 'Music Player',   icon: Music2,    path: '/player' },
//   { label: 'Your Favorites', icon: Heart,     path: '/favorites' },
//   { label: 'Your Playlist',  icon: ListMusic, path: '/playlist' },
//   { label: 'Add Playlist',   icon: PlusCircle,      path: '/playlist/new' },
// ]
//   return (
//     <div className="flex min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white">
//       {/* Sidebar Navigation */}
//        <aside className="w-[220px] fixed left-0 top-0 h-screen bg-surface flex flex-col border-r border-border z-50 overflow-y-auto">
//             {/* Logo */}
//             <div className="px-5 py-5 border-b border-border flex-shrink-0">
//               <div className="flex items-center gap-2.5 text-primary font-bold text-xl">
//                 <Radio size={22} />
//                 <span>SoundSphere</span>
//               </div>
//             </div>
      
//             {/* Main Navigation */}
//             <div className="px-3 pt-4 flex flex-col gap-0.5">
//               {mainNavItems.map((item) => (
//                 <NavItem key={item.path} item={item} />
//               ))}
//             </div>
      
//             {/* Divider */}
//             <div className="mx-4 my-4 border-t border-border" />
      
//             {/* Library Navigation */}
//             <div className="px-3 flex flex-col gap-0.5">
//               <p className="px-4 text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">
//                 Your Library
//               </p>
//               {libraryNavItems.map((item) => (
//                 <NavItem key={item.path} item={item} />
//               ))}
//             </div>
      
//             {/* Bottom Navigation (Settings + Logout) */}
//             <div className="mt-auto px-3 py-4 border-t border-border flex flex-col gap-0.5 flex-shrink-0">
//               {bottomNavItems.map((item) => (
//                 <NavItem key={item.path} item={item} />
//               ))}
//             </div>
//           </aside>
     

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Top Header Navigation */}
//         <header className="h-20 px-8 flex items-center justify-between border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-20">
//           {/* Search Bar */}
//           <div className="relative w-96">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
//             <input
//               type="text"
//               placeholder="Search for Music, Artists..."
//               className="w-full bg-card border border-border/60 rounded-full py-2 pl-10 pr-4 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
//             />
//           </div>

//           {/* Right Header Controls */}
//           <div className="flex items-center gap-8 text-sm font-medium">
//             <a href="#about" className="hover:text-primary transition-colors">About Us</a>
//             <a href="#upload" className="hover:text-primary transition-colors">Upload</a>
//             <a href="#premium" className="hover:text-primary transition-colors">Premium</a>
//             <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
//               Sign Up / Login
//             </button>
//           </div>
//         </header>

//         {/* Scrollable Page Body */}
//         <main className="p-8 space-y-12 flex-1">
//           {/* Section 1: Music Genres */}
//           <SectionHeader title="Music" highlightedTitle="Genres" />
//           <div className="grid grid-cols-5 gap-4">
//             <GenreCard title="Pop Tracks" bgImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop" />
//             <GenreCard title="Rap Tracks" bgImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop" />
//             <GenreCard title="Rock Tracks" bgImage="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop" />
//             <GenreCard title="Classic Tracks" bgImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop" />
//             <ViewAllCard />
//           </div>

//           {/* Section 2: Mood Playlist */}
//           <SectionHeader title="Mood" highlightedTitle="Playlist" hasFilter />
//           <div className="grid grid-cols-6 gap-4">
//             <PlaylistCard title="Sad Playlist" subtitle="Sad Songs" image="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop" />
//             <PlaylistCard title="Chill Playlist" subtitle="Chill Songs" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop" />
//             <PlaylistCard title="Workout Playlist" subtitle="Workout Songs" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop" />
//             <PlaylistCard title="Love Playlist" subtitle="Love Songs" image="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&auto=format&fit=crop" />
//             <PlaylistCard title="Happy Playlist" subtitle="Happy Songs" image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop" />
//             <ViewAllCard />
//           </div>

//           {/* Section 3: Popular Artists */}
//           <SectionHeader title="Popular" highlightedTitle="Artists" hasFilter />
//           <div className="grid grid-cols-7 gap-4 items-start">
//             <ArtistCard name="Eminem" image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop" />
//             <ArtistCard name="The Weeknd" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop" />
//             <ArtistCard name="Adele" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop" />
//             <ArtistCard name="Lana Del Rey" image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop" />
//             <ArtistCard name="Harry Styles" image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop" />
//             <ArtistCard name="Billie Eilish" image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop" />
//             <ViewAllCard isCircle />
//           </div>

//           {/* Section 4: New Release Songs */}
//           <SectionHeader title="New Release" highlightedTitle="Songs" hasFilter />
//           <div className="relative group">
//             <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <div className="grid grid-cols-5 gap-4">
//               <SongCard title="Time" artist="Lucid" plays="4.2k" image="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop" />
//               <SongCard title="112" artist="Junk" plays="2.8k" image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop" />
//               <SongCard title="We Don't Care" artist="Alan Walker & K-391" plays="12.4k" image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop" />
//               <SongCard title="Who I Am" artist="Alan Walker & Tungevaag" plays="8.9k" image="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop" />
//               <SongCard title="Babre" artist="A28-Music" plays="1.1k" image="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop" />
//             </div>
//             <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
//               <ChevronRight size={20} />
//             </button>
//           </div>

//           {/* Section 5: Top Albums */}
//           <SectionHeader title="Top" highlightedTitle="Albums" hasFilter />
//           <div className="relative group">
//             <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
//               <ChevronLeft size={20} />
//             </button>
//             <div className="grid grid-cols-5 gap-4">
//               <SongCard title="Vultures 1" artist="Kanye West" plays="18.1k" image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop" />
//               <SongCard title="Saviors" artist="Green Day" plays="6.3k" image="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&auto=format&fit=crop" />
//               <SongCard title="Loss of Life" artist="MGMT" plays="4.5k" image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop" />
//               <SongCard title="All Quiet on the..." artist="The Black Keys" plays="9.0k" image="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop" />
//               <SongCard title="Little Rope" artist="Sleater-Kinney" plays="3.2k" image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop" />
//             </div>
//             <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="mt-16 bg-surface border-t border-border px-12 py-12">
//           <div className="grid grid-cols-5 gap-8 items-start">
//             {/* About Info */}
//             <div className="col-span-2 space-y-4">
//               <h3 className="text-xl font-bold text-text">About</h3>
//               <p className="text-sm text-text-secondary leading-relaxed max-w-md">
//                 Melodies is a website that has been created for over <span className="text-primary font-semibold">5 years</span> now and it is one of the most famous music player websites in the world. In this website you can listen and download songs for free, also if you want no limitation you can buy our <a href="#premium" className="text-primary underline font-medium hover:text-primary-hover">premium pass</a>.
//               </p>
//             </div>

//             {/* Navigation Columns */}
//             <div className="space-y-3">
//               <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">Melodies</h4>
//               <ul className="space-y-2 text-sm text-text-secondary">
//                 <li><a href="#" className="hover:text-primary transition-colors">Songs</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Radio</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Podcast</a></li>
//               </ul>
//             </div>

//             <div className="space-y-3">
//               <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">Access</h4>
//               <ul className="space-y-2 text-sm text-text-secondary">
//                 <li><a href="#" className="hover:text-primary transition-colors">Explore</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Artists</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Playlist</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Albums</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Trending</a></li>
//               </ul>
//             </div>

//             <div className="space-y-3">
//               <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">Contact</h4>
//               <ul className="space-y-2 text-sm text-text-secondary">
//                 <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Policy</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Social Media</a></li>
//                 <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
//               </ul>
//             </div>
//           </div>

//           {/* Footer Bottom Bar */}
//           <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-primary">Melodies</h2>
//             <div className="flex items-center gap-4 text-text-muted">
//               <a href="#" className="p-2 hover:text-primary transition-colors"><Globe size={18} /></a>
//               <a href="#" className="p-2 hover:text-primary transition-colors"><Camera size={18} /></a>
//               <a href="#" className="p-2 hover:text-primary transition-colors"><Camera size={18} /></a>
//               <a href="#" className="p-2 hover:text-primary transition-colors"><Phone size={18} /></a>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// /* Helper Sub-Components */

// function NavItem({ icon, label, active = false, textSecondary = false }) {
//   return (
//     <button
//       className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
//         active
//           ? 'bg-primary text-white shadow-md shadow-primary/30'
//           : textSecondary
//           ? 'text-secondary hover:bg-card hover:text-secondary-hover'
//           : 'text-text-secondary hover:bg-card hover:text-text'
//       }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );
// }

// function SectionHeader({ title, highlightedTitle, hasFilter = false }) {
//   return (
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-xl font-bold text-text">
//         {title} <span className="text-primary">{highlightedTitle}</span>
//       </h2>
//       {hasFilter && (
//         <button className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text transition-colors">
//           Filter Sort
//           <ChevronDown size={14} />
//         </button>
//       )}
//     </div>
//   );
// }

// function GenreCard({ title, bgImage }) {
//   return (
//     <div className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/50 transition-all">
//       <img src={bgImage} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
//         <span className="font-bold text-sm text-white drop-shadow-md">{title}</span>
//       </div>
//     </div>
//   );
// }

// function PlaylistCard({ title, subtitle, image }) {
//   return (
//     <div className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/50 transition-all">
//       <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
//         <span className="font-bold text-xs text-white drop-shadow-md">{subtitle}</span>
//         <span className="text-[10px] text-text-muted">{title}</span>
//       </div>
//     </div>
//   );
// }

// function ArtistCard({ name, image }) {
//   return (
//     <div className="flex flex-col items-center group cursor-pointer">
//       <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all mb-2">
//         <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//       </div>
//       <span className="text-xs font-semibold text-text text-center group-hover:text-primary transition-colors">{name}</span>
//     </div>
//   );
// }

// function SongCard({ title, artist, plays, image }) {
//   return (
//     <div className="bg-card p-3 rounded-2xl border border-border/50 hover:border-primary/40 transition-all group cursor-pointer">
//       <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
//         <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//           <PlayCircle className="text-primary fill-primary/30" size={36} />
//         </div>
//       </div>
//       <h3 className="text-sm font-semibold text-text truncate">{title}</h3>
//       <div className="flex items-center justify-between text-xs text-text-muted mt-1">
//         <span className="truncate">{artist}</span>
//         <span className="text-[10px]">{plays}</span>
//       </div>
//     </div>
//   );
// }

// function ViewAllCard({ isCircle = false }) {
//   return (
//     <div
//       className={`flex flex-col items-center justify-center bg-card border border-border/60 hover:border-primary/50 text-text-muted hover:text-primary cursor-pointer transition-all group ${
//         isCircle ? 'w-20 h-20 rounded-full self-start' : 'h-full min-h-[112px] rounded-2xl'
//       }`}
//     >
//       <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary flex items-center justify-center mb-1">
//         <ChevronRight size={16} />
//       </div>
//       <span className="text-[11px] font-semibold">View All</span>
//     </div>
//   );
// }
import {
  PlayCircle,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Camera,
  Phone,
  Globe,
} from "lucide-react";


export default function DiscoverPage() {
  return (
    <div className="flex min-h-screen bg-background text-text font-sans selection:bg-primary selection:text-white">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navigation */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-20">
          {/* Search Bar */}
          <div className="relative w-96">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
            />

            <input
              type="text"
              placeholder="Search for Music, Artists..."
              className="w-full bg-card border border-border/60 rounded-full py-2 pl-10 pr-4 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-8 text-sm font-medium">
            <a
              href="#about"
              className="hover:text-primary transition-colors"
            >
              About Us
            </a>

            <a
              href="#upload"
              className="hover:text-primary transition-colors"
            >
              Upload
            </a>

            <a
              href="#premium"
              className="hover:text-primary transition-colors"
            >
              Premium
            </a>

            <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
              Sign Up / Login
            </button>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="p-8 space-y-12 flex-1">
          {/* Section 1: Music Genres */}
          <SectionHeader title="Music" highlightedTitle="Genres" />

          <div className="grid grid-cols-5 gap-4">
            <GenreCard
              title="Pop Tracks"
              bgImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop"
            />

            <GenreCard
              title="Rap Tracks"
              bgImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop"
            />

            <GenreCard
              title="Rock Tracks"
              bgImage="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop"
            />

            <GenreCard
              title="Classic Tracks"
              bgImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop"
            />

            <ViewAllCard />
          </div>

          {/* Section 2: Mood Playlist */}
          <SectionHeader
            title="Mood"
            highlightedTitle="Playlist"
            hasFilter
          />

          <div className="grid grid-cols-6 gap-4">
            <PlaylistCard
              title="Sad Playlist"
              subtitle="Sad Songs"
              image="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop"
            />

            <PlaylistCard
              title="Chill Playlist"
              subtitle="Chill Songs"
              image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop"
            />

            <PlaylistCard
              title="Workout Playlist"
              subtitle="Workout Songs"
              image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop"
            />

            <PlaylistCard
              title="Love Playlist"
              subtitle="Love Songs"
              image="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&auto=format&fit=crop"
            />

            <PlaylistCard
              title="Happy Playlist"
              subtitle="Happy Songs"
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
            />

            <ViewAllCard />
          </div>

          {/* Section 3: Popular Artists */}
          <SectionHeader
            title="Popular"
            highlightedTitle="Artists"
            hasFilter
          />

          <div className="grid grid-cols-7 gap-4 items-start">
            <ArtistCard
              name="Eminem"
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
            />

            <ArtistCard
              name="The Weeknd"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
            />

            <ArtistCard
              name="Adele"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
            />

            <ArtistCard
              name="Lana Del Rey"
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop"
            />

            <ArtistCard
              name="Harry Styles"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
            />

            <ArtistCard
              name="Billie Eilish"
              image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop"
            />

            <ViewAllCard isCircle />
          </div>

          {/* Section 4: New Release Songs */}
          <SectionHeader
            title="New Release"
            highlightedTitle="Songs"
            hasFilter
          />

          <div className="relative group">
            <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
              <ChevronLeft size={20} />
            </button>

            <div className="grid grid-cols-5 gap-4">
              <SongCard
                title="Time"
                artist="Lucid"
                plays="4.2k"
                image="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="112"
                artist="Junk"
                plays="2.8k"
                image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="We Don't Care"
                artist="Alan Walker & K-391"
                plays="12.4k"
                image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="Who I Am"
                artist="Alan Walker & Tungevaag"
                plays="8.9k"
                image="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="Babre"
                artist="A28-Music"
                plays="1.1k"
                image="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop"
              />
            </div>

            <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Section 5: Top Albums */}
          <SectionHeader
            title="Top"
            highlightedTitle="Albums"
            hasFilter
          />

          <div className="relative group">
            <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
              <ChevronLeft size={20} />
            </button>

            <div className="grid grid-cols-5 gap-4">
              <SongCard
                title="Vultures 1"
                artist="Kanye West"
                plays="18.1k"
                image="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="Saviors"
                artist="Green Day"
                plays="6.3k"
                image="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="Loss of Life"
                artist="MGMT"
                plays="4.5k"
                image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="All Quiet on the..."
                artist="The Black Keys"
                plays="9.0k"
                image="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop"
              />

              <SongCard
                title="Little Rope"
                artist="Sleater-Kinney"
                plays="3.2k"
                image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop"
              />
            </div>

            <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-card/80 border border-border text-text hover:bg-surface transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 bg-surface border-t border-border px-12 py-12">
          <div className="grid grid-cols-5 gap-8 items-start">
            {/* About Info */}
            <div className="col-span-2 space-y-4">
              <h3 className="text-xl font-bold text-text">
                About
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                Melodies is a website that has been created for over{" "}
                <span className="text-primary font-semibold">
                  5 years
                </span>{" "}
                now and it is one of the most famous music player
                websites in the world. In this website you can listen
                and download songs for free, also if you want no
                limitation you can buy our{" "}
                <a
                  href="#premium"
                  className="text-primary underline font-medium hover:text-primary-hover"
                >
                  premium pass
                </a>
                .
              </p>
            </div>

            {/* Navigation Columns */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">
                Melodies
              </h4>

              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Songs
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Radio
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Podcast
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">
                Access
              </h4>

              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Explore
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Artists
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Playlist
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Albums
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Trending
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-text border-b border-primary/40 pb-1 inline-block">
                Contact
              </h4>

              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Social Media
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-border/50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">
              Melodies
            </h2>

            <div className="flex items-center gap-4 text-text-muted">
              <a
                href="#"
                className="p-2 hover:text-primary transition-colors"
              >
                <Globe size={18} />
              </a>

              <a
                href="#"
                className="p-2 hover:text-primary transition-colors"
              >
                <Camera size={18} />
              </a>

              <a
                href="#"
                className="p-2 hover:text-primary transition-colors"
              >
                <Camera size={18} />
              </a>

              <a
                href="#"
                className="p-2 hover:text-primary transition-colors"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper Components                                                          */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  title,
  highlightedTitle,
  hasFilter = false,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-text">
        {title}{" "}
        <span className="text-primary">
          {highlightedTitle}
        </span>
      </h2>

      {hasFilter && (
        <button className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-text transition-colors">
          Filter Sort
          <ChevronDown size={14} />
        </button>
      )}
    </div>
  );
}

function GenreCard({ title, bgImage }) {
  return (
    <div className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/50 transition-all">
      <img
        src={bgImage}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
        <span className="font-bold text-sm text-white drop-shadow-md">
          {title}
        </span>
      </div>
    </div>
  );
}

function PlaylistCard({ title, subtitle, image }) {
  return (
    <div className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/50 transition-all">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3">
        <span className="font-bold text-xs text-white drop-shadow-md">
          {subtitle}
        </span>

        <span className="text-[10px] text-text-muted">
          {title}
        </span>
      </div>
    </div>
  );
}

function ArtistCard({ name, image }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all mb-2">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <span className="text-xs font-semibold text-text text-center group-hover:text-primary transition-colors">
        {name}
      </span>
    </div>
  );
}

function SongCard({ title, artist, plays, image }) {
  return (
    <div className="bg-card p-3 rounded-2xl border border-border/50 hover:border-primary/40 transition-all group cursor-pointer">
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <PlayCircle
            className="text-primary fill-primary/30"
            size={36}
          />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-text truncate">
        {title}
      </h3>

      <div className="flex items-center justify-between text-xs text-text-muted mt-1">
        <span className="truncate">{artist}</span>
        <span className="text-[10px]">{plays}</span>
      </div>
    </div>
  );
}

function ViewAllCard({ isCircle = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-card border border-border/60 hover:border-primary/50 text-text-muted hover:text-primary cursor-pointer transition-all group ${
        isCircle
          ? "w-20 h-20 rounded-full self-start"
          : "h-full min-h-[112px] rounded-2xl"
      }`}
    >
      <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary flex items-center justify-center mb-1">
        <ChevronRight size={16} />
      </div>

      <span className="text-[11px] font-semibold">
        View All
      </span>
    </div>
  );
}
