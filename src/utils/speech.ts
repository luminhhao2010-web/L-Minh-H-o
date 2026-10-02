// Speech utilities for Vietnamese Voice Recognition & Natural Text-To-Speech

// Types for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface CustomSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => CustomSpeechRecognition;
    webkitSpeechRecognition?: new () => CustomSpeechRecognition;
  }
}

/**
 * Check if the browser supports speech recognition
 */
export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && 
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Check if the browser supports speech synthesis
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Clean markdown symbols from text so TTS reads naturally in Vietnamese
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    // Remove markdown headers
    .replace(/^#+\s+/gm, '')
    // Remove markdown bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove bullet points and numbered list markers
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove emojis that may cause awkward pronunciation
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    // Remove markdown links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Replace multiple newlines with a single pause period
    .replace(/\n+/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Find the most natural Vietnamese voice available in the browser
 */
export function getBestVietnameseVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported()) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // 1. Look for high-quality natural Vietnamese voices
  const preferredVoice = voices.find(v => 
    (v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')) && 
    (v.name.toLowerCase().includes('natural') || 
     v.name.toLowerCase().includes('online') || 
     v.name.toLowerCase().includes('google') ||
     v.name.toLowerCase().includes('hoaimy'))
  );
  if (preferredVoice) return preferredVoice;

  // 2. Look for any Vietnamese voice
  const viVoice = voices.find(v => 
    v.lang === 'vi-VN' || v.lang === 'vi_VN' || v.lang.startsWith('vi')
  );
  if (viVoice) return viVoice;

  // 3. Fallback to default
  return null;
}

/**
 * Speak text in a friendly, natural Vietnamese mascot voice
 */
export function speakVietnamese(
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void,
  onError?: (err: any) => void
): SpeechSynthesisUtterance | null {
  if (!isSpeechSynthesisSupported()) {
    onEnd?.();
    return null;
  }

  // Cancel any active speech
  window.speechSynthesis.cancel();

  const cleanText = cleanTextForSpeech(text);
  if (!cleanText) {
    onEnd?.();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'vi-VN';
  // Natural friendly mascot tone: slightly upbeat, gentle, clear
  utterance.rate = 1.0; 
  utterance.pitch = 1.08; 

  const voice = getBestVietnameseVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    // If interrupted or cancelled, still trigger onEnd
    if (e.error !== 'interrupted') {
      onError?.(e);
    }
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Stop any currently playing speech
 */
export function stopSpeech(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Create a Vietnamese Speech Recognition session
 */
export function createVietnameseSpeechRecognizer(options: {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  onStart?: () => void;
}): { start: () => void; stop: () => void; abort: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    options.onError('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech.');
    return null;
  }

  const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionClass) return null;

  try {
    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      options.onStart?.();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) {
        options.onResult(finalTranscript.trim(), true);
      } else if (interimTranscript) {
        options.onResult(interimTranscript.trim(), false);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let errorMsg = 'Có lỗi xảy ra khi nhận diện giọng nói.';
      if (event.error === 'not-allowed') {
        errorMsg = 'Bạn chưa cấp quyền truy cập micro cho trình duyệt.';
      } else if (event.error === 'no-speech') {
        errorMsg = 'Chưa nghe thấy giọng nói. Hãy thử lại gần micro hơn nhé!';
      } else if (event.error === 'network') {
        errorMsg = 'Lỗi kết nối mạng khi xử lý giọng nói.';
      }
      options.onError(errorMsg);
    };

    recognition.onend = () => {
      options.onEnd();
    };

    return {
      start: () => {
        try {
          recognition.start();
        } catch {
          // May throw if already started
        }
      },
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // Ignore
        }
      },
      abort: () => {
        try {
          recognition.abort();
        } catch {
          // Ignore
        }
      }
    };
  } catch (err: any) {
    options.onError(err.message || 'Không thể khởi tạo nhận diện giọng nói');
    return null;
  }
}
