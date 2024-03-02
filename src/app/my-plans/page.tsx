import Container from '@mui/material/Container';
import PageHeader from '@/components/shared/page-header/page-header';
import Link from 'next/link';
import Button from '@mui/material/Button';
import React, { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import PlansGrid from '@/components/plans-grid/plans-grid';
import { getPlansForLoggedUser } from '@/utils/plans';

export default async function MyPlansPage() {
    const plans = await getPlansForLoggedUser();
    return (
        <Container className="p-24">
            <div className="flex flex-col gap-5">
                <PageHeader title="My plans" />
                <Suspense fallback={<LinearProgress />}>
                    <PlansGrid plans={plans} isManageMode />
                </Suspense>
            </div>
        </Container>
    );
}
