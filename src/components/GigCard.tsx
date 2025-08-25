import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, User } from "lucide-react";
import { useState } from "react";

interface GigCardProps {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar?: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  price: number;
  isFavorited?: boolean;
}

const GigCard = ({
  id,
  title,
  sellerName,
  sellerAvatar,
  coverImage,
  rating,
  reviewCount,
  price,
  isFavorited = false
}: GigCardProps) => {
  const [favorited, setFavorited] = useState(isFavorited);

  const handleCardClick = () => {
    window.location.href = `/gig/${id}`;
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-green transition-shadow duration-300 overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 rounded-full ${
            favorited 
              ? 'bg-primary text-white hover:bg-primary-hover' 
              : 'bg-white/80 text-text-secondary hover:bg-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setFavorited(!favorited);
          }}
        >
          <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            {sellerAvatar ? (
              <img src={sellerAvatar} alt={sellerName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="h-3 w-3 text-white" />
            )}
          </div>
          <span className="text-sm text-text-secondary">{sellerName}</span>
        </div>

        {/* Gig Title */}
        <h3 className="font-medium text-heading-dark line-clamp-2 mb-3 leading-5">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-text-secondary">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">Starting at</span>
          <span className="font-semibold text-heading-dark">${price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GigCard;