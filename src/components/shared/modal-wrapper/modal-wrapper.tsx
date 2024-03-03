'use client';

import React, { PropsWithChildren, ReactElement, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Modal } from '@mui/material';

type ModalWrapperProps = {
    title: string;
    width: number;
    onClose?: () => void;
    isOpen: boolean;
}
export const ModalWrapper: React.FC<PropsWithChildren<ModalWrapperProps>> = ({
                                                                                 isOpen,
                                                                                 onClose,
                                                                                 title,
                                                                                 width = 400,
                                                                                 children,
                                                                             }): ReactElement => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 360, sm: 360, md: width },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                {children}
            </Card>
        </Modal>
    );
};

export default ModalWrapper;