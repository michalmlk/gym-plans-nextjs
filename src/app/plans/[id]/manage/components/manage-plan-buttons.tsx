'use client';

import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Add, Delete } from '@mui/icons-material';
import Link from 'next/link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import useModal from '@/hooks/useModal';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import ConfirmationModal from '@/components/confirmation-modal/confirmation-modal';
import { deletePlan } from '@/utils/plans';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ExerciseFormMode } from '@/hooks/useForm';
import ExerciseModal from '@/components/item-form-modal/item-form-modal';

type ManagePlanButtonsProps = {
    id: string;
}
export default function ManagePlanButtons({ id }: ManagePlanButtonsProps) {

    const queryClient = useQueryClient();
    const router = useRouter();
    const handleDeletePlan = async (): Promise<void> => {
        try {
            await deletePlan(id);
            await queryClient.invalidateQueries({ queryKey: ['plans'] });
            handleDeleteModalClose();
            router.push('/my-plans');

        } catch (e: any) {
            console.error(e);
            throw new Error(e.message);
        }
    };

    const {
        isOpen: isDeleteModalOpen,
        handleModalClose: handleDeleteModalClose,
        handleModalOpen: handleDeleteModalOpen,
    } = useModal(false);
    const {
        isOpen: isCreateModalOpen,
        handleModalClose: handleCreateModalClose,
        handleModalOpen: handleCreateModalOpen,
    } = useModal(false);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
            {isDeleteModalOpen && <ConfirmationModal isOpen={isDeleteModalOpen} onConfirm={handleDeletePlan}
                                                     onClose={handleDeleteModalClose} confirmButtonColor="error"
                                                     title="Are you sure you want to delete this plan?" />}
            {isCreateModalOpen &&
                <ExerciseModal isOpen={isCreateModalOpen} onClose={handleCreateModalClose} id={id}
                               mode={ExerciseFormMode.CREATE} />}
            <Tooltip title="Add exercise">
                <IconButton onClick={handleCreateModalOpen}>
                    <Add />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete plan">
                <IconButton onClick={handleDeleteModalOpen}>
                    <Delete />
                </IconButton>
            </Tooltip>
            <Tooltip title="Back to overview">
                <Link href="/my-plans" passHref>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Link>
            </Tooltip>
        </Box>
    );
}