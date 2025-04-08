
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Event } from "@/types";

interface EventDetailsTabProps {
  event: Event;
}

const EventDetailsTab = ({ event }: EventDetailsTabProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">About the Event / สัมมนาประจำปี 2568</h3>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Event Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{formatDate(event.startDate)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">
                    {new Date(event.startDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} - {new Date(event.endDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetailsTab;
