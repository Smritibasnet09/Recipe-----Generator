import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Recipe from "./pages/Recipe";
import Chat from "./pages/Chat";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import MealTracker from "./pages/MealTracker";
import Nutrients from "./pages/Nutrients";
import Suggestions from "./pages/Suggestions";
import Auth from "./pages/Auth";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tracker" element={<MealTracker />} />
                <Route path="/nutrients" element={<Nutrients />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Navigation />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
