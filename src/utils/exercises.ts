import { ExerciseDTO } from '@/app/common/model';
import { getPlan } from './plans';
import { appwriteDatabase } from './appwrite';
import { Query } from 'appwrite';

export const getExercises = async (): Promise<ExerciseDTO[]> => {
    const { documents } = await appwriteDatabase.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'excercise'
    );
    return documents as unknown as ExerciseDTO[];
};

export const getExercisesFromPlan = async (
    planId: number
): Promise<ExerciseDTO[] | undefined> => {
    try {
        const currentPlan = await getPlan(planId);
        if (currentPlan.exerciseIds.length) {
            const { documents } = await appwriteDatabase.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                'excercise',
                [Query.equal('name', currentPlan.exerciseIds)]
            );

            return documents as unknown as ExerciseDTO[];
        } else {
            return [];
        }
    } catch (e: any) {
        throw new Error(e.message);
    }
};
