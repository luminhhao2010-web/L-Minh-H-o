import React, { useState, useEffect, useRef } from 'react';
import { StudentProfile } from '../types';
import { MascotKienSang } from './MascotKienSang';
import { 
  Compass, 
  MapPin, 
  HelpCircle, 
  GitFork, 
  Bot, 
  Volume2, 
  VolumeX, 
  Award, 
  Sparkles, 
  UserPen,
  Ship,
  ShieldCheck
} from 'lucide-react';
import { isSoundMuted, setSoundMuted, playClickSound } from '../utils/audio';

interface HeaderProps {
  profile: StudentProfile;
  activeTab: 'map' | 'quiz' | 'flowchart' | 'cooperation' | 'chat';
  onTabChange: (tab: 'map' | 'quiz' | 'flowchart' | 'cooperation' | 'chat') => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  onTabChange,
  onOpenProfile
}) => {
  const [muted, setMutedState] = useState(isSoundMuted());
  const [coinAnimating, setCoinAnimating] = useState(false);
  const [gainedCoins, setGainedCoins] = useState<number | null>(null);
  const prevCoinsRef = useRef(profile.coins);

  useEffect(() => {
    const diff = profile.coins - prevCoinsRef.current;
    if (diff > 0) {
      setGainedCoins(diff);
      setCoinAnimating(true);
      const timer = setTimeout(() => {
        setCoinAnimating(false);
        setGainedCoins(null);
      }, 1200);
      prevCoinsRef.current = profile.coins;
      return () => clearTimeout(timer);
    }
    prevCoinsRef.current = profile.coins;
  }, [profile.coins]);

  const toggleSound = () => {
    const nextState = !muted;
    setSoundMuted(nextState);
    setMutedState(nextState);
    if (!nextState) playClickSound();
  };

  const navItems = [
    { id: 'cooperation', label: 'Hợp tác Hòa bình Biển Đông', shortLabel: 'Hợp tác Hòa bình', icon: ShieldCheck, badge: 'Chuyên đề 11' },
    { id: 'map', label: 'Bản Đồ Số Biển Đông', shortLabel: 'Bản đồ số', icon: MapPin, badge: 'Leaflet' },
    { id: 'quiz', label: 'Hành Trình Vươn Khơi', shortLabel: 'Game Trắc nghiệm', icon: Ship, badge: '+10 Xu' },
    { id: 'flowchart', label: 'Quy Trình Hợp Tác', shortLabel: 'Sơ đồ pháp lý', icon: GitFork, badge: 'UNCLOS' },
    { id: 'chat', label: 'Trợ Lý AI Kiến Sáng', shortLabel: 'Chatbot AI', icon: Bot, badge: 'Hỏi đáp' },
  ] as const;

  const gradeLevelLabels: Record<string, string> = {
    tieuhoc: 'Tiểu học',
    thcs: 'THCS',
    thpt: 'THPT - Lớp 11'
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0A2540] via-[#004080] to-[#006699] border-b border-cyan-500/20 shadow-xl backdrop-blur-md">
      {/* Top Banner: Student Personalized Ribbon */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Mascot */}
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenProfile}
            className="cursor-pointer group flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/10 transition-all"
            title="Nhấp để xem và chỉnh sửa hồ sơ học sinh"
          >
            <div className="relative">
              <MascotKienSang size={46} expression="waving" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border border-white"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                  {profile.name}
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full font-semibold">
                  {gradeLevelLabels[profile.gradeLevel] || 'Lớp 11'}
                </span>
              </div>
              <div className="text-[11px] text-cyan-200/70 flex items-center gap-2">
                <span>{profile.className} • {profile.school}</span>
                <span className="text-yellow-300 font-medium hidden sm:inline flex items-center gap-1">
                  <Award className="w-3 h-3 text-yellow-400 inline" /> {profile.title}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Gamification HUD (Coins, Progress, Sound, Profile Button) */}
        <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
          {/* Animated Coin Badge with Jiggle & Color Shift */}
          <div className="relative">
            {/* Floating +Xu popup when coins are earned */}
            {coinAnimating && gainedCoins && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-black text-[11px] shadow-lg shadow-yellow-500/50 border border-white animate-coin-float">
                  <span>+{gainedCoins}</span>
                  <span className="text-[10px]">Xu</span>
                  <span>✨</span>
                </span>
              </div>
            )}

            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 select-none ${
                coinAnimating 
                  ? 'bg-gradient-to-r from-amber-400/40 via-yellow-400/50 to-emerald-400/40 border-2 border-yellow-300 shadow-xl shadow-yellow-400/40 ring-4 ring-yellow-400/30 animate-coin-jiggle' 
                  : 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/30 border border-yellow-400/50 shadow-inner shadow-yellow-500/10'
              }`}
              title="Số Xu học tập tích lũy được"
            >
              <span className={`text-lg select-none leading-none transition-transform duration-300 ${
                coinAnimating ? 'scale-125 rotate-12 inline-block' : 'inline-block'
              }`}>
                🪙
              </span>
              <div className="flex flex-col">
                <span className={`text-[10px] uppercase font-semibold leading-none transition-colors duration-300 ${
                  coinAnimating ? 'text-yellow-100 font-bold' : 'text-yellow-200/80'
                }`}>
                  Xu thưởng
                </span>
                <span className={`text-sm sm:text-base font-black tracking-wider leading-tight transition-all duration-300 ${
                  coinAnimating 
                    ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,1)]' 
                    : 'text-yellow-300'
                }`}>
                  {profile.coins}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar pill */}
          <div 
            className="hidden md:flex flex-col gap-1 w-32 lg:w-44 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10"
            title="Tiến độ hoàn thành chuyên đề học tập"
          >
            <div className="flex justify-between text-[11px] font-semibold text-cyan-200">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Tiến độ
              </span>
              <span className="text-cyan-300">{profile.progress}%</span>
            </div>
            <div className="w-full bg-slate-900/60 h-2 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, profile.progress))}%` }}
              />
            </div>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              muted 
                ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white' 
                : 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30'
            }`}
            title={muted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
            aria-label="Chuyển đổi âm thanh"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Profile Edit Trigger */}
          <button
            onClick={() => { playClickSound(); onOpenProfile(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
            title="Xem bảng thành tích và sửa hồ sơ"
          >
            <UserPen className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Hồ sơ</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="bg-[#081F36]/90 border-t border-white/10 px-2 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-start gap-1 sm:gap-2 overflow-x-auto py-1.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  onTabChange(item.id);
                }}
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-300'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.shortLabel}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold tracking-tight ${
                    isActive ? 'bg-slate-900/40 text-yellow-300' : 'bg-white/10 text-cyan-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
