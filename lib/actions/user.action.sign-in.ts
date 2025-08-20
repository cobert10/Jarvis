'use client';
import { account } from '../appwrite/client';

export const signInUser = async ({email, password}: {email: string, password: string}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, session };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};