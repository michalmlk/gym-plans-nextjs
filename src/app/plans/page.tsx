import React from 'react';
import { plans } from '@/mocks';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PlanItem from '@/components/plan-item/plan-item';
import PageHeader from '@/components/page-header/page-header';

export default function PlansPage() {
    return (
        <Container className="p-24">
            <div className="flex flex-col gap-5">
                <PageHeader title="Plans" />
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
                    {plans.map(({ title, description, author, id, tags }) => (
                        <PlanItem
                            key={id}
                            title={title}
                            description={description}
                            author={author}
                            id={id}
                            tags={tags}
                        />
                    ))}
                </Box>
            </div>
        </Container>
    );
}
