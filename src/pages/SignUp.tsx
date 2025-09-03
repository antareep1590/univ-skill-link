import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Facebook, Mail, Camera, Eye, EyeOff } from "lucide-react";
import { MultiSelect } from "@/components/MultiSelect";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    interestedTopics: [] as string[],
    profilePicture: null as File | null,
  });

  const topicOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "graphic-design", label: "Graphic Design" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "content-writing", label: "Content Writing" },
    { value: "video-editing", label: "Video Editing" },
    { value: "animation", label: "Animation" },
    { value: "photography", label: "Photography" },
    { value: "ui-ux-design", label: "UI/UX Design" },
    { value: "data-analysis", label: "Data Analysis" },
    { value: "social-media", label: "Social Media Management" },
    { value: "seo", label: "SEO Optimization" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
    }
  };

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
          {/* Profile Picture */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">
              Profile Picture
            </Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('profilePicture')?.click()}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {formData.profilePicture ? 'Change Picture' : 'Upload Picture'}
                </Button>
                <p className="text-xs text-text-secondary mt-1">
                  JPG, PNG or GIF. Max size of 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-text-primary font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="h-12 border-2 border-border focus:border-primary rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-text-primary font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="h-12 border-2 border-border focus:border-primary rounded-lg"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-text-primary font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="h-12 border-2 border-border focus:border-primary rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Interested Topics */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">
              Interested Topics/Categories
            </Label>
            <MultiSelect
              options={topicOptions}
              value={formData.interestedTopics}
              onChange={(value) => setFormData(prev => ({ ...prev, interestedTopics: value }))}
              placeholder="Select your areas of interest..."
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

          {/* Sign Up Button */}
          <Button 
            variant="primary" 
            className="w-full h-12 text-lg shadow-green"
            onClick={() => window.location.href = '/browse'}
          >
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