
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundTicket = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl text-pink-700 font-bold mb-4">ไม่สามารถสร้างตั๋วได้</h1>
      <p className="text-muted-foreground mb-6">
        ขออภัยค่ะระบบไม่สามารถสร้างตั๋วให้คุณได้ กรุณาตรวจสอบการลงทะเบียนอีกครั้ง
      </p>
      <Button onClick={() => navigate("/tickets")}>View My Tickets</Button>
    </div>
  );
};

export default NotFoundTicket;
