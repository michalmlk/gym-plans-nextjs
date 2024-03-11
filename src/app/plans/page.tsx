import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import PageHeader from '@/components/shared/page-header/page-header';
import Button from '@mui/material/Button';
import Link from 'next/link';
import LinearProgress from '@mui/material/LinearProgress';
import PlansGrid from '@/components/plans-grid/plans-grid';
import { PlanDTO } from '@/app/common/model';
import { getPlans } from '@/utils/plans';

export default async function PlansPage() {
    const plans: PlanDTO[] = await getPlans();
    return (
        <Container className="p-24 bg-transparent">
            <div className="flex flex-col gap-5">
                <PageHeader title="Plans">
                    <Link href="/plans/create" passHref>
                        <Button variant="contained">Crete your own plan</Button>
                    </Link>
                </PageHeader>
                <Suspense fallback={<LinearProgress />}>
                    <PlansGrid plans={plans}/>
                </Suspense>
            </div>
        </Container>
    );
}
