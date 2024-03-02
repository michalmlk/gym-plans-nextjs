import Container from '@mui/material/Container';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import ExercisesGrid from '@/components/exercises/exercises-grid';
import PageHeader from '@/components/shared/page-header/page-header';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function ManagePlanPage({ params }: any) {
    const { id } = params;

    return (
        <Container className="p-24">
            <PageHeader title="Manage plan">
                <Link href="/my-plans" passHref>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Link>
            </PageHeader>
            <Suspense fallback={<LinearProgress />}>
                <ExercisesGrid id={id} isManageMode />
            </Suspense>
        </Container>
    );
}