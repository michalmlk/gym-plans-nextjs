'use client';

import React, { useState } from 'react';
import { ExerciseDTO } from '@/app/common/model';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import useModal from '@/hooks/useModal';
import ModalWrapper from '@/components/shared/modal-wrapper/modal-wrapper';
import CardActions from '@mui/material/CardActions';
import { deleteExercise } from '@/utils/exercises';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'next/client';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal';

export default function ExerciseItem(props: ExerciseDTO & { isManageMode?: boolean }) {
    const { name, description, reps, series, weight, isOwnBodyWeight, isManageMode, $id } = props;
    const [isDone, setIsDone] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const {
        isOpen: isDeleteModalOpen,
        handleModalClose: handleDeleteModalClose,
        handleModalOpen: handleDeleteModalOpen,
    } = useModal(false);

    const {
        isOpen: isEditModalOpen,
        handleModalClose: handleEditModalClose,
        handleModalOpen: handleEditModalOpen,
    } = useModal(false);
    const handleToggleStatus = () => setIsDone((prev) => !prev);

    const handleDeleteExercise = async () => {
        try {
            await deleteExercise($id);
            await queryClient.invalidateQueries({ queryKey: [`exercises`] });
            handleDeleteModalClose();
        } catch (error: any) {
            throw new Error(error.message);
        }

    };

    return (
        <>
            <ConfirmationModal title={`Are you sure you want to remove exercise: ${name} ?`} isOpen={isDeleteModalOpen}
                               onClose={handleDeleteModalClose} onConfirm={handleDeleteExercise}
                               confirmButtonColor="error" confirmLabel="Delete" />
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
                        {
                            !isManageMode ?
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={handleToggleStatus}
                                >
                                    Done
                                </Button> : <Box sx={{
                                    display: 'flex',
                                    gap: 1.5,
                                }
                                }>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={handleEditModalOpen}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={handleDeleteModalOpen}
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </Box>
                        }
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
        </>
    );
}
