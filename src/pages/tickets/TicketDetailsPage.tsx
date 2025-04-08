
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketHeader from "@/components/tickets/TicketHeader";
import TicketInfoTab from "@/components/tickets/TicketInfoTab";
import EventDetailsTab from "@/components/tickets/EventDetailsTab";
import ResourcesTab from "@/components/tickets/ResourcesTab";
import NotFoundTicket from "@/components/tickets/NotFoundTicket";

const TicketDetailsPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { getTicketById, getEventById, getEventResources } = useApp();
  const [activeTab, setActiveTab] = useState("ticket");

  const ticket = ticketId ? getTicketById(ticketId) : undefined;
  const event = ticket ? getEventById(ticket.eventId) : undefined;
  const resources = event ? getEventResources(event.id) : [];

  const qrCodeData = ticket ? {
    ticketId: ticket.id,
    userId: ticket.userId,
    eventId: ticket.eventId,
    timestamp: new Date().toISOString(),
  } : undefined;

  if (!ticket || !event) {
    return (
      <Layout>
        <div className="container px-4 py-12 md:px-6">
          <NotFoundTicket />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <TicketHeader event={event} ticket={ticket} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ticket">Ticket</TabsTrigger>
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Ticket Tab */}
            <TabsContent value="ticket" className="py-4">
              <TicketInfoTab 
                event={event} 
                ticket={ticket} 
                qrCodeData={qrCodeData!} 
              />
            </TabsContent>

            {/* Event Details Tab */}
            <TabsContent value="details" className="py-4">
              <EventDetailsTab event={event} />
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="py-4">
              <ResourcesTab resources={resources} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetailsPage;
