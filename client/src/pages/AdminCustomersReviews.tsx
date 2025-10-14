import { Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
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
import { insertCustomerReviewSchema, type CustomerReview } from "@shared/schema";
import { AdminManagement } from "@/components/AdminManagement";
import { UseFormReturn } from "react-hook-form";

type FormData = typeof insertCustomerReviewSchema._type;

export default function AdminCustomersReviews() {
  return (
    <AdminManagement
      entityName="Review"
      entityNamePlural="Customers Reviews"
      apiEndpoint="/api/customer-reviews"
      formSchema={insertCustomerReviewSchema}
      defaultValues={{
        name: "",
        nameAr: "",
        rating: 5,
        message: "",
      }}
      description='Manage customer testimonials that appear in "What Our Customers Say" section'
      renderFormFields={(form: UseFormReturn<FormData>) => (
        <>
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
                <FormLabel>Rating</FormLabel>
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
                    <SelectItem value="5">5 Stars - Excellent</SelectItem>
                    <SelectItem value="4">4 Stars - Very Good</SelectItem>
                    <SelectItem value="3">3 Stars - Good</SelectItem>
                    <SelectItem value="2">2 Stars - Fair</SelectItem>
                    <SelectItem value="1">1 Star - Poor</SelectItem>
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
                    placeholder="Write the customer's testimonial here..."
                    className="min-h-[100px]"
                    data-testid="input-review-message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      renderTableColumns={() => [
        { header: "Review", width: "60%" },
        { header: "Actions", width: "40%" },
      ]}
      renderTableRow={(review, onEdit, onDelete) => (
        <tr key={review.id} className="border-b" data-testid={`review-item-${review.id}`}>
          <td className="py-3 px-2">
            <h3 className="font-semibold text-foreground">{review.name}</h3>
            <div className="flex gap-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {review.message}
            </p>
          </td>
          <td className="py-3 px-2">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onEdit(review)}
                data-testid={`button-edit-${review.id}`}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onDelete(review.id)}
                data-testid={`button-delete-${review.id}`}
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
