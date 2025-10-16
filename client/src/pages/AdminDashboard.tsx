import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import ECGAnimation from '@/components/ECGAnimation';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      setLocation('/login-admin');
    }
  }, [setLocation]);

  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center gap-4 p-4 border-b bg-[#264653]">
            <SidebarTrigger className="text-white" data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-display text-white" data-testid="text-dashboard-title">
              Admin Dashboard
            </h1>
          </header>
          <ECGAnimation />
          <main className="flex-1 overflow-auto p-6 bg-background">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-display mb-4" data-testid="text-welcome">
                Welcome to Admin Dashboard
              </h2>
              <p className="text-muted-foreground" data-testid="text-dashboard-description">
                Use the sidebar to navigate through the admin panel.
              </p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
