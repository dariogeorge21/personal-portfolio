import { supabase } from './supabase';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

// Table name in Supabase - make sure this matches exactly what's in your Supabase dashboard
const CONTACT_TABLE = 'messages from portfolio';

// Submit a contact message to Supabase
export const submitContactMessage = async (message: ContactMessage): Promise<{ success: boolean; error?: string }> => {
  try {
    // Debug: Log Supabase client info
    console.log('Contact Service - Table name:', CONTACT_TABLE);
    console.log('Contact Service - Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Contact Service - Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // Debug: Log message being sent
    console.log('Contact Service - Sending message:', {
      name: message.name,
      email: message.email,
      subject: message.subject,
      messageLength: message.message.length
    });

    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .insert([
        {
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          "created at": new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error submitting contact message:', error);
      return { success: false, error: error.message };
    }

    console.log('Contact Service - Message sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Exception submitting contact message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};
