
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Event, Ticket } from "@/types";

interface TicketHeaderProps {
  event: Event;
  ticket: Ticket;
}

const TicketHeader = ({ event, ticket }: TicketHeaderProps) => {
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${event.title} Ticket`,
          text: `My ticket for ${event.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Ticket link copied to clipboard",
      });
    }
  };

  const handleDownload = () => {
    // In a real app, we would generate a PDF ticket
    toast({
      title: "Download Started",
      description: "Your ticket is being prepared for download",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
        <p className="text-muted-foreground">Ticket #{ticket.id}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default TicketHeader;
