import React, { useEffect } from 'react';
import { MascotKienSang } from './MascotKienSang';
import { Trophy, Award, Coins, Sparkles, X, ArrowRight, Flame } from 'lucide-react';
import { playClickSound, playFireworksSound } from '../utils/audio';
import { triggerFireworksConfetti } from '../utils/confetti';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleText: string;
  message: string;
  earnedCoins?: number;
  newTitle?: string;
  onAction?: () => void;
  actionText?: string;
}

export const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
  titleText,
  message,
  earnedCoins,
  newTitle,
  onAction,
  actionText = 'Tiếp tục học tập'
}) => {
  // Fire celebratory fireworks confetti and explosion audio whenever modal opens
  useEffect(() => {
    if (isOpen) {
      triggerFireworksConfetti();
      playFireworksSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFireAgain = () => {
    playClickSound();
    triggerFireworksConfetti();
    playFireworksSound();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#0A2540] via-[#0D3059] to-[#081B30] border-2 border-yellow-400 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl shadow-yellow-500/25 animate-scaleUp">
        {/* Floating Fireworks & Mascot celebration */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-xl animate-pulse" />
            <MascotKienSang size={96} expression="celebrate" />
          </div>
        </div>

        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 text-xs font-bold mb-2 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-yellow-400 animate-bounce" /> Chúc Mừng Xuất Sắc!
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            {titleText}
          </h3>

          <p className="text-xs sm:text-sm text-cyan-200/90 mt-2 leading-relaxed">
            {message}
          </p>

          {/* Reward Badges */}
          <div className="my-5 flex flex-wrap items-center justify-center gap-3">
            {earnedCoins !== undefined && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 shadow-md">
                <span className="text-xl animate-bounce">🪙</span>
                <div className="text-left">
                  <div className="text-[10px] text-yellow-200/70 font-semibold uppercase">Thưởng thêm</div>
                  <div className="text-base font-black">+{earnedCoins} Xu</div>
                </div>
              </div>
            )}

            {newTitle && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-md">
                <Award className="w-5 h-5 text-yellow-400 animate-pulse" />
                <div className="text-left">
                  <div className="text-[10px] text-cyan-200/80 font-semibold uppercase">Danh hiệu mới</div>
                  <div className="text-sm font-black text-white">{newTitle}</div>
                </div>
              </div>
            )}
          </div>

          {/* Fireworks Re-fire Button for extra celebration fun */}
          <div className="mb-4">
            <button
              onClick={handleFireAgain}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/25 via-yellow-500/25 to-cyan-500/25 hover:from-red-500/40 hover:to-cyan-500/40 border border-yellow-400/40 text-yellow-200 hover:text-white text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              title="Bắn pháo hoa rực rỡ và nghe tiếng nổ đùng đoàng!"
            >
              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
              <span>Bắn pháo hoa chúc mừng 🎆</span>
            </button>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              playClickSound();
              if (onAction) onAction();
              onClose();
            }}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-yellow-500/25 flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
