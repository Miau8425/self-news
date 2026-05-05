'use client';

import { useEffect, useRef } from 'react';

type LongformEmbedProps = {
  src: string;
  title: string;
};

export default function LongformEmbed({ src, title }: LongformEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let frameWindow: Window | null = null;
    let resizeHandler: (() => void) | null = null;
    let syncTimer: number | null = null;

    const syncHeight = () => {
      try {
        const doc = iframe.contentWindow?.document;
        if (!doc) return;
        const nextHeight = Math.max(
          doc.body?.scrollHeight || 0,
          doc.documentElement?.scrollHeight || 0
        );
        if (nextHeight > 0) {
          iframe.style.height = `${nextHeight}px`;
        }
      } catch {
        // Same-origin static asset; ignore if iframe isn't ready yet.
      }
    };

    const handleLoad = () => {
      frameWindow = iframe.contentWindow;
      resizeHandler = () => syncHeight();
      frameWindow?.addEventListener('resize', resizeHandler);
      syncHeight();

      let ticks = 0;
      syncTimer = window.setInterval(() => {
        syncHeight();
        ticks += 1;
        if (ticks >= 12 && syncTimer) {
          window.clearInterval(syncTimer);
          syncTimer = null;
        }
      }, 500);
    };

    iframe.addEventListener('load', handleLoad);
    window.addEventListener('resize', syncHeight);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', syncHeight);
      if (frameWindow && resizeHandler) {
        frameWindow.removeEventListener('resize', resizeHandler);
      }
      if (syncTimer) {
        window.clearInterval(syncTimer);
      }
    };
  }, [src]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full border-0 bg-white"
      style={{ minHeight: '1200px' }}
    />
  );
}
