import { Search, Salad, Pizza, Coffee, Cookie, ChefHat, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { allRecipes } from "@/data/recipes";

const categories = [
  { icon: Salad, name: "Healthy", color: "bg-secondary/10 text-secondary", gradient: "from-secondary/20 to-secondary/5" },
  { icon: Pizza, name: "Italian", color: "bg-primary/10 text-primary", gradient: "from-primary/20 to-primary/5" },
  { icon: Coffee, name: "Breakfast", color: "bg-accent text-accent-foreground", gradient: "from-accent/30 to-accent/10" },
  { icon: Cookie, name: "Desserts", color: "bg-primary/10 text-primary", gradient: "from-primary/15 to-primary/5" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredRecipes = useMemo(() => {
    let recipes = allRecipes;
    
    if (selectedCategory) {
      recipes = recipes.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      recipes = recipes.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.ingredients.some(i => i.toLowerCase().includes(query))
      );
    }
    
    return recipes;
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(prev => prev === categoryName ? null : categoryName);
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const hasFilters = searchQuery.trim() || selectedCategory;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8 animate-fade-in">
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
            className="pl-12 pr-12 h-14 text-base rounded-2xl border-border bg-card shadow-sm focus:shadow-md transition-shadow"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/generate">
            <Button size="lg" className="rounded-xl gap-2 shadow-soft hover:shadow-medium transition-all hover-scale">
              <ChefHat className="h-5 w-5" />
              Generate Recipe
            </Button>
          </Link>
          <Link to="/tracker">
            <Button size="lg" variant="secondary" className="rounded-xl gap-2 shadow-soft hover:shadow-medium transition-all hover-scale">
              Track Meals
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">Browse Categories</h2>
            {hasFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearAll}
                className="text-primary hover:text-primary/80 gap-1"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <Card
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`group cursor-pointer hover:shadow-medium transition-all duration-300 border-border overflow-hidden ${
                    isSelected ? "ring-2 ring-primary shadow-medium" : ""
                  }`}
                >
                  <CardContent className={`p-6 flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${category.gradient} group-hover:scale-105 transition-transform`}>
                    <div className={`h-14 w-14 rounded-2xl ${category.color} flex items-center justify-center group-hover:rotate-6 transition-transform ${isSelected ? "rotate-6" : ""}`}>
                      <category.icon className="h-7 w-7" />
                    </div>
                    <span className="font-semibold text-foreground">{category.name}</span>
                    {isSelected && (
                      <span className="text-xs text-primary font-medium">Selected</span>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Popular Recipes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {selectedCategory ? `${selectedCategory} Recipes` : "Popular Recipes"}
              {filteredRecipes.length > 0 && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"})
                </span>
              )}
            </h2>
            <Link to="/saved" className="text-sm text-primary hover:underline font-medium">
              View All
            </Link>
          </div>
          
          {filteredRecipes.length === 0 ? (
            <Card className="border-border p-12 text-center">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or category filter</p>
              <Button variant="outline" onClick={handleClearAll}>
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map((recipe, index) => (
                <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                  <Card 
                    className="group cursor-pointer hover:shadow-medium transition-all duration-300 border-border overflow-hidden h-full animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          {recipe.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="px-2 py-1 rounded-full bg-background/90 text-foreground text-xs font-medium">
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {recipe.time}
                        </span>
                        <span>{recipe.servings} servings</span>
                        <span>{recipe.calories} cal</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}