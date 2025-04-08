
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EventResource } from "@/types";
import { FileText, MapPin, Calendar, Ticket, BadgePercent } from "lucide-react";

interface ResourceCardProps {
  resource: EventResource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'ticket':
        return <Ticket className="h-5 w-5 text-primary" />;
      case 'voucher':
        return <BadgePercent className="h-5 w-5 text-primary" />;
      case 'document':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'map':
        return <MapPin className="h-5 w-5 text-primary" />;
      case 'schedule':
        return <Calendar className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        {getResourceIcon(resource.type)}
        <h3 className="font-medium">{resource.title}</h3>
      </CardHeader>
      
      <CardContent>
        {resource.description && (
          <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
        )}
        
        {resource.url && resource.type === 'map' && (
          <div className="rounded-md overflow-hidden">
            <img 
              src={resource.url} 
              alt={resource.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {resource.content && (
          <div className="text-sm p-3 bg-secondary rounded-md">
            <p className="whitespace-pre-line">{resource.content}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
