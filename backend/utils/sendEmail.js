import nodemailer from "nodemailer";

// Create transporter - configure with your email service
// For Gmail, you'll need to use an App Password
const createTransporter = () => {
  // Validate email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD in your .env file"
    );
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
    },
  });

  return transporter;
};

export const sendAcceptanceEmail = async (to, petName, adopterName) => {
  try {

    // Verify email configuration first
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error(
        "Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables in your .env file."
      );
    }

    const transporter = createTransporter();

    // Verify connection
    console.log("Verifying email connection...");
    await transporter.verify();
    console.log("Email connection verified successfully!");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Congratulations! Your Pet Adoption Request Has Been Accepted 🐾",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #f97316; text-align: center; margin-bottom: 20px;">🎉 Congratulations!</h1>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Dear <strong>${adopterName}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              We are thrilled to inform you that your pet adoption request has been <strong style="color: #22c55e;">accepted</strong>!
            </p>
            
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 0; font-size: 16px; color: #333;">
                <strong>Pet Name:</strong> ${petName || "Your requested pet"}
              </p>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              You can now adopt <strong>${petName || "your pet"}</strong> from us!
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 0; font-size: 16px; color: #333;">
                <strong>📍 Location:</strong><br>
                Pawnest<br>
                Chinniyampalayam<br>
                Coimbatore, Tamil Nadu 641062
              </p>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Please visit us at the above location to complete the adoption process. We look forward to meeting you and helping you bring your new furry friend home!
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong style="color: #f97316;">Pawnest Team</strong>
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280;">
                If you have any questions, please feel free to contact us.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending acceptance email:", error);
    
    // Provide more helpful error messages
    if (error.code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Please check your EMAIL_USER and EMAIL_PASSWORD in .env file. For Gmail, use an App Password instead of your regular password."
      );
    }
    if (error.message.includes("Email service not configured")) {
      throw error;
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendRejectionEmail = async (to, petName, adopterName) => {
  try {

    // Verify email configuration first
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error(
        "Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables in your .env file."
      );
    }

    const transporter = createTransporter();

    // Verify connection
    console.log("Verifying email connection...");
    await transporter.verify();
    console.log("Email connection verified successfully!");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Pet Adoption Request Update",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #f97316; text-align: center; margin-bottom: 20px;">Pet Adoption Request</h1>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Dear <strong>${adopterName}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              Thank you for your interest in adopting a pet from <strong>Pawnest</strong>. We appreciate you taking the time to submit an adoption request.
            </p>
            
            <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 0; font-size: 16px; color: #333;">
                Unfortunately, we regret to inform you that we are unable to proceed with your adoption request for <strong>${petName || "the requested pet"}</strong> at this time.
              </p>
            </div>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              This could be due to various reasons such as:
            </p>
            
            <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
              <li>The pet is no longer available</li>
              <li>We have received multiple requests for the same pet</li>
              <li>Other administrative considerations</li>
            </ul>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 20px;">
              We encourage you to check our website again for other wonderful pets that might be a perfect match for you. We have many loving animals waiting for their forever homes!
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
              Thank you for understanding,<br>
              <strong style="color: #f97316;">Pawnest Team</strong>
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280;">
                If you have any questions, please feel free to contact us.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending rejection email:", error);
    
    // Provide more helpful error messages
    if (error.code === "EAUTH") {
      throw new Error(
        "Email authentication failed. Please check your EMAIL_USER and EMAIL_PASSWORD in .env file. For Gmail, use an App Password instead of your regular password."
      );
    }
    if (error.message.includes("Email service not configured")) {
      throw error;
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
