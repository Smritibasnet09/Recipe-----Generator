import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Clock, Users, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Generate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [dietType, setDietType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleGenerate = () => {
    if (!ingredients.trim()) {
      toast({
        title: "Missing ingredients",
        description: "Please enter at least one ingredient",
        variant: "destructive",
      });
      return;
    }

    // Navigate to recipe output with data
    navigate("/recipe", {
      state: { ingredients, cookingTime, dietType, difficulty },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-3xl px-4 py-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Wand2 className="h-4 w-4" />
            <span>AI Recipe Generator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Create Your Perfect Recipe
          </h1>
          <p className="text-muted-foreground">
            Tell us what you have, and we'll create a delicious recipe just for you
          </p>
        </div>

        <Card className="border-border shadow-medium">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ingredients" className="text-base font-semibold">
                Ingredients
              </Label>
              <Input
                id="ingredients"
                placeholder="e.g., chicken, tomatoes, garlic, pasta..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="h-12 rounded-xl"
              />
              <p className="text-sm text-muted-foreground">Separate ingredients with commas</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time" className="text-base font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Cooking Time
                </Label>
                <Select value={cookingTime} onValueChange={setCookingTime}>
                  <SelectTrigger id="time" className="h-12 rounded-xl">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Under 15 minutes</SelectItem>
                    <SelectItem value="30">15-30 minutes</SelectItem>
                    <SelectItem value="60">30-60 minutes</SelectItem>
                    <SelectItem value="60+">Over 1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-base font-semibold flex items-center gap-2">
                  <Flame className="h-4 w-4 text-primary" />
                  Difficulty
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty" className="h-12 rounded-xl">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet" className="text-base font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Dietary Preferences
              </Label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger id="diet" className="h-12 rounded-xl">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No restrictions</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten-free</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              size="lg"
              className="w-full h-14 rounded-xl text-base gap-2 shadow-soft hover:shadow-medium transition-all"
              onClick={handleGenerate}
            >
              <Wand2 className="h-5 w-5" />
              Generate Recipe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
