import Container from '@mui/material/Container';
import DatabaseClient from '@/database';
import { ParamsProps } from '@/app/common/model';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
async function Exercises({ id }: { id: string }) {
    const databaseService = new DatabaseClient();
    const excercises = await databaseService.getExcercisesFromPlan(
        parseInt(id)
    );
    return (
        <main>
            {excercises.length
                ? excercises.map((e) => <p key={e.id}>{e.name}</p>)
                : 'No excercises'}
        </main>
    );
}

export default function PlanPage({ params }: { params: ParamsProps }) {
    console.log(params);
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
