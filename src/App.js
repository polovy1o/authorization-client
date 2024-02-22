import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Link } from './components/ui/Link';

function App() {
    return (
        <div>
            <AppBar position="static" color="inherit" sx={{ boxShadow: "0 0 1px 2px rgba(0, 0, 0, 0.1)" }}>
                <Container>
                    <Toolbar>
                        <Link to="/" style={{color:"black"}}>
                            <Typography variant="h6" component="div">
                                SomeWebsite
                            </Typography>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
}

export default App;
