import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2, X } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { insertServicePackageSchema, type ServicePackage } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const formSchema = insertServicePackageSchema.extend({
  features: z.string().min(1, "At least one feature is required"),
  featuresAr: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminServicePackages() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [featuresInput, setFeaturesInput] = useState("");
  const [featuresArInput, setFeaturesArInput] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      setLocation('/login-admin');
    }
  }, [setLocation]);

  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/service-packages"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nameAr: "",
      price: "",
      period: "",
      periodAr: "",
      popular: false,
      features: "",
      featuresAr: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const featuresArray = data.features.split("\n").filter(f => f.trim());
      const featuresArArray = data.featuresAr ? data.featuresAr.split("\n").filter(f => f.trim()) : [];
      return apiRequest("POST", "/api/service-packages", {
        ...data,
        features: featuresArray,
        featuresAr: featuresArArray.length > 0 ? featuresArArray : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
      form.reset();
      setFeaturesInput("");
      setFeaturesArInput("");
      toast({
        title: "Success",
        description: "Service package created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create service package",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const featuresArray = data.features.split("\n").filter(f => f.trim());
      const featuresArArray = data.featuresAr ? data.featuresAr.split("\n").filter(f => f.trim()) : [];
      return apiRequest("PUT", `/api/service-packages/${id}`, {
        ...data,
        features: featuresArray,
        featuresAr: featuresArArray.length > 0 ? featuresArArray : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
      form.reset();
      setFeaturesInput("");
      setFeaturesArInput("");
      setEditingId(null);
      toast({
        title: "Success",
        description: "Service package updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update service package",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/service-packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/service-packages"] });
      toast({
        title: "Success",
        description: "Service package deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete service package",
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

  function handleEdit(pkg: ServicePackage) {
    setEditingId(pkg.id);
    const featuresText = pkg.features.join("\n");
    const featuresArText = pkg.featuresAr ? pkg.featuresAr.join("\n") : "";
    setFeaturesInput(featuresText);
    setFeaturesArInput(featuresArText);
    form.reset({
      name: pkg.name,
      nameAr: pkg.nameAr || "",
      price: pkg.price,
      period: pkg.period,
      periodAr: pkg.periodAr || "",
      popular: pkg.popular,
      features: featuresText,
      featuresAr: featuresArText,
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    form.reset();
    setFeaturesInput("");
    setFeaturesArInput("");
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
              Service Packages Management
            </h1>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Service Packages</h2>
                <p className="text-muted-foreground mt-1">
                  Manage service packages that appear on the website
                </p>
              </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId !== null ? "Edit Package" : "Add New Package"}
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
                      <FormLabel>Package Name (English)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Basic Care"
                          data-testid="input-package-name"
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
                      <FormLabel>Package Name (Arabic)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., الرعاية الأساسية"
                          data-testid="input-package-name-ar"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 100 SAR"
                            data-testid="input-package-price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Period (English)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., /month"
                            data-testid="input-package-period"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="periodAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Period (Arabic)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., /شهرياً"
                          data-testid="input-package-period-ar"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (English - one per line)</FormLabel>
                      <FormControl>
                        <textarea
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                          data-testid="input-package-features"
                          value={featuresInput}
                          onChange={(e) => {
                            setFeaturesInput(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featuresAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (Arabic - one per line)</FormLabel>
                      <FormControl>
                        <textarea
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                          data-testid="input-package-features-ar"
                          value={featuresArInput}
                          onChange={(e) => {
                            setFeaturesArInput(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="popular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-package-popular"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Mark as popular</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit-package"
                  >
                    {editingId !== null ? (
                      <>
                        <Pencil className="w-4 h-4 mr-2" />
                        Update Package
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Package
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
            <CardTitle>Existing Packages</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading packages...</p>
            ) : packages.length === 0 ? (
              <p className="text-muted-foreground">No packages yet. Create one to get started.</p>
            ) : (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-start justify-between p-4 border rounded-md"
                    data-testid={`package-item-${pkg.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {pkg.name}
                        </h3>
                        {pkg.popular && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pkg.price} {pkg.period}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                        {pkg.features.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{pkg.features.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(pkg)}
                        data-testid={`button-edit-${pkg.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => deleteMutation.mutate(pkg.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${pkg.id}`}
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
