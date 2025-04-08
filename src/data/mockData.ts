
import { Event, EventResource, Ticket, User } from "../types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "user2",
    name: "John Participant",
    email: "john@example.com",
    role: "participant",
  },
  {
    id: "user3",
    name: "Jane Participant",
    email: "jane@example.com",
    role: "participant",
  },
];

export const mockEvents: Event[] = [
  {
    id: "event1",
    title: "พบกับเทพยุทธ์แห่งปี",
    description: "สัมมนาเทคโนโลยีที่รวมผู้เชี่ยวชาญจากทั่วโลกเพื่อแบ่งปันความรู้และประสบการณ์ในวงการประกันชีวิต",
    startDate: "2025-06-15T12:00:00Z",
    endDate: "",
    location: "ห้องประชุมใหญ่, กรุงเทพฯ",
    organizerId: "user1",
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "event2",
    title: "Music Festival Summer 2025",
    description: "Three days of amazing music performances, food, and art installations in the heart of the city.",
    startDate: "2025-07-20T12:00:00Z",
    endDate: "2025-07-22T23:00:00Z",
    location: "City Park, Los Angeles",
    organizerId: "user1",
    bannerImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "event3",
    title: "Business Leadership Summit",
    description: "Connect with industry leaders and learn from their experiences in this exclusive summit focused on business growth and leadership.",
    startDate: "2025-08-10T08:30:00Z",
    endDate: "2025-08-11T17:00:00Z",
    location: "Grand Hotel Conference Center, New York",
    organizerId: "user1",
    bannerImage: "https://images.unsplash.com/photo-1544531586-fde5298cdd40",
  },
  {
    id: "event4",
    title: "สัมมนาผู้นำหน่วย 2025",
    description: "สัมมนาผู้นำหน่วยที่มุ่งเน้นการพัฒนาทักษะการเป็นผู้นำและการสร้างทีมงานที่มีประสิทธิภาพ",
    startDate: "2025-05-10T14:00:00Z",
    endDate: "",
    location: "ห้องประชุมโรงแรมแกรนด์, กรุงเทพฯ",
    organizerId: "user1",
    bannerImage: "https://images.unsplash.com/photo-1713946598186-8e28275719b9",
  },
];

export const mockTickets: Ticket[] = [
  {
    id: "ticket1",
    eventId: "event1",
    userId: "user2",
    ticketType: "VIP",
    qrCode: "qr-code-ticket1-user2-event1",
    isUsed: false,
    issuedAt: "2025-06-15T12:00:00Z",
  },
  {
    id: "ticket2",
    eventId: "event2",
    userId: "user2",
    ticketType: "Standard",
    qrCode: "qr-code-ticket2-user2-event2",
    isUsed: false,
    issuedAt: "2025-04-02T14:15:00Z",
  },
  {
    id: "ticket3",
    eventId: "event1",
    userId: "user3",
    ticketType: "Standard",
    qrCode: "qr-code-ticket3-user3-event1",
    isUsed: false,
    issuedAt: "2025-04-03T09:45:00Z",
  },
];

export const mockResources: EventResource[] = [
  // Event 1 Resources
  {
    id: "resource1",
    eventId: "event1",
    type: "ticket",
    title: "VIP Access Ticket",
    description: "Provides access to all conference areas, including VIP lounges and exclusive sessions.",
  },
  {
    id: "resource2",
    eventId: "event1",
    type: "voucher",
    title: "Lunch Voucher",
    description: "Redeemable for lunch at any food station within the conference venue.",
  },
  {
    id: "resource3",
    eventId: "event1",
    type: "document",
    title: "Conference Agenda",
    description: "Detailed schedule of all sessions and workshops.",
    content: "Day 1: Opening Keynote (9 AM), Workshop A (11 AM), Lunch (1 PM), Panel Discussion (2:30 PM), Networking Event (5 PM). Day 2: Technical Sessions (9 AM - 12 PM), Lunch (12 PM), Innovation Showcase (1:30 PM), Closing Keynote (4 PM).",
  },
  {
    id: "resource4",
    eventId: "event1",
    type: "map",
    title: "Venue Map",
    description: "Interactive map of the conference venue.",
    url: "xhttps://images.unsplash.com/photo-1722392493604-7382c3d0f646?w=900&auto=format&fit=crop",
  },
  {
    id: "resource5",
    eventId: "event1",
    type: "schedule",
    title: "Personal Schedule",
    description: "Your personalized schedule based on registered sessions.",
    content: "Day 1: Workshop A (11 AM - 12:30 PM, Room 101), Panel Discussion (2:30 PM - 4 PM, Main Hall). Day 2: Technical Session B (10 AM - 11:30 AM, Room 203), Innovation Showcase (1:30 PM - 3 PM, Exhibition Hall).",
  },
  
  // Event 2 Resources
  {
    id: "resource6",
    eventId: "event2",
    type: "ticket",
    title: "3-Day Festival Pass",
    description: "General admission to all festival areas for all three days.",
  },
  {
    id: "resource7",
    eventId: "event2",
    type: "voucher",
    title: "Food & Drink Tokens",
    description: "10 tokens for food and drinks at festival vendors.",
  },
  {
    id: "resource8",
    eventId: "event2",
    type: "map",
    title: "Festival Grounds Map",
    description: "Map showing all stages, food areas, restrooms, and first aid stations.",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "resource9",
    eventId: "event2",
    type: "schedule",
    title: "Performance Schedule",
    description: "Complete lineup of performances with times and stages.",
    content: "Main Stage: Artist A (2 PM - 3 PM), Artist B (4 PM - 5:30 PM), Headliner (8 PM - 10 PM). Second Stage: Artist C (1 PM - 2 PM), Artist D (3 PM - 4 PM), Artist E (6 PM - 7 PM).",
  },
  
  // Event 3 Resources
  {
    id: "resource10",
    eventId: "event3",
    type: "ticket",
    title: "Summit Access Badge",
    description: "Official access badge for all summit sessions and networking events.",
  },
  {
    id: "resource11",
    eventId: "event3",
    type: "document",
    title: "Speaker Profiles",
    description: "Biographical information about all summit speakers.",
    content: "Jane Smith: CEO of TechCorp with 15 years of industry experience. John Doe: Renowned business strategist and author of 'Business Revolution'. Sarah Johnson: Venture capitalist with over $500M in successful investments.",
  },
  {
    id: "resource12",
    eventId: "event3",
    type: "schedule",
    title: "Summit Agenda",
    description: "Full schedule of all summit sessions and breaks.",
    content: "Day 1: Registration (8 AM), Opening Remarks (9 AM), Keynote (9:30 AM), Coffee Break (10:30 AM), Panel: Future of Business (11 AM), Lunch (12:30 PM), Workshops (2 PM - 5 PM). Day 2: Breakfast Networking (8 AM), Industry Insights (9 AM), Strategy Session (11 AM), Closing Keynote (3 PM).",
  },
];

// Helper function to get resources for a specific event
export const getEventResources = (eventId: string): EventResource[] => {
  return mockResources.filter(resource => resource.eventId === eventId);
};

// Helper function to get user tickets
export const getUserTickets = (userId: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.userId === userId);
};

// Helper function to get ticket by ID
export const getTicketById = (ticketId: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket.id === ticketId);
};

// Helper function to get event by ID
export const getEventById = (eventId: string): Event | undefined => {
  return mockEvents.find(event => event.id === eventId);
};

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Helper function to get resources for a specific ticket
export const getTicketResources = (ticketId: string): EventResource[] => {
  const ticket = getTicketById(ticketId);
  if (!ticket) return [];
  return getEventResources(ticket.eventId);
};
