import { injectable } from 'inversify';
import sdk, { Query } from 'node-appwrite';
import { client } from '@/database/appwrite';
import { PlanDTO, ExerciseDTO } from '@/app/common/model';

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

    async getPlan(planId: number): Promise<PlanDTO> {
        const currentPlan = await this.databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            'plans',
            planId.toString()
        );
        return currentPlan as unknown as PlanDTO;
    }

    async getPlans(): Promise<PlanDTO[]> {
        return (
            await this.databases.listDocuments<sdk.Models.Document & PlanDTO>(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                'plans'
            )
        ).documents as unknown as PlanDTO[];
    }

    async getExercises(): Promise<ExerciseDTO[]> {
        return (
            await this.databases.listDocuments<
                sdk.Models.Document & ExerciseDTO
            >(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!, 'excercise')
        ).documents as unknown as ExerciseDTO[];
    }

    async getExercisesFromPlan(
        planId: number
    ): Promise<ExerciseDTO[] | undefined> {
        try {
            const currentPlan = await this.getPlan(planId);
            if (currentPlan.exerciseIds.length) {
                const exercises = (
                    await this.databases.listDocuments<
                        sdk.Models.Document & ExerciseDTO
                    >(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!, 'excercise', [
                        Query.equal('id', currentPlan.exerciseIds),
                    ])
                ).documents;
                return exercises;
            }
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default DatabaseClient;
