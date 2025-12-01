import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function MealTracker() {
  const [meals, setMeals] = useState([
    { id: 1, name: "Oatmeal with Berries", time: "Breakfast", calories: 320 },
    { id: 2, name: "Grilled Chicken Salad", time: "Lunch", calories: 450 },
  ]);
  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState("Breakfast");
  const [calories, setCalories] = useState("");
  const { toast } = useToast();

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const handleAddMeal = () => {
    if (!mealName || !calories) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newMeal = {
      id: Date.now(),
      name: mealName,
      time: mealTime,
      calories: parseInt(calories),
    };

    setMeals([...meals, newMeal]);
    setMealName("");
    setCalories("");
    toast({
      title: "Meal added!",
      description: "Your meal has been logged successfully",
    });
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter((meal) => meal.id !== id));
    toast({
      title: "Meal removed",
      description: "Meal has been removed from your log",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Calendar className="h-4 w-4" />
            <span>Daily Tracking</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Meal Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your daily meals and monitor your nutrition
          </p>
        </div>

        {/* Daily Summary */}
        <Card className="border-border shadow-medium">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Today's Total</p>
                <p className="text-4xl font-display font-bold text-primary">{totalCalories}</p>
                <p className="text-sm text-muted-foreground">calories</p>
              </div>
              <Link to="/nutrients">
                <Button className="gap-2 rounded-xl">
                  <TrendingUp className="h-4 w-4" />
                  View Nutrition
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Add Meal Form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Add Meal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Meal name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="rounded-xl"
              />
              <select
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                className="h-10 rounded-xl border border-input bg-background px-3 py-2"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
              <Input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Button onClick={handleAddMeal} className="w-full rounded-xl gap-2">
              <Plus className="h-4 w-4" />
              Add Meal
            </Button>
          </CardContent>
        </Card>

        {/* Meals List */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Today's Meals</CardTitle>
          </CardHeader>
          <CardContent>
            {meals.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No meals logged yet. Add your first meal above!
              </p>
            ) : (
              <div className="space-y-3">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{meal.name}</h3>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-primary">{meal.calories}</p>
                        <p className="text-xs text-muted-foreground">cal</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
