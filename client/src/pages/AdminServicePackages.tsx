import { useState } from "react";
import { z } from "zod";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { insertServicePackageSchema, type ServicePackage } from "@shared/schema";
import { AdminManagement } from "@/components/AdminManagement";
import { UseFormReturn } from "react-hook-form";

const formSchema = insertServicePackageSchema.extend({
  features: z.string().min(1, "At least one feature is required"),
  featuresAr: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminServicePackages() {
  const [featuresState, setFeaturesState] = useState<{
    features: string;
    featuresAr: string;
  }>({ features: "", featuresAr: "" });

  return (
    <AdminManagement
      entityName="Package"
      entityNamePlural="Service Packages"
      apiEndpoint="/api/service-packages"
      formSchema={formSchema}
      defaultValues={{
        name: "",
        nameAr: "",
        price: "",
        period: "",
        periodAr: "",
        popular: false,
        features: "",
        featuresAr: "",
      }}
      description="Manage service packages that appear on the website"
      transformDataForSubmit={(data) => {
        const featuresArray = data.features.split("\n").filter((f: string) => f.trim());
        const featuresArArray = data.featuresAr ? data.featuresAr.split("\n").filter((f: string) => f.trim()) : [];
        return {
          ...data,
          features: featuresArray,
          featuresAr: featuresArArray.length > 0 ? featuresArArray : null,
        };
      }}
      transformDataForEdit={(pkg) => {
        const featuresText = pkg.features.join("\n");
        const featuresArText = pkg.featuresAr ? pkg.featuresAr.join("\n") : "";
        setFeaturesState({ features: featuresText, featuresAr: featuresArText });
        return {
          name: pkg.name,
          nameAr: pkg.nameAr || "",
          price: pkg.price,
          period: pkg.period,
          periodAr: pkg.periodAr || "",
          popular: pkg.popular,
          features: featuresText,
          featuresAr: featuresArText,
        };
      }}
      customState={featuresState}
      onCustomStateChange={(state) => setFeaturesState(state || { features: "", featuresAr: "" })}
      renderFormFields={(form: UseFormReturn<FormData>, editingId, customState) => (
        <>
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={customState?.features || ""}
                    onChange={(e) => {
                      setFeaturesState(prev => ({ ...prev, features: e.target.value }));
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
                    value={customState?.featuresAr || ""}
                    onChange={(e) => {
                      setFeaturesState(prev => ({ ...prev, featuresAr: e.target.value }));
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
        </>
      )}
      renderTableColumns={() => [
        { header: "Package", width: "60%" },
        { header: "Actions", width: "40%" },
      ]}
      renderTableRow={(pkg, onEdit, onDelete) => (
        <tr key={pkg.id} className="border-b" data-testid={`package-item-${pkg.id}`}>
          <td className="py-3 px-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{pkg.name}</h3>
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
              {pkg.features.slice(0, 2).map((feature: string, idx: number) => (
                <li key={idx} className="text-xs text-muted-foreground">
                  • {feature}
                </li>
              ))}
              {pkg.features.length > 2 && (
                <li className="text-xs text-muted-foreground">
                  +{pkg.features.length - 2} more
                </li>
              )}
            </ul>
          </td>
          <td className="py-3 px-2">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onEdit(pkg)}
                data-testid={`button-edit-${pkg.id}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onDelete(pkg.id)}
                data-testid={`button-delete-${pkg.id}`}
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
