import { ExerciseDTO } from '@/app/common/model';
import { getPlan } from './plans';
import { appwriteDatabase } from './appwrite';
import { ID } from 'appwrite';

export const getExercises = async (): Promise<ExerciseDTO[]> => {
    const { documents } = await appwriteDatabase.listDocuments<ExerciseDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'exercise',
    );
    return documents;
};

export const deleteExercise = async (id: string): Promise<void> => {
    try {
        await appwriteDatabase.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!, 'exercises', id);
    } catch (e) {
        throw new Error('Error occurred. ', e.message);
    }
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

export const appendExerciseToPlan = async (planId: string, data: Pick<ExerciseDTO, 'name' | 'description' | 'isOwnBodyWeight' | 'reps' | 'series' | 'weight'>): Promise<void> => {
    try {
        const newExercise = await appwriteDatabase.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!, 'exercises', ID.unique(), data);
        const currentPlan = await getPlan(planId);
        await appwriteDatabase.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DB_ID!, 'plans', planId, {
            exercises: [...currentPlan.exercises, newExercise],
        });
    } catch (e: any) {
        throw new Error(e.message);
    }
};
