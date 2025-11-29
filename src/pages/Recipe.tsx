import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, Bookmark, Share2, ChefHat } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Recipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  // In a real app, this would come from AI generation
  const recipe = {
    title: "Garlic Butter Pasta with Cherry Tomatoes",
    description: "A quick and delicious pasta dish bursting with fresh flavors",
    image: "🍝",
    time: "25 minutes",
    servings: "4 servings",
    difficulty: "Easy",
    ingredients: [
      "400g spaghetti or linguine",
      "250g cherry tomatoes, halved",
      "4 cloves garlic, minced",
      "4 tbsp butter",
      "3 tbsp olive oil",
      "Fresh basil leaves",
      "Parmesan cheese, grated",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook pasta according to package directions",
      "While pasta cooks, heat olive oil and butter in a large skillet over medium heat",
      "Add minced garlic and sauté for 1-2 minutes until fragrant",
      "Add cherry tomatoes and cook for 5-7 minutes until they start to burst",
      "Season with salt, pepper, and red pepper flakes",
      "Drain pasta, reserving 1 cup of pasta water",
      "Add pasta to the skillet and toss to combine, adding pasta water as needed",
      "Remove from heat and stir in fresh basil and parmesan",
      "Serve immediately with extra parmesan on top",
    ],
    nutrition: {
      calories: "420",
      protein: "12g",
      carbs: "58g",
      fat: "16g",
    },
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved successfully!",
      description: isSaved ? "Recipe removed from your collection" : "Recipe added to your collection",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link copied!",
      description: "Recipe link has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            ← Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-xl ${isSaved ? "bg-primary text-primary-foreground" : ""}`}
              onClick={handleSave}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Recipe Hero */}
        <Card className="border-border shadow-medium overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 flex items-center justify-center text-8xl">
            {recipe.image}
          </div>
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI Generated Recipe</span>
            </div>
            <CardTitle className="text-3xl font-display">{recipe.title}</CardTitle>
            <p className="text-muted-foreground text-lg">{recipe.description}</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg">
                <Clock className="h-3.5 w-3.5" />
                {recipe.time}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg">
                <Users className="h-3.5 w-3.5" />
                {recipe.servings}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 rounded-lg">
                <Flame className="h-3.5 w-3.5" />
                {recipe.difficulty}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Nutrition Info */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Nutrition per Serving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              {Object.entries(recipe.nutrition).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-2xl font-bold text-primary">{value}</p>
                  <p className="text-sm text-muted-foreground capitalize">{key}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground">{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Cooking Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-foreground pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
