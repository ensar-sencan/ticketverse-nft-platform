// lib/nft-helper.ts
import { stellar } from './stellar-helper';

export interface TicketMetadata {
  eventName: string;
  eventDate: string;
  location: string;
  category: string;
  ticketNumber: string;
  imageUrl?: string;
  description?: string;
}

export interface NFTTicket {
  id: string;
  assetCode: string;
  issuer: string;
  metadata: TicketMetadata;
  mintedAt: string;
  owner: string;
}

class NFTHelper {
  /**
   * NFT Ticket mint eder
   */
  async mintTicket(
  ownerAddress: string,
  metadata: TicketMetadata
): Promise<{ success: boolean; ticket?: NFTTicket; error?: string }> {
  try {
    // Asset code oluştur (max 12 karakter)
    const assetCode = this.generateAssetCode(metadata.eventName);
    
    // Kısa memo oluştur (max 28 bytes)
    const shortMemo = `NFT:${metadata.ticketNumber}`;
    
    // Stellar'da asset oluştur ve transfer et
    const result = await stellar.sendPayment({
      from: ownerAddress,
      to: ownerAddress, // Kendine gönder (NFT mint)
      amount: "0.0000001", // Minimum miktar
      memo: shortMemo // Kısa memo
    });

    if (result.success) {
      const ticket: NFTTicket = {
        id: result.hash || this.generateTicketId(),
        assetCode,
        issuer: ownerAddress,
        metadata,
        mintedAt: new Date().toISOString(),
        owner: ownerAddress
      };

      // LocalStorage'a kaydet
      this.saveTicketToStorage(ticket);

      return { success: true, ticket };
    }

    return { success: false, error: 'Mint failed' };
  } catch (error) {
    console.error('Mint error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

  /**
   * Kullanıcının tüm ticketlarını getir
   */
  getMyTickets(ownerAddress: string): NFTTicket[] {
    try {
      const stored = localStorage.getItem('nft_tickets');
      if (!stored) return [];

      const allTickets: NFTTicket[] = JSON.parse(stored);
      return allTickets.filter(t => t.owner === ownerAddress);
    } catch (error) {
      console.error('Get tickets error:', error);
      return [];
    }
  }

  /**
   * Ticket detayını getir
   */
  getTicketById(ticketId: string): NFTTicket | null {
    try {
      const stored = localStorage.getItem('nft_tickets');
      if (!stored) return null;

      const allTickets: NFTTicket[] = JSON.parse(stored);
      return allTickets.find(t => t.id === ticketId) || null;
    } catch (error) {
      console.error('Get ticket error:', error);
      return null;
    }
  }

  /**
   * Ticket'ı LocalStorage'a kaydet
   */
  private saveTicketToStorage(ticket: NFTTicket): void {
    try {
      const stored = localStorage.getItem('nft_tickets');
      const tickets: NFTTicket[] = stored ? JSON.parse(stored) : [];
      tickets.push(ticket);
      localStorage.setItem('nft_tickets', JSON.stringify(tickets));
    } catch (error) {
      console.error('Save ticket error:', error);
    }
  }

  /**
   * Asset code oluştur (max 12 karakter)
   */
  private generateAssetCode(eventName: string): string {
    const cleaned = eventName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const code = cleaned.substring(0, 8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${code}${random}`.substring(0, 12);
  }

  /**
   * Unique ticket ID oluştur
   */
  private generateTicketId(): string {
    return `TKT-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Ticket'ı transfer et
   */
  async transferTicket(
    ticketId: string,
    from: string,
    to: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const ticket = this.getTicketById(ticketId);
      if (!ticket) {
        return { success: false, error: 'Ticket not found' };
      }

      if (ticket.owner !== from) {
        return { success: false, error: 'Not ticket owner' };
      }

      // Stellar transaction
      const result = await stellar.sendPayment({
        from,
        to,
        amount: "0.0000001",
        memo: `TRANSFER:${ticketId}`
      });

      if (result.success) {
        // Update ownership in storage
        const stored = localStorage.getItem('nft_tickets');
        if (stored) {
          const tickets: NFTTicket[] = JSON.parse(stored);
          const index = tickets.findIndex(t => t.id === ticketId);
          if (index !== -1) {
            tickets[index].owner = to;
            localStorage.setItem('nft_tickets', JSON.stringify(tickets));
          }
        }
        return { success: true };
      }

      return { success: false, error: 'Transfer failed' };
    } catch (error) {
      console.error('Transfer error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Kategori bazlı istatistikler
   */
  getStats(ownerAddress: string): {
    total: number;
    byCategory: Record<string, number>;
    recentTickets: NFTTicket[];
  } {
    const tickets = this.getMyTickets(ownerAddress);
    const byCategory: Record<string, number> = {};

    tickets.forEach(ticket => {
      const cat = ticket.metadata.category;
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });

    const recentTickets = tickets
      .sort((a, b) => new Date(b.mintedAt).getTime() - new Date(a.mintedAt).getTime())
      .slice(0, 5);

    return {
      total: tickets.length,
      byCategory,
      recentTickets
    };
  }
}

export const nftHelper = new NFTHelper();