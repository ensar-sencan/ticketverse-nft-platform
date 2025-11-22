'use client';
import { FiGrid, FiPlusCircle, FiTrendingUp, FiCreditCard, FiZap, FiStar, FiSearch, FiX, FiDownload } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import WalletConnection from '@/components/WalletConnection';
import TicketCard, { TicketDetailModal } from '@/components/TicketCard';
import { nftHelper, NFTTicket } from '@/lib/nft-helper';
import Link from 'next/link';
import TicketStats from '@/components/TicketStats';

export default function Home() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tickets, setTickets] = useState<NFTTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<NFTTicket | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [stats, setStats] = useState<{
    total: number;
    byCategory: Record<string, number>;
    recentTickets: NFTTicket[];
  }>({ total: 0, byCategory: {}, recentTickets: [] });

  useEffect(() => {
    if (publicKey) {
      loadTickets();
    }
  }, [publicKey]);

  const loadTickets = () => {
    if (!publicKey) return;
    const myTickets = nftHelper.getMyTickets(publicKey);
    const myStats = nftHelper.getStats(publicKey);
    setTickets(myTickets);
    setStats(myStats);
  };

  const categories = ['All', 'Sports', 'Concert', 'Conference', 'Festival', 'Exhibition', 'Workshop', 'Other'];

  const filteredTickets = tickets.filter(ticket => {
  // Category filter
  const categoryMatch = filterCategory === 'All' || ticket.metadata.category === filterCategory;
  
  // Search filter
  const searchMatch = searchQuery === '' || 
    ticket.metadata.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.metadata.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.metadata.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
  
  return categoryMatch && searchMatch;
});

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Glassmorphism Header */}
        <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <FiCreditCard className="text-white" size={28} />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                    TicketVerse
                  </h1>
                  <p className="text-slate-400 text-sm font-medium">NFT Collection Platform</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                {publicKey && (
                  <>
                    <Link 
                      href="/mint"
                      className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 bg-[length:200%_100%] animate-gradient"
                    >
                      <FiZap size={20} />
                      Mint Ticket
                    </Link>
                  </>
                )}
                <WalletConnection 
                  onConnect={setPublicKey}
                  onDisconnect={() => {
                    setPublicKey(null);
                    setTickets([]);
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!publicKey ? (
            // Ultra Modern Welcome Screen
            <div className="flex flex-col items-center justify-center min-h-[75vh] text-center">
              {/* Hero Icon */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <FiCreditCard className="text-white" size={64} />
                </div>
              </div>

              {/* Hero Text */}
              <h2 className="text-6xl font-black mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                  Welcome to TicketVerse
                </span>
              </h2>
              <p className="text-slate-300 text-xl mb-12 max-w-2xl leading-relaxed">
                Your personal <span className="text-purple-400 font-bold">NFT ticket collection</span> platform on Stellar blockchain.
                <br />
                Collect, store, and showcase your <span className="text-pink-400 font-bold">event memories</span> forever. ✨
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
                {[
                  { icon: FiZap, title: 'Fast Minting', desc: '1-3 seconds on Stellar', color: 'from-yellow-500 to-orange-500' },
                  { icon: FiStar, title: 'Low Cost', desc: 'Nearly free transactions', color: 'from-blue-500 to-cyan-500' },
                  { icon: FiCreditCard, title: 'Your Collection', desc: 'Build your ticket gallery', color: 'from-purple-500 to-pink-500' }
                ].map((feature, i) => (
                  <div key={i} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all transform hover:scale-105">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* Getting Started */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <span className="text-2xl">🚀</span> Getting Started
                </h3>
                <ol className="text-left space-y-4">
                  {[
                    'Connect your Stellar wallet above',
                    'Mint your first NFT ticket',
                    'Build your collection',
                    'Share your memories!'
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : tickets.length === 0 ? (
            // Empty State with Animation
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-40 h-40 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                  <FiGrid className="text-slate-400" size={80} />
                </div>
              </div>
              <h2 className="text-4xl font-black text-white mb-4">
                No Tickets Yet
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md">
                Start building your collection by minting your first NFT ticket!
              </p>
              <Link 
                href="/mint"
                className="group relative overflow-hidden px-10 py-5 rounded-2xl font-black text-lg text-white transition-all transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] animate-gradient"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                <span className="relative flex items-center gap-3">
                  <FiPlusCircle size={28} />
                  Mint Your First Ticket
                </span>
              </Link>
            </div>
          ) : (
            // Ticket Gallery with Ultra Modern Stats
            <>
              {/* Ultra Modern Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { label: 'Total Tickets', value: stats.total, icon: FiCreditCard, gradient: 'from-purple-500 via-purple-600 to-pink-600' },
                  { label: 'Categories', value: Object.keys(stats.byCategory).length, icon: FiGrid, gradient: 'from-pink-500 via-pink-600 to-purple-600' },
                  { label: 'Collection Score', value: '⭐', icon: FiTrendingUp, gradient: 'from-blue-500 via-cyan-600 to-purple-600' }
                ].map((stat, i) => (
                  <div key={i} className="group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
                        <p className="text-5xl font-black text-white">{stat.value}</p>
                      </div>
                      <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                        <stat.icon size={32} className="text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                            {/* COLLECTION INSIGHTS */}
              {tickets.length >= 1 && <TicketStats tickets={tickets} />}
                            {/* SEARCH BAR */}
              {tickets.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="🔍 Search tickets by name, location, or number..."
                      className="w-full pl-12 pr-12 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        <FiX size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* EXPORT BUTTON */}
              {tickets.length > 0 && (
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => {
                      const exportData = {
                        owner: publicKey,
                        exportDate: new Date().toISOString(),
                        totalTickets: stats.total,
                        categories: stats.byCategory,
                        tickets: tickets.map(t => ({
                          id: t.id,
                          eventName: t.metadata.eventName,
                          category: t.metadata.category,
                          date: t.metadata.eventDate,
                          location: t.metadata.location,
                          ticketNumber: t.metadata.ticketNumber,
                          assetCode: t.assetCode,
                          mintedAt: t.mintedAt
                        }))
                      };
                      
                      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `ticketverse-collection-${Date.now()}.json`;
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="group flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all transform hover:scale-105"
                  >
                    <FiDownload size={20} className="group-hover:animate-bounce" />
                    Export Collection
                  </button>
                </div>
              )}

              {/* Glassmorphism Filter Pills */}
              <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-slate-400 font-bold text-sm whitespace-nowrap">Filter:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`
                      relative px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all transform hover:scale-105
                      ${filterCategory === cat 
                        ? 'text-white shadow-2xl' 
                        : 'backdrop-blur-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                      }
                    `}
                  >
                    {filterCategory === cat && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full bg-[length:200%_100%] animate-gradient"></div>
                    )}
                    <span className="relative flex items-center gap-2">
                      {cat}
                      {cat !== 'All' && stats.byCategory[cat] && (
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                          {stats.byCategory[cat]}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>

                            {/* Tickets Grid */}
              {filteredTickets.length === 0 ? (
                <div className="text-center py-20 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-30"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                      <FiSearch className="text-slate-400" size={48} />
                    </div>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">No tickets found</h3>
                  <p className="text-slate-400 mb-6">
                    {searchQuery 
                      ? `No results for "${searchQuery}"`
                      : 'No tickets in this category'
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onClick={() => setSelectedTicket(ticket)}
                    />
                  ))}
                </div>
              )}

              {/* Floating Action Button */}
              <Link 
                href="/mint"
                className="fixed bottom-8 right-8 md:hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                  <FiPlusCircle className="text-white" size={32} />
                </div>
              </Link>
            </>
          )}
        </main>
      </div>

      {/* Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}