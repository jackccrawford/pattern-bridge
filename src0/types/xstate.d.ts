import { StateFrom, EventFrom } from 'xstate';

// Generic type helpers for XState
export type MachineState<T> = StateFrom<T>;
export type MachineEvent<T> = EventFrom<T>;

// Utility type for service callbacks
export type MachineCallback<TContext = any, TEvent extends { type: string } = any> = {
  onDone?: (context: TContext) => void;
  onError?: (error: Error) => void;
};

// Type for action creators
export type ActionCreator<TContext = any, TEvent extends { type: string } = any> = 
  (context: TContext, event: TEvent) => Partial<TContext>;

// Type for guard conditions
export type GuardCreator<TContext = any, TEvent extends { type: string } = any> = 
  (context: TContext, event: TEvent) => boolean;
