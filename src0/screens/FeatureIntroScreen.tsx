import React from 'react';
import { useMachine } from '@xstate/react';
import { featureIntroMachine } from '../machines/featureIntroMachine';
import { 
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

export const FeatureIntroScreen: React.FC = () => {
  const [state, send] = useMachine(featureIntroMachine);
  const theme = useTheme();

  // Helper to show current state as a toast
  const showStateTransition = (newState: string) => {
    // Implement toast functionality using MUI
  };

  // Visual elements for each state
  const renderContent = () => {
    switch (state.value) {
      case 'discovering':
        return (
          <Paper elevation={1} sx={{ p: 3, bgcolor: theme.palette.primary.light }}>
            <Stack spacing={2}>
              <Typography variant="h5">✨ New Feature Available!</Typography>
              <Typography>Would you like to learn about our new collaboration tools?</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  send({ type: 'START_PREVIEW' });
                  showStateTransition('previewing');
                }}
              >
                Show Me
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  send({ type: 'DISMISS' });
                  showStateTransition('dismissed');
                }}
              >
                Maybe Later
              </Button>
            </Stack>
          </Paper>
        );

      case 'previewing':
        return (
          <Paper elevation={1} sx={{ p: 3, bgcolor: theme.palette.secondary.light }}>
            <Stack spacing={2}>
              <Typography variant="h5">🎯 Feature Preview</Typography>
              <Typography>Here's how our new collaboration tools work...</Typography>
              <LinearProgress 
                variant="determinate" 
                value={state.context.userProgress} 
                color="secondary"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  send({ 
                    type: 'UPDATE_PROGRESS', 
                    value: state.context.userProgress + 25 
                  });
                }}
              >
                Next Tip
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={state.context.userProgress < 75}
                onClick={() => {
                  send({ type: 'TRY_FEATURE' });
                  showStateTransition('trying');
                }}
              >
                Try It Now
              </Button>
            </Stack>
          </Paper>
        );

      case 'trying':
        return (
          <Paper elevation={1} sx={{ p: 3, bgcolor: theme.palette.success.light }}>
            <Stack spacing={2}>
              <Typography variant="h5">🚀 Try It Yourself</Typography>
              <Typography>Go ahead, create your first collaborative space!</Typography>
              <LinearProgress 
                variant="determinate" 
                value={state.context.userProgress}
                color="success"
              />
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  send({ 
                    type: 'UPDATE_PROGRESS', 
                    value: state.context.userProgress + 34 
                  });
                }}
              >
                Complete Next Step
              </Button>
              <Button
                variant="contained"
                color="success"
                disabled={state.context.userProgress < 100}
                onClick={() => {
                  send({ type: 'COMPLETE' });
                  showStateTransition('activated');
                }}
              >
                Finish Setup
              </Button>
            </Stack>
          </Paper>
        );

      case 'activated':
        return (
          <Paper elevation={1} sx={{ p: 3, bgcolor: theme.palette.success.light }}>
            <Stack spacing={2}>
              <Typography variant="h5">🎉 All Set!</Typography>
              <Typography>You're now a collaboration pro!</Typography>
              <Typography variant="body2" color="success.dark">
                Feature successfully activated
              </Typography>
            </Stack>
          </Paper>
        );

      case 'dismissed':
        return (
          <Paper elevation={1} sx={{ p: 3, bgcolor: theme.palette.grey[100] }}>
            <Stack spacing={2}>
              <Typography variant="h5">👋 No Problem!</Typography>
              <Typography>We'll remind you about this feature later.</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  send({ type: 'START_PREVIEW' });
                  showStateTransition('previewing');
                }}
              >
                Actually, Show Me Now
              </Button>
            </Stack>
          </Paper>
        );

      case 'error':
        return (
          <Paper elevation={1} sx={{ p: 3, bgcolor: theme.palette.error.light }}>
            <Stack spacing={2}>
              <Typography variant="h5">😅 Oops!</Typography>
              <Typography color="error">{state.context.error}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  send({ type: 'START_PREVIEW' });
                  showStateTransition('previewing');
                }}
              >
                Try Again
              </Button>
            </Stack>
          </Paper>
        );
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Stack spacing={4}>
        <Typography variant="h4" align="center">
          Feature Introduction Demo
        </Typography>
        {renderContent()}
        
        {/* Debug Controls */}
        <Paper elevation={1} sx={{ p: 2, bgcolor: theme.palette.grey[100] }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Debug Controls:</Typography>
          <Button
            size="small"
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
            onClick={() => send({ type: 'ERROR', message: 'Something went wrong!' })}
          >
            Simulate Error
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Current State: {String(state.value)}
          </Typography>
          <Typography variant="caption" display="block">
            Progress: {state.context.userProgress}%
          </Typography>
          <Typography variant="caption" display="block">
            Dismiss Count: {state.context.dismissCount}
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};
