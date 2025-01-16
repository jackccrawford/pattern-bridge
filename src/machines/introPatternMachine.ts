import { createMachine, assign } from 'xstate';

/**
 * Introduction Pattern State Machine
 * 
 * Core Psychological Principles:
 * -----------------------------
 * 1. Progressive Disclosure
 *    - Reveal complexity gradually
 *    - Build user confidence
 *    - Track readiness for next step
 * 
 * 2. Engagement Loop
 *    - Preview → Try → Adopt → Master
 *    - Each stage has clear success metrics
 *    - Adaptive to user behavior
 * 
 * 3. Social Elements
 *    - Social proof at key decision points
 *    - Community progress indicators
 *    - Success stories when motivation drops
 * 
 * 4. Persistence
 *    - Remember progress across sessions
 *    - Adaptive re-engagement strategies
 *    - Personalized pacing
 */

// Types that describe the shape of our context and events
type Status = 'idle' | 'active' | 'completed' | 'skipped';

export interface IntroContext {
  id: string;                    // Unique identifier for this introduction
  name: string;                  // Name of feature/content being introduced
  progress: {
    current: number;             // Current progress (0-100)
    lastUpdate: Date;            // Last time progress was updated
    milestones: number[];        // Progress points that trigger new content
  };
  engagement: {
    viewCount: number;           // Number of times user has viewed
    totalDuration: number;       // Total time spent engaging
    lastEngaged: Date;          // Last engagement timestamp
    completedSteps: string[];   // Steps user has completed
  };
  social: {
    adoptionRate: number;        // Percentage of users who adopted
    activeUsers: number;         // Number of active users
    successStories: Array<{     // Relevant success stories
      id: string;
      title: string;
      impact: string;
    }>;
  };
  preferences: {
    pace: 'fast' | 'normal' | 'slow';
    showSocialProof: boolean;
    autoAdvance: boolean;
  };
  status: Status;
}

// Event type definitions
type ViewEvent = { type: 'VIEW' }
type StartEvent = { type: 'START' }
type ProgressEvent = { type: 'PROGRESS'; value: number }
type CompleteStepEvent = { type: 'COMPLETE_STEP'; step: string }
type DismissEvent = { type: 'DISMISS' }
type SkipEvent = { type: 'SKIP' }
type ResetEvent = { type: 'RESET' }
type UpdatePreferencesEvent = { 
  type: 'UPDATE_PREFERENCES';
  preferences: Partial<IntroContext['preferences']>
}
type ShowSocialProofEvent = { type: 'SHOW_SOCIAL_PROOF' }
type ErrorEvent = { type: 'ERROR'; message: string }

export type IntroEvent =
  | ViewEvent
  | StartEvent
  | ProgressEvent
  | CompleteStepEvent
  | DismissEvent
  | SkipEvent
  | ResetEvent
  | UpdatePreferencesEvent
  | ShowSocialProofEvent
  | ErrorEvent;

export const createIntroPatternMachine = (config: {
  id: string;
  name: string;
  milestones?: number[];
}) => {
  return createMachine({
    types: {} as {
      context: IntroContext;
      events: IntroEvent;
    },
    id: config.id,
    initial: 'idle',
    context: {
      id: config.id,
      name: config.name,
      progress: {
        current: 0,
        lastUpdate: new Date(),
        milestones: config.milestones || [25, 50, 75, 100],
      },
      engagement: {
        viewCount: 0,
        totalDuration: 0,
        lastEngaged: new Date(),
        completedSteps: [],
      },
      social: {
        adoptionRate: 0,
        activeUsers: 0,
        successStories: [],
      },
      preferences: {
        pace: 'normal',
        showSocialProof: true,
        autoAdvance: true,
      },
      status: 'idle',
    },
    states: {
      idle: {
        on: {
          VIEW: {
            target: 'active',
            actions: [
              assign(({ context }) => ({
                engagement: {
                  ...context.engagement,
                  viewCount: context.engagement.viewCount + 1,
                  lastEngaged: new Date(),
                }
              }))
            ]
          },
        },
      },
      active: {
        on: {
          PROGRESS: {
            actions: [
              assign({
                status: (_) => 'active' as Status,
                progress: ({ context, event }) => ({
                  ...context.progress,
                  current: event.value,
                  lastUpdate: new Date(),
                })
              })
            ]
          },
          COMPLETE_STEP: {
            actions: [
              assign({
                engagement: ({ context, event }) => ({
                  ...context.engagement,
                  completedSteps: [...context.engagement.completedSteps, event.step],
                  lastEngaged: new Date(),
                })
              })
            ]
          },
          SKIP: {
            target: 'skipped',
            actions: [
              assign({
                status: (_) => 'skipped' as Status
              })
            ]
          },
        },
      },
      skipped: {
        on: {
          RESET: {
            target: 'idle',
            actions: [
              assign({
                progress: ({ context }) => ({
                  ...context.progress,
                  current: 0,
                  lastUpdate: new Date(),
                }),
                status: (_) => 'idle' as Status
              })
            ]
          },
        },
      },
    },
  });
};
