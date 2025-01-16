/**
 * Feature Introduction Pattern
 * 
 * Business Pattern: Progressive Engagement
 * ----------------------------------------
 * This pattern bridges the gap between feature availability and user adoption
 * by leveraging key principles of human psychology:
 * 
 * 1. Reciprocity
 *    - Offer value upfront ("Preview this new feature")
 *    - Create a sense of gift ("Early access")
 * 
 * 2. Commitment/Consistency
 *    - Start small ("Take a quick tour")
 *    - Build progressive investment
 * 
 * 3. Social Proof
 *    - Show adoption metrics
 *    - Highlight user success stories
 * 
 * 4. Authority
 *    - Expert tips
 *    - Best practice guidance
 * 
 * 5. Liking
 *    - Delightful interactions
 *    - Positive reinforcement
 * 
 * 6. Scarcity
 *    - Limited-time offerings
 *    - Exclusive features
 * 
 * 7. Unity
 *    - Community participation
 *    - Shared product identity
 * 
 * ROI Metrics:
 * - Feature adoption rate
 * - Time to value
 * - User engagement depth
 * - Conversion success
 * 
 * @ai-pattern Feature introduction with psychological triggers
 * @ai-transform Can be applied to any new feature rollout
 * @ai-context User engagement and feature adoption
 */

import { createMachine, assign } from 'xstate';

// --- Type Definitions ---
// @ai-pattern State progression follows user psychology
type FeatureState = 
  | 'discovering'   // Reciprocity: First touch
  | 'previewing'    // Commitment: Small investment
  | 'trying'        // Consistency: Active engagement
  | 'activated'     // Unity: Part of product
  | 'dismissed'     // Scarcity: Missing out
  | 'error';        // Authority: Expert help

// @ai-pattern Context tracks engagement metrics
interface IntroContext {
  featureId: string;           // Unique feature identifier
  userProgress: number;        // Engagement depth (0-100)
  dismissCount: number;        // Scarcity metric
  socialProof?: {             // Social proof metrics
    adoptionRate: number;     // % of users who adopted
    successStories: number;   // Number of success stories
  };
  lastInteraction?: Date;      // Engagement recency
  error?: string;             // User friction point
}

// @ai-pattern Events map to user psychological triggers
type IntroEvent =
  | { type: 'START_PREVIEW' }              // Reciprocity trigger
  | { type: 'TRY_FEATURE' }                // Commitment trigger
  | { type: 'COMPLETE' }                   // Unity achievement
  | { type: 'DISMISS' }                    // Scarcity trigger
  | { type: 'UPDATE_PROGRESS'; value: number }  // Consistency metric
  | { type: 'SHOW_SOCIAL_PROOF'; adoptionRate: number; stories: number }  // Social proof
  | { type: 'ERROR'; message: string };    // Authority need

export const featureIntroMachine = createMachine({
  id: 'featureIntro',
  initial: 'discovering',
  types: {
    context: {} as IntroContext,
    events: {} as IntroEvent,
  },
  context: {
    featureId: '',
    userProgress: 0,
    dismissCount: 0,
  },
  states: {
    discovering: {
      on: {
        START_PREVIEW: {
          target: 'previewing',
          actions: assign({
            lastInteraction: () => new Date(),
          }),
        },
        DISMISS: {
          target: 'dismissed',
          actions: assign({
            dismissCount: ({ context }) => context.dismissCount + 1,
            lastInteraction: () => new Date(),
          }),
        },
        SHOW_SOCIAL_PROOF: {
          actions: assign({
            socialProof: ({ event }) => ({
              adoptionRate: event.adoptionRate,
              successStories: event.stories,
            }),
          }),
        },
      },
    },
    previewing: {
      on: {
        TRY_FEATURE: {
          target: 'trying',
          actions: assign({
            lastInteraction: () => new Date(),
          }),
        },
        DISMISS: {
          target: 'dismissed',
          actions: assign({
            dismissCount: ({ context }) => context.dismissCount + 1,
            lastInteraction: () => new Date(),
          }),
        },
        UPDATE_PROGRESS: {
          actions: assign({
            userProgress: ({ event }) => event.value,
            lastInteraction: () => new Date(),
          }),
        },
      },
    },
    trying: {
      on: {
        COMPLETE: {
          target: 'activated',
          actions: assign({
            userProgress: () => 100,
            lastInteraction: () => new Date(),
          }),
        },
        UPDATE_PROGRESS: {
          actions: assign({
            userProgress: ({ event }) => event.value,
            lastInteraction: () => new Date(),
          }),
        },
      },
    },
    activated: {
      type: 'final',
      // @ai-pattern Success state with measurable ROI
      entry: (context) => {
        // Track success metrics
        const timeToValue = context.lastInteraction 
          ? new Date().getTime() - context.lastInteraction.getTime()
          : 0;
        
        // AI: Insert analytics here
        console.log('Feature Activated', {
          timeToValue,
          progressPath: context.userProgress,
          attempts: context.dismissCount + 1,
        });
      },
    },
    dismissed: {
      on: {
        START_PREVIEW: {
          target: 'previewing',
          actions: assign({
            lastInteraction: () => new Date(),
          }),
        },
        // @ai-pattern Scarcity and social proof can re-engage
        SHOW_SOCIAL_PROOF: {
          actions: assign({
            socialProof: ({ event }) => ({
              adoptionRate: event.adoptionRate,
              successStories: event.stories,
            }),
          }),
        },
      },
    },
    error: {
      on: {
        START_PREVIEW: {
          target: 'previewing',
          actions: assign({
            error: () => undefined,
            lastInteraction: () => new Date(),
          }),
        },
      },
    },
  },
  on: {
    ERROR: {
      target: 'error',
      actions: assign({
        error: ({ event }) => event.message,
        lastInteraction: () => new Date(),
      }),
    },
  },
});
