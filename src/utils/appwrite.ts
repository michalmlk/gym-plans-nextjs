import { Client, Account, ID, Databases } from 'node-appwrite';
export const appwriteClient = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d382fd04485bc565f6');
export const appwriteDatabase = new Databases(appwriteClient);
const account = new Account(appwriteClient);
