
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import QRCodeGenerator from "@/components/qr/QRCodeGenerator";
import { Event, Ticket, QRCodeData } from "@/types";

interface TicketInfoTabProps {
  event: Event;
  ticket: Ticket;
  qrCodeData: QRCodeData;
}

const TicketInfoTab = ({ event, ticket, qrCodeData }: TicketInfoTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="bg-primary text-primary-foreground text-center py-4 -mx-6 rounded-t-lg">
          <h2 className="text-xl font-bold">{ticket.ticketType} Ticket</h2>
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <time dateTime={event.startDate}>
                {new Date(event.startDate).toLocaleDateString()}
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <time dateTime={event.startDate}>
                {new Date(event.startDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
        </div>

        <div className="py-4">
          <p className="text-center text-sm text-muted-foreground mb-3">
            Present this QR code at the event
          </p>
          <QRCodeGenerator data={qrCodeData} size={250} />
        </div>

        <Separator className="my-6" />

        <div className="w-full grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Ticket ID</p>
            <p className="text-muted-foreground font-mono">{ticket.id}</p>
          </div>
          <div>
            <p className="font-medium">Ticket Type</p>
            <p className="text-muted-foreground">{ticket.ticketType}</p>
          </div>
          <div>
            <p className="font-medium">Issued Date</p>
            <p className="text-muted-foreground">
              {new Date(ticket.issuedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p className="text-green-600 dark:text-green-400">Active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketInfoTab;
