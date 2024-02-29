'use client';

import { useState } from 'react';
import { ExerciseDTO } from '@/app/common/model';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function ExerciseItem(props: ExerciseDTO) {
    const { name, description, reps, series, weight, isOwnBodyWeight } = props;
    const [isDone, setIsDone] = useState(false);

    const handleToggleStatus = () => setIsDone((prev) => !prev);

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1.5,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            fontStyle: isDone ? 'italic' : 'none',
                            textDecoration: isDone ? 'line-through' : 'none',
                        }}
                    >
                        {name}
                    </Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleToggleStatus}
                    >
                        Done
                    </Button>
                </Box>

                <Divider />
                <Typography
                    sx={{ my: 1.5, fontSize: '1.2rem' }}
                    color="text.secondary"
                >
                    {description}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        paddingTop: '1rem',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h5" component="p">
                        Reps: {reps}
                    </Typography>
                    <Typography variant="h5" component="p">
                        Series: {series}
                    </Typography>
                    {isOwnBodyWeight ? (
                        <Typography variant="h5" component="p">
                            Body weight
                        </Typography>
                    ) : (
                        <Typography variant="h5" component="p">
                            Weigth: {weight} kg
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
