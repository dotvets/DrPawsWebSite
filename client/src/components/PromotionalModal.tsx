import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface PromotionalModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PromotionalModal({ open, onClose }: PromotionalModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest('/api/opening-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      toast({
        title: 'تم التسجيل بنجاح!',
        description: 'سنتواصل معك قريباً بشأن عرض الافتتاح الخاص',
      });

      setFormData({ firstName: '', lastName: '', phoneNumber: '' });
      onClose();
    } catch (error: any) {
      const errorMessage = error?.error === 'Phone number already registered' 
        ? 'رقم الهاتف مسجل مسبقاً'
        : 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى';
      
      toast({
        title: 'خطأ',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden" dir="rtl">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
          data-testid="button-close-modal"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">إغلاق</span>
        </button>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center border-b">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary mb-2">
              عرض افتتاح فرع جدة!
            </DialogTitle>
            <DialogDescription className="text-lg text-foreground/90">
              ترقبوا افتتاح فرعنا في جدة! سجل بياناتك الآن واحصل على خصم 20% لمدة 6 أشهر بعد الافتتاح
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-right">
                الاسم الأول <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                dir="rtl"
                placeholder="أدخل الاسم الأول"
                data-testid="input-first-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-right">
                الاسم الأخير <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                dir="rtl"
                placeholder="أدخل الاسم الأخير"
                data-testid="input-last-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-right">
                رقم الهاتف <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
                dir="ltr"
                placeholder="05xxxxxxxx"
                data-testid="input-phone-number"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            data-testid="button-submit-registration"
          >
            {isSubmitting ? 'جاري التسجيل...' : 'سجل الآن واحصل على الخصم'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
