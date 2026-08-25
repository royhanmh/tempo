// Web Audio chimes & ticks
const tone = (
  ctx,
  { freq, type = "sine", start = 0, dur = 0.3, vol = 0.2, endFreq },
  onEnded,
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  if (endFreq)
    osc.frequency.exponentialRampToValueAtTime(
      endFreq,
      ctx.currentTime + start + dur,
    );
  const t0 = ctx.currentTime + start;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  if (onEnded) osc.onended = onEnded;
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
};

export const playAudioSound = (type = "completion", soundProfile = "bell") => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    let pending = 0;
    const release = () => {
      pending -= 1;
      if (pending === 0) ctx.close();
    };
    const play = (opts) => {
      pending += 1;
      tone(ctx, opts, release);
    };

    if (type === "completion") {
      switch (soundProfile) {
        case "bell":
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) =>
            play({ freq, start: i * 0.12, dur: 1.2, vol: 0.25 }),
          );
          break;
        case "digital":
          [880, 1760].forEach((freq, i) =>
            play({
              freq,
              type: "square",
              start: i * 0.1,
              dur: 0.08,
              vol: 0.08,
            }),
          );
          break;
        case "chime":
          [1046.5, 1318.5, 1568].forEach((freq, i) =>
            play({ freq, start: i * 0.18, dur: 1.4, vol: 0.18 }),
          );
          break;
        case "woodblock":
          [0, 0.15, 0.3].forEach((start) =>
            play({
              freq: 900,
              type: "triangle",
              start,
              dur: 0.08,
              vol: 0.25,
              endFreq: 300,
            }),
          );
          break;
        case "marimba":
          [261.63, 392, 523.25, 659.25].forEach((freq, i) =>
            play({
              freq,
              type: "triangle",
              start: i * 0.14,
              dur: 0.6,
              vol: 0.22,
            }),
          );
          break;
        case "siren":
          for (let i = 0; i < 4; i++)
            play({
              freq: 600,
              type: "sawtooth",
              start: i * 0.35,
              dur: 0.35,
              vol: 0.12,
              endFreq: 1000,
            });
          break;
        case "mute":
        default:
          break;
      }
    } else if (type === "tick") {
      play({ freq: 400, dur: 0.02, vol: 0.04, endFreq: 100 });
    }
  } catch (err) {
    console.warn("Audio playback prevented", err);
  }
};
