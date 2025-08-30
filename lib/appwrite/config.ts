export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    companionCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMPANIONS_COLLECTION!,
    secretKey: process.env.NEXT_APPWRITE_SECRET!,
}