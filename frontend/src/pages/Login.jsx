import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { 
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Paper,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  Divider,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#0066CC', // Accenture blue
    },
    secondary: {
      main: '#0066CC', // Accenture orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login(loginData);
      navigate('/dashboard');
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (err.response.status === 403) {
          errorMessage = 'Account not verified. Please check your email.';
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      }
      setError(errorMessage);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError(null);
    setPasswordError('');
    
    try {
      const response = await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      });
      
      // Check if registration was successful and includes auth token
      if (response.token) {
        // Store token if needed (in localStorage or context)
        localStorage.setItem('authToken', response.token);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // If no token but still successful (unlikely case)
        navigate('/dashboard');
      }
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = 'Invalid registration data';
        } else if (err.response.status === 401) {
          errorMessage = 'Registration not authorized';
        } else if (err.response.status === 409) {
          errorMessage = 'Email already registered';
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(null);
    setPasswordError('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear password mismatch error when editing
    if ((name === 'password' || name === 'confirmPassword') && passwordError) {
      setPasswordError('');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            {activeTab === 0 ? <LockOutlinedIcon /> : <HowToRegOutlinedIcon />}
          </Avatar>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
  <img 
    src="https://companieslogo.com/img/orig/ACN-cce5b411.png?t=1720244490" 
    alt="Accenture Logo" 
    style={{ width: '20px', height: '20px', marginRight: '11px' }}
  />
  <Typography component="h1" variant="h5">
    {activeTab === 0 ? 'Sign in to your account' : 'Create new account'}
  </Typography>
</Box>


          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth" 
            sx={{ mb: 2, width: '100%' }}
            indicatorColor="secondary"
          >
            <Tab label="Sign In" />
            <Tab label="Register" />
          </Tabs>

          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
            {activeTab === 0 ? (
              // Login Form
              <Box component="form" onSubmit={handleLoginSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  sx={{ mb: 1 }}
                />
                <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          name="rememberMe" 
                          color="primary" 
                          checked={loginData.rememberMe}
                          onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                        />
                      }
                      label="Remember me"
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </Box>
            ) : (
              // Registration Form
              <Box component="form" onSubmit={handleRegisterSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  sx={{ mb: 2 }}
                />
                <TextField
  margin="normal"
  required
  fullWidth
  name="password"
  label="Password (min 6 characters)"
  type="password"
  id="password"
  autoComplete="new-password"
  value={registerData.password}
  onChange={handleRegisterChange}
  error={!!passwordError || registerData.password.length > 0 && registerData.password.length < 6}
  helperText={
    passwordError || 
    (registerData.password.length > 0 && registerData.password.length < 6 
      ? 'Password must be at least 6 characters' 
      : '')
  }
  sx={{ mb: 2 }}
/>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  error={!!passwordError}
                  helperText={passwordError}
                  sx={{ mb: 1 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 2 }}>OR</Divider>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Link 
                  href="#" 
                  variant="body2" 
                  onClick={() => setActiveTab(activeTab === 0 ? 1 : 0)}
                  sx={{ color: 'secondary.main' }}
                >
                  {activeTab === 0 
                    ? "Don't have an account? Register" 
                    : "Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Paper>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}