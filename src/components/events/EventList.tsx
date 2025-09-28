/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchEvents } from '../../features/events/eventsSlice';
import EventAccordion from './EventAccordion';
import { Box, CircularProgress, Alert } from '@mui/material';

const EventList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, status, error } = useSelector((state: RootState) => state.events);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEvents());
        }
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (status === 'failed') {
        return <Alert severity="error">Error fetching events: {error}</Alert>;
    }

    return (
        <Box>
            {events.map(event => (
                <EventAccordion key={event.id} event={event} />
            ))}
        </Box>
    );
};

export default EventList;