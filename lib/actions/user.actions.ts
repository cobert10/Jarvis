"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { Account, Client } from "appwrite";
import { redirect } from "next/navigation";




export const getCurrentUser = async() =>{
    const { database, account } = await createSessionClient();
    
    const result = await account.get();

    const user = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", result.$id)],
    );

    if(user.total < 0) return null;

    return parseStringify(user.documents[0]);
}


const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,

        // query to check if user email exists
        [Query.equal("email", [email])],
    );

    return result.total > 0? result.documents[0]: null;
};

const handleError = (error: unknown, message: string) => {
    console.log(error, message);

    throw error;
};

export const sendEmailOTP = async({email}: {email:string}) => {
    const { account } = await createAdminClient();
    try{
        const session = await account.createEmailToken(ID.unique(), email);
        return session.userId;
    }catch(error){
        handleError(error, "Failed to send email OTP");
    }
};

export const verifySecret = async({
        accountId, 
        password,
    }: {
        accountId: {accountId: string}; 
        password: string;
    }) =>{

    try{
        
        const { account } = await createAdminClient();
        
        const session = await account.createSession(accountId.accountId, password);

        (await cookies()).set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        })
        return parseStringify({sessionId: session.$id})
    }
    catch(error){
        handleError(error, "Failed to verify OTP");
    }
}


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

export const createAccount = async({
    firstName, 
    lastName,
    birthDate,
    email,
    password
}: {
    firstName: string; 
    lastName: string;
    birthDate?: Date | null ;
    email: string;
    password: string;
}) => {
    
    const existingUser = await getUserByEmail(email);    

    if(!existingUser){
        const { databases, account} = await createAdminClient();
        const newUser = await account.create(
            ID.unique(),
            email,
            password, // handled securely by Appwrite
            `${firstName} ${lastName}`
        )

        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                firstName,
                lastName,
                birthDate,
                email: newUser.email,
                accountId: newUser.$id,
            }
        )
            const accountId = await sendEmailOTP( {email} );
            if(!accountId) throw new Error("Failed to send an OTP");

            return parseStringify({accountId})
    }
};

export const signOutUser = async() => {
    const { account } = await createSessionClient();

    try{
        await account.deleteSession('current');
        (await cookies()).delete("appwrite-session");
    }catch(error){
        handleError(error, "Failed to sign out user");
    } finally{
        redirect("/sign-in");
    }
}