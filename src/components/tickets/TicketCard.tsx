
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Event } from "@/types";
import { CalendarClock, MapPin } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Link } from "react-router-dom";

interface TicketCardProps {
  ticket: Ticket;
  event: Event;
}

const TicketCard = ({ ticket, event }: TicketCardProps) => {
  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer animate-fade-in">
        <div className="relative h-24 bg-gradient-to-r from-primary to-purple-500">
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="font-semibold">
              {ticket.ticketType}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg">{event.title}</h3>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarClock className="h-4 w-4 text-primary" />
              <time dateTime={event.startDate}>{formatDate(event.startDate)}</time>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
          
          <div className="border border-dashed border-border rounded-md p-3 mt-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Ticket ID</p>
            <p className="text-sm font-mono font-medium">{ticket.id}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TicketCard;
