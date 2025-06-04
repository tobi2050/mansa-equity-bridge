
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import EntrepreneurProjects from "./pages/EntrepreneurProjects";
import EntrepreneurCreate from "./pages/EntrepreneurCreate";
import EntrepreneurChat from "./pages/EntrepreneurChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NavigationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/complete-profile" element={<CompleteProfilePage />} />
              <Route path="/entrepreneur-projects" element={<EntrepreneurProjects />} />
              <Route path="/entrepreneur-create" element={<EntrepreneurCreate />} />
              <Route path="/entrepreneur-chat" element={<EntrepreneurChat />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NavigationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
