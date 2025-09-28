import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import theme from './theme';
import EventList from './components/events/EventList';
import SettingsButton from './components/common/SettingsButton';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <SettingsButton />
        <EventList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
