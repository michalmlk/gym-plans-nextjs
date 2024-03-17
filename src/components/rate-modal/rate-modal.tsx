'use client';

import ModalWrapper, { ModalWrapperProps } from '@/components/shared/modal-wrapper/modal-wrapper';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { updatePlanRate } from '@/utils/plans';

type RateModalProps = {
    id: string;
} & ModalWrapperProps;
export default function RateModal({ id, isOpen, onClose }: RateModalProps) {

    const [rate, setRate] = useState<number | null>(0);
    const [wasRated, setWasRated] = useState(false);

    const handleRate = async (): Promise<void> => {
        await updatePlanRate(id, rate);
        setWasRated(true);
    };

    return (<ModalWrapper isOpen={isOpen} onClose={onClose} title="Rate plan">
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',

            }}>
                <Rating
                    name="simple-controlled"
                    value={rate}
                    onChange={(event, newValue) => {
                        setRate(newValue);
                    }}
                />
            </Box>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {wasRated ? <Button variant="contained" onClick={onClose}>Close</Button> :
                    <Button variant="contained" onClick={handleRate}>Rate</Button>}
            </CardActions>
        </ModalWrapper>
    );
}