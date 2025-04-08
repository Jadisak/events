
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Camera, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
}

const QRCodeScanner = ({ onScan }: QRCodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // In a real app, we would use a library like react-qr-reader
  // For this mock implementation, we'll simulate scanning

  const startScanning = async () => {
    setIsScanning(true);
    
    try {
      // In a real app, we would request camera access and start scanning
      // For this mock, we'll just show the video element with the camera feed
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Simulate finding a QR code after a delay
        setTimeout(() => {
          const mockQRData = JSON.stringify({
            ticketId: "ticket1",
            userId: "user2",
            eventId: "event1",
            timestamp: new Date().toISOString()
          });
          
          onScan(mockQRData);
          stopScanning();
          
          toast({
            title: "QR Code Scanned",
            description: "Successfully scanned QR code",
          });
        }, 3000);
      } else {
        toast({
          title: "Camera access not available",
          description: "Your device does not support camera access or permission was denied",
          variant: "destructive",
        });
        setIsScanning(false);
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    
    // Stop the camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isScanning) {
        stopScanning();
      }
    };
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center">
      {!isScanning ? (
        <Button 
          onClick={startScanning} 
          className="flex items-center gap-2"
          size="lg"
        >
          <QrCode className="h-5 w-5" />
          Scan QR Code
        </Button>
      ) : (
        <Card className="relative overflow-hidden w-full max-w-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm" 
            onClick={stopScanning}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <CardContent className="p-0">
            <div className="relative aspect-square max-h-[80vh] overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-2/3 h-2/3">
                  {/* Scanner frame overlay */}
                  <div className="absolute inset-0 border-2 border-primary rounded-lg" />
                  
                  {/* Corner indicators */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />
                  
                  {/* Scanning animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse-slow shadow-lg" 
                    style={{ animationDuration: '2s' }} />
                </div>
              </div>
              
              <div className="absolute bottom-0 inset-x-0 bg-background/80 backdrop-blur-sm p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Camera className="h-5 w-5 text-primary animate-pulse" />
                  <p className="text-sm font-medium">Position QR code within the frame</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRCodeScanner;
