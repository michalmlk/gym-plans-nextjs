import React from 'react';
import PlanItem from '../plan-item/plan-item';
import Box from '@mui/material/Box';
import { PlanDTO } from '@/app/common/model';
import Typography from '@mui/material/Typography';
import UserItem from '@/components/plan-item/user-item';

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
                plans.map(({$id, userId }) => (
                    <PlanItem
                        key={$id}
                        id={$id}
                        isManageMode={isManageMode}
                    >
                        <UserItem userId={userId} />
                    </PlanItem>
                )) : <Typography variant="h4" component="h4">No plans</Typography>}
        </Box>
    );
}
