import nodemailer from 'nodemailer';

// Email service configuration
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Email service class
class EmailService {
  private transporter: nodemailer.Transporter;
  private isConfigured: boolean = false;
  private supportEmail: string = 'rsmchckrspprt@gmail.com';

  constructor() {
    // Initialize transporter with Gmail SMTP using support email
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.supportEmail,
        pass: process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD || ''
      }
    });

    // Check if email service is properly configured
    this.isConfigured = !!(process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD);
    
    if (!this.isConfigured) {
      console.warn('⚠️  Email service not configured. Please set GMAIL_APP_PASSWORD environment variable.');
      console.warn('📧 Support email will be used as fallback: rsmchckrspprt@gmail.com');
    } else {
      console.log('✅ Email service configured successfully with support email');
    }
  }

  // Send OTP email
  async sendOTP(email: string, otp: string): Promise<boolean> {
    try {
      if (!this.isConfigured) {
        console.warn('📧 Email service not configured, OTP will only be logged to console');
        console.log(`📧 OTP for ${email}: ${otp}`);
        return false;
      }

      const mailOptions = {
        from: `"ResumeCheck Support" <${this.supportEmail}>`,
        to: email,
        subject: '🔐 Your ResumeCheck Verification Code',
        html: this.generateOTPEmailHTML(otp),
        text: this.generateOTPEmailText(otp)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`📧 OTP email sent successfully to ${email}:`, info.messageId);
      return true;

    } catch (error) {
      console.error('❌ Failed to send OTP email:', error);
      // Fallback to console logging
      console.log(`📧 OTP for ${email}: ${otp}`);
      return false;
    }
  }

  // Generate HTML email template
  private generateOTPEmailHTML(otp: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ResumeCheck Verification Code</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0;
          }
          .content { 
            background: #f9f9f9; 
            padding: 30px; 
            border-radius: 0 0 10px 10px;
          }
          .otp-box { 
            background: #fff; 
            border: 2px dashed #667eea; 
            padding: 20px; 
            text-align: center; 
            margin: 20px 0; 
            border-radius: 8px;
          }
          .otp-code { 
            font-size: 32px; 
            font-weight: bold; 
            color: #667eea; 
            letter-spacing: 5px; 
            font-family: monospace;
          }
          .footer { 
            text-align: center; 
            margin-top: 20px; 
            color: #666; 
            font-size: 12px;
          }
          .button { 
            display: inline-block; 
            background: #667eea; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔐 ResumeCheck Verification</h1>
          <p>Your verification code is ready</p>
        </div>
        
        <div class="content">
          <h2>Hello!</h2>
          <p>You've requested a verification code for your ResumeCheck account. Use the code below to complete your verification:</p>
          
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
            <p><strong>Verification Code</strong></p>
          </div>
          
          <p><strong>Important:</strong></p>
          <ul>
            <li>This code will expire in 15 minutes</li>
            <li>Don't share this code with anyone</li>
            <li>If you didn't request this code, please ignore this email</li>
          </ul>
          
          <p>Need help? Contact us at <a href="mailto:rsmchckrspprt@gmail.com">rsmchckrspprt@gmail.com</a></p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://resume-checker-next-g06ujx32w-kamalsoniatvercels-projects.vercel.app" class="button">
              🚀 Go to ResumeCheck
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent by ResumeCheck Support. Please do not reply to this email.</p>
          <p>&copy; 2024 ResumeCheck. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  }

  // Generate plain text email template
  private generateOTPEmailText(otp: string): string {
    return `
ResumeCheck Verification Code

Hello!

You've requested a verification code for your ResumeCheck account. Use the code below to complete your verification:

Verification Code: ${otp}

Important:
- This code will expire in 15 minutes
- Don't share this code with anyone
- If you didn't request this code, please ignore this email

Need help? Contact us at rsmchckrspprt@gmail.com

Go to ResumeCheck: https://resume-checker-next-g06ujx32w-kamalsoniatvercels-projects.vercel.app

This email was sent by ResumeCheck Support. Please do not reply to this email.
© 2024 ResumeCheck. All rights reserved.
    `;
  }

  // Test email service configuration
  async testConnection(): Promise<boolean> {
    try {
      if (!this.isConfigured) {
        console.warn('⚠️  Email service not configured');
        return false;
      }

      await this.transporter.verify();
      console.log('✅ Email service connection verified');
      return true;
    } catch (error) {
      console.error('❌ Email service connection failed:', error);
      return false;
    }
  }

  // Get support email address
  getSupportEmail(): string {
    return this.supportEmail;
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;
