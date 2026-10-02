import React, { useState, useEffect, useRef } from 'react';
import { MascotKienSang } from './MascotKienSang';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  MessageSquare,
  AlertCircle,
  Radio
} from 'lucide-react';
import { 
  speakVietnamese, 
  stopSpeech, 
  createVietnameseSpeechRecognizer, 
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported 
} from '../utils/speech';
import { getAnswerFromKnowledgeBase } from '../data/knowledgeBase';
import { playClickSound, playTingTingSound } from '../utils/audio';

interface VoiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChatLog?: (userText: string, botText: string) => void;
}

const VOICE_SAMPLE_PROMPTS = [
  'Đố tôi 1 nhận định Đúng/Sai về Biển Đông?',
  'Phát câu hỏi Thuyền Trưởng Trổ Tài!',
  'Tên gọi và độ sâu kỷ lục của Biển Đông?',
  '4 Eo biển huyết mạch của Biển Đông là gì?',
  'Khung pháp lý 5 vùng biển theo UNCLOS 1982?',
  'Phán quyết PCA 2016 có ý nghĩa gì với Biển Đông?',
  'Kể về hệ thống Nhà giàn DK1 đi Kiến Sáng?',
  'Châu bản triều Nguyễn ghi gì về Hoàng Sa, Trường Sa?',
  'Hiện tượng nước trồi Ninh Thuận - Bình Thuận là gì?',
  'Kể về Bò biển Dugong và tục thờ Cá Ông?'
];

export const VoiceChatModal: React.FC<VoiceChatModalProps> = ({
  isOpen,
  onClose,
  onSendToChatLog
}) => {
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [lastUserText, setLastUserText] = useState('');
  const [lastBotText, setLastBotText] = useState(
    'Chào bạn! Kiến Sáng đã sẵn sàng đàm thoại giọng nói tiếng Việt rồi nè! Hãy nhấn vào biểu tượng Micro bên dưới và hỏi Kiến Sáng bất cứ điều gì về Biển Đông nhé! 🌊🎙️'
  );
  const [lastReference, setLastReference] = useState<string | undefined>('Chuyên đề Địa lí 11 & Tri thức Biển Đông');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const recognizerRef = useRef<{ start: () => void; stop: () => void; abort: () => void } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Stop anything speaking or listening when closed
      stopSpeech();
      recognizerRef.current?.abort();
      setVoiceState('idle');
      setCurrentTranscript('');
    } else {
      // Welcome speech on open if supported
      if (isSpeechSynthesisSupported() && !isMuted) {
        setVoiceState('speaking');
        speakVietnamese(
          'Chào bạn! Mình là chú Kiến Sáng. Hãy bấm micro để cùng trò chuyện bằng giọng nói tiếng Việt về Biển Đông với mình nhé!',
          () => setVoiceState('speaking'),
          () => setVoiceState('idle')
        );
      }
    }

    return () => {
      stopSpeech();
      recognizerRef.current?.abort();
    };
  }, [isOpen]);

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim()) return;

    setLastUserText(queryText);
    setCurrentTranscript('');
    setVoiceState('thinking');
    setErrorMessage(null);

    let answerText = '';
    let refText = 'SGK Chuyên đề Địa lí 11 Kết nối tri thức';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.answer) {
          answerText = data.answer;
          refText = data.reference || 'Tư liệu Chuyên đề Địa lí 11 & UNCLOS 1982';
        }
      }
    } catch {
      // Fallback to local offline knowledge
    }

    if (!answerText) {
      const localResp = getAnswerFromKnowledgeBase(queryText);
      answerText = localResp.text;
      refText = localResp.reference || 'SGK Chuyên đề Địa lí 11 Kết nối tri thức';
    }

    setLastBotText(answerText);
    setLastReference(refText);
    playTingTingSound();
    onSendToChatLog?.(queryText, answerText);

    // Speak out response naturally in Vietnamese
    if (!isMuted && isSpeechSynthesisSupported()) {
      setVoiceState('speaking');
      speakVietnamese(
        answerText,
        () => setVoiceState('speaking'),
        () => setVoiceState('idle'),
        () => setVoiceState('idle')
      );
    } else {
      setVoiceState('idle');
    }
  };

  const handleToggleMic = () => {
    playClickSound();
    setErrorMessage(null);

    // If currently speaking, stop
    if (voiceState === 'speaking') {
      stopSpeech();
      setVoiceState('idle');
      return;
    }

    // If currently listening, stop listening and trigger answer if transcript exists
    if (voiceState === 'listening') {
      recognizerRef.current?.stop();
      setVoiceState('idle');
      if (currentTranscript.trim()) {
        handleAsk(currentTranscript.trim());
      }
      return;
    }

    // Otherwise, start listening
    if (!isSpeechRecognitionSupported()) {
      setErrorMessage('Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói Web Speech API. Bạn có thể sử dụng các câu hỏi gợi ý bằng cách nhấn vào bên dưới nhé!');
      return;
    }

    stopSpeech();
    setCurrentTranscript('');
    setVoiceState('listening');

    recognizerRef.current = createVietnameseSpeechRecognizer({
      onStart: () => {
        setVoiceState('listening');
        setErrorMessage(null);
      },
      onResult: (transcript, isFinal) => {
        setCurrentTranscript(transcript);
        if (isFinal && transcript.trim()) {
          recognizerRef.current?.stop();
          handleAsk(transcript.trim());
        }
      },
      onError: (err) => {
        setErrorMessage(err);
        setVoiceState('idle');
      },
      onEnd: () => {
        // If ended but we got a transcript that wasn't finalized
        if (currentTranscript.trim() && voiceState === 'listening') {
          handleAsk(currentTranscript.trim());
        } else if (voiceState === 'listening') {
          setVoiceState('idle');
        }
      }
    });

    recognizerRef.current?.start();
  };

  const handleStopSpeaking = () => {
    playClickSound();
    stopSpeech();
    setVoiceState('idle');
  };

  const handleReplayAnswer = () => {
    playClickSound();
    if (!lastBotText) return;
    stopSpeech();
    setVoiceState('speaking');
    speakVietnamese(
      lastBotText,
      () => setVoiceState('speaking'),
      () => setVoiceState('idle'),
      () => setVoiceState('idle')
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0A2540] via-[#0B2E52] to-[#081B30] border border-cyan-400/40 rounded-3xl shadow-2xl shadow-cyan-950/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/20 flex items-center justify-between bg-gradient-to-r from-cyan-950/40 via-blue-900/30 to-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MascotKienSang size={42} expression={voiceState === 'listening' ? 'surprised' : voiceState === 'speaking' ? 'talking' : 'happy'} />
              {voiceState === 'speaking' && (
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                  Voice Chat Tiếng Việt – Kiến Sáng
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                  Live Voice
                </span>
              </div>
              <p className="text-xs text-cyan-200/70">
                Trò chuyện trực tiếp bằng giọng nói tự nhiên, thân thiện về Biển Đông
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (voiceState === 'speaking') stopSpeech();
                setIsMuted(!isMuted);
              }}
              className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1 ${
                isMuted 
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                  : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
              title={isMuted ? 'Bật âm thanh phản hồi' : 'Tắt âm thanh phản hồi'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Đóng Voice Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Visual Stage */}
        <div className="p-5 sm:p-7 flex flex-col items-center justify-center text-center relative overflow-hidden bg-radial from-cyan-950/40 via-transparent to-transparent">
          {/* Animated Mascot Aura */}
          <div className="relative my-2 flex items-center justify-center">
            {/* Ripple waves when listening or speaking */}
            {(voiceState === 'listening' || voiceState === 'speaking') && (
              <>
                <div className="absolute w-36 h-36 rounded-full border border-cyan-400/30 animate-ripple pointer-events-none"></div>
                <div className="absolute w-48 h-48 rounded-full border border-cyan-400/20 animate-ripple [animation-delay:0.6s] pointer-events-none"></div>
                <div className="absolute w-60 h-60 rounded-full border border-cyan-400/10 animate-ripple [animation-delay:1.2s] pointer-events-none"></div>
              </>
            )}

            <div className={`p-4 rounded-3xl transition-all duration-300 ${
              voiceState === 'listening'
                ? 'bg-cyan-500/20 ring-4 ring-cyan-400/40 shadow-2xl shadow-cyan-500/30 scale-105'
                : voiceState === 'speaking'
                ? 'bg-blue-600/20 ring-4 ring-blue-400/40 shadow-2xl shadow-blue-500/30 scale-105'
                : voiceState === 'thinking'
                ? 'bg-amber-500/20 ring-4 ring-amber-400/30 animate-pulse'
                : 'bg-white/5'
            }`}>
              <MascotKienSang 
                size={110} 
                expression={
                  voiceState === 'listening' ? 'thinking' :
                  voiceState === 'speaking' ? 'talking' :
                  voiceState === 'thinking' ? 'thinking' : 'happy'
                } 
              />
            </div>
          </div>

          {/* Voice State Badge */}
          <div className="mt-4 flex items-center gap-2">
            {voiceState === 'listening' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Đang lắng nghe giọng bạn... (Hãy nói bằng tiếng Việt)
              </span>
            )}
            {voiceState === 'thinking' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-3 h-3 text-amber-400 animate-spin" />
                Kiến Sáng đang suy nghĩ và tra cứu...
              </span>
            )}
            {voiceState === 'speaking' && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/40">
                <div className="flex items-center gap-1 h-3">
                  <span className="w-1 bg-cyan-400 animate-soundWave"></span>
                  <span className="w-1 bg-cyan-400 animate-soundWave [animation-delay:0.2s]"></span>
                  <span className="w-1 bg-cyan-400 animate-soundWave [animation-delay:0.4s]"></span>
                  <span className="w-1 bg-cyan-400 animate-soundWave [animation-delay:0.1s]"></span>
                </div>
                <span>Kiến Sáng đang cất giọng trả lời...</span>
                <button 
                  onClick={handleStopSpeaking}
                  className="ml-2 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] text-white"
                >
                  Dừng nói
                </button>
              </div>
            )}
            {voiceState === 'idle' && (
              <span className="text-xs text-cyan-200/80">
                Bấm vào nút Micro tròn bên dưới để bắt đầu nói
              </span>
            )}
          </div>

          {/* Real-time speech recognition preview */}
          {currentTranscript && (
            <div className="mt-3 max-w-lg w-full p-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 text-xs italic animate-fadeIn">
              "{currentTranscript}"
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-3 max-w-lg w-full p-2.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Conversation Display Panel */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-2 space-y-3 custom-scrollbar">
          {lastUserText && (
            <div className="flex justify-end">
              <div className="max-w-[85%] p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-semibold rounded-tr-none shadow-md">
                <span className="text-[10px] text-slate-900/80 block mb-0.5">Bạn đã hỏi:</span>
                "{lastUserText}"
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5">
            <MascotKienSang size={32} expression="happy" />
            <div className="flex-1 max-w-[90%] p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-slate-100 text-xs leading-relaxed rounded-tl-none shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wide">
                  Phản hồi từ Kiến Sáng
                </span>
                {voiceState !== 'speaking' && lastBotText && (
                  <button
                    onClick={handleReplayAnswer}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    title="Nghe lại câu trả lời"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe lại</span>
                  </button>
                )}
              </div>

              <div className="whitespace-pre-line text-slate-200">
                {lastBotText}
              </div>

              {lastReference && (
                <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] text-cyan-300/80 flex items-center gap-1 italic">
                  <BookOpen className="w-3 h-3 text-cyan-400 inline" />
                  <span>Nguồn: {lastReference}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voice Prompt Suggestions */}
        <div className="px-4 sm:px-6 py-2 bg-slate-900/40 border-t border-white/5">
          <div className="text-[11px] text-slate-400 mb-1.5 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>Chạm để hỏi nhanh bằng giọng nói:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {VOICE_SAMPLE_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  playClickSound();
                  handleAsk(prompt);
                }}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl text-[11px] bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 transition-all hover:scale-102 flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-t from-[#081B30] to-[#0A2540] border-t border-cyan-500/20 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 hidden sm:block">
            {voiceState === 'listening' ? 'Nhấp micro để dừng và gửi câu hỏi' : 'Nhấp micro để đặt câu hỏi cho Kiến Sáng'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            {/* Master Push-To-Talk Mic Button */}
            <button
              onClick={handleToggleMic}
              className={`relative px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-2.5 transition-all shadow-xl ${
                voiceState === 'listening'
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/50 scale-105 animate-pulse'
                  : voiceState === 'speaking'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40'
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-cyan-500/30 hover:scale-105'
              }`}
            >
              {voiceState === 'listening' ? (
                <>
                  <MicOff className="w-5 h-5 text-white animate-bounce" />
                  <span>Dừng & Gửi câu hỏi</span>
                </>
              ) : voiceState === 'speaking' ? (
                <>
                  <VolumeX className="w-5 h-5 text-white" />
                  <span>Tạm dừng đọc</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 text-slate-950" />
                  <span>Bật Micro Nói Ngay</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors hidden sm:flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat chữ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
