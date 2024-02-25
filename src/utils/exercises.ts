import { ExerciseDTO } from '@/app/common/model';
import { getPlan } from './plans';
import { appwriteDatabase } from './appwrite';
import { Query, ID } from 'appwrite';

export const getExercises = async (): Promise<ExerciseDTO[]> => {
    const { documents } = await appwriteDatabase.listDocuments<ExerciseDTO>(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        'excercise'
    );
    return documents;
};

export const getExercisesFromPlan = async (
    planId: string
): Promise<ExerciseDTO[] | undefined> => {
    try {
        const currentPlan = await getPlan(planId);
        if (currentPlan.exerciseIds.length) {
            const { documents } =
                await appwriteDatabase.listDocuments<ExerciseDTO>(
                    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                    'excercise',
                    [Query.equal('planId', currentPlan.$id)]
                );

            return documents;
        } else {
            return [];
        }
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const createExercises = async (
    exercises: ExerciseDTO[],
    planId: string
): Promise<string[]> => {
    try {
        const exercisesPromises = exercises.map(
            async (exercise) =>
                await appwriteDatabase.createDocument(
                    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                    'excercise',
                    ID.unique(),
                    {
                        ...exercise,
                        planId,
                    }
                )
        );
        return await Promise.all(exercisesPromises).then((data) => {
            return data.map((d) => d.$id);
        });
    } catch (e) {
        throw new Error();
    }
};
