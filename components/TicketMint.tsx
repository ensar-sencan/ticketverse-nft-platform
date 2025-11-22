'use client';

import React, { useState } from 'react';
import { nftHelper, TicketMetadata } from '@/lib/nft-helper';
import { FiCalendar, FiMapPin, FiTag, FiHash, FiLoader } from 'react-icons/fi';

interface TicketMintProps {
  walletAddress: string;
  onMintSuccess?: () => void;
}

export default function TicketMint({ walletAddress, onMintSuccess }: TicketMintProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TicketMetadata>({
    eventName: '',
    eventDate: '',
    location: '',
    category: 'Sports',
    ticketNumber: `TKT-${Date.now().toString().slice(-6)}`,
    description: '',
  });

  const categories = [
    'Sports',
    'Concert',
    'Conference',
    'Festival',
    'Exhibition',
    'Workshop',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await nftHelper.mintTicket(walletAddress, formData);

      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          eventName: '',
          eventDate: '',
          location: '',
          category: 'Sports',
          ticketNumber: `TKT-${Date.now().toString().slice(-6)}`,
          description: '',
        });
        
        if (onMintSuccess) {
          setTimeout(onMintSuccess, 1500);
        }
      } else {
        setError(result.error || 'Mint failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <FiTag className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Mint NFT Ticket</h2>
          <p className="text-slate-400 text-sm">Create your event ticket NFT</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Event Name */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Event Name *
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            placeholder="e.g., Galatasaray vs Fenerbahçe"
            className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">
              <FiCalendar className="inline mr-2" />
              Event Date *
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              <FiMapPin className="inline mr-2" />
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Türk Telekom Stadium"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Ticket Number */}
        <div>
          <label className="block text-white font-semibold mb-2">
            <FiHash className="inline mr-2" />
            Ticket Number *
          </label>
          <input
            type="text"
            name="ticketNumber"
            value={formData.ticketNumber}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all font-mono"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add event details, memories, or notes..."
            rows={3}
            className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
          />
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
            ✅ Ticket minted successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
            ❌ {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={20} />
              Minting...
            </>
          ) : (
            <>
              <FiTag size={20} />
              Mint Ticket NFT
            </>
          )}
        </button>
      </form>
    </div>
  );
}