export type PlanDTO = {
    id: number;
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exerciseIds: string[];
};

export type ExerciseDTO = {
    id: number;
    name: string;
    description: string;
    isOwnBodyWeight: boolean;
    reps: number;
    series: number;
    weight?: number;
};

export type PageParams = {
    [key: string]: any;
};
