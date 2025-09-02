import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  Clock,
  CheckCircle,
  Package,
  MessageCircle
} from "lucide-react";
import LoggedInNavbar from "@/components/LoggedInNavbar";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  gigTitle: string;
  sellerName: string;
  status: 'active' | 'completed' | 'cancelled' | 'in-progress' | 'delivered';
  price: number;
  deliveryDate: string;
  packageName: string;
  description: string;
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "03/15/2024",
      gigTitle: "I will create stunning social media content for your brand",
      sellerName: "Sarah Johnson",
      status: "in-progress",
      price: 95.25,
      deliveryDate: "03/17/2024",
      packageName: "Standard Package",
      description: "5 social media posts with custom graphics and hashtag research"
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "03/10/2024",
      gigTitle: "I will design a professional logo for your business",
      sellerName: "Mike Chen",
      status: "completed",
      price: 150.00,
      deliveryDate: "03/12/2024",
      packageName: "Premium Package",
      description: "Complete logo design with 3 concepts and unlimited revisions"
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "03/05/2024",
      gigTitle: "I will write compelling website copy for your business",
      sellerName: "Emma Wilson",
      status: "delivered",
      price: 200.00,
      deliveryDate: "03/08/2024",
      packageName: "Standard Package",
      description: "Homepage and 3 additional pages with SEO optimization"
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      date: "02/28/2024",
      gigTitle: "I will create animated videos for your marketing",
      sellerName: "David Garcia",
      status: "cancelled",
      price: 300.00,
      deliveryDate: "03/05/2024",
      packageName: "Basic Package",
      description: "30-second animated promotional video"
    },
    {
      id: "5",
      orderNumber: "ORD-2024-005",
      date: "02/20/2024",
      gigTitle: "I will develop a mobile app for your business",
      sellerName: "Alex Rodriguez",
      status: "active",
      price: 800.00,
      deliveryDate: "03/20/2024",
      packageName: "Premium Package",
      description: "Full mobile app development for iOS and Android"
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      'active': { label: 'Active', className: 'bg-blue-100 text-blue-700' },
      'in-progress': { label: 'In Progress', className: 'bg-yellow-100 text-yellow-700' },
      'delivered': { label: 'Delivered', className: 'bg-green-100 text-green-700' },
      'completed': { label: 'Completed', className: 'bg-green-100 text-green-700' },
      'cancelled': { label: 'Cancelled', className: 'bg-red-100 text-red-700' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'active':
        return <Package className="h-4 w-4 text-blue-600" />;
      default:
        return <Package className="h-4 w-4 text-text-secondary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LoggedInNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-heading-dark">My Orders</h1>
          <p className="text-text-secondary">Track and manage your service orders</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    placeholder="Search by order number, gig title, or seller name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-heading-dark mb-2">
                  {searchQuery || statusFilter !== "all" 
                    ? "No orders found for your criteria"
                    : "You haven't placed any orders yet"
                  }
                </h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Ready to find your next service?"
                  }
                </p>
                {(!searchQuery && statusFilter === "all") && (
                  <Button asChild>
                    <Link to="/browse">Browse Services</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Service / Gig</TableHead>
                      <TableHead>Order Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div>
                            <Link 
                              to={`/gig/${order.id}`} 
                              className="font-medium text-primary hover:underline"
                            >
                              {order.gigTitle}
                            </Link>
                            <p className="text-sm text-text-secondary">by {order.sellerName}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            {getStatusBadge(order.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          ${order.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Order Details</DialogTitle>
                                </DialogHeader>
                                {selectedOrder && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-medium mb-2">Order Information</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><span className="text-text-secondary">Order Number:</span> {selectedOrder.orderNumber}</p>
                                          <p><span className="text-text-secondary">Date:</span> {selectedOrder.date}</p>
                                          <p><span className="text-text-secondary">Seller:</span> {selectedOrder.sellerName}</p>
                                          <p><span className="text-text-secondary">Package:</span> {selectedOrder.packageName}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Status & Delivery</h4>
                                        <div className="space-y-1 text-sm">
                                          <p className="flex items-center gap-2">
                                            <span className="text-text-secondary">Status:</span> 
                                            {getStatusBadge(selectedOrder.status)}
                                          </p>
                                          <p><span className="text-text-secondary">Expected Delivery:</span> {selectedOrder.deliveryDate}</p>
                                          <p><span className="text-text-secondary">Total Paid:</span> <span className="font-semibold text-primary">${selectedOrder.price.toFixed(2)}</span></p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <h4 className="font-medium mb-2">Service Details</h4>
                                      <h5 className="font-medium text-heading-dark">{selectedOrder.gigTitle}</h5>
                                      <p className="text-sm text-text-secondary">{selectedOrder.description}</p>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button variant="outline" asChild>
                                        <Link to="/messages">
                                          <MessageCircle className="h-4 w-4 mr-1" />
                                          Message Seller
                                        </Link>
                                      </Button>
                                      {(selectedOrder.status === 'completed' || selectedOrder.status === 'delivered') && (
                                        <Button variant="outline">
                                          <Download className="h-4 w-4 mr-1" />
                                          Download Files
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {(order.status === 'completed' || order.status === 'delivered') && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;