import React, { useState } from 'react';
import {
  MoreHorizontal,
  Maximize2,
  Play,
  ShoppingBag,
  Download,
  Heart,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  ThumbsUp,
  Volume2,
  Shuffle,
  SkipBack,
  Pause,
  SkipForward,
  Repeat,
  List,
  Laptop2
} from 'lucide-react';

export default function SongPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricsOpen, setLyricsOpen] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#1c0205] text-white flex flex-col font-sans pb-28">
      {/* Top Header Bar */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-red-900/30 bg-[#140103]/80 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-lg font-bold tracking-wide text-white">Eminem</h1>
        <div className="flex items-center gap-4 text-text-muted">
          <button className="hover:text-white transition-colors p-1">
            <MoreHorizontal size={20} />
          </button>
          <button className="hover:text-white transition-colors p-1">
            <Maximize2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8 flex-1">
        {/* Track Banner Header Card */}
        <div className="flex flex-col md:flex-row gap-8 bg-[#2a060a]/60 border border-red-900/30 p-6 rounded-2xl shadow-2xl backdrop-blur-sm">
          {/* Album Cover Art */}
          <div className="w-full md:w-64 h-64 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-red-900/40 relative group">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop"
              alt="Superman - Eminem"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Track Details & Actions */}
          <div className="flex flex-col justify-between py-2 flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Superman</h1>
              <p className="text-sm font-medium text-text-muted">Eminem</p>
              <p className="text-xs font-semibold text-primary pt-1">Price: 500$</p>
              <p className="text-xs text-text-secondary max-w-2xl leading-relaxed pt-2">
                Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a ...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-0.5" />}
              </button>
              
              <button className="flex items-center gap-2 bg-[#3d090f] hover:bg-primary border border-red-900/50 px-5 py-2 rounded-lg text-xs font-semibold transition-all">
                <ShoppingBag size={14} />
                Buy
              </button>
              
              <button className="flex items-center gap-2 bg-[#3d090f] hover:bg-surface border border-red-900/50 px-5 py-2 rounded-lg text-xs font-semibold transition-all">
                <Download size={14} />
                Download
              </button>
              
              <button className="flex items-center gap-2 bg-[#3d090f] hover:bg-surface border border-red-900/50 px-5 py-2 rounded-lg text-xs font-semibold transition-all">
                <Heart size={14} />
                Donate
              </button>
            </div>
          </div>
        </div>

        {/* Lyrics & Comments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lyrics Panel */}
          <section className="lg:col-span-6 bg-[#2a060a]/40 border border-red-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-red-900/30 pb-4 mb-4">
              <h2 className="text-lg font-bold text-white">Lyrics</h2>
              <button onClick={() => setLyricsOpen(!lyricsOpen)} className="text-text-muted hover:text-white transition-colors">
                {lyricsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {lyricsOpen && (
              <div className="space-y-4 text-xs leading-relaxed text-text-secondary font-medium tracking-wide max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <p>You high baby?<br />Yeah.<br />Yeah?<br />Talk to me.</p>
                <p>You want me to tell you something? I know what you want to hear.<br />I know you want me baby; I think I want you too.<br />I think I love you baby.</p>
                <p>I think I love you too. I'm here to save you girl, come be in shady's world.<br />I want to grow together, let's let our love unfold.<br />You know you want me baby, you know I want you too.<br />They call me superman; I'm here to rescue you.<br />I want to save you girl, come be in shady's world.</p>
                <p>Oh boy you drive me crazy.</p>
                <p>Bitch you make me hurt.</p>
                <p>They call me superman, leap tall hoes in a single bound<br />got no ring on this finger now.<br />I'll never let another chick bring me down,<br />in a relationship save it bitch, baby-sit?<br />You make me sick, superman ain't saving shit,<br />girl you can jump on shady's dick.<br />Straight from the hip, cut to the chase,<br />I tell the motherfuckin slut to her face.<br />Play no games, say no names,<br />ever since I broke over what's her face.</p>
              </div>
            )}
          </section>

          {/* Comments Panel */}
          <section className="lg:col-span-6 bg-[#2a060a]/40 border border-red-900/30 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between border-b border-red-900/30 pb-4">
              <h2 className="text-lg font-bold text-white">
                Comments <span className="text-xs font-normal text-text-muted">(5)</span>
              </h2>
              <button onClick={() => setCommentsOpen(!commentsOpen)} className="text-text-muted hover:text-white transition-colors">
                {commentsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {commentsOpen && (
              <div className="space-y-6">
                {/* Input Box */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Write your own Comment"
                    className="w-full bg-[#3a0a10]/60 border border-red-900/40 rounded-full py-2.5 px-5 text-xs text-white placeholder-text-muted focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                {/* Comment Thread List */}
                <div className="space-y-5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                  <CommentItem username="User name" time="2d ago" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a ..." />

                  <CommentItem username="User name" time="2d ago" likes={4} comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..." hasReplies repliesCount={2}>
                    <CommentItem isReply username="User name" time="2d ago" comment="@User name Lorem Ipsum is simply dummy text of the printing and typesetting" />
                    <CommentItem isReply username="User name" time="2d ago" comment="@User name Lorem Ipsum is simply dummy text of the printing and typesetting" />
                  </CommentItem>

                  <CommentItem username="User name" time="2d ago" comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..." hasReplies repliesCount={1} hideReplies />
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Sticky Bottom Music Player Bar */}
      <footer className="fixed bottom-0 inset-x-0 bg-[#0d0103]/95 border-t border-red-900/40 px-6 py-3 flex items-center justify-between z-50 backdrop-blur-lg">
        {/* Track Info (Left) */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop"
            alt="Track Cover"
            className="w-12 h-12 rounded-lg object-cover border border-red-900/40 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">Superman</h4>
            <p className="text-[10px] text-text-muted truncate">Eminem</p>
          </div>
          <button className="text-text-muted hover:text-white transition-colors ml-2">
            <Heart size={14} />
          </button>
        </div>

        {/* Controls & Waveform Progress Bar (Center) */}
        <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-xl">
          <div className="flex items-center gap-5 text-text-muted">
            <button className="hover:text-white transition-colors"><Shuffle size={14} /></button>
            <button className="hover:text-white transition-colors"><SkipBack size={16} /></button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause size={14} fill="black" /> : <Play size={14} fill="black" className="ml-0.5" />}
            </button>
            <button className="hover:text-white transition-colors"><SkipForward size={16} /></button>
            <button className="hover:text-white transition-colors"><Repeat size={14} /></button>
          </div>

          <div className="flex items-center gap-3 w-full text-[10px] text-text-muted font-mono">
            <span>2:20</span>
            {/* Simulated Audio Waveform Bar */}
            <div className="flex-1 flex items-center justify-center gap-0.5 h-6">
              {[40, 60, 20, 80, 100, 50, 70, 90, 30, 60, 80, 40, 20, 90, 100, 70, 50, 30, 80, 60, 40, 20, 70, 90, 50, 30, 60].map((height, i) => (
                <span
                  key={i}
                  style={{ height: `${height}%` }}
                  className={`w-1 rounded-full ${i < 12 ? 'bg-primary' : 'bg-red-900/40'}`}
                />
              ))}
            </div>
            <span>5:01</span>
          </div>
        </div>

        {/* Volume & Page Actions (Right) */}
        <div className="flex items-center justify-end gap-3 w-1/4 text-text-muted">
          <button className="hover:text-white transition-colors"><List size={16} /></button>
          <button className="hover:text-white transition-colors"><Laptop2 size={16} /></button>
          <div className="flex items-center gap-2">
            <Volume2 size={16} />
            <input type="range" className="w-16 h-1 bg-red-900/40 accent-primary rounded-lg cursor-pointer" />
          </div>
          <button className="hover:text-white transition-colors"><Maximize2 size={14} /></button>
        </div>
      </footer>
    </div>
  );
}

/* Helper Component: Comment Thread */
function CommentItem({ username, time, comment, likes, hasReplies, repliesCount, hideReplies, isReply = false, children }) {
  return (
    <div className={`space-y-3 ${isReply ? 'ml-8 pt-2' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Avatar Placeholder */}
        <div className="w-7 h-7 rounded-full bg-red-900/50 border border-red-700/40 shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
          {username.charAt(0)}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">{username}</span>
              <span className="text-[10px] text-text-muted">{time}</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted text-[11px]">
              {likes !== undefined && (
                <button className="flex items-center gap-1 hover:text-white">
                  <ThumbsUp size={12} />
                  <span>{likes}</span>
                </button>
              )}
              <button className="hover:text-white">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">{comment}</p>

          <button className="text-[11px] font-medium text-text-muted hover:text-primary transition-colors pt-0.5">
            Reply
          </button>
        </div>
      </div>

      {hasReplies && (
        <div className="pl-10">
          <button className="text-[11px] font-semibold text-text-muted hover:text-white transition-colors">
            {hideReplies ? `View Replies (${repliesCount})` : `Hide Replies (${repliesCount})`}
          </button>
        </div>
      )}

      {!hideReplies && children}
    </div>
  );
}