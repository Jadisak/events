
import { createContext, useContext, useState, ReactNode } from "react";
import { Event, EventResource, Ticket, User, QRCodeData } from "../types";
import { getEventById as fetchEventById, getUserById, mockUsers, mockEvents, mockTickets, getEventResources as fetchEventResources, getUserTickets } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AppContextType {
  currentUser: User | null;
  events: Event[];
  userTickets: Ticket[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  getEventDetails: (eventId: string) => Event | undefined;
  getEventResourcesByEvent: (eventId: string) => EventResource[];
  getTicketsByUser: (userId: string) => Ticket[];
  registerForEvent: (eventId: string, ticketType: string) => boolean;
  getTicketById: (ticketId: string) => Ticket | undefined;
  getEventById: (eventId: string) => Event | undefined;
  getEventResources: (eventId: string) => EventResource[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    mockUsers[0] || null
  );
  const { toast } = useToast();

  const login = (email: string, password: string): boolean => {
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const getEventDetails = (eventId: string): Event | undefined => {
    return fetchEventById(eventId);
  };

  const getEventResourcesByEvent = (eventId: string): EventResource[] => {
    return fetchEventResources(eventId);
  };

  const getTicketsByUser = (userId: string): Ticket[] => {
    return getUserTickets(userId);
  };

  const registerForEvent = (eventId: string, ticketType: string): boolean => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to register for events",
        variant: "destructive",
      });
      return false;
    }

    const existingTicket = mockTickets.find(
      ticket => ticket.userId === currentUser.id && ticket.eventId === eventId
    );

    if (existingTicket) {
      toast({
        title: "Already registered",
        description: "You already have a ticket for this event",
        variant: "destructive",
      });
      return false;
    }

    const event = fetchEventById(eventId);
    if (event) {
      toast({
        title: "Registration successful",
        description: `You are now registered for ${event.title}`,
      });
      return true;
    }

    toast({
      title: "Registration failed",
      description: "Could not find the specified event",
      variant: "destructive",
    });
    return false;
  };

  const getTicketById = (ticketId: string): Ticket | undefined => {
    return mockTickets.find(ticket => ticket.id === ticketId);
  };

  const getEventById = (eventId: string): Event | undefined => {
    return fetchEventById(eventId);
  };

  const getEventResources = (eventId: string): EventResource[] => {
    return fetchEventResources(eventId);
  };

  const userTickets = currentUser ? getUserTickets(currentUser.id) : [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        events: mockEvents,
        userTickets,
        login,
        logout,
        getEventDetails,
        getEventResourcesByEvent,
        getTicketsByUser,
        registerForEvent,
        getTicketById,
        getEventById,
        getEventResources
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
