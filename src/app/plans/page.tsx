import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import PageHeader from '@/components/page-header/page-header';
import Button from '@mui/material/Button';
import Link from 'next/link';
import LinearProgress from '@mui/material/LinearProgress';
import PlansGrid from '@/components/plans-grid/plans-grid';

export default function PlansPage() {
    return (
        <Container className="p-24">
            <div className="flex flex-col gap-5">
                <PageHeader title="Plans">
                    <Link href="/plans/create" passHref>
                        <Button variant="outlined">Crete your own plan</Button>
                    </Link>
                </PageHeader>
                <Suspense fallback={<LinearProgress />}>
                    <PlansGrid />
                </Suspense>
            </div>
        </Container>
    );
}
