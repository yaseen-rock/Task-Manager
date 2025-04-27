import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../api/auth';
import Footer from '../components/Footer';
import { getTasks, createTask, updateTask, deleteTask } from '../api/task';
import { 
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
  Tooltip,
  Divider,
  Avatar,
  CardActionArea,
  Modal,
  TextField,
  useTheme,
  CssBaseline
} from '@mui/material';
import { 
  Edit,
  Delete,
  Add,
  CheckCircle,
  CalendarToday,
  Logout,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#0066CC', // Accenture blue
          },
          secondary: {
            main: '#FF9E1B', // Accenture orange
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#333333',
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: '#4dabf5', // Lighter blue
          },
          secondary: {
            main: '#ffb74d', // Lighter orange
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#e0e0e0',
          },
        }),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

export default function Dashboard() {
  const [mode, setMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? savedMode : 'light';
  });
  
  const theme = createTheme(getDesignTokens(mode));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!getCurrentUser()) {
        navigate('/login');
        return;
      }

      try {
        const tasksData = await getTasks();
        setTasks(tasksData.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditTask = (task, e) => {
    e.stopPropagation();
    setEditTaskData(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate || ''
    });
    setOpenForm(true);
  };

  const handleCreateTask = () => {
    setEditTaskData(null);
    setFormData({
      title: '',
      description: '',
      dueDate: ''
    });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);
    try {
      if (editTaskData) {
        await updateTask(editTaskData._id, formData);
      } else {
        await createTask(formData);
      }
  
      const tasksData = await getTasks();
      setTasks(tasksData.data);
      setOpenForm(false);
    } catch (error) {
      console.error('Failed to save task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId, e) => {
    e.stopPropagation();
    try {
      await deleteTask(taskId);
      const tasksData = await getTasks();
      setTasks(tasksData.data);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* App Structure */}
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ 
        bgcolor: mode === 'light' ? 'white' : 'background.paper', 
        color: 'primary.main' 
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <Avatar 
                src="https://companieslogo.com/img/orig/ACN-cce5b411.png?t=1720244490" 
                alt="Accenture" 
                sx={{ width: '20px', height: '20px', marginRight: '11px'}}
                variant="square"
              />
              <Typography variant="h6" component="div" fontWeight="bold">
                TASK MANAGEMENT
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <IconButton onClick={toggleColorMode} color="inherit" sx={{ mr: 2 }}>
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<Add />}
                onClick={handleCreateTask}
                sx={{ mr: 2 }}
              >
                New Task
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ my: 4, flex: 1 }}>
        <Box >
          {/* Tasks Section */}
          <Typography  variant="h5" component="h2" gutterBottom fontWeight="bold">
            My Tasks
          </Typography>
          <Divider sx={{ mb: 4 }} />

          {tasks.length === 0 ? (
            <Box textAlign="center" py={4} border={1} borderRadius={2} borderColor="divider">
              <Typography variant="body1" color="textSecondary" gutterBottom>
                No tasks found. Create your first task!
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Add />}
                onClick={handleCreateTask}
              >
                Create Task
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                gap: 2,
              }}
            >
              {tasks.map(task => (
                <Card key={task._id} elevation={mode === 'light' ? 2 : 0} sx={{
                  bgcolor: mode === 'dark' ? 'background.paper' : 'white'
                }}>
                  <CardActionArea
                    onClick={() => setSelectedTask(task._id)}
                    data-active={selectedTask === task._id ? '' : undefined}
                    sx={{
                      height: '100%',
                      '&[data-active]': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                          backgroundColor: 'action.selectedHover',
                        },
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="h3" gutterBottom
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {task.title}
                        </Typography>
                        {task.completed && <CheckCircle color="success" />}
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {task.description}
                      </Typography>
                      {task.dueDate && (
                        <Box display="flex" alignItems="center" mt={1}>
                          <CalendarToday color="action" fontSize="small" sx={{ mr: 1 }} />
                          <Typography variant="caption">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Tooltip title="Edit">
                        <IconButton 
                          aria-label="edit" 
                          color="primary"
                          size="small"
                          onClick={(e) => handleEditTask(task, e)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          aria-label="delete" 
                          color="error"
                          size="small"
                          onClick={(e) => handleDeleteTask(task._id, e)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Container>

      {/* Footer */}
      <Footer mode={mode} />
    </Box>
      {/* Task Form Modal */}
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editTaskData ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <TextField 
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={formData.title}
            onChange={handleFormChange}
          />
          <TextField 
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={formData.description}
            onChange={handleFormChange}
          />
          <TextField 
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            margin="normal"
            value={formData.dueDate}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseForm} sx={{ mr: 2 }}>Cancel</Button>
            <Button 
              onClick={handleFormSubmit} 
              variant="contained" 
              color="primary"
              disabled={submitting}
            >
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                editTaskData ? 'Update' : 'Create'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}