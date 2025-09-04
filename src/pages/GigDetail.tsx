import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, Share2, Star, Check, User, MapPin, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string>>({});

  // Mock data - in real app this would come from API
  const gigData = {
    id: id || "1",
    title: "I will draw a children's book cover",
    category: "Graphics & Design",
    subcategory: "Gigs",
    rating: 4.9,
    reviewCount: 1294,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop",
    ],
    seller: {
      name: "Children's Books",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=100&h=100&fit=crop",
      rating: 4.8,
      reviewCount: 2156,
      country: "India",
      lastDelivery: "18 hours ago",
      bio: "Hi, My name is Sarah and I specialize in creating beautiful illustrations for children's books...",
    },
    about: {
      description: "I will create a stunning children's book cover that captures the essence of your story...",
      workProcess: "First, I'll discuss your vision and requirements. Then I'll create initial sketches...",
    },
    packages: [
      {
        name: "Basic",
        price: 10,
        features: ["Source File", "Colours", "1 Figure", "1 Revision", "7 Day Delivery"],
      },
      {
        name: "Standard",
        price: 20,
        features: ["Source File", "High Resolution", "Colours", "2 Figures", "2 Revisions", "7 Day Delivery"],
      },
      {
        name: "Premium",
        price: 50,
        features: ["Source File", "High Resolution", "Colours", "Background", "Full Body", "Commercial Use", "3 Figures", "2 Revisions", "7 Day Delivery"],
      },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop",
    ],
    tags: ["Cute", "Draw", "Books"],
    questionnaire: [
      {
        id: 1,
        question: "What style of illustration do you prefer?",
        type: "radio",
        options: ["Cartoon", "Realistic", "Minimalist", "Watercolor"],
        required: true
      },
      {
        id: 2,
        question: "Please describe your book's main character",
        type: "textarea",
        required: true
      },
      {
        id: 3,
        question: "What age group is your book for?",
        type: "select",
        options: ["0-3 years", "4-7 years", "8-12 years", "Teen"],
        required: true
      }
    ],
    reviews: [
      {
        id: 1,
        buyer: {
          name: "John D",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
        },
        rating: 5,
        timeAgo: "1 day ago",
        comment: "Absolutely fantastic work! The illustration exceeded my expectations and was delivered on time.",
      },
      {
        id: 2,
        buyer: {
          name: "Sarah M",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=50&h=50&fit=crop",
        },
        rating: 4,
        timeAgo: "3 days ago",
        comment: "Great communication and beautiful artwork. Will definitely work with this seller again.",
      },
      {
        id: 3,
        buyer: {
          name: "Mike R",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
        },
        rating: 5,
        timeAgo: "1 week ago",
        comment: "Perfect cover design that captured exactly what I envisioned for my children's book.",
      },
    ],
  };

  const handleQuestionnaireChange = (questionId: string, value: string) => {
    setQuestionnaireAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleHireNow = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/browse">Marketplace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${gigData.category.toLowerCase().replace(' & ', '-')}`}>
                {gigData.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gigs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gig Summary */}
            <div>
              <h1 className="text-3xl font-bold text-heading-dark mb-4">{gigData.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{gigData.rating}</span>
                    <span className="text-text-secondary">({gigData.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={isFavorited ? "text-primary" : "text-text-secondary"}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Hero Carousel */}
              <div className="relative mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {gigData.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative">
                          <img
                            src={image}
                            alt={`Gig image ${index + 1}`}
                            className="w-full h-80 object-cover rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>
            </div>

            {/* About Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">About Me</h3>
                    <p className="text-text-secondary">{gigData.about.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Work Process</h3>
                    <p className="text-text-secondary">{gigData.about.workProcess}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Gig Style Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-text-secondary mb-2">CATEGORY</h4>
                    <p className="text-sm">Digital Marketing</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-text-secondary mb-2">SUB CATEGORY</h4>
                    <p className="text-sm">Social Media</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-text-secondary mb-2">SERVICE TYPE</h4>
                    <p className="text-sm">Social Content</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compare Packages */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Compare Packages</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {gigData.packages.map((pkg, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <div className="text-2xl font-bold text-primary">${pkg.price}</div>
                      </div>
                      
                      <div className="space-y-2">
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-4" variant={index === 1 ? "default" : "outline"}>
                        Select {pkg.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">My Portfolio</h2>
                  <Button variant="outline" size="sm">See All</Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gigData.portfolio.slice(0, 6).map((image, index) => (
                    <div key={index} className="aspect-square">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Questionnaire */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Questionnaire</h2>
                <p className="text-text-secondary mb-6">Please answer these questions to help the seller understand your requirements better.</p>
                
                <div className="space-y-6">
                  {gigData.questionnaire.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <Label className="text-base font-medium">
                        {index + 1}. {question.question}
                        {question.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      
                      {question.type === "textarea" && (
                        <Textarea
                          placeholder="Enter your answer..."
                          value={questionnaireAnswers[question.id.toString()] || ""}
                          onChange={(e) => handleQuestionnaireChange(question.id.toString(), e.target.value)}
                          className="min-h-[80px]"
                        />
                      )}
                      
                      {question.type === "radio" && question.options && (
                        <RadioGroup
                          value={questionnaireAnswers[question.id.toString()] || ""}
                          onValueChange={(value) => handleQuestionnaireChange(question.id.toString(), value)}
                        >
                          {question.options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                              <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      
                      {question.type === "select" && question.options && (
                        <Select
                          value={questionnaireAnswers[question.id.toString()] || ""}
                          onValueChange={(value) => handleQuestionnaireChange(question.id.toString(), value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option..." />
                          </SelectTrigger>
                          <SelectContent>
                            {question.options.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    <p className="text-text-secondary">{gigData.reviewCount.toLocaleString()} reviews for this gig</p>
                  </div>
                  
                  <Select defaultValue="most-relevant">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter reviews" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-relevant">Most Relevant</SelectItem>
                      <SelectItem value="most-recent">Most Recent</SelectItem>
                      <SelectItem value="highest-rated">Highest Rated</SelectItem>
                      <SelectItem value="lowest-rated">Lowest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  {gigData.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="flex space-x-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        {review.buyer.avatar ? (
                          <img src={review.buyer.avatar} alt={review.buyer.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{review.buyer.name}</span>
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
                        <p className="text-text-secondary">
                          {review.comment.length > 150 
                            ? `${review.comment.substring(0, 150)}...` 
                            : review.comment
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/reviews/${gigData.id}`)}
                  >
                    See All Reviews ({gigData.reviewCount.toLocaleString()})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Tags */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Related Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {gigData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Hire Now Card */}
            <Card>
              <CardContent className="p-6">
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleHireNow}
                >
                  Hire Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-4" 
                  size="lg"
                >
                  Contact Student
                </Button>
                
                {/* Seller Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      {gigData.seller.avatar ? (
                        <img src={gigData.seller.avatar} alt={gigData.seller.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{gigData.seller.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{gigData.seller.rating}</span>
                        <span className="text-sm text-text-secondary">({gigData.seller.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-text-secondary" />
                      <span>From {gigData.seller.country}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-text-secondary" />
                      <span>Last Delivery: {gigData.seller.lastDelivery}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {gigData.seller.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GigDetail;