import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Options {
  /** Scrub on. False only for reduced motion → static poster + first stage. */
  enabled: boolean;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Triangular window: 1 at centre, 0 at centre ± half. */
function window1(p: number, centre: number, half: number) {
  return clamp(1 - Math.abs(p - centre) / half);
}

/**
 * Pins the hero (desktop AND mobile) and scrubs the video by scroll progress
 * while cross-fading the title stages. Works on iOS Safari / Android Chrome:
 *
 * - currentTime is only touched after `loadedmetadata`, and only when the video
 *   is not already seeking (no overlapping seeks → no half-decoded blur).
 * - a rAF loop interpolates toward the scroll target (stable: it eases instead
 *   of jumping, so fast flicks never issue huge stalling seeks).
 * - the video is NEVER scaled, filtered or transformed — only its time moves.
 * - ScrollTrigger.refresh() on resize AND orientationchange keeps the pin exact
 *   across mobile address-bar / rotation changes.
 */
export function useVideoScrub(
  containerRef: RefObject<HTMLElement>,
  videoRef: RefObject<HTMLVideoElement>,
  { enabled }: Options,
): void {
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const stages = Array.from(container.querySelectorAll<HTMLElement>('[data-hero-stage]'));
    const pin = container.querySelector<HTMLElement>('[data-hero-pin]');
    const indicator = container.querySelector<HTMLElement>('[data-hero-indicator]');

    // Reduced motion → static poster + first stage, no pin/scrub.
    if (!enabled) {
      video.pause();
      stages.forEach((el, i) => gsap.set(el, { opacity: i === 0 ? 1 : 0, filter: 'blur(0px)', y: 0 }));
      return;
    }

    video.pause();

    // The first message must be fully readable before the user scrolls.
    const centres = [0, 0.3, 0.52, 0.72, 0.92];
    const HALF = 0.15;

    let targetTime = 0;
    let smoothTime = 0;
    let ready = false;
    let rafId = 0;
    let running = false;
    const FRAME = 1 / 30; // reseek threshold ≈ one frame

    const onMeta = () => {
      ready = true;
      ScrollTrigger.refresh();
    };
    video.addEventListener('loadedmetadata', onMeta);
    if (video.readyState >= 1) ready = true;

    const tick = () => {
      const dur = video.duration;
      if (ready && isFinite(dur) && dur > 0) {
        // Ease toward the scroll target (stable — avoids big stalling jumps).
        smoothTime += (targetTime - smoothTime) * 0.16;
        if (Math.abs(targetTime - smoothTime) < 0.004) smoothTime = targetTime;
        if (video.readyState >= 2 && !video.seeking) {
          const t = clamp(smoothTime, 0, dur - 0.05);
          if (Math.abs(t - video.currentTime) > FRAME) {
            try {
              video.currentTime = t;
            } catch {
              /* not ready yet */
            }
          }
        }
      }
      if (running) rafId = requestAnimationFrame(tick);
    };
    const startTick = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };
    const stopTick = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const applyProgress = (p: number) => {
      targetTime = p * (video.duration || 0);
      // Video is never scaled/filtered — sharpness preserved across the scroll.
      stages.forEach((el, i) => {
        const o = window1(p, centres[i], HALF);
        gsap.set(el, {
          opacity: o,
          filter: `blur(${((1 - o) * 10).toFixed(2)}px)`,
          y: (p - centres[i]) * -60,
          pointerEvents: o > 0.5 ? 'auto' : 'none',
        });
      });
      if (indicator) gsap.set(indicator, { opacity: clamp(1 - p / 0.05), y: p * 18 });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pin || container,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
        onToggle: (self) => (self.isActive ? startTick() : stopTick()),
      });
    }, container);

    applyProgress(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('orientationchange', onResize);

    return () => {
      stopTick();
      video.removeEventListener('loadedmetadata', onMeta);
      window.removeEventListener('orientationchange', onResize);
      ctx.revert();
    };
  }, [containerRef, videoRef, enabled]);
}

export { lerp };
