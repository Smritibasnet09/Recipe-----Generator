import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const healthGoals = [
  { label: "Increase Protein", status: "priority" },
  { label: "Boost Fiber", status: "important" },
  { label: "Add Vitamin C", status: "critical" },
];

const suggestions = [
  {
    title: "Grilled Salmon with Quinoa",
    description: "High in protein and omega-3s, perfect for muscle recovery",
    time: "35 min",
    calories: 520,
    keyNutrients: ["Protein: 42g", "Omega-3", "Vitamin D"],
    healthBenefit: "Addresses protein deficiency",
  },
  {
    title: "Mediterranean Chickpea Bowl",
    description: "Fiber-rich meal with fresh vegetables and healthy fats",
    time: "20 min",
    calories: 380,
    keyNutrients: ["Fiber: 15g", "Iron", "Vitamin C"],
    healthBenefit: "Boosts fiber and iron intake",
  },
  {
    title: "Citrus Berry Smoothie Bowl",
    description: "Packed with Vitamin C and antioxidants",
    time: "10 min",
    calories: 290,
    keyNutrients: ["Vitamin C: 180mg", "Antioxidants", "Fiber"],
    healthBenefit: "Addresses Vitamin C deficiency",
  },
  {
    title: "Lentil & Spinach Curry",
    description: "Plant-based protein with iron and fiber",
    time: "40 min",
    calories: 420,
    keyNutrients: ["Protein: 18g", "Iron: 8mg", "Fiber: 12g"],
    healthBenefit: "Complete nutrient boost",
  },
];

export default function Suggestions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Personalized for You</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Health Suggestions
          </h1>
          <p className="text-muted-foreground">
            Recipes tailored to your nutritional needs
          </p>
        </div>

        {/* Health Goals */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Your Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {healthGoals.map((goal, index) => (
                <Badge
                  key={index}
                  variant={
                    goal.status === "critical"
                      ? "destructive"
                      : goal.status === "priority"
                      ? "default"
                      : "secondary"
                  }
                  className="px-3 py-1.5"
                >
                  {goal.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggested Recipes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Recommended Recipes
          </h2>
          {suggestions.map((recipe, index) => (
            <Card key={index} className="border-border hover:shadow-medium transition-all">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl flex-shrink-0">
                    🍽️
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {recipe.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {recipe.time}
                      </Badge>
                      <Badge variant="outline">{recipe.calories} cal</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-600">
                          {recipe.healthBenefit}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recipe.keyNutrients.map((nutrient, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-accent/50 text-accent-foreground"
                          >
                            {nutrient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to="/recipe">
                      <Button variant="outline" className="rounded-xl">
                        View Recipe
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
