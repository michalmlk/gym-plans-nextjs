import Container from '@mui/material/Container';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { PageParams } from '@/app/common/model';
import { getExercisesFromPlan } from '@/utils/exercises';

async function Exercises({ id }: { id: string }) {
    const exercises = await getExercisesFromPlan(parseInt(id));
    return (
        <main>
            {exercises && exercises.length
                ? exercises.map((e) => <p key={e.id}>{e.name}</p>)
                : 'No excercises'}
        </main>
    );
}

export default function PlanPage({ params }: PageParams) {
    const { id } = params;

    return (
        <Container className="p-24">
            <header>This is plan with id: {id}</header>
            <Suspense fallback={<LinearProgress />}>
                <Exercises id={id} />
            </Suspense>
        </Container>
    );
}
