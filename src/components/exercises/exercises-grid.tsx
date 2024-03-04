'use client';

import Box from '@mui/material/Box';
import ExerciseItem from './exercise-item';
import { getExercisesFromPlan } from '@/utils/exercises';
import { useQuery } from '@tanstack/react-query';
import LinearProgress from '@mui/material/LinearProgress';

type ExerciseGridProps = {
    id: string;
    isManageMode?: boolean;
}
export default function ExercisesGrid({ id, isManageMode }: ExerciseGridProps) {

    const { data } = useQuery({
        queryFn: () => getExercisesFromPlan(id),
        queryKey: [`exercises`],
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {!data ? <LinearProgress /> : data && data.length ? data.map((e, idx) => <ExerciseItem key={idx} {...e}
                                                                                                   isManageMode={isManageMode} />) : 'No Exercises found.'
            }
        </Box>
    );
}
