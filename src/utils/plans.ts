import { ID } from 'appwrite';
import { appwriteDatabase } from './appwrite';
import { PlanDTO } from '@/app/common/model';

export const getPlans = async (): Promise<PlanDTO[]> => {
    const { documents } = await appwriteDatabase.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans'
    );
    const plans = documents as unknown as PlanDTO[];
    return plans;
};

export const getPlan = async (planId: number): Promise<PlanDTO> => {
    const currentPlan = await appwriteDatabase.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans',
        planId.toString()
    );
    return currentPlan as unknown as PlanDTO;
};

export const createPlan = async (data: PlanDTO): Promise<void> => {
    try {
        await appwriteDatabase.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            'plans',
            ID.unique(),
            {
                id: Math.floor(Math.random() * 1000),
                title: data.title,
                description: data.description,
                tags: [],
                userId: data.userId,
                exerciseIds: [],
            }
        );
    } catch (e: any) {
        throw new Error(e.message);
    }
};
