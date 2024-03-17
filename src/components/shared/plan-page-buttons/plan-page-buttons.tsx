'use client';

import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import useModal from '@/hooks/useModal';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Star } from '@mui/icons-material';
import Link from 'next/link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import RateModal from '@/components/rate-modal/rate-modal';

export default function PlanPageButtons({ id }: { id: string }): ReactElement {
    const {
        isOpen,
        handleModalOpen,
        handleModalClose,
    } = useModal(false);

    return <Box sx={{
        display: 'flex',
        gap: 4,
        alignItems: 'center',
    }}>
        <RateModal id={id} isOpen={isOpen} onClose={handleModalClose} />
        <Tooltip title="Rate plan">
            <IconButton onClick={handleModalOpen}>
                <Star />
            </IconButton>
        </Tooltip>
        <Link href="/plans" passHref>
            <IconButton>
                <ArrowBack />
            </IconButton>
        </Link>
    </Box>;
};