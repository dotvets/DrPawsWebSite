import { useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ZodSchema } from "zod";
import ECGAnimation from "@/components/ECGAnimation";

interface AdminManagementProps {
  entityName: string;
  entityNamePlural: string;
  apiEndpoint: string;
  formSchema: ZodSchema<any>;
  defaultValues: any;
  description?: string;
  transformDataForSubmit?: (data: any) => any;
  transformDataForEdit?: (entity: any) => any;
  renderFormFields: (form: UseFormReturn<any>, editingId: number | null, customState?: any) => ReactNode;
  renderTableColumns: () => { header: string; width?: string }[];
  renderTableRow: (item: any, onEdit: (item: any) => void, onDelete: (id: number) => void) => ReactNode;
  customState?: any;
  onCustomStateChange?: (state: any) => void;
}

export function AdminManagement({
  entityName,
  entityNamePlural,
  apiEndpoint,
  formSchema,
  defaultValues,
  description,
  transformDataForSubmit = (data) => data,
  transformDataForEdit = (entity) => entity,
  renderFormFields,
  renderTableColumns,
  renderTableRow,
  customState,
  onCustomStateChange,
}: AdminManagementProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      setLocation('/login-admin');
    }
  }, [setLocation]);

  const { data: items = [], isLoading } = useQuery<any[]>({
    queryKey: [apiEndpoint],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const transformedData = transformDataForSubmit(data);
      return apiRequest("POST", apiEndpoint, transformedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiEndpoint] });
      form.reset();
      if (onCustomStateChange) {
        onCustomStateChange(undefined);
      }
      toast({
        title: "Success",
        description: `${entityName} created successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to create ${entityName.toLowerCase()}`,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const transformedData = transformDataForSubmit(data);
      return apiRequest("PUT", `${apiEndpoint}/${id}`, transformedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiEndpoint] });
      form.reset();
      setEditingId(null);
      if (onCustomStateChange) {
        onCustomStateChange(undefined);
      }
      toast({
        title: "Success",
        description: `${entityName} updated successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to update ${entityName.toLowerCase()}`,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `${apiEndpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiEndpoint] });
      toast({
        title: "Success",
        description: `${entityName} deleted successfully`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to delete ${entityName.toLowerCase()}`,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: any) {
    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    const formData = transformDataForEdit(item);
    form.reset(formData);
  }

  function handleCancelEdit() {
    setEditingId(null);
    form.reset();
    if (onCustomStateChange) {
      onCustomStateChange(undefined);
    }
  }

  function handleDelete(id: number) {
    if (confirm(`Are you sure you want to delete this ${entityName.toLowerCase()}?`)) {
      deleteMutation.mutate(id);
    }
  }

  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  const columns = renderTableColumns();

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center gap-4 p-4 border-b bg-[#264653]">
            <SidebarTrigger className="text-white" data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-display text-white" data-testid="text-page-title">
              {entityNamePlural} Management
            </h1>
          </header>
          <ECGAnimation />
          <main className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">{entityNamePlural}</h2>
                {description && (
                  <p className="text-muted-foreground mt-1">{description}</p>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingId !== null ? `Edit ${entityName}` : `Add New ${entityName}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {renderFormFields(form, editingId, customState)}
                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            data-testid="button-submit"
                          >
                            {editingId !== null ? "Update" : "Create"}
                          </Button>
                          {editingId !== null && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleCancelEdit}
                              data-testid="button-cancel"
                            >
                              <X className="h-4 w-4 mr-2" />
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
                    <CardTitle>Existing {entityNamePlural}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <p className="text-muted-foreground">Loading...</p>
                    ) : items.length === 0 ? (
                      <p className="text-muted-foreground">No {entityNamePlural.toLowerCase()} yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full" data-testid="table-items">
                          <thead>
                            <tr className="border-b">
                              {columns.map((col, idx) => (
                                <th
                                  key={idx}
                                  className="text-left py-2 px-2 text-sm font-semibold"
                                  style={col.width ? { width: col.width } : undefined}
                                >
                                  {col.header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item) => renderTableRow(item, handleEdit, handleDelete))}
                          </tbody>
                        </table>
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
