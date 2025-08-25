import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GigCard from "./GigCard";

interface Gig {
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

interface GigCarouselProps {
  gigs: Gig[];
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
}

const GigCarousel = ({ gigs, title, subtitle, showViewAll = false }: GigCarouselProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-heading-dark">{title}</h2>
          {subtitle && (
            <p className="text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        {showViewAll && (
          <button className="text-primary hover:text-primary-hover font-medium transition-smooth">
            See All
          </button>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {gigs.map((gig) => (
            <CarouselItem key={gig.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <GigCard {...gig} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default GigCarousel;