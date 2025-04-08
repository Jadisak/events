
import ResourceCard from "@/components/resources/ResourceCard";
import { EventResource } from "@/types";

interface ResourcesTabProps {
  resources: EventResource[];
}

const ResourcesTab = ({ resources }: ResourcesTabProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Event Resources</h3>
      <p className="text-muted-foreground">
        Access all the resources you need for the event with your single QR code.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourcesTab;
