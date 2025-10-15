import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.MICROSOFT365_EMAIL,
    pass: process.env.MICROSOFT365_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

interface DiscountEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  discountCode: string;
  language: 'en' | 'ar';
}

const createEmailTemplate = (params: DiscountEmailParams): string => {
  const { firstName, lastName, discountCode, language } = params;
  
  if (language === 'ar') {
    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رمز الخصم الخاص بك</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #18ac61 0%, #15a057 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">🎉 مرحباً بك في عائلة د. باوز!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 18px; line-height: 1.6;">
                عزيزي/عزيزتي ${firstName} ${lastName}،
              </p>
              
              <p style="margin: 0 0 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                شكراً لتسجيلك في عرض افتتاح فرعنا الجديد في جدة! 🎊
              </p>
              
              <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                نحن متحمسون لخدمتك ورعاية حيواناتك الأليفة بأفضل خدمات بيطرية في المنطقة.
              </p>
              
              <!-- Discount Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #f4a261 0%, #e76f51 100%); border-radius: 8px; padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px; color: #ffffff; font-size: 16px; font-weight: 500;">رمز الخصم الخاص بك</p>
                    <p style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">${discountCode}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Discount Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px; color: #18ac61; font-size: 20px;">✨ تفاصيل العرض</h3>
                    <ul style="margin: 0; padding: 0 0 0 25px; color: #555555; line-height: 1.8;">
                      <li style="margin-bottom: 10px;">خصم <strong>20%</strong> على جميع خدماتنا</li>
                      <li style="margin-bottom: 10px;">صالح لمدة <strong>6 أشهر</strong> من تاريخ التسجيل</li>
                      <li style="margin-bottom: 10px;">يمكن استخدامه في جميع زياراتك</li>
                      <li>متاح في جميع فروعنا (الرياض - جدة)</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                احفظ هذا الرمز وأظهره عند زيارتك القادمة للاستفادة من الخصم الحصري!
              </p>
              
              <p style="margin: 30px 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                نتطلع لرؤيتك قريباً! 🐾
              </p>
              
              <p style="margin: 20px 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                مع أطيب التحيات،<br>
                <strong style="color: #18ac61;">فريق د. باوز</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #264653; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #ffffff; font-size: 16px; font-weight: 500;">تواصل معنا</p>
              <p style="margin: 0 0 5px; color: #a8dadc; font-size: 14px;">📍 الرياض - الصحافة: 0552030564</p>
              <p style="margin: 0 0 5px; color: #a8dadc; font-size: 14px;">📍 الرياض - المطار: 0531353667</p>
              <p style="margin: 0 0 15px; color: #a8dadc; font-size: 14px;">📧 info@drpaws-sa.com</p>
              <p style="margin: 20px 0 0; color: #a8dadc; font-size: 12px;">© 2025 د. باوز - جميع الحقوق محفوظة</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  } else {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Discount Code</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #18ac61 0%, #15a057 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600;">🎉 Welcome to Dr. Paws Family!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 18px; line-height: 1.6;">
                Dear ${firstName} ${lastName},
              </p>
              
              <p style="margin: 0 0 20px; color: #555555; font-size: 16px; line-height: 1.6;">
                Thank you for registering for our Jeddah branch opening special offer! 🎊
              </p>
              
              <p style="margin: 0 0 30px; color: #555555; font-size: 16px; line-height: 1.6;">
                We're excited to serve you and care for your beloved pets with the best veterinary services in the region.
              </p>
              
              <!-- Discount Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #f4a261 0%, #e76f51 100%); border-radius: 8px; padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px; color: #ffffff; font-size: 16px; font-weight: 500;">Your Discount Code</p>
                    <p style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: 2px; font-family: 'Courier New', monospace;">${discountCode}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Discount Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px; color: #18ac61; font-size: 20px;">✨ Offer Details</h3>
                    <ul style="margin: 0; padding: 0 0 0 25px; color: #555555; line-height: 1.8;">
                      <li style="margin-bottom: 10px;"><strong>20% discount</strong> on all our services</li>
                      <li style="margin-bottom: 10px;">Valid for <strong>6 months</strong> from registration date</li>
                      <li style="margin-bottom: 10px;">Can be used on all your visits</li>
                      <li>Available at all our branches (Riyadh - Jeddah)</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                Save this code and show it during your next visit to enjoy your exclusive discount!
              </p>
              
              <p style="margin: 30px 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                We look forward to seeing you soon! 🐾
              </p>
              
              <p style="margin: 20px 0 0; color: #555555; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #18ac61;">Dr. Paws Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #264653; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #ffffff; font-size: 16px; font-weight: 500;">Contact Us</p>
              <p style="margin: 0 0 5px; color: #a8dadc; font-size: 14px;">📍 Riyadh - Al-Sahafa: 0552030564</p>
              <p style="margin: 0 0 5px; color: #a8dadc; font-size: 14px;">📍 Riyadh - Al-Mather: 0531353667</p>
              <p style="margin: 0 0 15px; color: #a8dadc; font-size: 14px;">📧 info@drpaws-sa.com</p>
              <p style="margin: 20px 0 0; color: #a8dadc; font-size: 12px;">© 2025 Dr. Paws - All Rights Reserved</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }
};

export const sendDiscountConfirmationEmail = async (params: DiscountEmailParams): Promise<void> => {
  const { email, firstName, language } = params;
  
  const subject = language === 'ar' 
    ? `🎉 رمز الخصم الخاص بك - د. باوز`
    : `🎉 Your Discount Code - Dr. Paws`;
  
  const htmlContent = createEmailTemplate(params);
  
  try {
    await transporter.sendMail({
      from: `"Dr. Paws" <${process.env.MICROSOFT365_EMAIL}>`,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    
    console.log(`Discount confirmation email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send confirmation email');
  }
};
