import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Save, X, Camera } from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import { useToast } from "@/hooks/use-toast";
import { MultiSelect } from "@/components/MultiSelect";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  interestedTopics: string[];
}

interface BillingData {
  fullName: string;
  companyName: string;
  country: string;
  state: string;
  address: string;
  city: string;
  zipCode: string;
  vatNumber: string;
  emailInvoices: boolean;
}

const Profile = () => {
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    interestedTopics: ["web-development", "graphic-design"]
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

  const [billingData, setBillingData] = useState<BillingData>({
    fullName: "John Doe",
    companyName: "Acme Corp",
    country: "United States",
    state: "California",
    address: "123 Main Street",
    city: "San Francisco",
    zipCode: "94105",
    vatNumber: "",
    emailInvoices: true
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateZipCode = (zipCode: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  };

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(profileData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(profileData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBillingForm = () => {
    const newErrors: Record<string, string> = {};

    if (!billingData.fullName.trim()) {
      newErrors.billingFullName = "Full name is required";
    }

    if (!billingData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!billingData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!billingData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!billingData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!validateZipCode(billingData.zipCode)) {
      newErrors.zipCode = "Invalid zip code format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = () => {
    if (validateProfileForm()) {
      setIsEditingProfile(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }
  };

  const saveBilling = () => {
    if (validateBillingForm()) {
      setIsEditingBilling(false);
      toast({
        title: "Billing Information Updated",
        description: "Your billing information has been saved successfully.",
      });
    }
  };

  const cancelEdit = (type: 'profile' | 'billing') => {
    if (type === 'profile') {
      setIsEditingProfile(false);
    } else {
      setIsEditingBilling(false);
    }
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-heading-dark">Profile Settings</h1>
          <p className="text-text-secondary">Manage your account and billing information</p>
        </div>

        <div className="space-y-8">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Change Picture
                  </Button>
                  <p className="text-xs text-text-secondary mt-1">
                    JPG, PNG or GIF. Max size of 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Details</CardTitle>
              {!isEditingProfile ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => cancelEdit('profile')}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={saveProfile}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                    disabled={!isEditingProfile}
                    className={errors.fullName ? 'border-destructive' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditingProfile}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditingProfile}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestedTopics">Interested Topics/Categories</Label>
                <MultiSelect
                  options={topicOptions}
                  value={profileData.interestedTopics}
                  onChange={(value) => setProfileData(prev => ({ ...prev, interestedTopics: value }))}
                  placeholder="Select your areas of interest..."
                  disabled={!isEditingProfile}
                />
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Billing Information</CardTitle>
              {!isEditingBilling ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditingBilling(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => cancelEdit('billing')}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={saveBilling}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingFullName">Full Name</Label>
                  <Input
                    id="billingFullName"
                    value={billingData.fullName}
                    onChange={(e) => setBillingData(prev => ({ ...prev, fullName: e.target.value }))}
                    disabled={!isEditingBilling}
                    className={errors.billingFullName ? 'border-destructive' : ''}
                  />
                  {errors.billingFullName && (
                    <p className="text-xs text-destructive">{errors.billingFullName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name (Optional)</Label>
                  <Input
                    id="companyName"
                    value={billingData.companyName}
                    onChange={(e) => setBillingData(prev => ({ ...prev, companyName: e.target.value }))}
                    disabled={!isEditingBilling}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={billingData.country} 
                    onValueChange={(value) => setBillingData(prev => ({ ...prev, country: value }))}
                    disabled={!isEditingBilling}
                  >
                    <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-xs text-destructive">{errors.country}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={billingData.state}
                    onChange={(e) => setBillingData(prev => ({ ...prev, state: e.target.value }))}
                    disabled={!isEditingBilling}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={billingData.address}
                  onChange={(e) => setBillingData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditingBilling}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={billingData.city}
                    onChange={(e) => setBillingData(prev => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditingBilling}
                    className={errors.city ? 'border-destructive' : ''}
                  />
                  {errors.city && (
                    <p className="text-xs text-destructive">{errors.city}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={billingData.zipCode}
                    onChange={(e) => setBillingData(prev => ({ ...prev, zipCode: e.target.value }))}
                    disabled={!isEditingBilling}
                    className={errors.zipCode ? 'border-destructive' : ''}
                  />
                  {errors.zipCode && (
                    <p className="text-xs text-destructive">{errors.zipCode}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">VAT Number (Optional)</Label>
                  <Input
                    id="vatNumber"
                    value={billingData.vatNumber}
                    onChange={(e) => setBillingData(prev => ({ ...prev, vatNumber: e.target.value }))}
                    disabled={!isEditingBilling}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Invoice Preferences</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="emailInvoices"
                    checked={billingData.emailInvoices}
                    onCheckedChange={(checked) => 
                      setBillingData(prev => ({ ...prev, emailInvoices: !!checked }))
                    }
                    disabled={!isEditingBilling}
                  />
                  <Label htmlFor="emailInvoices" className="text-sm">
                    Receive billing information via email along with the original invoice
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;