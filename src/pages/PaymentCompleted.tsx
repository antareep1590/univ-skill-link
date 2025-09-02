import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, MessageCircle, Download, ArrowRight } from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";

const PaymentCompleted = () => {
  // Mock data
  const orderDetails = {
    orderId: "ORD-2024-001",
    date: "March 15, 2024",
    gig: {
      title: "I will create stunning social media content for your brand",
      seller: "Sarah Johnson",
      packageName: "Standard Package",
      deliveryTime: "24 hours",
      revisions: 2
    },
    payment: {
      method: "Visa ending in 4242",
      amount: 95.25,
      transactionId: "TXN-456789"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-heading-dark mb-2">Payment Successful!</h1>
          <p className="text-text-secondary">
            Your order has been placed and payment processed successfully
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Payment Confirmed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-heading-dark mb-2">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Order ID:</span>
                    <span className="font-mono">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Date:</span>
                    <span>{orderDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transaction ID:</span>
                    <span className="font-mono">{orderDetails.payment.transactionId}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-heading-dark mb-2">Payment Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Payment Method:</span>
                    <span>{orderDetails.payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Amount Paid:</span>
                    <span className="font-semibold text-primary">${orderDetails.payment.amount}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Service Details */}
            <div>
              <h3 className="font-semibold text-heading-dark mb-4">Service Details</h3>
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-medium text-heading-dark">{orderDetails.gig.title}</h4>
                <p className="text-sm text-text-secondary mb-3">by {orderDetails.gig.seller}</p>
                
                <Badge variant="secondary" className="bg-primary-light text-primary mb-3">
                  {orderDetails.gig.packageName}
                </Badge>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">Delivery: {orderDetails.gig.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{orderDetails.gig.revisions} Revisions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Estimate */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Estimated Delivery</h4>
              <p className="text-sm text-blue-700">
                Your order will be delivered within {orderDetails.gig.deliveryTime}. 
                You'll receive a notification when it's ready.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Stay in Touch</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Communicate with your seller through our messaging system
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/messages">
                    Start Chat
                  </Link>
                </Button>
              </div>
              
              <div className="text-center p-4">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Track Progress</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Monitor your order status and delivery timeline
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/orders">
                    View Orders
                  </Link>
                </Button>
              </div>
              
              <div className="text-center p-4">
                <Download className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Get Invoice</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Download your invoice for accounting purposes
                </p>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" asChild>
            <Link to="/browse" className="flex items-center gap-2">
              Continue Browsing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/orders">
              View My Orders
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="text-center mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-text-secondary">
            Need help? <Link to="/support" className="text-primary hover:underline">Contact Support</Link> or 
            visit our <Link to="/faq" className="text-primary hover:underline">FAQ</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleted;