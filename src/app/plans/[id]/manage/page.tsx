import Container from '@mui/material/Container';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import ExercisesGrid from '@/components/exercises/exercises-grid';
import PageHeader from '@/components/shared/page-header/page-header';
import ManagePlanButtons from '@/app/plans/[id]/manage/components/manage-plan-buttons';

export default function ManagePlanPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <Container className="p-24 bg-transparent">
            <PageHeader title="Manage plan">
                <ManagePlanButtons id={id} />
            </PageHeader>
            <Suspense fallback={<LinearProgress />}>
                <ExercisesGrid id={id} isManageMode />
            </Suspense>
        </Container>
    );
}