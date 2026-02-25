"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const YouTube = dynamic(() => import("react-youtube"), { ssr: false });
import type { YouTubePlayer } from "react-youtube";

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instructionVideo?: string;
  // Future: pdfUrl?: string;
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

const InstructionModal: React.FC<InstructionModalProps> = ({ open, onClose, instructionVideo }) => {
  const videoId = instructionVideo ? getYoutubeId(instructionVideo) : undefined;
  const playerRef = useRef<YouTubePlayer | null>(null);

  // Autoplay and mute when modal opens
  useEffect(() => {
    if (open && playerRef.current) {
      playerRef.current.mute();
      playerRef.current.playVideo();
    }
    if (!open && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  }, [open]);

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
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xl relative mx-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-black text-2xl sm:text-xl font-bold w-10 h-10 flex items-center justify-center"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-black text-center">Competition Instructions</h2>
        {videoId ? (
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-black mb-4">
            <YouTube
              videoId={videoId}
              className="w-full h-full"
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                //   autoplay: 1,
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
        ) : (
          <div className="text-center text-gray-500 py-12">No instructions provided for this competition.</div>
        )}
        {/* Future: PDF support here */}
      </div>
    </div>
  );
};

export default InstructionModal;
