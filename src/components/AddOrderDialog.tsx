import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CalendarIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export const AddOrderDialog = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [formData, setFormData] = useState({
    customerId: "",
    paymentStatus: "",
    shippingAddress: "",
    notes: "",
  });

  // Mock data - replace with actual data from your backend
  const customers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Bob Johnson" },
    { id: "4", name: "Alice Brown" },
  ];

  const products = [
    { id: "1", name: "Wireless Mouse", price: 29.99 },
    { id: "2", name: "USB Cable", price: 9.99 },
    { id: "3", name: "Laptop Stand", price: 49.99 },
    { id: "4", name: "Keyboard", price: 79.99 },
    { id: "5", name: "Monitor", price: 299.99 },
  ];

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          if (field === "productId") {
            const product = products.find((p) => p.id === value);
            return {
              ...item,
              productId: value,
              productName: product?.name || "",
              price: product?.price || 0,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerId) {
      toast.error("Please select a customer");
      return;
    }
    
    if (orderItems.length === 0) {
      toast.error("Please add at least one product");
      return;
    }
    
    if (orderItems.some((item) => !item.productId)) {
      toast.error("Please select a product for all items");
      return;
    }

    toast.success("Order created successfully!");
    setOpen(false);
    setFormData({ customerId: "", paymentStatus: "", shippingAddress: "", notes: "" });
    setOrderItems([]);
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Select customer, add products, and fill in order details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Customer Selection */}
            <div className="grid gap-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => setFormData({ ...formData, customerId: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Order Date */}
            <div className="grid gap-2">
              <Label>Order Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Order Items */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Products *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addOrderItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Product
                </Button>
              </div>
              
              {orderItems.length === 0 ? (
                <div className="border border-dashed border-border rounded-lg p-6 text-center text-muted-foreground">
                  No products added yet. Click "Add Product" to start.
                </div>
              ) : (
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-end p-3 bg-muted rounded-lg">
                      <div className="flex-1 grid gap-2">
                        <Label className="text-xs">Product</Label>
                        <Select
                          value={item.productId}
                          onValueChange={(value) => updateOrderItem(item.id, "productId", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} - ${product.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-24 grid gap-2">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateOrderItem(item.id, "quantity", parseInt(e.target.value) || 1)
                          }
                          required
                        />
                      </div>
                      <div className="w-28 grid gap-2">
                        <Label className="text-xs">Subtotal</Label>
                        <div className="h-10 px-3 bg-background rounded-md border border-input flex items-center font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOrderItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="flex justify-end items-center gap-3 pt-2 border-t border-border">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Status */}
            <div className="grid gap-2">
              <Label htmlFor="payment-status">Payment Status *</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => setFormData({ ...formData, paymentStatus: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partially_paid">Partially Paid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Shipping Address */}
            <div className="grid gap-2">
              <Label htmlFor="shipping-address">Shipping Address</Label>
              <Textarea
                id="shipping-address"
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                placeholder="Enter shipping address"
                rows={3}
              />
            </div>

            {/* Notes */}
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes or instructions"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
