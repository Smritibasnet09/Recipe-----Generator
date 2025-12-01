import { ChefHat } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">ChefMate</h1>
            <p className="text-xs text-muted-foreground">AI Cooking Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
};
