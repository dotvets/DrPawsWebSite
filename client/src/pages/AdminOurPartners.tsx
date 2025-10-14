import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { insertPartnerSchema, type Partner } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from "@uppy/core";

const formSchema = insertPartnerSchema;

type FormData = z.infer<typeof formSchema>;

export default function AdminOurPartners() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      setLocation('/login-admin');
    }
  }, [setLocation]);

  const { data: partners = [], isLoading } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nameAr: "",
      logoUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/partners", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      form.reset();
      toast({
        title: "Success",
        description: "Partner created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create partner",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      return apiRequest("PUT", `/api/partners/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      form.reset();
      setEditingId(null);
      toast({
        title: "Success",
        description: "Partner updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update partner",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/partners/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive",
      });
    },
  });

  const uploadLogoMutation = useMutation({
    mutationFn: async ({ id, logoURL }: { id: number; logoURL: string }) => {
      return apiRequest("PUT", `/api/partners/${id}/logo`, { logoURL });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      setUploadingId(null);
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload logo",
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

  function handleEdit(partner: Partner) {
    setEditingId(partner.id);
    form.reset({
      name: partner.name,
      nameAr: partner.nameAr || "",
      logoUrl: partner.logoUrl,
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    form.reset();
  }

  async function handleGetUploadParameters() {
    const response = await apiRequest("POST", "/api/objects/upload", {});
    return {
      method: "PUT" as const,
      url: response.uploadURL,
    };
  }

  function handleUploadComplete(partnerId: number, result: UploadResult<Record<string, unknown>, Record<string, unknown>>) {
    if (result.successful && result.successful[0]) {
      const uploadURL = result.successful[0].uploadURL;
      if (uploadURL) {
        uploadLogoMutation.mutate({ id: partnerId, logoURL: uploadURL });
      }
    }
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
              Our Partners Management
            </h1>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground" data-testid="text-partners-heading">Our Partners</h2>
                <p className="text-muted-foreground mt-1">
                  Manage partners that appear on the About page
                </p>
              </div>

              <Card data-testid="card-partner-form">
                <CardHeader>
                  <CardTitle data-testid="text-form-title">
                    {editingId ? "Edit Partner" : "Add New Partner"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Partner Name (English)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter partner name" data-testid="input-name" />
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
                              <FormLabel>Partner Name (Arabic)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="أدخل اسم الشريك" data-testid="input-name-ar" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="logoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo URL (Temporary)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Logo will be uploaded after creation" disabled data-testid="input-logo-url" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          disabled={createMutation.isPending || updateMutation.isPending}
                          data-testid="button-submit"
                        >
                          {editingId ? "Update Partner" : "Add Partner"}
                        </Button>
                        {editingId && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleCancelEdit}
                            data-testid="button-cancel"
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

              {isLoading ? (
                <div className="text-center py-8" data-testid="loading-state">
                  <p className="text-muted-foreground">Loading partners...</p>
                </div>
              ) : partners.length === 0 ? (
                <div className="text-center py-8" data-testid="empty-state">
                  <p className="text-muted-foreground">No partners yet. Create your first partner above.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {partners.map((partner) => (
                    <Card key={partner.id} className="hover-elevate" data-testid={`card-partner-${partner.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          {partner.logoUrl ? (
                            <img
                              src={partner.logoUrl}
                              alt={partner.name}
                              className="w-16 h-16 object-contain bg-white rounded"
                              data-testid={`img-partner-logo-${partner.id}`}
                            />
                          ) : (
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center" data-testid={`placeholder-logo-${partner.id}`}>
                              <Upload className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold" data-testid={`text-partner-name-${partner.id}`}>{partner.name}</h3>
                            {partner.nameAr && (
                              <p className="text-sm text-muted-foreground" data-testid={`text-partner-name-ar-${partner.id}`}>{partner.nameAr}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <ObjectUploader
                              maxNumberOfFiles={1}
                              maxFileSize={5242880}
                              onGetUploadParameters={handleGetUploadParameters}
                              onComplete={(result) => handleUploadComplete(partner.id, result)}
                              buttonClassName="h-9"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Logo
                            </ObjectUploader>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEdit(partner)}
                              data-testid={`button-edit-${partner.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteMutation.mutate(partner.id)}
                              disabled={deleteMutation.isPending}
                              data-testid={`button-delete-${partner.id}`}
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
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
