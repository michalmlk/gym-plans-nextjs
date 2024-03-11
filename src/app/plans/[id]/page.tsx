import Container from '@mui/material/Container';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import ExercisesGrid from '@/components/exercises/exercises-grid';
import PageHeader from '@/components/shared/page-header/page-header';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function PlanPage({ params }: any) {
    const { id } = params;

    return (
        <Container className="p-24 bg-transparent">
            <PageHeader title="Details">
                <Link href="/plans" passHref>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Link>
            </PageHeader>
            <ExercisesGrid id={id} />
        </Container>
    );
}
