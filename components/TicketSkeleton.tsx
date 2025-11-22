'use client';

export default function TicketSkeleton() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse">
      {/* Header */}
      <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800">
        <div className="p-6 space-y-4">
          <div className="w-24 h-8 bg-white/20 rounded-full"></div>
          <div className="w-3/4 h-6 bg-white/20 rounded-lg"></div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="w-20 h-3 bg-white/10 rounded"></div>
            <div className="w-32 h-4 bg-white/10 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="w-20 h-3 bg-white/10 rounded"></div>
            <div className="w-40 h-4 bg-white/10 rounded"></div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="w-32 h-4 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  );
}