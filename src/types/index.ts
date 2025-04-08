
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'participant';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: string;
  bannerImage?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  qrCode: string;
  isUsed: boolean;
  issuedAt: string;
}

export interface EventResource {
  id: string;
  eventId: string;
  type: 'ticket' | 'voucher' | 'document' | 'map' | 'schedule';
  title: string;
  description?: string;
  url?: string;
  content?: string;
}

export interface QRCodeData {
  ticketId: string;
  userId: string;
  eventId: string;
  timestamp: string;
}
