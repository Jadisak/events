
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeData } from "@/types";

interface QRCodeGeneratorProps {
  data: QRCodeData;
  size?: number;
}

const QRCodeGenerator = ({ data, size = 200 }: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    // In a real app, we would generate a QR code using a library like qrcode.react
    // For this mock, we'll use a placeholder
    const jsonData = JSON.stringify(data);
    const encodedData = encodeURIComponent(jsonData);
    
    // Using a placeholder QR code service - in a real app you'd generate this client-side or server-side
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`);
  }, [data, size]);

  return (
    <Card className="qr-container border-none shadow-lg">
      <CardContent className="flex items-center justify-center p-0">
        {qrCodeUrl ? (
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            className="rounded-lg"
            width={size} 
            height={size} 
          />
        ) : (
          <div 
            className="flex items-center justify-center bg-secondary rounded-lg animate-pulse"
            style={{ width: size, height: size }}
          >
            <span className="text-muted-foreground">Generating...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
