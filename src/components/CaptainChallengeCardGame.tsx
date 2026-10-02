import React, { useState } from 'react';
import { CaptainCardStatement, StudentProfile } from '../types';
import { CAPTAIN_CARD_STATEMENTS } from '../data/quizData';
import { MascotKienSang } from './MascotKienSang';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  HelpCircle,
  Trophy,
  ArrowRight,
  Shuffle,
  Code2,
  Play,
  Check,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import { playTingTingSound, playHintSound, playFanfareSound, playClickSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CaptainChallengeCardGameProps {
  profile: StudentProfile;
  onRewardCoins: (amount: number, questionId: string) => void;
}

export const CaptainChallengeCardGame: React.FC<CaptainChallengeCardGameProps> = ({
  profile,
  onRewardCoins,
}) => {
  // Statements list state (supports shuffling)
  const [statements, setStatements] = useState<CaptainCardStatement[]>([...CAPTAIN_CARD_STATEMENTS]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'play' | 'generator'>('play');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  const currentStatement = statements[currentIndex];

  // Handle user choosing TRUE or FALSE
  const handleAnswer = (choice: boolean) => {
    if (isFlipped || !currentStatement) return;
    playClickSound();
    setUserChoice(choice);
    setIsFlipped(true);

    const isCorrect = choice === currentStatement.is_correct;
    if (isCorrect) {
      playTingTingSound();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);

      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#00E5FF', '#FFD700', '#10B981']
      });

      // Reward 5 coins for each correct statement if not previously earned in this round
      if (!answeredMap[currentIndex]) {
        onRewardCoins(5, `card-statement-${currentIndex}`);
        setAnsweredMap(prev => ({ ...prev, [currentIndex]: true }));
      }
    } else {
      playHintSound();
      setStreak(0);
    }
  };

  const handleNextCard = () => {
    playClickSound();
    if (currentIndex < statements.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserChoice(null);
      setIsFlipped(false);
    } else {
      setIsGameOver(true);
      playFanfareSound();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    playClickSound();
    setCurrentIndex(0);
    setUserChoice(null);
    setIsFlipped(false);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
  };

  const handleShuffle = () => {
    playClickSound();
    const shuffled = [...statements].sort(() => Math.random() - 0.5);
    setStatements(shuffled);
    setCurrentIndex(0);
    setUserChoice(null);
    setIsFlipped(false);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
  };

  const jsonString = JSON.stringify(statements, null, 2);

  const handleCopyJson = () => {
    playClickSound();
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    playClickSound();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'thuyen_truong_tro_tai_10_nhan_dinh_dia_11.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-6">
      {/* Sub navigation between Play and Question Generator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-2 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { playClickSound(); setActiveSubTab('play'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'play'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Chơi Lật Thẻ (10 Nhận Định)</span>
          </button>

          <button
            type="button"
            onClick={() => { playClickSound(); setActiveSubTab('generator'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSubTab === 'generator'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Bộ Phát Câu Hỏi & JSON Viewer</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            title="Xáo trộn thứ tự nhận định"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-cyan-300 font-medium transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xáo trộn câu</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'play' ? (
        <div className="space-y-6">
          {/* Header Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 border border-cyan-500/20 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-semibold">Thẻ hiện tại</div>
                <div className="text-lg font-black text-cyan-300">
                  {currentIndex + 1} <span className="text-xs text-slate-500">/ {statements.length}</span>
                </div>
              </div>
              <Layers className="w-6 h-6 text-cyan-400/60" />
            </div>

            <div className="bg-slate-900/80 border border-emerald-500/20 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-semibold">Điểm đúng</div>
                <div className="text-lg font-black text-emerald-400">
                  {score} <span className="text-xs text-slate-500">/ {statements.length}</span>
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-400/60" />
            </div>

            <div className="bg-slate-900/80 border border-amber-500/20 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-semibold">Chuỗi liên tiếp</div>
                <div className="text-lg font-black text-amber-400 flex items-center gap-1">
                  <span>{streak}</span>
                  {streak >= 3 && <Flame className="w-4 h-4 text-orange-500 animate-bounce" />}
                </div>
              </div>
              <Flame className="w-6 h-6 text-amber-400/60" />
            </div>

            <div className="bg-slate-900/80 border border-yellow-500/20 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-semibold">Thưởng mỗi câu</div>
                <div className="text-lg font-black text-yellow-400">
                  +5 Xu 🪙
                </div>
              </div>
              <Award className="w-6 h-6 text-yellow-400/60" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / statements.length) * 100}%` }}
            />
          </div>

          {/* Main Card Arena */}
          {!isGameOver && currentStatement ? (
            <div className="relative perspective-1000 max-w-2xl mx-auto">
              <div
                className={`relative w-full min-h-[380px] sm:min-h-[400px] transition-all duration-700 transform-style-3d rounded-3xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD (Unflipped: Question Statement) */}
                <div className={`absolute inset-0 backface-hidden bg-gradient-to-br from-[#0B2545] via-[#13315C] to-[#0A192F] border-2 border-cyan-400/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-cyan-950/50 ${
                  isFlipped ? 'pointer-events-none' : ''
                }`}>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Thử Thách Thuyền Trưởng • Thẻ #{currentIndex + 1}</span>
                    </div>

                    <div className="text-xs text-slate-400 font-semibold">
                      Chuyên đề Địa lí 11
                    </div>
                  </div>

                  {/* Card Center: Mascot & Short Statement */}
                  <div className="my-auto py-4 text-center space-y-4">
                    <div className="flex justify-center">
                      <MascotKienSang size={70} expression="captain" showBadge badgeText="Đúng hay Sai?" />
                    </div>

                    <div className="px-3">
                      <span className="text-xs uppercase tracking-wider text-cyan-400/80 font-bold block mb-1">
                        Nhận định địa lý:
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-white leading-relaxed tracking-tight">
                        "{currentStatement.statement}"
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom: 2 Action Buttons (ĐÚNG vs SAI) */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <p className="text-xs text-center text-cyan-200/70 font-medium">
                      Nhận định trên là <strong className="text-emerald-400">ĐÚNG</strong> hay <strong className="text-red-400">SAI</strong>? Hãy lật thẻ!
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleAnswer(true)}
                        className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                      >
                        <CheckCircle2 className="w-5 h-5 text-slate-950" />
                        <span>ĐÚNG</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAnswer(false)}
                        className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black text-sm sm:text-base shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                      >
                        <XCircle className="w-5 h-5 text-white" />
                        <span>SAI</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* BACK OF CARD (Flipped: Explanation & Result) */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#0F2847] via-[#173863] to-[#0A1D36] border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl ${
                  userChoice === currentStatement.is_correct
                    ? 'border-emerald-400/80 shadow-emerald-950/40'
                    : 'border-rose-400/80 shadow-rose-950/40'
                }`}>
                  {/* Result Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      {userChoice === currentStatement.is_correct ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          CHÍNH XÁC (+5 Xu)
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-black flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-400" />
                          CHƯA CHÍNH XÁC
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-300 font-bold">
                      Đáp án: <span className={currentStatement.is_correct ? 'text-emerald-400' : 'text-rose-400'}>
                        {currentStatement.is_correct ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </div>
                  </div>

                  {/* Result Body with Mascot */}
                  <div className="my-auto py-4 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <MascotKienSang
                        size={64}
                        expression={userChoice === currentStatement.is_correct ? 'celebrate' : 'thinking'}
                      />
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                        Giải thích ngắn gọn:
                      </div>
                      <p className="text-sm sm:text-base text-white font-medium leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-white/10">
                        {currentStatement.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Next Step Action */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="text-xs text-slate-400 italic">
                      {currentIndex < statements.length - 1
                        ? `Còn ${statements.length - 1 - currentIndex} thẻ thử thách phía trước`
                        : 'Đây là thẻ cuối cùng của lượt chơi!'}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextCard}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all transform active:scale-95"
                    >
                      <span>{currentIndex < statements.length - 1 ? 'Thẻ tiếp theo' : 'Xem kết quả tổng kết'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Game Over Screen */
            <div className="bg-gradient-to-b from-[#0A2540] to-[#081B30] border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-yellow-400/20 border-2 border-yellow-400 mx-auto flex items-center justify-center text-4xl mb-4 shadow-lg shadow-yellow-500/20">
                🏆
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Hoàn Thành Thử Thách!
              </h3>
              <p className="text-sm text-cyan-200 mt-2">
                Bạn đã trả lời đúng <strong className="text-yellow-400 text-lg">{score} / {statements.length}</strong> nhận định Địa lý 11!
              </p>

              <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-white/10 inline-flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-400">Tỷ lệ chính xác</div>
                  <div className="text-xl font-black text-emerald-400">{Math.round((score / statements.length) * 100)}%</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-xs text-slate-400">Xu nhận được</div>
                  <div className="text-xl font-black text-yellow-400">+{score * 5} 🪙</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2 hover:opacity-90 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại lượt mới</span>
                </button>

                <button
                  type="button"
                  onClick={handleShuffle}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center gap-2 border border-white/10"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Xáo trộn ngẫu nhiên</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Question Generator & JSON Inspector Tab */
        <div className="bg-gradient-to-b from-[#0A2540] to-[#081B30] border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-1">
                <Code2 className="w-3.5 h-3.5" /> Bộ phát câu hỏi chuẩn JSON
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Danh Sách 10 Nhận Định Chuyên Đề Địa Lí 11
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Gồm 5 câu ĐÚNG và 5 câu SAI được xáo trộn, mỗi nhận định dưới 20 từ, giải thích 1 câu ngắn gọn.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyJson}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép JSON</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadJson}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Tải .JSON</span>
              </button>
            </div>
          </div>

          {/* Cards Table / List view */}
          <div className="space-y-3">
            {statements.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  item.is_correct
                    ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                        #{idx + 1}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        item.is_correct ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                      }`}>
                        {item.is_correct ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-white pl-8 sm:pl-0">
                      "{item.statement}"
                    </div>

                    <div className="text-xs text-slate-300 pl-8 sm:pl-0">
                      <span className="text-cyan-400 font-semibold">Giải thích: </span>
                      {item.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Raw JSON Code Block */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Định dạng mã JSON thô:</span>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-white/10 text-cyan-300 text-xs font-mono overflow-x-auto max-h-72 leading-relaxed">
              {jsonString}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
export default CaptainChallengeCardGame;
