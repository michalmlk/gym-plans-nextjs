import { ExerciseDTO } from '@/app/common/model';
import { getPlan } from './plans';
import { appwriteDatabase } from './appwrite';

export const getExercises = async (): Promise<ExerciseDTO[]> => {
    const { documents } = await appwriteDatabase.listDocuments<ExerciseDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'exercise',
    );
    return documents;
};

export const getExercisesFromPlan = async (
    planId: string,
): Promise<ExerciseDTO[] | undefined> => {
    try {
        const currentPlan = await getPlan(planId);
        return currentPlan.exercises || [];
    } catch (e: any) {
        throw new Error(e.message);
    }
};
