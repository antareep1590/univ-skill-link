import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Facebook, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            Sign In
          </h2>
          <p className="text-text-secondary">
            Welcome back! Continue your journey
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

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-text-primary font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 border-2 border-border focus:border-primary rounded-lg pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-text-secondary" />
                ) : (
                  <Eye className="h-4 w-4 text-text-secondary" />
                )}
              </Button>
            </div>
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
              onClick={() => window.location.href = '/browse'}
            >
              <Facebook className="h-5 w-5 text-blue-600 mr-3" />
              Continue with Facebook
            </Button>
            
            <Button
              variant="outline"
              className="w-full h-12 border-2 border-border hover:border-primary hover:bg-primary-light transition-smooth"
              onClick={() => window.location.href = '/browse'}
            >
              <Mail className="h-5 w-5 text-red-500 mr-3" />
              Continue with Google
            </Button>
          </div>

          {/* Sign In Button */}
          <Button 
            variant="primary" 
            className="w-full h-12 text-lg shadow-green"
            onClick={() => window.location.href = '/browse'}
          >
            Sign In
          </Button>

          {/* Forgot Password */}
          <div className="text-center">
            <Link to="#" className="text-primary hover:text-primary-hover font-medium underline">
              Forgot Password?
            </Link>
          </div>

          {/* Not a member link */}
          <div className="text-center">
            <span className="text-text-secondary">Not a member yet? </span>
            <Link to="/signup" className="text-primary hover:text-primary-hover font-medium underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;