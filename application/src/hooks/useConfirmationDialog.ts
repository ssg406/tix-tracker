import React, {useState} from 'react';

const useConfirmationDialog = (confirmBehavior: Function, cancelBehavior: Function) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = (confirmed: boolean) => {
        if (confirmed) {
            confirmBehavior();
        }
        setDialogOpen(false);
        cancelBehavior();
    }

    return {dialogOpen, setDialogOpen, handleDialogOpen, handleDialogClose};
}

export default useConfirmationDialog;