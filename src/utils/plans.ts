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

export const addPlanToFavorites = async (planId: string, userId: string): Promise<PlanDTO> => {
    const currentPlan = await getPlan(planId);
    return await appwriteDatabase.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'plans',
        planId, {
            likedBy: currentPlan.likedBy.includes(userId) ? currentPlan.likedBy.filter(id => id !== userId) : [...currentPlan.likedBy, userId],
        });
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

export const deletePlan = async (planId: string): Promise<void> => {
    try {
        await appwriteDatabase.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            'plans', planId);
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const updatePlanRate = async (planId: string, userRate: number | null): Promise<void> => {
    try {
        const { rate } = await getPlan(planId);
        const newRate = userRate && rate ? (rate + userRate) / 2 : rate || userRate;

        await appwriteDatabase.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            'plans', planId, {
                rate: newRate,
            });
    } catch (e: any) {
        throw new Error(e.message);
    }
};