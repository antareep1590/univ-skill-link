import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, Plus, Minus } from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Mock data
  const gig = {
    title: "I will create stunning social media content for your brand",
    seller: "Sarah Johnson",
    packageName: "Standard Package",
    price: 75,
    deliveryTime: "3 days",
    revisions: 2,
    includes: [
      "5 social media posts",
      "Custom graphics design", 
      "Hashtag research",
      "Brand guidelines compliance"
    ]
  };

  const extras = [
    { id: "1", name: "Extra Fast Delivery (24 hours)", price: 25 },
    { id: "2", name: "Additional Revision", price: 15 },
    { id: "3", name: "Source Files", price: 20 },
    { id: "4", name: "Commercial License", price: 30 }
  ];

  const serviceFee = 5.25;
  const subtotal = gig.price * quantity;
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = extras.find(e => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);
  const discount = promoApplied ? 10 : 0;
  const total = subtotal + extrasTotal + serviceFee - discount;

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-heading-dark">Checkout</h1>
            <p className="text-text-secondary">Review your order details</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Package Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-heading-dark">{gig.title}</h3>
                  <p className="text-sm text-text-secondary">by {gig.seller}</p>
                </div>
                
                <Badge variant="secondary" className="bg-primary-light text-primary">
                  {gig.packageName}
                </Badge>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary rounded-lg">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{gig.deliveryTime}</p>
                    <p className="text-xs text-text-secondary">Delivery Time</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{gig.revisions}</p>
                    <p className="text-xs text-text-secondary">Revisions</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-text-secondary">Quantity</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">What's included:</h4>
                  <ul className="space-y-1">
                    {gig.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Upgrades & Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Upgrade Your Order</CardTitle>
                <p className="text-sm text-text-secondary">Add extra value to your order</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {extras.map((extra) => (
                  <div key={extra.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id={extra.id}
                        checked={selectedExtras.includes(extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra.id)}
                      />
                      <Label htmlFor={extra.id} className="font-medium">
                        {extra.name}
                      </Label>
                    </div>
                    <span className="font-semibold text-primary">+${extra.price}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Package ({quantity}x)</span>
                    <span>${subtotal}</span>
                  </div>
                  
                  {selectedExtras.map(extraId => {
                    const extra = extras.find(e => e.id === extraId);
                    if (!extra) return null;
                    return (
                      <div key={extraId} className="flex justify-between text-sm">
                        <span>{extra.name}</span>
                        <span>${extra.price}</span>
                      </div>
                    );
                  })}
                  
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-primary">
                      <span>Discount (SAVE10)</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                {/* Promo Code */}
                <div className="space-y-2">
                  <Label htmlFor="promo">Promo Code</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="promo"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-primary">✓ Promo code applied!</p>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-text-secondary text-center">
                  You won't be charged until you complete your payment
                </p>
                
                <Button 
                  className="w-full" 
                  variant="primary"
                  onClick={() => navigate("/payment")}
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;