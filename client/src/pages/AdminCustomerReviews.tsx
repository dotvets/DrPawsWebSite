import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const formSchema = insertCustomerReviewSchema;

type FormData = z.infer<typeof formSchema>;

export default function AdminCustomerReviews() {
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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

  const handleEdit = (review: CustomerReview) => {
    setEditingId(review.id);
    form.reset({
      name: review.name,
      rating: review.rating,
      message: review.message,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  const onSubmit = (data: FormData) => {
    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-2xl font-bold">Customer Reviews Management</h1>
            <div className="w-10" />
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingId !== null ? "Edit Customer Review" : "Add New Customer Review"}
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
                            <FormLabel>Customer Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter customer name"
                                {...field}
                                data-testid="input-customer-name"
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
                                <SelectTrigger data-testid="select-rating">
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 Star</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
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
                            <FormLabel>Review Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter customer review message"
                                className="min-h-32"
                                {...field}
                                data-testid="textarea-message"
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
                  <CardTitle>Existing Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading reviews...</p>
                  ) : reviews.length === 0 ? (
                    <p className="text-muted-foreground">No customer reviews yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id} data-testid={`card-review-${review.id}`}>
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-lg" data-testid={`text-name-${review.id}`}>
                                    {review.name}
                                  </h3>
                                  <div className="flex items-center gap-1" data-testid={`rating-${review.id}`}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "fill-gray-300 text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-muted-foreground" data-testid={`text-message-${review.id}`}>
                                  {review.message}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(review)}
                                  data-testid={`button-edit-${review.id}`}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteMutation.mutate(review.id)}
                                  disabled={deleteMutation.isPending}
                                  data-testid={`button-delete-${review.id}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
