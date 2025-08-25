import { Card, CardContent } from "@/components/ui/card";
import { Clock, BookOpen, PenTool, Code, Palette, Calculator } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      icon: Clock,
      title: "Part-time Jobs",
      description: "Flexible work opportunities",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: BookOpen,
      title: "Tutoring",
      description: "Share your knowledge",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: PenTool,
      title: "Content Writing",
      description: "Create engaging content",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Visual creativity",
      color: "bg-pink-50 text-pink-600"
    },
    {
      icon: Code,
      title: "Programming Help",
      description: "Technical assistance",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: Calculator,
      title: "Data Entry",
      description: "Accurate data processing",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heading-dark mb-4">
            Popular Categories
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover opportunities across various fields and industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-smooth cursor-pointer bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-heading-dark group-hover:text-primary transition-smooth">
                        {category.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;