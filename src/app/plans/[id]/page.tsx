import Container from '@mui/material/Container';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import ExercisesGrid from '@/components/exercises-grid/exercises-grid';
import PageHeader from '@/components/page-header/page-header';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function PlanPage({ params }) {
    const { id } = params;

    return (
        <Container className="p-24">
            <PageHeader title="Details">
                <Link href="/plans" passHref>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Link>
            </PageHeader>
            <Suspense fallback={<LinearProgress />}>
                <ExercisesGrid id={id} />
            </Suspense>
        </Container>
    );
}
