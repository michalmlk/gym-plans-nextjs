import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PlanItem from '@/components/plan-item/plan-item';
import PageHeader from '@/components/page-header/page-header';
import Button from '@mui/material/Button';
import DatabaseClient from '@/database';
import Link from 'next/link';

export type PlanDTO = {
    id: number;
    title: string;
    description: string;
    author: string;
    tags: string[];
    userId: string;
    excercisesIds: string[];
};

export default async function PlansPage() {
    const databaseClient = new DatabaseClient();
    const plans = await databaseClient.getPlans();

    return (
        <Container className="p-24">
            <div className="flex flex-col gap-5">
                <PageHeader title="Plans">
                    <Link href="/plans/create" passHref>
                        <Button variant="outlined">Crete your own plan</Button>
                    </Link>
                </PageHeader>
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
                        plans.map(
                            ({
                                title,
                                description,
                                author,
                                id,
                                tags,
                                userId,
                            }) => (
                                <PlanItem
                                    key={id}
                                    title={title}
                                    description={description}
                                    author={author}
                                    id={id}
                                    tags={tags}
                                    userId={userId}
                                />
                            )
                        )}
                </Box>
            </div>
        </Container>
    );
}
