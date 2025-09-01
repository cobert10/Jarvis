"use server"

import { ID } from "node-appwrite";
import { createAppwrieDbClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { Models, Query } from "appwrite";

export const createCompanion = async({
    name,
    subject,
    topic,
    voice,
    style,
    duration
}:{
    name: string,
    subject: string,
    topic: string,
    voice: string,
    style: string,
    duration: number
}) =>{

    const { database } = await createSessionClient();
    try{
        const companion = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.companionCollectionId,
            ID.unique(),
            {
                name,
                subject,
                topic,
                voice,
                style,
                duration
            }
        )
        return companion
    } catch (error) {
        console.error("Error creating companion:", error);
    }
   
}



export const getAllCompanions = async ({
    limit = 10,
    page = 1,
    subject,
    topic
}: GetAllCompanions) => {
    const { databases } = await createAppwrieDbClient();
    try{
        if(subject && topic){
            const query:  Models.DocumentList<Companion> = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.companionCollectionId,
            [
                Query.and([
                    Query.contains("subject", subject),
                    Query.contains("topic", topic)
                ])
            ]
            )
            return { data: query.documents, error: null };
        } else if(subject){
            const query: Models.DocumentList<Companion> = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.companionCollectionId,
            [
            Query.contains("subject", subject),
            ]
            )
             return { data: query.documents, error: null };
        }
        else if(topic){
            console.log("deputa")
            const query: Models.DocumentList<Companion> = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.companionCollectionId,
            [
                Query.contains("topic", topic),
            ]
            )
            return { data: query.documents, error: null };
        }
        else{
            const query: Models.DocumentList<Companion> = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.companionCollectionId,
                [
                    Query.select(['*'])
                ]
            );
            return { data: query.documents, error: null };
        }
       
    }catch (err: any){
        return {data:null, error:null}
    }


}

