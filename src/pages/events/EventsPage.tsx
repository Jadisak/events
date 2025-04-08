
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Layout from "@/components/layout/Layout";
import EventCard from "@/components/events/EventCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const EventsPage = () => {
  const { events, userTickets } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  // Create a set of event IDs the user has tickets for
  const userEventIds = new Set(userTickets.map(ticket => ticket.eventId));

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col space-y-4 md:space-y-8">
          <h1 className="text-3xl font-bold">งานอีเว้นต์ครั้งต่อไป</h1>

          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events by name, description, or location"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Events grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  hasTicket={userEventIds.has(event.id)}
                  customImage={
                    event.title.includes("Business Leadership Summit") 
                      ? "https://images.unsplash.com/photo-1733417401315-e74b5c3c14ef?q=80&w=2572&auto=format&fit=crop"
                      : undefined
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or check back later for new events.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;
