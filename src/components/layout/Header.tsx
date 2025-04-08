
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { QrCode, Ticket, Calendar, User as UserIcon, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { currentUser, logout } = useApp();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: "Events", path: "/events", icon: Calendar },
    { label: "My Tickets", path: "/tickets", icon: Ticket },
    { label: "Scan QR", path: "/scan", icon: QrCode },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <QrCode className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold gradient-text">EventAccessHub</span>
        </Link>

        {/* Mobile menu button */}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Navigation - Overlay */}
        {isMobile && (
          <div
            className={cn(
              "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300",
              isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <div className="fixed inset-y-0 right-0 w-3/4 bg-white p-6 shadow-lg dark:bg-card">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <QrCode className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">EventAccessHub</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-foreground"
                      onClick={closeMenu}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6">
                  {currentUser ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 rounded-md bg-secondary px-4 py-3">
                        <UserIcon className="h-5 w-5 text-primary" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{currentUser.name}</span>
                          <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2" 
                        onClick={() => {
                          logout();
                          closeMenu();
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button asChild variant="default" className="w-full" onClick={closeMenu}>
                        <Link to="/login">Log in ลงชื่อเข้าใช้</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full" onClick={closeMenu}>
                        <Link to="/register">Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth buttons */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1">
                  <UserIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
