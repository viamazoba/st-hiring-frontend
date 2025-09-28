import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Box, Typography, IconButton, CircularProgress, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RootState, AppDispatch } from '../../app/store';
import { fetchSettings, updateSettings, closeSettingsModal, ISettings } from '../../features/settings/settingsSlice';
import SettingsForm from './SettingsForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
};

const SettingsModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isModalOpen, settings, status, error } = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        if (isModalOpen && !settings) {
            dispatch(fetchSettings());
        }
    }, [isModalOpen, settings, dispatch]);

    const handleClose = () => {
        dispatch(closeSettingsModal());
    };

    const handleSubmit = (values: ISettings) => {
        dispatch(updateSettings(values));
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-title"
            closeAfterTransition
        >
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #ddd' }}>
                    <Typography id="modal-title" variant="h5" component="h2" color="primary.main">
                        Mobile Settings
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {status === 'loading' && !settings && (
                    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Box sx={{ p: 4 }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}
                {status !== 'loading' && settings && (
                    <SettingsForm
                        initialSettings={settings}
                        onSubmit={handleSubmit}
                        onCancel={handleClose}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default SettingsModal;