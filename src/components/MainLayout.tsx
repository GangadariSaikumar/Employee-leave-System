
import React from 'react';
import { cn } from "@/lib/utils";
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Home, LogOut, PieChart, Settings, User, Users, Mail, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-tight text-lg text-primary">LeaveTrack</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
              <Home size={18} />
              Dashboard
            </Link>
            <Link to="/leave-requests" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
              <Calendar size={18} />
              Leave Requests
            </Link>
            <Link to="/team" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
              <Users size={18} />
              Team
            </Link>
            <Link to="/reports" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
              <PieChart size={18} />
              Reports
            </Link>
            <Link to="/contact" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent">
              <Mail size={18} />
              Contact Us
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                    <User size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="mb-2 px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name || user?.email}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="grid gap-1">
                    <Button variant="ghost" size="sm" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex items-center gap-1"
                  onClick={() => navigate('/login')}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
                <Button 
                  size="sm" 
                  className="hidden md:flex items-center gap-1"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className={cn("container py-8 md:py-12", className)}>
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:h-16 items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            LeaveTrack - Employee Leave Management Tool © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-primary">Contact Us</Link>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
