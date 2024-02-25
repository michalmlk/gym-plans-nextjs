import React from 'react';
import PlanItem from '../plan-item/plan-item';
import Box from '@mui/material/Box';
import { PlanDTO } from '@/app/common/model';
import { getPlans } from '@/utils/plans';

export default async function PlansGrid(): Promise<React.ReactElement> {
    const plans: PlanDTO[] = await getPlans();
    return (
        <Box
            component="div"
            sx={{
                display: 'grid',
                gridGap: '2rem',
                width: '100%',
                gridTemplateColumns: {
                    xs: 'repeat(1, minmax(0,1fr))',
                    md: 'repeat(2, minmax(0,1fr))',
                },
            }}
        >
            {plans.length &&
                plans.map(({ title, description, tags, userId, $id }) => (
                    <PlanItem
                        key={$id}
                        title={title}
                        description={description || ''}
                        author={userId}
                        id={$id}
                        tags={tags}
                        userId={userId}
                    />
                ))}
        </Box>
    );
}
