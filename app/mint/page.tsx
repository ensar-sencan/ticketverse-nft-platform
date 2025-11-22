'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WalletConnection from '@/components/WalletConnection';
import TicketMint from '@/components/TicketMint';
import { FiArrowLeft, FiCreditCard } from 'react-icons/fi'; // FiCreditCard kullandık
import Link from 'next/link';

export default function MintPage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const router = useRouter();

  const handleMintSuccess = () => {
    // Redirect to home after successful mint
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Back Button & Logo */}
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FiArrowLeft size={24} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <FiCreditCard className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">TicketVerse</h1>
                </div>
              </div>
            </div>

            {/* Wallet */}
            <WalletConnection 
              onConnect={setPublicKey}
              onDisconnect={() => setPublicKey(null)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!publicKey ? (
          // Connect Wallet First
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <FiCreditCard className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-slate-300 mb-8">
              Please connect your Stellar wallet to mint NFT tickets
            </p>
          </div>
        ) : (
          <TicketMint 
            walletAddress={publicKey} 
            onMintSuccess={handleMintSuccess}
          />
        )}
      </main>
    </div>
  );
}