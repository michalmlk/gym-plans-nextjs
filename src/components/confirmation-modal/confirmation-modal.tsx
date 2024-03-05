import React, { ReactElement } from 'react';
import ModalWrapper from '@/components/shared/modal-wrapper/modal-wrapper';
import CardActions from '@mui/material/CardActions';
import Button, { ButtonOwnProps } from '@mui/material/Button';

type ConfirmationModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    confirmButtonColor: ButtonOwnProps.color;
    confirmLabel?: string;
    cancelLabel?: string;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 title,
                                                                 onClose,
                                                                 isOpen,
                                                                 onConfirm,
                                                                 confirmLabel = 'Confirm',
                                                                 cancelLabel = 'Cancel',
                                                                 confirmButtonColor,
                                                             }): ReactElement => {
    return (
        <ModalWrapper title={title} isOpen={isOpen}
                      onClose={onClose}>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary" onClick={onClose}>{cancelLabel}</Button>
                <Button color={confirmButtonColor} variant="contained" onClick={onConfirm}>{confirmLabel}</Button>
            </CardActions>
        </ModalWrapper>
    );
};

export default ConfirmationModal;