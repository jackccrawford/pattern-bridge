import { createMachine, assign } from 'xstate';

type ToggleEvent = 
  | { type: 'TOGGLE' }
  | { type: 'RESET' }
  | { type: 'RETRY' }
  | { type: 'ERROR'; error: string };

interface ToggleContext {
  count: number;
  error?: string;
}

export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  types: {
    context: {} as ToggleContext,
    events: {} as ToggleEvent,
  },
  context: {
    count: 0,
    error: undefined,
  },
  states: {
    inactive: {
      on: { 
        TOGGLE: {
          target: 'active',
          actions: assign({
            count: ({ context }) => context.count + 1,
            error: () => undefined,
          }),
        }
      }
    },
    active: {
      on: { 
        TOGGLE: {
          target: 'inactive',
          actions: assign({
            count: ({ context }) => context.count + 1,
            error: () => undefined,
          }),
        }
      }
    },
    error: {
      on: {
        RETRY: {
          target: 'inactive',
          actions: assign({
            count: () => 0,
            error: () => undefined,
          }),
        }
      }
    }
  },
  on: {
    RESET: {
      target: 'inactive',
      actions: assign({
        count: () => 0,
        error: () => undefined,
      }),
    },
    ERROR: {
      target: 'error',
      actions: assign({
        count: ({ context }) => context.count,
        error: ({ event }) => {
          if (event.type !== 'ERROR') return undefined;
          return event.error;
        },
      }),
    }
  },
});
