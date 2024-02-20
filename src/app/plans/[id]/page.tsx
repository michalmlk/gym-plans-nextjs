import Container from '@mui/material/Container';
import DatabaseClient from '@/database';
import { ParamsProps } from '@/app/common/model';

export default async function PlanPage({ params }: { params: ParamsProps }) {
    console.log(params);
    const { id } = params;
    const databaseService = new DatabaseClient();
    const excercises = await databaseService.getExcercisesFromPlan(
        parseInt(id)
    );

    return (
        <Container className="p-24">
            <header>This is plan with id: {id}</header>
            <main>
                {excercises.length
                    ? excercises.map((e) => <p key={e.id}>{e.name}</p>)
                    : 'No excercises'}
            </main>
        </Container>
    );
}
