import { useState } from 'react';

const useModal = (initialModalState: boolean) => {

    const [isOpen, setIsOpen] = useState(initialModalState);
    const handleModalOpen = (): void => setIsOpen(true);
    const handleModalClose = (): void => setIsOpen(false);

    return {
        isOpen,
        handleModalOpen,
        handleModalClose,
    };
};

export default useModal;