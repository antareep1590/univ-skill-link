import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    firstName: "",
    lastName: "",
    saveAsDefault: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock order data
  const orderSummary = {
    packageName: "Standard Package",
    quantity: 1,
    packagePrice: 75,
    extras: [
      { name: "Extra Fast Delivery (24 hours)", price: 25 }
    ],
    serviceFee: 5.25,
    discount: 10,
    total: 95.25,
    deliveryTime: "24 hours"
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Card number validation (simplified)
    if (!paymentData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = "Card number is required";
    } else if (paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = "Invalid card number";
    }

    // Expiry date validation
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    }

    // Security code validation
    if (!paymentData.securityCode) {
      newErrors.securityCode = "Security code is required";
    } else if (!/^\d{3,4}$/.test(paymentData.securityCode)) {
      newErrors.securityCode = "Invalid security code";
    }

    // Name validation
    if (!paymentData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(paymentData.firstName)) {
      newErrors.firstName = "Only letters allowed";
    }

    if (!paymentData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(paymentData.lastName)) {
      newErrors.lastName = "Only letters allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'securityCode') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate payment processing
      navigate("/payment-completed");
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
            <h1 className="text-2xl font-bold text-heading-dark">Payment</h1>
            <p className="text-text-secondary">Secure payment processing</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
                <p className="text-sm text-text-secondary">
                  Your payment information is secure and encrypted
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Options */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">Payment Options</Label>
                    <div className="p-4 border rounded-lg bg-primary-light border-primary">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <span className="font-medium">Credit & Debit Cards</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={errors.cardNumber ? 'border-destructive' : ''}
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiration Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className={errors.expiryDate ? 'border-destructive' : ''}
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <p className="text-xs text-destructive mt-1">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="securityCode">Security Code *</Label>
                        <Input
                          id="securityCode"
                          placeholder="123"
                          value={paymentData.securityCode}
                          onChange={(e) => handleInputChange('securityCode', e.target.value)}
                          className={errors.securityCode ? 'border-destructive' : ''}
                          maxLength={4}
                        />
                        {errors.securityCode && (
                          <p className="text-xs text-destructive mt-1">{errors.securityCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={paymentData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={paymentData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="saveDefault"
                        checked={paymentData.saveAsDefault}
                        onCheckedChange={(checked) => 
                          setPaymentData(prev => ({ ...prev, saveAsDefault: !!checked }))
                        }
                      />
                      <Label htmlFor="saveDefault" className="text-sm">
                        Save as default payment method
                      </Label>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      Your payment information is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </form>
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
                    <span>{orderSummary.packageName} ({orderSummary.quantity}x)</span>
                    <span>${orderSummary.packagePrice}</span>
                  </div>
                  
                  {orderSummary.extras.map((extra, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{extra.name}</span>
                      <span>${extra.price}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>${orderSummary.serviceFee}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-primary">
                    <span>Discount (SAVE10)</span>
                    <span>-${orderSummary.discount}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${orderSummary.total}</span>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Delivery in {orderSummary.deliveryTime}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="primary"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Confirm & Pay ${orderSummary.total}
                </Button>
                
                <p className="text-xs text-text-secondary text-center">
                  By clicking "Confirm & Pay", you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;