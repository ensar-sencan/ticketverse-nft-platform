'use client';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import React from 'react';
import { NFTTicket } from '@/lib/nft-helper';
import { FiCalendar, FiMapPin, FiHash, FiExternalLink, FiX } from 'react-icons/fi';

interface TicketCardProps {
  ticket: NFTTicket;
  onClick?: () => void;
}

export default function TicketCard({ ticket, onClick }: TicketCardProps) {
  const { metadata, mintedAt, assetCode } = ticket;

  // Kategori renkleri ve ikonları
  const categoryStyles: Record<string, { gradient: string; pattern: string; emoji: string }> = {
    'Sports': { 
      gradient: 'from-green-500 via-emerald-500 to-teal-600', 
      pattern: '⚽🏀🏈',
      emoji: '⚽'
    },
    'Concert': { 
      gradient: 'from-purple-500 via-pink-500 to-rose-600', 
      pattern: '🎵🎸🎤',
      emoji: '🎵'
    },
    'Conference': { 
      gradient: 'from-blue-500 via-indigo-500 to-purple-600', 
      pattern: '💼📊🎯',
      emoji: '💼'
    },
    'Festival': { 
      gradient: 'from-orange-500 via-red-500 to-pink-600', 
      pattern: '🎉🎊🎈',
      emoji: '🎉'
    },
    'Exhibition': { 
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600', 
      pattern: '🎨🖼️🏛️',
      emoji: '🎨'
    },
    'Workshop': { 
      gradient: 'from-yellow-500 via-amber-500 to-orange-600', 
      pattern: '🔧⚙️🛠️',
      emoji: '🔧'
    },
    'Other': { 
      gradient: 'from-gray-500 via-slate-500 to-zinc-600', 
      pattern: '✨💫⭐',
      emoji: '✨'
    },
  };

  const style = categoryStyles[metadata.category] || categoryStyles['Other'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${style.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500`}></div>
      
      {/* Card */}
      <div className="relative backdrop-blur-xl bg-black/40 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header with Gradient */}
        <div className={`relative h-48 bg-gradient-to-br ${style.gradient} overflow-hidden`}>
          {/* Animated Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 text-6xl font-bold text-white/20 flex items-center justify-center transform rotate-12">
              {style.pattern}
            </div>
          </div>
          
          {/* Floating Shapes */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>

          {/* Category Badge */}
          <div className="absolute top-6 left-6 px-4 py-2 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full">
            <span className="text-white font-bold text-sm flex items-center gap-2">
              <span className="text-xl">{style.emoji}</span>
              {metadata.category}
            </span>
          </div>

          {/* Asset Code */}
          <div className="absolute top-6 right-6 px-3 py-1 backdrop-blur-xl bg-black/30 border border-white/20 rounded-lg">
            <p className="text-white/90 font-mono text-xs font-bold">{assetCode}</p>
          </div>

          {/* Event Name */}
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-white text-2xl font-black line-clamp-2 drop-shadow-2xl">
              {metadata.eventName}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Event Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-10 h-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <FiCalendar size={18} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium">Event Date</p>
                <p className="text-white font-semibold">{formatDate(metadata.eventDate)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="w-10 h-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                <FiMapPin size={18} className="text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium">Location</p>
                <p className="text-white font-semibold line-clamp-1">{metadata.location}</p>
              </div>
            </div>
          </div>

          {/* Ticket Number */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Ticket Number</p>
                <p className="text-white font-mono font-bold">{metadata.ticketNumber}</p>
              </div>
              <div className="w-10 h-10 backdrop-blur-xl bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <FiHash size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-6 py-3">
            <p className="text-white font-bold text-sm">View Details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ultra Modern Modal
interface TicketDetailModalProps {
  ticket: NFTTicket;
  onClose: () => void;
}

export function TicketDetailModal({ ticket, onClose }: TicketDetailModalProps) {
  const { metadata, mintedAt, id, assetCode, owner } = ticket;
  const [showQR, setShowQR] = useState(false);

  const categoryStyles: Record<string, { gradient: string; emoji: string }> = {
    'Sports': { gradient: 'from-green-500 via-emerald-500 to-teal-600', emoji: '⚽' },
    'Concert': { gradient: 'from-purple-500 via-pink-500 to-rose-600', emoji: '🎵' },
    'Conference': { gradient: 'from-blue-500 via-indigo-500 to-purple-600', emoji: '💼' },
    'Festival': { gradient: 'from-orange-500 via-red-500 to-pink-600', emoji: '🎉' },
    'Exhibition': { gradient: 'from-cyan-500 via-blue-500 to-indigo-600', emoji: '🎨' },
    'Workshop': { gradient: 'from-yellow-500 via-amber-500 to-orange-600', emoji: '🔧' },
    'Other': { gradient: 'from-gray-500 via-slate-500 to-zinc-600', emoji: '✨' },
  };

  const style = categoryStyles[metadata.category] || categoryStyles['Other'];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${style.gradient} rounded-3xl blur-2xl opacity-50`}></div>
        
        {/* Modal Content */}
        <div className="relative backdrop-blur-2xl bg-black/60 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header with Gradient */}
          <div className={`relative bg-gradient-to-br ${style.gradient} p-10`}>
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
            >
              <FiX className="text-white" size={20} />
            </button>

            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-white/20 border border-white/30 rounded-full mb-6">
              <span className="text-2xl">{style.emoji}</span>
              <span className="text-white font-bold">{metadata.category}</span>
            </div>

            {/* Event Name */}
            <h2 className="text-4xl font-black text-white mb-4 drop-shadow-2xl">
              {metadata.eventName}
            </h2>

            {/* Event Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 backdrop-blur-xl bg-white/20 rounded-xl flex items-center justify-center">
                  <FiCalendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/70">Date</p>
                  <p className="font-bold">{new Date(metadata.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 backdrop-blur-xl bg-white/20 rounded-xl flex items-center justify-center">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-white/70">Location</p>
                  <p className="font-bold">{metadata.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-10 space-y-6">
            {/* Description */}
            {metadata.description && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="text-xl">📝</span> Description
                </h3>
                <p className="text-slate-300 leading-relaxed">{metadata.description}</p>
              </div>
            )}

            {/* Ticket Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                <p className="text-purple-400 text-xs font-bold mb-2">TICKET NUMBER</p>
                <p className="text-white font-mono text-xl font-black">{metadata.ticketNumber}</p>
              </div>
              <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
                <p className="text-blue-400 text-xs font-bold mb-2">ASSET CODE</p>
                <p className="text-white font-mono text-xl font-black">{assetCode}</p>
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">⛓️</span> Blockchain Details
              </h3>
              
              <div>
                <p className="text-slate-500 text-xs font-bold mb-2">TICKET ID</p>
                <p className="text-white font-mono text-sm break-all bg-black/30 px-4 py-2 rounded-lg">
                  {id}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs font-bold mb-2">OWNER ADDRESS</p>
                <p className="text-white font-mono text-sm break-all bg-black/30 px-4 py-2 rounded-lg">
                  {owner}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs font-bold mb-2">MINTED AT</p>
                <p className="text-white font-semibold">
                  {new Date(mintedAt).toLocaleString('en-US', { 
                    dateStyle: 'long', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            </div>

                      {/* QR CODE SECTION */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <span className="text-xl">📱</span> QR Code
              </h3>
              <button
                onClick={() => setShowQR(!showQR)}
                className="px-4 py-2 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-semibold transition-all"
              >
                {showQR ? 'Hide QR' : 'Show QR'}
              </button>
            </div>
            
            {showQR && (
              <div className="flex flex-col items-center gap-4 animate-fadeIn">
                <div className="p-6 bg-white rounded-2xl">
                  {/* BURAYI GÜNCELLEDİK: QRCode -> QRCodeCanvas */}
                  <QRCodeCanvas
                    value={`https://ticketverse.app/ticket/${id}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-slate-400 text-sm text-center">
                  Scan this QR code to view ticket details
                </p>
                <button
                  onClick={() => {
                    const canvas = document.querySelector('canvas');
                    if (canvas) {
                      const url = canvas.toDataURL('image/png');
                      const link = document.createElement('a');
                      link.download = `ticket-${metadata.ticketNumber}-qr.png`;
                      link.href = url;
                      link.click();
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white text-sm font-bold transition-all"
                >
                  Download QR Code
                </button>
              </div>
            )}
          </div> 

            {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
  onClick={() => {
    // Stellar Testnet explorer link
    const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${id}`;
    window.open(explorerUrl, '_blank');
  }}
  className="group relative overflow-hidden backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105"
>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
  <span className="relative flex items-center justify-center gap-2">
    <FiExternalLink size={20} />
    View on Stellar Expert
  </span>
</button>
            <button 
              onClick={() => {
                const shareData = {
                  title: `${metadata.eventName} Ticket`,
                  text: `Check out my NFT ticket for ${metadata.eventName}!`,
                  url: window.location.href
                };
                if (navigator.share) {
                  navigator.share(shareData);
                } else {
                  navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
                  alert('✅ Link copied to clipboard!');
                }
              }}
              className="backdrop-blur-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105 shadow-xl"
            >
              Share Ticket
            </button>
          </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}