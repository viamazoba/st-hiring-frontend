import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface TicketCardProps {
    type: string;
    price: number;
    status: string;
}

const TicketCard = ({ type, price, status }: TicketCardProps) => {
    return (
        <Card
            variant="outlined"
            sx={(theme) => ({
                minWidth: 150,
                textAlign: 'center',
                boxShadow: `0px 2px 2px ${theme.palette.primary.main}`,
            })}

        >
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Type: {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
                <Typography sx={{ fontSize: 16 }} component="div">
                    Price: ${price}
                </Typography>
                <Box sx={{ mt: 1.5 }}>
                    <Button size="small" variant="contained">
                        {status.toUpperCase()}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TicketCard;