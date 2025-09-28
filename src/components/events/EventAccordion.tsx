// src/components/events/EventAccordion.tsx
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TicketCard from './TicketCard';
import { Event } from '../../features/events/eventsSlice';

interface EventAccordionProps {
    event: Event;
}

const EventAccordion = ({ event }: EventAccordionProps) => {

    const formattedDate = new Date(event.date).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    return (
        <Accordion sx={{ mb: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls={`panel-${event.id}-content`}
                id={`panel-${event.id}-header`}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 1,
                    '& .MuiAccordionSummary-content': {
                        flexDirection: 'column',
                    },
                }}
            >
                <Typography variant="h6">{event.name}</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body2">{event.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" />
                        <Typography variant="body2">{formattedDate}</Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: '#fdfdfd' }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {event.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                    Available Tickets
                </Typography>
                <Grid container spacing={2} justifyContent="center" >
                    {event.availableTickets.map(ticket => (
                        <Grid item key={ticket.id}>
                            <TicketCard type={ticket.type} price={ticket.price} status={ticket.status} />
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default EventAccordion;