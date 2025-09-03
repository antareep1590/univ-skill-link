import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star, User, ArrowLeft } from "lucide-react";

const Reviews = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("most-relevant");

  // Mock reviews data
  const allReviews = [
    {
      id: 1,
      buyer: {
        name: "John D",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
      },
      rating: 5,
      timeAgo: "1 day ago",
      comment: "Absolutely fantastic work! The illustration exceeded my expectations and was delivered on time. Sarah is incredibly talented and professional.",
    },
    {
      id: 2,
      buyer: {
        name: "Emily R",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=50&h=50&fit=crop",
      },
      rating: 5,
      timeAgo: "3 days ago",
      comment: "Amazing quality and fast delivery. The cover design perfectly captured the essence of my children's book. Highly recommend!",
    },
    {
      id: 3,
      buyer: {
        name: "Michael K",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      },
      rating: 4,
      timeAgo: "1 week ago",
      comment: "Great work overall. The seller was responsive and made the requested revisions promptly. Very satisfied with the final result.",
    },
    {
      id: 4,
      buyer: {
        name: "Sarah M",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
      },
      rating: 5,
      timeAgo: "2 weeks ago",
      comment: "Exceptional creativity and attention to detail. The illustration brought my story to life exactly as I envisioned it.",
    },
    {
      id: 5,
      buyer: {
        name: "David L",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
      },
      rating: 4,
      timeAgo: "3 weeks ago",
      comment: "Professional service and good communication throughout the project. The final design was exactly what I needed.",
    },
  ];

  const gigTitle = "I will draw a children's book cover";
  const totalReviews = 1294;
  const averageRating = 4.9;

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/browse">Marketplace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/gig/${id}`}>Gig Details</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Reviews</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back to Gig Button */}
        <div className="mb-6">
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link to={`/gig/${id}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to Gig
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-heading-dark mb-2">{gigTitle}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg">{averageRating}</span>
              <span className="text-text-secondary">({totalReviews.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>

        {/* Filter and Sort */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-relevant">Most Relevant</SelectItem>
                    <SelectItem value="most-recent">Most Recent</SelectItem>
                    <SelectItem value="highest-rated">Highest Rated</SelectItem>
                    <SelectItem value="lowest-rated">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-text-secondary">Showing {allReviews.length} of {totalReviews.toLocaleString()} reviews</span>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {allReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    {review.buyer.avatar ? (
                      <img 
                        src={review.buyer.avatar} 
                        alt={review.buyer.name} 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{review.buyer.name}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-text-secondary">{review.timeAgo}</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Reviews
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Reviews;