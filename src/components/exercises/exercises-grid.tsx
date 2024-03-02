import Box from '@mui/material/Box';
import ExerciseItem from './exercise-item';
import { getExercisesFromPlan } from '@/utils/exercises';

type ExerciseGridProps = {
    id: string;
    isManageMode?:boolean;
}
export default async function ExercisesGrid({ id, isManageMode }: ExerciseGridProps) {
    const exercises = await getExercisesFromPlan(id);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {exercises && exercises.length
                ? exercises.map((e, idx) => <ExerciseItem key={idx} {...e} isManageMode={isManageMode} />)
                : 'No exercises'}
        </Box>
    );
}
