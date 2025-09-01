import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Facebook, Mail } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-bold text-heading-dark">Univ Jobs</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-heading-dark mb-2">
            Sign Up
          </h2>
          <p className="text-text-secondary">
            Join thousands of students earning while learning
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-text-primary font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 border-2 border-border focus:border-primary rounded-lg"
            />
          </div>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-text-secondary font-medium">OR</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-border hover:border-primary hover:bg-primary-light transition-smooth"
            >
              <Facebook className="h-5 w-5 text-blue-600 mr-3" />
              Continue with Facebook
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-border hover:border-primary hover:bg-primary-light transition-smooth"
            >
              <Mail className="h-5 w-5 text-red-500 mr-3" />
              Continue with Google
            </Button>
          </div>

          {/* Sign Up Button */}
          <Button variant="primary" className="w-full h-12 text-lg shadow-green">
            Sign Up
          </Button>

          {/* Terms */}
          <p className="text-sm text-text-secondary text-center">
            By joining, I agree to receive emails from Univ Jobs
          </p>

          {/* Already a member link */}
          <div className="text-center">
            <span className="text-text-secondary">Already a member? </span>
            <Link to="/signin" className="text-primary hover:text-primary-hover font-medium underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;