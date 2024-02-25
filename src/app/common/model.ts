import sdk from 'node-appwrite';

export type PlanDTO = {
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exerciseIds: string[];
} & sdk.Models.Document;

export type ExerciseDTO = {
    planId: string;
    name: string;
    description: string;
    isOwnBodyWeight: boolean;
    reps: number;
    series: number;
    weight?: number;
} & sdk.Models.Document;

export type PageParams = {
    [key: string]: any;
};
