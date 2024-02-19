import { injectable } from 'inversify';
import sdk from 'node-appwrite';
import { client } from '@/database/appwrite';

export abstract class AbstractDatabaseClient {
    abstract getClient(): sdk.Databases;
}

@injectable()
export class DatabaseClient implements AbstractDatabaseClient {
    private databases: sdk.Databases;
    constructor() {
        if (!process.env.NEXT_PUBLIC_APPWRITE_API_KEY) {
            throw new Error(
                'No APPWRITE_API_KEY env variable found. Cannot initialize database client.'
            );
        }
        if (!process.env.NEXT_PUBLIC_APPWRITE_DB_ID) {
            throw new Error(
                'Cannot find env variable APPWRITE_DB_ID. Database connection failed.'
            );
        }

        client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('65d382fd04485bc565f6')
            .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
            .setSelfSigned();

        this.databases = new sdk.Databases(client);
    }

    getClient(): sdk.Databases {
        return this.databases;
    }
}

export default DatabaseClient;
