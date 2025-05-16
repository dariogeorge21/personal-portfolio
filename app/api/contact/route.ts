import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { submitContactMessage } from '@/lib/contact-service';

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request data
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, error: result.error.format() },
        { status: 400 }
      );
    }
    
    // Submit the validated message to Supabase
    const { success, error } = await submitContactMessage(result.data);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact API route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      },
      { status: 500 }
    );
  }
}
