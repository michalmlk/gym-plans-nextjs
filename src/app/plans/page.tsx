import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PlanItem from '@/components/plan-item/plan-item';
import PageHeader from '@/components/page-header/page-header';
import Button from '@mui/material/Button';
import Link from 'next/link';
import LinearProgress from '@mui/material/LinearProgress';
import { getPlans } from '@/utils/plans';

export type PlanDTO = {
    id: number;
    title: string;
    description: string;
    author: string;
    tags: string[];
    userId: string;
    excercisesIds: string[];
};

async function Plans() {
    const plans = await getPlans();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {plans.length &&
                plans.map(({ title, description, userId, id, tags }) => (
                    <PlanItem
                        key={id}
                        title={title}
                        description={description || ''}
                        author={userId}
                        id={id}
                        tags={tags}
                        userId={userId}
                    />
                ))}
        </Box>
    );
}

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
                    <Plans />
                </Suspense>
            </div>
        </Container>
    );
}
