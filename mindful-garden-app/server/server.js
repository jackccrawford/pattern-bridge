const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5402;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
    _links: {
      states: { href: '/api/states' },
      chat: { href: '/api/chat', method: 'POST' },
      history: { href: '/api/history' }
    }
  });
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// In-memory session storage
const sessions = new Map();

// Response generation utils
const { getResponse, getFollowUp } = require('../src/utils/responses');

// Emotional states metadata
const emotionalStates = {
  peaceful: {
    name: "Peaceful",
    description: "A state of calm tranquility, like a still garden pool reflecting the sky",
    icon: "🍃",
    particleEffect: "gentle leaves and soft lights",
    color: "#e0f7fa"
  },
  anxious: {
    name: "Anxious",
    description: "Like ripples on water's surface, feelings of unease or worry",
    icon: "💧",
    particleEffect: "quick movements with lower opacity",
    color: "#e8f5e9"
  },
  reflective: {
    name: "Reflective",
    description: "A contemplative state, like gazing into a mirror pool",
    icon: "✨",
    particleEffect: "fewer particles with graceful motion",
    color: "#e3f2fd"
  },
  overwhelmed: {
    name: "Overwhelmed",
    description: "When thoughts crowd like dense foliage, seeking space to breathe",
    icon: "🌿",
    particleEffect: "larger particles with slow movement",
    color: "#f3e5f5"
  },
  hopeful: {
    name: "Hopeful",
    description: "Like buds reaching for sunlight, anticipating positive change",
    icon: "🌱",
    particleEffect: "lively particles with bright presence",
    color: "#fff3e0"
  },
  uncertain: {
    name: "Uncertain",
    description: "Like mist in the garden, when the path ahead is unclear",
    icon: "🌫️",
    particleEffect: "moderate count with subtle presence",
    color: "#f5f5f5"
  },
  grateful: {
    name: "Grateful",
    description: "A garden in full bloom, appreciating life's gifts",
    icon: "🌸",
    particleEffect: "rich with leaves and gentle motion",
    color: "#f1f8e9"
  },
  processing: {
    name: "Processing",
    description: "Like a flowing stream, working through thoughts and feelings",
    icon: "💭",
    particleEffect: "steady flow with balanced elements",
    color: "#e8eaf6"
  }
};

// Session management
const createSession = () => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    id: sessionId,
    startTime: Date.now(),
    emotionalJourney: [],
    messages: []
  });
  return sessionId;
};

const getSession = (sessionId) => {
  return sessions.get(sessionId);
};

const updateSession = (sessionId, emotionalState, message) => {
  const session = sessions.get(sessionId);
  if (!session) return null;

  session.emotionalJourney.push({
    state: emotionalState,
    timestamp: Date.now()
  });

  if (message) {
    session.messages.push({
      text: message,
      emotionalState,
      timestamp: Date.now()
    });
  }

  return session;
};

// Transition insights based on emotional state changes
const getTransitionInsight = (fromState, toState) => {
  const transitions = {
    // Transitions from Anxious
    'anxious->peaceful': {
      insight: "Like storm clouds parting to reveal a gentle sky, your anxiety gives way to peace",
      prompt: "What helped you find this clearing in the storm?",
      metaphor: "🌧️ → 🍃",
      affirmation: "Finding peace within turbulence is a profound strength"
    },
    'anxious->reflective': {
      insight: "As ripples settle on the water's surface, space for reflection emerges",
      prompt: "What insights arise as the waters calm?",
      metaphor: "💧 → ✨",
      affirmation: "It takes courage to look within during uncertain times"
    },
    'anxious->hopeful': {
      insight: "Through the rain, sunlight begins to filter through, touching each droplet with possibility",
      prompt: "What rays of hope are starting to shine through?",
      metaphor: "🌧️ → 🌱",
      affirmation: "Hope often blooms in unexpected moments"
    },

    // Transitions from Overwhelmed
    'overwhelmed->peaceful': {
      insight: "Like a forest clearing emerging from dense foliage, you've found your breathing space",
      prompt: "What helped you create this peaceful clearing?",
      metaphor: "🌿 → 🍃",
      affirmation: "Each step toward peace is a victory worth celebrating"
    },
    'overwhelmed->reflective': {
      insight: "As the canopy thins, shafts of clarity pierce through the complexity",
      prompt: "What's becoming clearer as space opens up?",
      metaphor: "🌿 → ✨",
      affirmation: "Clarity often comes when we allow ourselves to pause"
    },
    'overwhelmed->hopeful': {
      insight: "Even in the densest garden, new shoots find their way toward light",
      prompt: "What possibilities are emerging from this challenge?",
      metaphor: "🌿 → 🌱",
      affirmation: "Growth often happens in the midst of complexity"
    },

    // Transitions from Uncertain
    'uncertain->hopeful': {
      insight: "As morning mist dissolves, tender buds reach for emerging sunlight",
      prompt: "What clarity is dawning within the uncertainty?",
      metaphor: "🌫️ → 🌱",
      affirmation: "Every moment of clarity is a seed of hope"
    },
    'uncertain->peaceful': {
      insight: "The fog gently lifts, revealing a tranquil garden waiting patiently",
      prompt: "What helps you find peace within uncertainty?",
      metaphor: "🌫️ → 🍃",
      affirmation: "Peace can exist even when the path isn't fully clear"
    },
    'uncertain->reflective': {
      insight: "In the quiet of uncertainty, reflection becomes a gentle guide",
      prompt: "What wisdom surfaces in these moments of not knowing?",
      metaphor: "🌫️ → ✨",
      affirmation: "Uncertainty often holds hidden gifts of insight"
    },

    // Transitions from Reflective
    'reflective->grateful': {
      insight: "Like morning dew catching sunlight, reflection transforms into appreciation",
      prompt: "What discoveries fill your heart with gratitude?",
      metaphor: "✨ → 🌸",
      affirmation: "Each moment of reflection can reveal new blessings"
    },
    'reflective->peaceful': {
      insight: "From the depths of contemplation, a serene clarity emerges",
      prompt: "What understanding brings you peace?",
      metaphor: "✨ → 🍃",
      affirmation: "Wisdom and peace often bloom together"
    },
    'reflective->hopeful': {
      insight: "Each reflection holds seeds of possibility, waiting to sprout",
      prompt: "What hopes are growing from your insights?",
      metaphor: "✨ → 🌱",
      affirmation: "Understanding opens doors to new possibilities"
    },

    // Transitions from Processing
    'processing->peaceful': {
      insight: "Like a stream finding its way to a quiet pool, movement settles into stillness",
      prompt: "What has found its place within you?",
      metaphor: "💭 → 🍃",
      affirmation: "Every journey through change can lead to peace"
    },
    'processing->hopeful': {
      insight: "As thoughts flow like water, they nourish seeds of possibility",
      prompt: "What new growth do you sense emerging?",
      metaphor: "💭 → 🌱",
      affirmation: "Processing creates fertile ground for hope"
    },
    'processing->grateful': {
      insight: "The flow of experience becomes a garden of appreciation",
      prompt: "What gifts has this journey revealed?",
      metaphor: "💭 → 🌸",
      affirmation: "Every step of the journey adds to life's beauty"
    },

    // Transitions from Hopeful
    'hopeful->grateful': {
      insight: "Hope blossoms into gratitude, like buds opening to full bloom",
      prompt: "What dreams have become precious gifts?",
      metaphor: "🌱 → 🌸",
      affirmation: "The journey from possibility to reality is worth celebrating"
    },
    'hopeful->peaceful': {
      insight: "As hopes take root, they create an oasis of tranquility",
      prompt: "What aspirations bring you peace?",
      metaphor: "🌱 → 🍃",
      affirmation: "Hope and peace can dance together in the garden of your heart"
    },
    'hopeful->reflective': {
      insight: "Each hope holds a mirror to our deepest wishes",
      prompt: "What do your hopes reveal about your heart's desires?",
      metaphor: "🌱 → ✨",
      affirmation: "Reflection can transform hope into deeper understanding"
    }
  };

  const key = `${fromState}->${toState}`;
  return transitions[key] || {
    insight: "Like seasons in the garden, one state flows into another",
    prompt: "What does this change feel like for you?",
    metaphor: "🌱 → 🌿",
    affirmation: "Every transition holds its own wisdom"
  };
};

// API Documentation
const apiDocs = {
  openapi: "3.0.0",
  info: {
    title: "Mindful Garden API",
    description: "A RESTful API for interacting with the Mindful Garden, supporting emotional awareness and reflection through nature metaphors.",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:5402",
      description: "Local development server"
    }
  ],
  paths: {
    "/api/states": {
      get: {
        summary: "Get available emotional states",
        description: "Returns a list of all available emotional states with their metadata",
        responses: {
          "200": {
            description: "List of emotional states with metadata",
            content: {
              "application/json": {
                example: {
                  states: {
                    peaceful: {
                      name: "Peaceful",
                      description: "A state of calm tranquility, like a still garden pool reflecting the sky",
                      icon: "🍃",
                      particleEffect: "gentle leaves and soft lights",
                      color: "#e0f7fa"
                    }
                  },
                  _links: {
                    self: { href: "/api/states" },
                    chat: { href: "/api/chat", method: "POST" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/chat": {
      post: {
        summary: "Send a message and get a response",
        description: "Send a message with an emotional state and get a contextual response",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "The message to send"
                  },
                  state: {
                    type: "string",
                    description: "The emotional state (e.g., peaceful, anxious)"
                  },
                  sessionId: {
                    type: "string",
                    description: "Optional session ID. If not provided, a new session will be created."
                  }
                },
                required: ["message", "state"]
              },
              example: {
                message: "I feel peaceful today",
                state: "peaceful"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Response with context and follow-up",
            content: {
              "application/json": {
                example: {
                  sessionId: "uuid",
                  response: "The garden is serene today, like your spirit. What brings you this sense of peace?",
                  followUp: "As you rest in this peaceful moment, what would you like to cultivate?",
                  transitionInsight: null,
                  _links: {
                    self: { href: "/api/chat" },
                    history: { href: "/api/history/uuid" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/history/{sessionId}": {
      get: {
        summary: "Get session history",
        description: "Returns the emotional journey and message history for a session",
        parameters: [
          {
            name: "sessionId",
            in: "path",
            required: true,
            schema: {
              type: "string"
            },
            description: "Session ID to get history for"
          }
        ],
        responses: {
          "200": {
            description: "Session history with emotional journey",
            content: {
              "application/json": {
                example: {
                  sessionId: "uuid",
                  startTime: 1738818572197,
                  duration: 20379,
                  emotionalJourney: [
                    {
                      state: "anxious",
                      timestamp: 1738818577268,
                      durationMs: 5504,
                      description: "Like ripples on water's surface, feelings of unease or worry"
                    }
                  ],
                  messages: [
                    {
                      text: "Feeling anxious today",
                      emotionalState: "anxious",
                      timestamp: 1738818577268,
                      context: "Like ripples on water's surface, feelings of unease or worry"
                    }
                  ]
                }
              }
            }
          },
          "404": {
            description: "Session not found"
          }
        }
      }
    },
    "/api/session/create": {
      post: {
        summary: "Create a new session",
        description: "Creates a new session for tracking emotional journey",
        responses: {
          "200": {
            description: "New session created",
            content: {
              "application/json": {
                example: {
                  sessionId: "uuid",
                  _links: {
                    self: { href: "/api/session/uuid" },
                    chat: { href: "/api/chat" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

app.get('/api/docs', (req, res) => {
  res.json(apiDocs);
});

app.get('/api/docs/ui', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Mindful Garden API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api/docs',
              dom_id: '#swagger-ui',
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout"
            });
          };
        </script>
      </body>
    </html>
  `);
});

// Routes
app.get('/api/states', (req, res) => {
  res.json({
    states: emotionalStates,
    _links: {
      self: { href: '/api/states' },
      chat: { href: '/api/chat', method: 'POST' },
      history: { href: '/api/history' }
    }
  });
});

app.post('/api/session/create', (req, res) => {
  const sessionId = createSession();
  res.json({
    sessionId,
    _links: {
      self: { href: `/api/session/${sessionId}` },
      states: { href: '/api/states' },
      chat: { href: '/api/chat', method: 'POST' }
    }
  });
});

app.get('/api/session/:sessionId', (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) {
    return res.status(404).json({
      error: 'Session not found',
      _links: {
        create: { href: '/api/session/create', method: 'POST' },
        states: { href: '/api/states' }
      }
    });
  }
  res.json({
    session,
    _links: {
      self: { href: `/api/session/${session.id}` },
      states: { href: '/api/states' },
      chat: { href: '/api/chat', method: 'POST' }
    }
  });
});

app.get('/api/history/:sessionId', (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) {
    return res.status(404).json({
      error: 'Session not found',
      _links: {
        create: { href: '/api/session/create', method: 'POST' },
        states: { href: '/api/states' }
      }
    });
  }

  // Get emotional state journey
  const stateJourney = session.emotionalJourney.map((state, index, array) => {
    const duration = index < array.length - 1 
      ? array[index + 1].timestamp - state.timestamp
      : Date.now() - state.timestamp;
    
    return {
      state: state.state,
      timestamp: state.timestamp,
      durationMs: duration,
      description: emotionalStates[state.state].description
    };
  });

  // Get message history with context
  const messageHistory = session.messages.map(msg => ({
    text: msg.text,
    emotionalState: msg.emotionalState,
    timestamp: msg.timestamp,
    context: emotionalStates[msg.emotionalState].description
  }));

  res.json({
    sessionId: session.id,
    startTime: session.startTime,
    duration: Date.now() - session.startTime,
    emotionalJourney: stateJourney,
    messages: messageHistory,
    _links: {
      self: { href: `/api/history/${session.id}` },
      session: { href: `/api/session/${session.id}` },
      states: { href: '/api/states' }
    }
  });
});

app.post('/api/chat', (req, res) => {
  const { message, state, sessionId } = req.body;
  
  // Get or create session
  let session = sessions.get(sessionId);
  if (!session) {
    session = createSession();
    sessions.set(session.id, session);
  }

  // Get previous state if it exists
  const previousState = session.emotionalJourney.length > 0 
    ? session.emotionalJourney[session.emotionalJourney.length - 1].state 
    : null;

  // Get transition insight if state has changed
  const transitionInsight = previousState && previousState !== state
    ? getTransitionInsight(previousState, state)
    : null;

  // Update session with new message and state
  const timestamp = Date.now();
  session.emotionalJourney.push({
    state,
    timestamp,
    durationMs: 0,
    description: emotionalStates[state].description
  });

  // Update duration of previous state
  if (session.emotionalJourney.length > 1) {
    const previousJourneyEntry = session.emotionalJourney[session.emotionalJourney.length - 2];
    previousJourneyEntry.durationMs = timestamp - previousJourneyEntry.timestamp;
  }

  session.messages.push({
    text: message,
    emotionalState: state,
    timestamp,
    context: emotionalStates[state].description
  });

  // Generate response based on state
  const response = getResponse(state);
  const followUp = getFollowUp(state);

  res.json({
    sessionId: session.id,
    response,
    followUp,
    transitionInsight,
    currentState: emotionalStates[state],
    _links: {
      self: { href: '/api/chat' },
      session: { href: `/api/session/${session.id}` },
      history: { href: `/api/history/${session.id}` },
      states: { href: '/api/states' }
    }
  });
});

app.post('/api/response', (req, res) => {
  const { sessionId, emotionalState, message } = req.body;

  if (!sessionId) {
    return res.status(400).json({
      error: 'Session ID is required',
      _links: {
        create: { href: '/api/session/create', method: 'POST' }
      }
    });
  }

  if (!emotionalState || !emotionalStates[emotionalState]) {
    return res.status(400).json({
      error: 'Valid emotional state is required',
      _links: {
        states: { href: '/api/states' }
      }
    });
  }

  // Update session
  const session = updateSession(sessionId, emotionalState, message);
  if (!session) {
    return res.status(404).json({
      error: 'Session not found',
      _links: {
        create: { href: '/api/session/create', method: 'POST' }
      }
    });
  }

  // Generate response based on state
  const response = getResponse(emotionalState);
  const followUp = getFollowUp(emotionalState);

  // Analyze emotional state transitions
  const transitions = session.emotionalJourney;
  let transitionInsight = null;

  if (transitions.length > 1) {
    const previousState = transitions[transitions.length - 2].state;
    const currentState = emotionalState;
    
    // Provide insights based on emotional transitions
    const insights = {
      'anxious->peaceful': 'You found your way to peace. What helped you make this transition?',
      'overwhelmed->reflective': 'Taking time to reflect can help us find clarity. What insights are emerging?',
      'uncertain->hopeful': 'Hope is dawning. What possibilities do you see ahead?',
      'processing->grateful': 'Through processing, gratitude emerges. What are you appreciating now?'
    };

    const transitionKey = `${previousState}->${currentState}`;
    transitionInsight = insights[transitionKey];
  }

  res.json({
    response,
    followUp,
    transitionInsight,
    sessionUpdated: true,
    _links: {
      history: { href: `/api/history/${sessionId}` },
      session: { href: `/api/session/${sessionId}` },
      states: { href: '/api/states' }
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Mindful Garden server listening at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/states         - List all emotional states');
  console.log('  POST /api/session/create - Create a new session');
  console.log('  GET  /api/session/:id    - Get session details');
  console.log('  GET  /api/history/:id    - Get session history');
  console.log('  POST /api/response       - Send a message and get response');
  console.log('  POST /api/chat           - Send a message and get response, creating a session if needed');
});
