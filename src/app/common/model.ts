import sdk from 'node-appwrite';

export type PlanDTO = {
    id: string;
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exerciseIds: string[];
    exercises: ExerciseDTO[];
} & sdk.Models.Document;

export type ExerciseDTO = {
    name: string;
    description: string;
    isOwnBodyWeight: boolean;
    reps: number;
    series: number;
    weight?: number;
} & sdk.Models.Document;
