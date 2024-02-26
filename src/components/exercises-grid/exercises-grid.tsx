import Box from '@mui/material/Box';
import ExerciseItem from '../exercise-item/exercise-item';
import { getExercisesFromPlan } from '@/utils/exercises';

export default async function ExercisesGrid({ id }: { id: string }) {
    const exercises = await getExercisesFromPlan(id);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {exercises && exercises.length
                ? exercises.map((e, idx) => <ExerciseItem key={idx} {...e} />)
                : 'No excercises'}
        </Box>
    );
}
