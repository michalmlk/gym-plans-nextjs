import React from 'react';
import PlanItem from '../plan-item/plan-item';
import Box from '@mui/material/Box';
import { PlanDTO } from '@/app/common/model';
import Typography from '@mui/material/Typography';

type PlansGridProps = {
    plans: PlanDTO[];
    isManageMode?: boolean;
}

export default async function PlansGrid({ plans, isManageMode = false }: PlansGridProps): Promise<React.ReactElement> {
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
            {plans.length ?
                plans.map(({ title, description, tags, userId, $id }) => (
                    <PlanItem
                        key={$id}
                        title={title}
                        description={description || ''}
                        author={userId}
                        id={$id}
                        tags={tags}
                        userId={userId}
                        isManageMode={isManageMode}
                    />
                )) : <Typography variant="h4" component="h4">No plans</Typography> }
        </Box>
    );
}
