import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-heading-dark">Univ Jobs</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="text-text-secondary hover:text-primary transition-smooth">
              Explore
            </Link>
            <Link to="#" className="text-text-secondary hover:text-primary transition-smooth">
              How It Works
            </Link>
            <Link to="#" className="text-text-secondary hover:text-primary transition-smooth">
              Categories
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/signin">
              <Button variant="ghost" className="text-text-secondary hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="shadow-green">
                Join
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;