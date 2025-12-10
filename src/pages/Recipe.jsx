import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, Bookmark, Share2, ChefHat, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { getRecipeById } from "@/data/recipes";

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Get recipe from data or use default
  const recipe = id ? getRecipeById(id) : null;

  // Fallback recipe for /recipe route (from AI generation)
  const defaultRecipe = {
    id: 0,
    title: "Garlic Butter Pasta with Cherry Tomatoes",
    description: "A quick and delicious pasta dish bursting with fresh flavors",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop",
    time: "25 min",
    servings: 4,
    difficulty: "Easy",
    category: "Italian",
    calories: 420,
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
    nutrition: { calories: "420", protein: "12g", carbs: "58g", fat: "16g" },
  };

  const displayRecipe = recipe || defaultRecipe;

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Recipe saved!",
      description: isSaved ? "Recipe removed from your collection" : "Recipe added to your collection",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Recipe link has been copied to clipboard",
      });
    } catch {
      toast({
        title: "Share",
        description: "Share this recipe with friends!",
      });
    }
  };

  const toggleStep = (index) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 hover-scale"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl hover-scale"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant={isSaved ? "default" : "outline"}
              size="icon"
              className="rounded-xl hover-scale"
              onClick={handleSave}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Recipe Hero */}
        <Card className="border-border shadow-medium overflow-hidden animate-fade-in">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={displayRecipe.image} 
              alt={displayRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">
                  {displayRecipe.category}
                </Badge>
                <Badge variant="secondary" className="bg-background/20 text-background border-0">
                  {displayRecipe.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">{displayRecipe.title}</h1>
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ChefHat className="h-5 w-5" />
              <span className="text-sm font-medium">AI-Powered Recipe</span>
            </div>
            <p className="text-muted-foreground text-lg">{displayRecipe.description}</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-1.5 px-4 py-2 rounded-xl text-sm">
                <Clock className="h-4 w-4" />
                {displayRecipe.time}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-4 py-2 rounded-xl text-sm">
                <Users className="h-4 w-4" />
                {displayRecipe.servings} servings
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-4 py-2 rounded-xl text-sm">
                <Flame className="h-4 w-4" />
                {displayRecipe.calories} cal
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Info */}
        <Card className="border-border animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <span className="text-2xl">🥗</span>
              Nutrition per Serving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(displayRecipe.nutrition).map(([key, value]) => (
                <div key={key} className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{value}</p>
                  <p className="text-sm text-muted-foreground capitalize mt-1">{key}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="border-border animate-fade-in" style={{ animationDelay: "150ms" }}>
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              Ingredients
              <Badge variant="secondary" className="ml-auto">
                {displayRecipe.ingredients.length} items
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {displayRecipe.ingredients.map((ingredient, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-foreground">{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-border animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <span className="text-2xl">👨‍🍳</span>
              Cooking Instructions
              <Badge variant="secondary" className="ml-auto">
                {completedSteps.length}/{displayRecipe.steps.length} done
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {displayRecipe.steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                return (
                  <li 
                    key={index} 
                    onClick={() => toggleStep(index)}
                    className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isCompleted 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      isCompleted 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </div>
                    <p className={`pt-2 transition-colors ${isCompleted ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {step}
                    </p>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <Button 
            className="flex-1 rounded-xl h-14 text-lg gap-2 hover-scale" 
            onClick={handleSave}
          >
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save Recipe"}
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 rounded-xl h-14 text-lg gap-2 hover-scale"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}