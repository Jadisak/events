
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User } from "lucide-react";
import { Event } from "@/types";
import { formatDate } from "@/lib/date-utils";

interface EventCardProps {
  event: Event;
  hasTicket?: boolean;
  customImage?: string;
}

const EventCard = ({ event, hasTicket = false, customImage }: EventCardProps) => {
  // Use customImage if provided, otherwise fall back to event.bannerImage or the default image
  const imageUrl = customImage || event.bannerImage || "xhttps://images.unsplash.com/photo-1492684223066-81342ee5ff30";
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageUrl}
          alt={event.title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        
        {hasTicket && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Registered
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold line-clamp-1">{event.title}</h3>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <time dateTime={event.startDate}>{formatDate(event.startDate)}</time>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        {hasTicket ? (
          <Button asChild variant="secondary" className="w-full">
            <Link to={`/tickets/${event.id}`}>View Ticket</Link>
          </Button>
        ) : (
          <Button asChild variant="default" className="w-full">
            <Link to={`/events/${event.id}`}>View Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
