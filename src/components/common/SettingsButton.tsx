import { Button, Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { openSettingsModal } from '../../features/settings/settingsSlice';

const SettingsButton = () => {

    const dispatch = useDispatch<AppDispatch>();

    const handleOpen = () => {
        dispatch(openSettingsModal());
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { sx: 'start', md: 'center' },
            mb: 4,
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
        }}>
            <Typography variant="h4" component="h1" sx={{ color: 'primary.main' }}>
                Tickets and Events
            </Typography>
            <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={handleOpen}
            >
                Mobile settings
            </Button>
        </Box>
    );
};

export default SettingsButton;