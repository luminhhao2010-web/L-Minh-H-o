import confetti from 'canvas-confetti';

/**
 * Trigger grand celebratory fireworks confetti display
 * Uses multi-stage cannons and center bursts
 */
export function triggerFireworksConfetti() {
  if (typeof window === 'undefined') return;

  const duration = 2.8 * 1000;
  const animationEnd = Date.now() + duration;

  // 1. Initial explosive center burst
  confetti({
    particleCount: 100,
    spread: 120,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.55 },
    colors: ['#FFE600', '#FF3B30', '#00F5FF', '#34C759', '#AF52DE', '#FF9500'],
    zIndex: 99999
  });

  // 2. Delayed secondary burst
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#FFD700', '#FF2D55', '#00E5FF', '#FF9F0A'],
      zIndex: 99999
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#30D158', '#BF5AF2', '#FFD60A', '#64D2FF'],
      zIndex: 99999
    });
  }, 400);

  // 3. Continuous barrage of fireworks cannons from both sides
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = Math.floor(40 * (timeLeft / duration));

    // Left firework cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 65,
      startVelocity: 50,
      origin: { x: Math.random() * 0.2 + 0.05, y: Math.random() * 0.2 + 0.6 },
      colors: ['#FFE600', '#FF3B30', '#00F5FF', '#FF9500'],
      zIndex: 99999
    });

    // Right firework cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 65,
      startVelocity: 50,
      origin: { x: Math.random() * 0.2 + 0.75, y: Math.random() * 0.2 + 0.6 },
      colors: ['#34C759', '#AF52DE', '#FFD700', '#FF2D55'],
      zIndex: 99999
    });
  }, 300);
}
