import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode } from 'react';

interface SettingsAccordionProps {
    title: string;
    children: ReactNode;
}

const SettingsAccordion = ({ title, children }: SettingsAccordionProps) => {
    return (
        <Accordion
            defaultExpanded
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 1,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default SettingsAccordion;