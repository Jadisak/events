
import { useApp } from "@/context/AppContext";
import Layout from "@/components/layout/Layout";
import TicketCard from "@/components/tickets/TicketCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ticket, CalendarPlus } from "lucide-react";

const TicketsPage = () => {
  const { userTickets, getEventDetails, currentUser } = useApp();
  const navigate = useNavigate();

  // Always show tickets content, bypassing login check
  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold mb-6">บัตรงานสัมมนา</h1>

        {userTickets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTickets.map((ticket) => {
              const event = getEventDetails(ticket.eventId);
              if (!event) return null;
              
              return (
                <TicketCard 
                  key={ticket.id}
                  ticket={ticket}
                  event={event}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No Tickets Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              You haven't registered for any events yet. Browse our events and get your tickets!
            </p>
            <Button onClick={() => navigate("/events")}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Browse Events
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TicketsPage;
