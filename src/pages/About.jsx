import { ChefHat, Sparkles, Heart, Salad, Users, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recipes",
    description: "Generate personalized recipes based on your available ingredients, dietary preferences, and cooking skills.",
  },
  {
    icon: Salad,
    title: "Nutrition Tracking",
    description: "Monitor your daily nutrient intake and get insights on how to maintain a balanced diet.",
  },
  {
    icon: Heart,
    title: "Health Suggestions",
    description: "Receive personalized meal recommendations based on your nutritional gaps and health goals.",
  },
];

const stats = [
  { value: "1000+", label: "Recipe Ideas" },
  { value: "50+", label: "Cuisines" },
  { value: "24/7", label: "AI Assistant" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ChefHat className="h-4 w-4" />
            <span>About RecipeAI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Your Personal
            <br />
            <span className="text-primary">Cooking Companion</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            RecipeAI combines the art of cooking with the power of artificial intelligence 
            to help you discover, create, and enjoy delicious meals every day.
          </p>
        </section>

        {/* Mission */}
        <section className="space-y-4">
          <Card className="border-border overflow-hidden">
            <CardContent className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe that everyone deserves access to delicious, healthy meals without the stress of 
                    planning. Our mission is to solve two daily problems: "What should I cook today?" and 
                    "Is the food I'm eating healthy enough?" Through AI-powered recipe suggestions and 
                    nutrition analysis, we make cooking enjoyable and health-conscious.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border hover:shadow-medium transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <Card className="border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
            <CardContent className="p-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.value}</div>
                    <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team/Community */}
        <section className="text-center space-y-6">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Users className="h-7 w-7 text-secondary" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">Join Our Community</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Thousands of home cooks trust RecipeAI to make their daily cooking experience 
            more enjoyable and nutritious. Join us and transform the way you cook!
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="rounded-xl">Get Started</Button>
            </Link>
            <Link to="/generate">
              <Button size="lg" variant="outline" className="rounded-xl">Try Recipe Generator</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
