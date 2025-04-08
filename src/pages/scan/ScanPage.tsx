
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import QRCodeScanner from "@/components/qr/QRCodeScanner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, ArrowRight, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeData } from "@/types";
import { useApp } from "@/context/AppContext";

const ScanPage = () => {
  const [scanResult, setScanResult] = useState<QRCodeData | null>(null);
  const [scanStatus, setScanStatus] = useState<"success" | "error" | null>(null);
  const { getTicketById, getEventById, currentUser } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScan = (data: string) => {
    try {
      // Parse the QR code data
      const parsedData: QRCodeData = JSON.parse(data);
      setScanResult(parsedData);
      
      // Validate the ticket
      const ticket = getTicketById(parsedData.ticketId);
      
      if (ticket && !ticket.isUsed) {
        setScanStatus("success");
        
        const event = getEventById(ticket.eventId);
        
        toast({
          title: "Valid Ticket",
          description: `Ticket for ${event?.title || 'event'} validated successfully`,
        });
      } else {
        setScanStatus("error");
        
        toast({
          title: "Invalid Ticket",
          description: ticket?.isUsed 
            ? "This ticket has already been used" 
            : "This ticket is not valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      
      setScanStatus("error");
      setScanResult(null);
      
      toast({
        title: "Invalid QR Code",
        description: "The scanned QR code is not a valid event ticket",
        variant: "destructive",
      });
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setScanStatus(null);
  };

  const handleViewTicket = () => {
    if (scanResult) {
      navigate(`/tickets/${scanResult.ticketId}`);
    }
  };

  // Always show scanner, bypassing login check
  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Scan QR Code</h1>
          
          {!scanResult ? (
            <Card>
              <CardHeader className="text-center pb-2">
                <h2 className="text-xl font-semibold">Scan a Ticket QR Code</h2>
                <p className="text-sm text-muted-foreground">
                  Point your camera at the QR code on a ticket to validate it
                </p>
              </CardHeader>
              <CardContent className="pt-4">
                <QRCodeScanner onScan={handleScan} />
              </CardContent>
            </Card>
          ) : (
            <Card className={scanStatus === "success" ? "border-green-500" : "border-red-500"}>
              <CardHeader className="text-center relative pb-2">
                <div className="absolute top-3 right-3">
                  {scanStatus === "success" ? (
                    <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 p-1 rounded-full">
                      <Check className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 p-1 rounded-full">
                      <X className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold">Scan Result</h2>
                <p className="text-sm text-muted-foreground">
                  {scanStatus === "success" 
                    ? "The ticket has been validated successfully" 
                    : "There was an issue with this ticket"}
                </p>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {scanStatus === "success" && (
                  <div className="p-4 bg-secondary rounded-md">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Ticket ID:</span>
                        <span className="text-sm font-mono">{scanResult.ticketId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Event ID:</span>
                        <span className="text-sm font-mono">{scanResult.eventId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">User ID:</span>
                        <span className="text-sm font-mono">{scanResult.userId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Timestamp:</span>
                        <span className="text-sm">{new Date(scanResult.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {scanStatus === "success" && (
                    <Button 
                      className="flex items-center justify-center gap-1" 
                      onClick={handleViewTicket}
                    >
                      View Ticket Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant={scanStatus === "success" ? "outline" : "default"} 
                    onClick={resetScan}
                  >
                    Scan Another Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ScanPage;
