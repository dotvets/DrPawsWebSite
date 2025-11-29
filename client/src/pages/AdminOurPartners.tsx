import { useState, useRef } from "react";
import { Pencil, Trash2, Upload, Check, X } from "lucide-react";
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
import { AdminManagement } from "@/components/AdminManagement";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = insertPartnerSchema;
type FormData = z.infer<typeof formSchema>;

export default function AdminOurPartners() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentForm, setCurrentForm] = useState<UseFormReturn<FormData> | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, form: UseFormReturn<FormData>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 500 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 500KB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      form.setValue("logoUrl", base64String);
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    };
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read image file",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
  };

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
      customState={(form: UseFormReturn<FormData>) => {
        setCurrentForm(form);
      }}
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
                <div className="space-y-4">
                  {field.value ? (
                    <div className="flex items-center gap-4">
                      <img
                        src={field.value}
                        alt="Partner logo preview"
                        className="w-32 h-32 object-contain bg-white rounded border p-2"
                        data-testid="img-logo-preview"
                      />
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-green-600" />
                          Logo uploaded and ready
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            form.setValue("logoUrl", "");
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          data-testid="button-remove-logo"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove Logo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 bg-muted rounded flex items-center justify-center border-2 border-dashed">
                        <Upload className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No logo uploaded yet</p>
                    </div>
                  )}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e, form)}
                      className="hidden"
                      data-testid="input-logo-file"
                    />
                    <Button
                      type="button"
                      variant={field.value ? "outline" : "default"}
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="button-upload-logo"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {field.value ? "Change Logo" : "Upload Logo"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PNG, JPG, JPEG. Max size: 500KB
                    </p>
                  </div>
                </div>
                <FormControl>
                  <Input {...field} value={field.value || ""} type="hidden" />
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
                  className="w-16 h-16 object-contain bg-white rounded p-1 border"
                  data-testid={`img-partner-logo-${partner.id}`}
                />
              ) : (
                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center border" data-testid={`placeholder-logo-${partner.id}`}>
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
