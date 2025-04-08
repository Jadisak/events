
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket as TicketIcon,
  Share2,
} from "lucide-react";
import { formatDate, formatShortDate, formatTime } from "@/lib/date-utils";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventDetails, userTickets, registerForEvent, currentUser } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticketType, setTicketType] = useState("Standard");

  const event = eventId ? getEventDetails(eventId) : undefined;
  
  // Check if user has a ticket for this event
  const userTicket = userTickets.find(ticket => ticket.eventId === eventId);
  
  if (!event) {
    return (
      <Layout>
        <div className="container px-4 py-12 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/events")}>Browse Events</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleRegister = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to register for this event",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (registerForEvent(event.id, ticketType)) {
      // In a real app, we would create a ticket and then redirect
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${event.title}`,
      });
      
      // Simulate ticket creation and redirect to ticket page
      setTimeout(() => {
        navigate(`/tickets/${event.id}`);
      }, 1000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      });
    }
  };

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Event banner */}
        <div className="relative w-full rounded-lg overflow-hidden aspect-[21/9] mb-6 md:mb-8">
          <img
            src={event.bannerImage || "xhttps://images.unsplash.com/photo-1544531586-fde5298cdd40"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-3">{formatShortDate(event.startDate)}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
              </div>
              <p className="text-lg">{event.description}</p>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Date & Time</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(event.startDate)} to<br />{formatDate(event.endDate)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Organizer</h3>
                      <p className="text-sm text-muted-foreground">Event Access Hub</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-start gap-4">
                    <TicketIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Ticket Types</h3>
                      <p className="text-sm text-muted-foreground">Standard, VIP</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Registration card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Registration</h2>
                  {userTicket ? (
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      You're registered for this event
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      Secure your spot at this event
                    </p>
                  )}
                </div>

                {userTicket ? (
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/tickets/${userTicket.id}`)}
                  >
                    <TicketIcon className="mr-2 h-4 w-4" />
                    View Ticket
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Ticket Type
                      </label>
                      <Select 
                        value={ticketType}
                        onValueChange={setTicketType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a ticket type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleRegister}
                    >
                      Register Now
                    </Button>
                  </>
                )}

                <Separator />

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailsPage;
