import sdk from 'node-appwrite';

export type RateDTO = {
    userId: string;
    planId: string;
    rate: number;
};

export type PlanDTO = {
    id: string;
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exerciseIds: string[];
    exercises: ExerciseDTO[];
    likedBy: string[];
    rate: number;
    plansRating: RateDTO[];
} & sdk.Models.Document;

export type ExerciseDTO = {
    name: string;
    description: string;
    isOwnBodyWeight: boolean;
    reps: number;
    series: number;
    weight?: number;
} & sdk.Models.Document;

export type ExerciseFormDataDTO = {
    name: string,
    description: string,
    isOwnBodyWeight: boolean,
    reps: number,
    series: number,
    weight: number,
}