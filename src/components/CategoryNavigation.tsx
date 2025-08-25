import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const categories = [
  "Graphics & Design",
  "Digital Marketing", 
  "Video & Animation",
  "Music & Audio",
  "Technology",
  "Writing & Translation",
  "Lifestyle",
  "Business",
  "Programming",
  "Data Entry",
  "Photography"
];

const CategoryNavigation = () => {
  return (
    <div className="w-full border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-1 py-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="flex-shrink-0 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-full px-6"
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryNavigation;