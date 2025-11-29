import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Nutrient = {
  name: string;
  current: number;
  target: number;
  unit: string;
  status: "low" | "good" | "high";
};

const nutrients: Nutrient[] = [
  { name: "Protein", current: 35, target: 60, unit: "g", status: "low" },
  { name: "Carbohydrates", current: 180, target: 250, unit: "g", status: "good" },
  { name: "Fats", current: 70, target: 65, unit: "g", status: "high" },
  { name: "Fiber", current: 15, target: 30, unit: "g", status: "low" },
  { name: "Vitamin C", current: 40, target: 90, unit: "mg", status: "low" },
  { name: "Iron", current: 12, target: 18, unit: "mg", status: "good" },
];

const healthInsights = [
  {
    type: "warning",
    title: "Low Protein Intake",
    description:
      "Your meal today has low protein (35g/60g). This may lead to muscle weakness and fatigue. Consider adding eggs, chicken, or lentils tomorrow.",
  },
  {
    type: "warning",
    title: "Missing Vitamin C",
    description:
      "You're missing Vitamin C, which can reduce immunity and slow wound healing. Add citrus fruits, bell peppers, or tomatoes to your diet.",
  },
  {
    type: "alert",
    title: "High Fat Consumption",
    description:
      "Eating too much oily food may cause fatigue or long-term health issues like heart disease. Try grilled or steamed options tomorrow.",
  },
];

export default function Nutrients() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Health Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Your Nutrition Report
          </h1>
          <p className="text-muted-foreground">
            Based on your meals today, here's your nutritional breakdown
          </p>
        </div>

        <Card className="border-border shadow-medium bg-gradient-to-br from-card to-accent/5">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Daily Nutrient Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nutrients.map((nutrient) => {
              const percentage = (nutrient.current / nutrient.target) * 100;
              return (
                <div key={nutrient.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {nutrient.name}
                      </span>
                      {nutrient.status === "low" && (
                        <Badge variant="destructive" className="h-5">
                          Low
                        </Badge>
                      )}
                      {nutrient.status === "good" && (
                        <Badge variant="secondary" className="h-5">
                          Good
                        </Badge>
                      )}
                      {nutrient.status === "high" && (
                        <Badge variant="outline" className="h-5 border-accent text-accent-foreground">
                          High
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {nutrient.current}/{nutrient.target} {nutrient.unit}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className="h-2"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            Health Insights
          </h2>
          <div className="space-y-3">
            {healthInsights.map((insight, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-medium transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        insight.type === "warning"
                          ? "bg-destructive/10"
                          : "bg-accent/20"
                      }`}
                    >
                      {insight.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Activity className="h-5 w-5 text-accent-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Get Personalized Suggestions
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your nutrition gaps, we can recommend balanced meals to
                  improve your diet tomorrow.
                </p>
                <Button
                  onClick={() => navigate("/suggestions")}
                  className="gap-2"
                >
                  View Meal Suggestions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
