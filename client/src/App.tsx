import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AnimatedServicesBackground from "@/components/AnimatedServicesBackground";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import BookNow from "@/pages/BookNow";
import LoginAdmin from "@/pages/LoginAdmin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminServicePackages from "@/pages/AdminServicePackages";
import AdminCustomersReviews from "@/pages/AdminCustomersReviews";
import AdminOurDoctors from "@/pages/AdminOurDoctors";
import AdminOurPartners from "@/pages/AdminOurPartners";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/blog" component={Blog} />
      <Route path="/book-now" component={BookNow} />
      <Route path="/login-admin" component={LoginAdmin} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin/service-packages" component={AdminServicePackages} />
      <Route path="/admin/customers-reviews" component={AdminCustomersReviews} />
      <Route path="/admin/about/our-doctors" component={AdminOurDoctors} />
      <Route path="/admin/about/our-partners" component={AdminOurPartners} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <AnimatedServicesBackground />
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
