import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Globe, Moon, Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-3xl px-4 py-8 space-y-6">
        {/* Profile Header */}
        <Card className="border-border shadow-medium">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-foreground">John Doe</h2>
                <p className="text-muted-foreground">john.doe@example.com</p>
                <div className="flex gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-primary">24</p>
                    <p className="text-muted-foreground">Recipes</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-secondary">8</p>
                    <p className="text-muted-foreground">Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center gap-2">
                  <Moon className="h-4 w-4 text-primary" />
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode theme
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive cooking tips and updates
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-12 rounded-xl"
            >
              <User className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
