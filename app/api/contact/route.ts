import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // 1. Server-side Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // 2. Log data (Stub for internal logging)
    console.log("--- NEW LEAD RECEIVED ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Company:", company || "N/A");
    console.log("Project Details:", message);
    console.log("-------------------------");

    // 3. Integration Stub (Email/CRM)
    // TODO: Add real email sending integration here (e.g., Resend, SendGrid, Nodemailer)
    // Example: await sendEmail({ to: 'sales@reems.com', subject: 'New Lead', ... })
    
    // TODO: Add CRM integration here (e.g., HubSpot, Salesforce)
    // Example: await addToCRM({ name, email, ... })

    // Simulate network delay for "loading" state on frontend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: "Request received successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

