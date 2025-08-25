import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-heading-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl font-bold">Univ Jobs</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Connecting students and professionals with real-world opportunities. 
              Build your future with flexible, skill-building jobs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-gray-300 hover:text-primary transition-smooth">
                About
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-primary transition-smooth">
                Terms
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-primary transition-smooth">
                Privacy
              </Link>
              <Link to="#" className="block text-gray-300 hover:text-primary transition-smooth">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Univ Jobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;