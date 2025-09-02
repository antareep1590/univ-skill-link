import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  Filter, 
  Search, 
  Download, 
  CreditCard, 
  Plus, 
  MoreHorizontal,
  Trash2,
  Star
} from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: string;
  transactionId: string;
  service: string;
  orderNumber: string;
  total: number;
  type: 'payment' | 'refund';
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

const Billing = () => {
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [isAddingCard, setIsAddingCard] = useState(false);
  
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });

  // Mock data
  const transactions: Transaction[] = [
    {
      id: "1",
      date: "03/15/2024",
      transactionId: "TXN-456789",
      service: "Social Media Content Creation",
      orderNumber: "ORD-2024-001",
      total: 95.25,
      type: "payment"
    },
    {
      id: "2",
      date: "03/10/2024",
      transactionId: "TXN-456788",
      service: "Logo Design Package",
      orderNumber: "ORD-2024-002",
      total: 150.00,
      type: "payment"
    },
    {
      id: "3",
      date: "03/05/2024",
      transactionId: "TXN-456787",
      service: "Website Copywriting",
      orderNumber: "ORD-2024-003",
      total: 200.00,
      type: "payment"
    },
    {
      id: "4",
      date: "02/28/2024",
      transactionId: "TXN-456786",
      service: "Refund - Logo Design",
      orderNumber: "ORD-2024-004",
      total: 75.00,
      type: "refund"
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "25",
      isDefault: true
    },
    {
      id: "2",
      type: "mastercard",
      last4: "5555",
      expiryMonth: "08",
      expiryYear: "26",
      isDefault: false
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = transactionType === "all" || transaction.type === transactionType;
    
    return matchesSearch && matchesType;
  });

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

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setNewCard(prev => ({ ...prev, [field]: formattedValue }));
  };

  const addPaymentMethod = () => {
    // Mock adding payment method
    setIsAddingCard(false);
    setNewCard({ number: "", expiry: "", cvc: "", name: "" });
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
    });
  };

  const makeDefault = (cardId: string) => {
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated.",
    });
  };

  const removeCard = (cardId: string) => {
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed successfully.",
    });
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>;
      case 'mastercard':
        return <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>;
      case 'amex':
        return <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-heading-dark">Billing</h1>
          <p className="text-text-secondary">Manage your billing history and payment methods</p>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="history">Billing History</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                      <Input
                        placeholder="Search by invoice or order no."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="90days">Last 90 Days</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Transaction Type</Label>
                    <Select value={transactionType} onValueChange={setTransactionType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select value={serviceFilter} onValueChange={setServiceFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Table */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-text-secondary mx-auto mb-3" />
                    <p className="text-text-secondary">No transactions found for your criteria.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Transaction</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>PDF</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="font-mono text-sm">{transaction.transactionId}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{transaction.service}</span>
                                {transaction.type === 'refund' && (
                                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                                    Refund
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="link" className="p-0 h-auto font-mono text-sm">
                                {transaction.orderNumber}
                              </Button>
                            </TableCell>
                            <TableCell className={`font-semibold ${
                              transaction.type === 'refund' ? 'text-red-600' : 'text-primary'
                            }`}>
                              {transaction.type === 'refund' ? '-' : ''}${transaction.total.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            {/* Add New Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Payment Method</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={newCard.number}
                          onChange={(e) => handleCardInputChange('number', e.target.value)}
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input
                            placeholder="MM/YY"
                            value={newCard.expiry}
                            onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>CVC</Label>
                          <Input
                            placeholder="123"
                            value={newCard.cvc}
                            onChange={(e) => handleCardInputChange('cvc', e.target.value)}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Cardholder Name</Label>
                        <Input
                          placeholder="John Doe"
                          value={newCard.name}
                          onChange={(e) => handleCardInputChange('name', e.target.value)}
                        />
                      </div>
                      
                      <Button onClick={addPaymentMethod} className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getCardIcon(method.type)}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">•••• •••• •••• {method.last4}</span>
                              {method.isDefault && (
                                <Badge variant="secondary" className="bg-primary-light text-primary flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => makeDefault(method.id)}
                            >
                              Make Default
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeCard(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-center">
                  <p className="text-sm text-text-secondary">
                    Your payment information is securely stored and never shared.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Billing;