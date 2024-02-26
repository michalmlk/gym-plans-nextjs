import { ID } from 'appwrite';
import { appwriteDatabase } from './appwrite';
import { PlanDTO } from '@/app/common/model';

export const getPlans = async (): Promise<Array<PlanDTO>> => {
    const { documents } = await appwriteDatabase.listDocuments<PlanDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans'
    );
    return documents;
};

export const getPlan = async (planId: string): Promise<PlanDTO> => {
    const currentPlan = await appwriteDatabase.getDocument<PlanDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans',
        planId
    );
    return currentPlan;
};

export const createPlan = async (
    data: Pick<
        PlanDTO,
        'title' | 'description' | 'tags' | 'userId' | 'exerciseIds' | 'id'
    >
): Promise<void> => {
    try {
        await appwriteDatabase.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            'plans',
            ID.unique(),
            {
                id: data.id,
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
