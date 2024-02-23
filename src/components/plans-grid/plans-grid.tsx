import React from 'react';
import PlanItem from '../plan-item/plan-item';
import Box from '@mui/material/Box';
import { PlanDTO } from '@/app/common/model';

export default function PlansGrid(plans: PlanDTO[]): React.ReactElement {
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
                plans.map(
                    ({ title, description, author, id, tags, userId }) => (
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
    );
}
