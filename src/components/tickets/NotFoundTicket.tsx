
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundTicket = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The ticket you're looking for doesn't exist or has been removed.
      </p>
      <Button onClick={() => navigate("/tickets")}>View My Tickets</Button>
    </div>
  );
};

export default NotFoundTicket;
