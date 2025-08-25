import LoggedInNavbar from "@/components/LoggedInNavbar";
import CategoryNavigation from "@/components/CategoryNavigation";
import GigCarousel from "@/components/GigCarousel";
import Footer from "@/components/Footer";

// Mock data for demonstration
const mockGigs = [
  {
    id: "1",
    title: "I will create stunning logo designs for your business",
    sellerName: "Sarah Design",
    coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 152,
    price: 25,
    isFavorited: false
  },
  {
    id: "2", 
    title: "I will write compelling content for your website and blog",
    sellerName: "Alex Writer",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 89,
    price: 15,
    isFavorited: true
  },
  {
    id: "3",
    title: "I will develop a responsive WordPress website",
    sellerName: "Dev Master",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    rating: 5.0,
    reviewCount: 203,
    price: 150,
    isFavorited: false
  },
  {
    id: "4",
    title: "I will create engaging social media graphics and posts",
    sellerName: "Creative Studio",
    coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 67,
    price: 35,
    isFavorited: false
  },
  {
    id: "5",
    title: "I will provide professional video editing services",
    sellerName: "Video Pro",
    coverImage: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 124,
    price: 75,
    isFavorited: true
  }
];

const continueBrowsingGigs = mockGigs.slice(0, 3);
const popularGigs = [...mockGigs].sort(() => Math.random() - 0.5);
const recommendedGigs = mockGigs.slice(1, 4);

const Browse = () => {
  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      <CategoryNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Continue Browsing */}
        <GigCarousel
          gigs={continueBrowsingGigs}
          title="Continue Browsing"
          subtitle="Pick up where you left off"
        />

        {/* Most Popular Gigs */}
        <GigCarousel
          gigs={popularGigs}
          title="Most Popular Gigs"
          subtitle="Trending services our community loves"
          showViewAll={true}
        />

        {/* Recommended for You */}
        <GigCarousel
          gigs={recommendedGigs}
          title="Recommended for You"
          subtitle="Personalized picks based on your interests"
          showViewAll={true}
        />

        {/* Top Categories Spotlight */}
        <div className="space-y-8">
          <GigCarousel
            gigs={mockGigs.filter(gig => gig.title.includes('logo') || gig.title.includes('graphics'))}
            title="Top in Graphics & Design"
            showViewAll={true}
          />
          
          <GigCarousel
            gigs={mockGigs.filter(gig => gig.title.includes('website') || gig.title.includes('WordPress'))}
            title="Top in Technology"
            showViewAll={true}
          />
        </div>

        {/* Recently Added Gigs */}
        <GigCarousel
          gigs={[...mockGigs].reverse()}
          title="Recently Added Gigs"
          subtitle="Fresh talent and new opportunities"
          showViewAll={true}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Browse;