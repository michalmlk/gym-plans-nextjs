import { ID, Query } from 'appwrite';
import { appwriteDatabase } from './appwrite';
import { PlanDTO } from '@/app/common/model';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/backend';

export const getPlans = async (): Promise<Array<PlanDTO>> => {
    const { documents } = await appwriteDatabase.listDocuments<PlanDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans',
    );
    return documents;
};

export const getPlansForLoggedUser = async (): Promise<Array<PlanDTO>> => {
    try {
        const user: User | null = await currentUser();
        if (user) {
            const { documents } = await appwriteDatabase.listDocuments<PlanDTO>(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                'plans',
                [Query.equal('userId', user.id)],
            );
            return documents;
        }
        return [];
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const getPlan = async (planId: string): Promise<PlanDTO> => {
    return await appwriteDatabase.getDocument<PlanDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans',
        planId,
    );
};

export const createPlan = async (
    data: Pick<
        PlanDTO,
        'title' | 'description' | 'tags' | 'userId' | 'id' | 'exercises'
    >,
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
                exercises: data.exercises,
            },
        );
    } catch (e: any) {
        throw new Error(e.message);
    }
};
