import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trash2, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialRecipes = [
  { id: 1, title: "Garlic Butter Pasta", time: "25 min", difficulty: "Easy", image: "🍝" },
  { id: 2, title: "Fresh Garden Salad", time: "10 min", difficulty: "Easy", image: "🥗" },
  { id: 3, title: "Chocolate Brownies", time: "40 min", difficulty: "Medium", image: "🍫" },
];

export default function Saved() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const { toast } = useToast();

  const handleDelete = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    toast({
      title: "Recipe removed",
      description: "Recipe has been removed from your saved collection",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20 md:pb-8">
      <div className="container max-w-4xl px-4 py-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookmarkCheck className="h-4 w-4" />
            <span>Your Collection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Saved Recipes
          </h1>
          <p className="text-muted-foreground">
            {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} saved
          </p>
        </div>

        {recipes.length === 0 ? (
          <Card className="border-border p-12 text-center">
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                <BookmarkCheck className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No saved recipes yet</h3>
                <p className="text-muted-foreground">
                  Start saving recipes you love and they'll appear here
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="group hover:shadow-medium transition-all duration-300 border-border overflow-hidden"
              >
                <CardContent className="p-4 flex gap-4">
                  <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl flex-shrink-0">
                    {recipe.image}
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate mb-2">
                        {recipe.title}
                      </h3>
                      <div className="flex gap-2 text-sm">
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.time}
                        </Badge>
                        <Badge variant="outline">{recipe.difficulty}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-fit gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 mt-2"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
