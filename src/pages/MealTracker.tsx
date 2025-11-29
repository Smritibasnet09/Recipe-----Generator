import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Trash2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type Meal = {
  id: number;
  name: string;
  time: string;
  calories: number;
};

export default function MealTracker() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: "Oatmeal with Berries", time: "8:00 AM", calories: 320 },
    { id: 2, name: "Chicken Salad", time: "1:00 PM", calories: 450 },
  ]);
  const [mealName, setMealName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleAddMeal = () => {
    if (!mealName.trim()) {
      toast({
        title: "Please enter a meal name",
        variant: "destructive",
      });
      return;
    }

    const newMeal: Meal = {
      id: Date.now(),
      name: mealName,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      calories: Math.floor(Math.random() * 400) + 200,
    };

    setMeals([...meals, newMeal]);
    setMealName("");
    toast({
      title: "Meal added",
      description: "Your meal has been logged successfully",
    });
  };

  const handleDelete = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
    toast({
      title: "Meal removed",
      description: "Meal has been deleted from your log",
    });
  };

  const handleAnalyze = () => {
    navigate("/nutrients");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
            <Activity className="h-4 w-4" />
            <span>Daily Tracker</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What Did You Eat Today?
          </h1>
          <p className="text-muted-foreground">
            Track your meals to get personalized health insights
          </p>
        </div>

        <Card className="border-border shadow-medium">
          <CardHeader>
            <CardTitle className="text-xl font-display">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Meals Logged</p>
                <p className="text-2xl font-bold text-foreground">{meals.length}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Calories</p>
                <p className="text-2xl font-bold text-foreground">{totalCalories}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-display">Add Meal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="What did you eat? (e.g., Grilled chicken with rice)"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddMeal()}
                className="flex-1"
              />
              <Button onClick={handleAddMeal} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-xl font-display font-semibold text-foreground">
            Today's Meals
          </h2>
          {meals.length === 0 ? (
            <Card className="border-border p-8 text-center">
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                  <Activity className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No meals logged yet today</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <Card
                  key={meal.id}
                  className="border-border hover:shadow-medium transition-all duration-300"
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {meal.name}
                      </h3>
                      <div className="flex gap-3 text-sm">
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {meal.time}
                        </Badge>
                        <Badge variant="outline">{meal.calories} cal</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(meal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {meals.length > 0 && (
          <Button
            onClick={handleAnalyze}
            className="w-full h-12 text-base font-medium"
            size="lg"
          >
            <Activity className="h-5 w-5 mr-2" />
            Analyze My Nutrition
          </Button>
        )}
      </div>
    </div>
  );
}
