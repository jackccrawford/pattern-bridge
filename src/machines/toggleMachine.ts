import { createMachine, assign } from 'xstate';

export interface ToggleContext {
  count: number;
}

export type ToggleEvent = 
  | { type: 'TOGGLE' }
  | { type: 'RESET' };

export const toggleMachine = createMachine({
  types: {} as {
    context: ToggleContext;
    events: ToggleEvent;
  },
  id: 'toggle',
  initial: 'inactive',
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
  on: {
    TOGGLE: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    RESET: {
      actions: assign({
        count: () => 0,
      }),
    },
  },
});
