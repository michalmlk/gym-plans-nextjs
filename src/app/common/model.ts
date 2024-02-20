export type PlanDTO = {
    id: number;
    title: string;
    description: string;
    author: string;
    tags: string[];
    userId: string;
};

export type ParamsProps = {
    id: string;
};
