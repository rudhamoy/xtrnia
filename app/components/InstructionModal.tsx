"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });
import type { YouTubePlayer } from "react-youtube";

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instructionVideo?: string;
  instructionPdfUrl?: string;
  instructionText?: string;
}

// Removed duplicate getYoutubeEmbedUrl definition
function getYoutubeId(url: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  if (match && match[1]) {
    return match[1];
  }
  return undefined;
}


const InstructionModal: React.FC<InstructionModalProps> = ({ open, onClose, instructionVideo, instructionPdfUrl, instructionText }) => {
  const videoId = instructionVideo ? getYoutubeId(instructionVideo) : undefined;
  const hasVideo = Boolean(videoId);
  const hasPdf = Boolean(instructionPdfUrl);
  const hasText = Boolean(instructionText && instructionText.trim().length > 0);
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'text'>(hasVideo ? 'video' : hasPdf ? 'pdf' : 'text');
  const playerRef = useRef<YouTubePlayer | null>(null);
  const sanitizedHtml = useMemo(() => {
    if (!instructionText) return '';
    return DOMPurify.sanitize(instructionText);
  }, [instructionText]);

  // Autoplay and mute when modal opens
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const iframe = player.getIframe?.();
    const attached = iframe ? document.contains(iframe) : false;

    try {
      if (open && attached) {
        player.mute();
        player.playVideo();
      } else if (!open && attached) {
        player.stopVideo();
      }
    } catch {
      // Ignore player errors when the iframe is detached.
    }
  }, [open]);

  useEffect(() => {
    if (hasVideo) {
      setActiveTab('video');
    } else if (hasPdf) {
      setActiveTab('pdf');
    } else {
      setActiveTab('text');
    }
  }, [hasVideo, hasPdf, hasText, open]);

  // Handler for overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ visibility: open ? 'visible' : 'hidden' }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xl relative mx-2 max-h-[90vh] overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-black text-2xl sm:text-xl font-bold w-10 h-10 flex items-center justify-center"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-black text-center">Competition Instructions</h2>
        {(hasVideo || hasPdf || hasText) && (hasVideo ? 1 : 0) + (hasPdf ? 1 : 0) + (hasText ? 1 : 0) > 1 && (
          <div className="flex items-center justify-center gap-2 mb-4">
            {hasVideo && (
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeTab === 'video'
                    ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400/60'
                    : 'bg-white/50 text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                Video
              </button>
            )}
            {hasPdf && (
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeTab === 'pdf'
                    ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400/60'
                    : 'bg-white/50 text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                PDF
              </button>
            )}
            {hasText && (
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeTab === 'text'
                    ? 'bg-yellow-400/20 text-yellow-700 border-yellow-400/60'
                    : 'bg-white/50 text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                Text
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1">
        {open && hasVideo && (!hasPdf || activeTab === 'video') && (
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-black mb-4">
            <YouTube
              videoId={videoId}
                className="w-full h-full"
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    mute: 1,
                    rel: 0,
                    modestbranding: 1,
                  },
                }}
              onReady={e => {
                playerRef.current = e.target;
                e.target.mute();
                e.target.playVideo();
              }}
            />
          </div>
        )}

          {hasPdf && (!hasVideo || activeTab === 'pdf') && (
            <div className="w-full">
              <div className="w-full h-[420px] rounded-lg overflow-hidden border border-gray-200 bg-white">
                <iframe
                  src={`/api/pdf-proxy?url=${encodeURIComponent(instructionPdfUrl || '')}`}
                  title="Instruction PDF"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {hasText && (!hasVideo && !hasPdf ? true : activeTab === 'text') && (
            <div
              className="text-gray-800 text-sm leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          )}

          {!hasVideo && !hasPdf && !hasText && (
            <div className="text-center text-gray-500 py-12">No instructions provided for this competition.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;
