import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const nutrients = [
  { name: "Protein", current: 45, target: 60, unit: "g", status: "low", color: "text-orange-500" },
  { name: "Carbs", current: 180, target: 250, unit: "g", status: "good", color: "text-green-500" },
  { name: "Fats", current: 65, target: 70, unit: "g", status: "good", color: "text-green-500" },
  { name: "Fiber", current: 15, target: 30, unit: "g", status: "low", color: "text-orange-500" },
  { name: "Vitamin C", current: 40, target: 90, unit: "mg", status: "low", color: "text-red-500" },
  { name: "Iron", current: 8, target: 18, unit: "mg", status: "low", color: "text-orange-500" },
];

const healthInsights = [
  {
    type: "warning",
    title: "Low Protein Intake",
    description: "You're consuming 25% less protein than recommended. This may affect muscle recovery and energy levels.",
  },
  {
    type: "warning",
    title: "Insufficient Fiber",
    description: "Your fiber intake is 50% below target. Consider adding more whole grains, fruits, and vegetables.",
  },
  {
    type: "critical",
    title: "Vitamin C Deficiency",
    description: "Your Vitamin C levels are critically low. This can weaken your immune system. Add citrus fruits or bell peppers.",
  },
];

export default function Nutrients() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Activity className="h-4 w-4" />
            <span>Nutrition Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Daily Nutrient Report
          </h1>
          <p className="text-muted-foreground">
            Your personalized nutrition breakdown and health insights
          </p>
        </div>

        {/* Nutrient Breakdown */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display">Nutrient Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {nutrients.map((nutrient) => {
              const percentage = (nutrient.current / nutrient.target) * 100;
              return (
                <div key={nutrient.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{nutrient.name}</span>
                      <Badge
                        variant={nutrient.status === "good" ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {nutrient.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {nutrient.current}/{nutrient.target} {nutrient.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Health Insights */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-l-4 ${
                  insight.type === "critical"
                    ? "bg-destructive/10 border-destructive"
                    : "bg-orange-500/10 border-orange-500"
                }`}
              >
                <div className="flex gap-3">
                  {insight.type === "critical" ? (
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Button */}
        <Card className="border-border bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                  Get Personalized Suggestions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover recipes that can help balance your nutrition
                </p>
              </div>
              <Link to="/suggestions">
                <Button size="lg" className="rounded-xl gap-2">
                  <TrendingUp className="h-4 w-4" />
                  View Suggestions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
