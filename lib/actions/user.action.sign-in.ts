'use server'
import { Account, Client } from "appwrite";
import { appwriteConfig } from "../appwrite/config"
import { sendEmailOTP } from "./user.actions";
import { parseStringify } from "../utils";



export const signInUser = async ({
    email, 
    password
  }:{
    email: string, 
    password: string
  }): Promise< | { success: true; accountId: string } | { success: false; error: string } > => {
    
  const client = new Client().
    setProject(appwriteConfig.projectId).
    setEndpoint(appwriteConfig.endpointUrl)
    
  const account = new Account(client);
  
  try{
    const session = await account.createEmailPasswordSession(email, password);
    
    if(session){
      const accountId = await sendEmailOTP( {email} );

      if(!accountId) {
          return {
            success: false,
            error: "Failed to send OTP"
        };
      }

      return {
        success: true, 
        accountId: parseStringify({accountId})
      };
    }
  }

  catch(error: any){
    console.error("Sign-in error:", error);
    
    return {
      success: false,
      error: error?.message || "Unknown error during sign-in",
    };
  }

    return {
      success: false,
      error: "No session returned from Appwrite"
    };

};