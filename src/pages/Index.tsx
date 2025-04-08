
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Calendar, Ticket } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Layout from "@/components/layout/Layout";
import EventCard from "@/components/events/EventCard";

const Index = () => {
  const { events, currentUser } = useApp();
  const navigate = useNavigate();
  
  // Show first 3 events
  const featuredEvents = events.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter gradient-text">
                One QR Code for Your Entire Event Experience
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Simplify event access with our all-in-one QR code system. Tickets, vouchers, maps, schedules, and more - all in one place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {currentUser ? (
                <>
                  <Button 
                    size="lg" 
                    className="gap-2"
                    onClick={() => navigate("/events")}
                  >
                    <Calendar className="h-5 w-5" />
                    Explore Events
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2"
                    onClick={() => navigate("/tickets")}
                  >
                    <Ticket className="h-5 w-5" />
                    My Tickets
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="gap-2"
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Everything You Need in One QR Code
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Our platform provides a seamless experience for event organizers and attendees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Access</h3>
              <p className="text-center text-muted-foreground">
                One QR code provides access to the event, food vouchers, and exclusive areas.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Event Information</h3>
              <p className="text-center text-muted-foreground">
                Access event schedules, maps, and important documents instantly.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contactless Experience</h3>
              <p className="text-center text-muted-foreground">
                Reduce physical touchpoints and create a smoother event experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Featured Events
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Discover upcoming events and secure your tickets today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                // Use the high-quality business image for Leadership Summit
                customImage={
                  event.title.includes("Business Leadership Summit") 
                    ? "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop" 
                    : undefined
                }
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/events")}
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Ready to Transform Your Event Experience?
            </h2>
            <p className="max-w-[700px]">
              Join thousands of event organizers and attendees who are simplifying their event management with our platform.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate(currentUser ? "/events" : "/register")}
              className="mt-4"
            >
              {currentUser ? "Explore Events" : "Get Started Today"}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
