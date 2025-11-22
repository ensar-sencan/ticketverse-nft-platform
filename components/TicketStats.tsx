'use client';

import React from 'react';
import { NFTTicket } from '@/lib/nft-helper';
import { FiCalendar, FiTrendingUp, FiPieChart, FiClock } from 'react-icons/fi';

interface TicketStatsProps {
  tickets: NFTTicket[];
}

export default function TicketStats({ tickets }: TicketStatsProps) {
  // Calculate stats
  const totalTickets = tickets.length;
  
  const categoryStats = tickets.reduce((acc, ticket) => {
    const cat = ticket.metadata.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const upcomingEvents = tickets.filter(t => 
    new Date(t.metadata.eventDate) > new Date()
  ).length;

  const pastEvents = totalTickets - upcomingEvents;

  const topCategory = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])[0];

  const recentTicket = tickets.sort((a, b) => 
    new Date(b.mintedAt).getTime() - new Date(a.mintedAt).getTime()
  )[0];

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
      <h3 className="text-white text-2xl font-black mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <FiPieChart size={20} className="text-white" />
        </div>
        Collection Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Top Category */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-3">
            <FiTrendingUp className="text-purple-400" size={20} />
            <p className="text-purple-400 text-xs font-bold uppercase">Top Category</p>
          </div>
          {topCategory ? (
            <>
              <p className="text-white text-3xl font-black mb-1">{topCategory[0]}</p>
              <p className="text-slate-400 text-sm">{topCategory[1]} ticket{topCategory[1] > 1 ? 's' : ''}</p>
            </>
          ) : (
            <p className="text-slate-400">No data</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-3">
            <FiCalendar className="text-blue-400" size={20} />
            <p className="text-blue-400 text-xs font-bold uppercase">Upcoming</p>
          </div>
          <p className="text-white text-3xl font-black mb-1">{upcomingEvents}</p>
          <p className="text-slate-400 text-sm">Future events</p>
        </div>

        {/* Past Events */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-3">
            <FiClock className="text-green-400" size={20} />
            <p className="text-green-400 text-xs font-bold uppercase">Past Events</p>
          </div>
          <p className="text-white text-3xl font-black mb-1">{pastEvents}</p>
          <p className="text-slate-400 text-sm">Memories collected</p>
        </div>

        {/* Recent Activity */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-3">
            <FiClock className="text-orange-400" size={20} />
            <p className="text-orange-400 text-xs font-bold uppercase">Latest Mint</p>
          </div>
          {recentTicket ? (
            <>
              <p className="text-white text-lg font-bold line-clamp-1 mb-1">
                {recentTicket.metadata.eventName}
              </p>
              <p className="text-slate-400 text-xs">
                {new Date(recentTicket.mintedAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </>
          ) : (
            <p className="text-slate-400">No tickets yet</p>
          )}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-slate-400 text-sm font-bold mb-4">CATEGORY BREAKDOWN</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {Object.entries(categoryStats).map(([cat, count]) => (
            <div 
              key={cat}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center hover:bg-white/10 transition-all"
            >
              <p className="text-white font-bold text-xl">{count}</p>
              <p className="text-slate-400 text-xs">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}