import React from "react";

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instructionVideo?: string;
  // Future: pdfUrl?: string;
}

function getYoutubeEmbedUrl(url: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return undefined;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ open, onClose, instructionVideo }) => {
  if (!open) return null;
  const embedUrl = instructionVideo ? getYoutubeEmbedUrl(instructionVideo) : undefined;

  // Handler for overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm"
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
        {embedUrl ? (
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-black mb-4">
            <iframe
              src={embedUrl}
              title="Instruction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
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
