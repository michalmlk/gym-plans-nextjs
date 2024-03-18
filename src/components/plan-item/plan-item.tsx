'use client';

import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { PropsWithChildren } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addPlanToFavorites, getPlan } from '@/utils/plans';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useUser } from '@clerk/nextjs';
import { Tooltip } from '@mui/material';
import { Star } from '@mui/icons-material';
import { RateDTO } from '@/app/common/model';

export type PlanItemProps = {
    id: string;
    isManageMode?: boolean;
} & PropsWithChildren;

export default function PlanItem({
                                     id,
                                     isManageMode,
                                     children,
                                 }: PlanItemProps) {
    const { user } = useUser();
    const { data } = useQuery({
        queryKey: [`plan-${id}`],
        queryFn: async () => await getPlan(id),
    });

    const queryClient = useQueryClient();
    const handleToggleAddToFavorite = async (): Promise<void> => {
        await addPlanToFavorites(id, user?.id!);
        await queryClient.invalidateQueries({ queryKey: [`plan-${id}`] });
    };

    const averageOfRating = data?.plansRating.reduce((acc: number, current: RateDTO) => (acc + current.rate) / data?.plansRating.length, 0);

    return (
        <Box
            sx={{
                width: { xs: '100%' },
                height: '240px',
            }}
        >
            <Card className="p-4 h-full flex flex-col justify-between">
                <CardHeader title={data?.title} style={{ paddingBottom: 0 }}
                            action={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title={`${data?.likedBy.length} love it!.`}>
                                        <Typography variant="body1"
                                                    color="textSecondary">{data?.likedBy.length}</Typography>
                                    </Tooltip>
                                    <IconButton onClick={handleToggleAddToFavorite}>
                                        {user && data?.likedBy.includes(user.id) ? <Favorite /> :
                                            <FavoriteBorder />}
                                    </IconButton>
                                </Box>
                            } />
                <CardContent className="grow">
                    <Typography variant="body1" component="div">
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Star /> {averageOfRating}
                        </Typography>
                        {data?.description}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: '1rem',
                        }}
                    >
                        {data?.tags.map((tag, idx) => (
                            <Chip key={idx} label={tag} variant="outlined" />
                        ))}
                    </Box>
                </CardContent>
                <CardActions className="flex justify-between items-center gap-4">
                    {children}
                    {isManageMode ?
                        <Link href={`/plans/${id}/manage`} passHref>
                            <Button variant="outlined" color="primary">
                                Manage
                            </Button>
                        </Link>
                        : <Link href={`/plans/${id}`} passHref>
                            <Button variant="outlined" color="primary">
                                Details
                            </Button>
                        </Link>}
                </CardActions>
            </Card>
        </Box>
    );
}
