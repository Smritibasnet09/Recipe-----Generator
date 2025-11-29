import { Search, Salad, Pizza, Coffee, Cookie, ChefHat, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  { icon: Salad, name: "Healthy", color: "bg-secondary/10 text-secondary", gradient: "from-secondary/20 to-secondary/5" },
  { icon: Pizza, name: "Italian", color: "bg-primary/10 text-primary", gradient: "from-primary/20 to-primary/5" },
  { icon: Coffee, name: "Breakfast", color: "bg-accent text-accent-foreground", gradient: "from-accent/30 to-accent/10" },
  { icon: Cookie, name: "Desserts", color: "bg-primary/10 text-primary", gradient: "from-primary/15 to-primary/5" },
];

const popularRecipes = [
  { title: "Quick Pasta Carbonara", time: "15 min", difficulty: "Easy", image: "🍝" },
  { title: "Fresh Garden Salad", time: "10 min", difficulty: "Easy", image: "🥗" },
  { title: "Homemade Pizza", time: "45 min", difficulty: "Medium", image: "🍕" },
  { title: "Chocolate Chip Cookies", time: "30 min", difficulty: "Easy", image: "🍪" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ChefHat className="h-4 w-4" />
            <span>AI-Powered Cooking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            What would you like
            <br />
            <span className="text-primary">to cook today?</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate personalized recipes, get cooking tips, and discover new dishes tailored to your preferences
          </p>
        </section>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 h-14 text-base rounded-2xl border-border bg-card shadow-sm focus:shadow-md transition-shadow"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/generate">
            <Button size="lg" className="rounded-xl gap-2 shadow-soft hover:shadow-medium transition-all">
              <ChefHat className="h-5 w-5" />
              Generate Recipe
            </Button>
          </Link>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="rounded-xl gap-2 shadow-soft hover:shadow-medium transition-all">
              Ask Chef AI
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-medium transition-all duration-300 border-border overflow-hidden"
              >
                <CardContent className={`p-6 flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${category.gradient} group-hover:scale-105 transition-transform`}>
                  <div className={`h-14 w-14 rounded-2xl ${category.color} flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                    <category.icon className="h-7 w-7" />
                  </div>
                  <span className="font-semibold text-foreground">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Recipes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Popular Recipes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularRecipes.map((recipe) => (
              <Card
                key={recipe.title}
                className="group cursor-pointer hover:shadow-medium transition-all duration-300 border-border overflow-hidden"
              >
                <CardContent className="p-4 flex gap-4">
                  <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl flex-shrink-0">
                    {recipe.image}
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {recipe.title}
                    </h3>
                    <div className="flex gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {recipe.time}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
