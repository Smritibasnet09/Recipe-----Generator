import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  TrendingUp,
  Clock,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Suggestion = {
  title: string;
  reason: string;
  time: string;
  calories: number;
  nutrients: string[];
  image: string;
  priority: "high" | "medium";
};

const suggestions: Suggestion[] = [
  {
    title: "Grilled Salmon with Quinoa",
    reason: "High protein to compensate for today's low intake",
    time: "30 min",
    calories: 450,
    nutrients: ["Protein", "Omega-3", "Vitamin D"],
    image: "🐟",
    priority: "high",
  },
  {
    title: "Spinach & Chickpea Salad",
    reason: "Boosts Vitamin C and adds fiber",
    time: "15 min",
    calories: 320,
    nutrients: ["Vitamin C", "Iron", "Fiber"],
    image: "🥗",
    priority: "high",
  },
  {
    title: "Vegetable Stir Fry with Tofu",
    reason: "Light meal with balanced nutrients",
    time: "25 min",
    calories: 380,
    nutrients: ["Protein", "Fiber", "Vitamins"],
    image: "🥘",
    priority: "medium",
  },
  {
    title: "Greek Yogurt with Berries",
    reason: "Quick protein boost for breakfast",
    time: "5 min",
    calories: 250,
    nutrients: ["Protein", "Calcium", "Antioxidants"],
    image: "🥣",
    priority: "medium",
  },
];

export default function Suggestions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerateRecipe = (title: string) => {
    toast({
      title: "Recipe generated!",
      description: `Now showing detailed recipe for ${title}`,
    });
    navigate("/recipe");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Lightbulb className="h-4 w-4" />
            <span>Personalized for You</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Meal Suggestions
          </h1>
          <p className="text-muted-foreground">
            Based on your nutrition analysis, here are healthy recipes to balance
            your diet
          </p>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 shadow-medium">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  Your Health Goals
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Increase protein intake by 25g
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Add more Vitamin C sources
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Reduce oil consumption
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-xl font-display font-semibold text-foreground">
            Recommended Recipes
          </h2>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                className={`border-border hover:shadow-medium transition-all duration-300 ${
                  suggestion.priority === "high" ? "border-primary/30" : ""
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl flex-shrink-0">
                      {suggestion.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {suggestion.title}
                        </h3>
                        {suggestion.priority === "high" && (
                          <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                            Priority
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {suggestion.reason}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {suggestion.time}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Flame className="h-3 w-3" />
                          {suggestion.calories} cal
                        </Badge>
                        {suggestion.nutrients.map((nutrient, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {nutrient}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        onClick={() => handleGenerateRecipe(suggestion.title)}
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        View Full Recipe
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-border shadow-soft">
          <CardContent className="p-6 text-center">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Need More Ideas?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our AI chef to get custom recipes based on your specific
              needs
            </p>
            <Button
              onClick={() => navigate("/chat")}
              variant="outline"
              className="gap-2"
            >
              Chat with AI Chef
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
