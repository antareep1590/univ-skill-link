import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-light to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-heading-dark mb-6 leading-tight">
            Find jobs. Earn skills.
            <br />
            <span className="text-primary">Build your future.</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Univ Jobs connects students and professionals with real-world opportunities.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="What job are you looking for?"
                className="w-full h-14 pl-6 pr-14 text-lg border-2 border-border focus:border-primary rounded-lg shadow-md"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-2 h-10 w-10 p-0 bg-primary hover:bg-primary-hover"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-green">
                Join Univ Jobs
              </Button>
            </Link>
            <div className="text-text-light">
              Already a member? 
              <Link to="/signin" className="text-primary hover:text-primary-hover ml-1 underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;