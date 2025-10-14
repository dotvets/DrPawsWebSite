import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Pencil, Trash2, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { insertPartnerSchema, type Partner } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import { AdminManagement } from "@/components/AdminManagement";
import type { UploadResult } from "@uppy/core";
import { UseFormReturn } from "react-hook-form";

const formSchema = insertPartnerSchema;
type FormData = z.infer<typeof formSchema>;

export default function AdminOurPartners() {
  const { toast } = useToast();

  const uploadLogoMutation = useMutation({
    mutationFn: async ({ id, logoURL }: { id: number; logoURL: string }) => {
      return apiRequest("PUT", `/api/partners/${id}/logo`, { logoURL });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/partners"] });
      toast({
        title: "Success",
        description: "Logo updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update logo",
        variant: "destructive",
      });
    },
  });

  async function handleGetUploadParameters() {
    const response = await apiRequest("POST", "/api/objects/upload", {}) as unknown as { uploadURL: string };
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

  function handleFormLogoUpload(form: UseFormReturn<FormData>, result: UploadResult<Record<string, unknown>, Record<string, unknown>>) {
    if (result.successful && result.successful[0]) {
      const uploadURL = result.successful[0].uploadURL;
      if (uploadURL) {
        form.setValue("logoUrl", uploadURL);
        toast({
          title: "Success",
          description: "Logo uploaded successfully",
        });
      }
    }
  }

  return (
    <AdminManagement
      entityName="Partner"
      entityNamePlural="Our Partners"
      apiEndpoint="/api/partners"
      formSchema={formSchema}
      defaultValues={{
        name: "",
        nameAr: "",
        logoUrl: "",
      }}
      description="Manage partners that appear on the About page"
      renderFormFields={(form: UseFormReturn<FormData>) => (
        <>
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
                    <Input {...field} value={field.value || ""} placeholder="أدخل اسم الشريك" data-testid="input-name-ar" />
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
                <FormLabel>Partner Logo</FormLabel>
                <div className="flex items-center gap-4">
                  {field.value ? (
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={field.value}
                        alt="Partner logo preview"
                        className="w-20 h-20 object-contain bg-white rounded border"
                        data-testid="img-logo-preview"
                      />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-600" />
                        Logo uploaded
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-20 h-20 bg-muted rounded flex items-center justify-center">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No logo uploaded yet</p>
                    </div>
                  )}
                  <ObjectUploader
                    maxNumberOfFiles={1}
                    maxFileSize={5242880}
                    onGetUploadParameters={handleGetUploadParameters}
                    onComplete={(result) => handleFormLogoUpload(form, result)}
                    buttonClassName="h-9"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {field.value ? "Change Logo" : "Upload Logo"}
                  </ObjectUploader>
                </div>
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      renderTableColumns={() => [
        { header: "Partner", width: "60%" },
        { header: "Actions", width: "40%" },
      ]}
      renderTableRow={(partner, onEdit, onDelete) => (
        <tr key={partner.id} className="border-b" data-testid={`partner-row-${partner.id}`}>
          <td className="py-3 px-2">
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
              <div>
                <h3 className="font-semibold" data-testid={`text-partner-name-${partner.id}`}>{partner.name}</h3>
                {partner.nameAr && (
                  <p className="text-sm text-muted-foreground" data-testid={`text-partner-name-ar-${partner.id}`}>{partner.nameAr}</p>
                )}
              </div>
            </div>
          </td>
          <td className="py-3 px-2">
            <div className="flex gap-2">
              <ObjectUploader
                maxNumberOfFiles={1}
                maxFileSize={5242880}
                onGetUploadParameters={handleGetUploadParameters}
                onComplete={(result) => handleUploadComplete(partner.id, result)}
                buttonClassName="h-9"
              >
                <Upload className="w-4 h-4 mr-2" />
                Update Logo
              </ObjectUploader>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onEdit(partner)}
                data-testid={`button-edit-${partner.id}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onDelete(partner.id)}
                data-testid={`button-delete-${partner.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </td>
        </tr>
      )}
    />
  );
}
