import Container from '@mui/material/Container';
import ExercisesGrid from '@/components/exercises/exercises-grid';
import PageHeader from '@/components/shared/page-header/page-header';
import PlanPageButtons from '@/components/shared/plan-page-buttons/plan-page-buttons';

export default function PlanPage({ params }: any) {
    const { id } = params;

    return (
        <Container className="p-24 bg-transparent">
            <PageHeader title="Details">
                <PlanPageButtons id={id} />
            </PageHeader>
            <ExercisesGrid id={id} />
        </Container>
    );
}
