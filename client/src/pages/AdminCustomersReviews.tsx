import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { insertCustomerReviewSchema, type CustomerReview } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

type FormData = typeof insertCustomerReviewSchema._type;

export default function AdminCustomersReviews() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      setLocation('/login-admin');
    }
  }, [setLocation]);

  const { data: reviews = [], isLoading } = useQuery<CustomerReview[]>({
    queryKey: ["/api/customer-reviews"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(insertCustomerReviewSchema),
    defaultValues: {
      name: "",
      nameAr: "",
      rating: 5,
      message: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/customer-reviews", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customer-reviews"] });
      form.reset();
      toast({
        title: "Success",
        description: "Customer review created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create customer review",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      return apiRequest("PUT", `/api/customer-reviews/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customer-reviews"] });
      form.reset();
      setEditingId(null);
      toast({
        title: "Success",
        description: "Customer review updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update customer review",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/customer-reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/customer-reviews"] });
      toast({
        title: "Success",
        description: "Customer review deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete customer review",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: FormData) {
    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  }

  function handleEdit(review: CustomerReview) {
    setEditingId(review.id);
    form.reset({
      name: review.name,
      nameAr: review.nameAr || "",
      rating: review.rating,
      message: review.message,
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    form.reset();
  }

  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center gap-4 p-4 border-b bg-[#264653]">
            <SidebarTrigger className="text-white" data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-display text-white" data-testid="text-page-title">
              Customers Reviews Management
            </h1>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Customers Reviews</h2>
                <p className="text-muted-foreground mt-1">
                  Manage customer testimonials that appear in "What Our Customers Say" section
                </p>
              </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId !== null ? "Edit Review" : "Add New Review"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name (English)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., John Smith"
                          data-testid="input-review-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nameAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name (Arabic)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., جون سميث"
                          data-testid="input-review-name-ar"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Star Rating</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(parseInt(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-review-rating">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5" data-testid="select-rating-5">5 Stars</SelectItem>
                          <SelectItem value="4" data-testid="select-rating-4">4 Stars</SelectItem>
                          <SelectItem value="3" data-testid="select-rating-3">3 Stars</SelectItem>
                          <SelectItem value="2" data-testid="select-rating-2">2 Stars</SelectItem>
                          <SelectItem value="1" data-testid="select-rating-1">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter customer's feedback or testimonial..."
                          className="min-h-[120px]"
                          data-testid="input-review-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-review"
                  >
                    {editingId !== null ? (
                      <>
                        <Pencil className="w-4 h-4 mr-2" />
                        Update Review
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Review
                      </>
                    )}
                  </Button>
                  {editingId !== null && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      data-testid="button-cancel-edit"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Create one to get started.</p>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-start justify-between p-4 border rounded-md"
                    data-testid={`review-item-${review.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {review.name}
                        </h3>
                        {review.nameAr && (
                          <span className="text-sm text-muted-foreground">
                            ({review.nameAr})
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {review.message}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(review)}
                        data-testid={`button-edit-${review.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(review.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${review.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
