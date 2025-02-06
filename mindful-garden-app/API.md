# Mindful Garden API Documentation

Base URL: http://localhost:5402

## Endpoints

### Get Available States
GET /api/states

Returns all available emotional states with their metadata.

Response example:
```json
{
  "states": {
    "peaceful": {
      "name": "Peaceful",
      "description": "A state of calm tranquility, like a still garden pool reflecting the sky",
      "icon": "🍃",
      "particleEffect": "gentle leaves and soft lights",
      "color": "#e0f7fa"
    }
  },
  "_links": {
    "self": { "href": "/api/states" },
    "chat": { "href": "/api/chat", "method": "POST" },
    "history": { "href": "/api/history" }
  }
}
```

### Send Message
POST /api/chat

Send a message and emotional state to the garden.

Request body:
```json
{
  "message": "The garden feels peaceful today",
  "state": "peaceful"
}
```

Response example:
```json
{
  "sessionId": "8e3fe612-3b79-4ac9-99a6-542b0fc39bc8",
  "response": "Your calmness ripples like a still pond...",
  "followUp": "As you rest in this peaceful moment, what would you like to cultivate?",
  "currentState": {
    "name": "Peaceful",
    "description": "A state of calm tranquility...",
    "icon": "🍃",
    "particleEffect": "gentle leaves and soft lights",
    "color": "#e0f7fa"
  },
  "_links": {
    "self": { "href": "/api/chat" },
    "session": { "href": "/api/session/8e3fe612-3b79-4ac9-99a6-542b0fc39bc8" },
    "history": { "href": "/api/history/8e3fe612-3b79-4ac9-99a6-542b0fc39bc8" },
    "states": { "href": "/api/states" }
  }
}
```

### View Session History
GET /api/history/{sessionId}

Get the conversation history and emotional journey for a specific session.

Response example:
```json
{
  "sessionId": "8e3fe612-3b79-4ac9-99a6-542b0fc39bc8",
  "startTime": 1738818441900,
  "duration": 5336,
  "emotionalJourney": [
    {
      "state": "peaceful",
      "timestamp": 1738818441900,
      "durationMs": 5335,
      "description": "A state of calm tranquility..."
    }
  ],
  "messages": [
    {
      "text": "The garden feels peaceful today",
      "emotionalState": "peaceful",
      "timestamp": 1738818441900,
      "context": "A state of calm tranquility..."
    }
  ],
  "_links": {
    "self": { "href": "/api/history/8e3fe612-3b79-4ac9-99a6-542b0fc39bc8" },
    "session": { "href": "/api/session/8e3fe612-3b79-4ac9-99a6-542b0fc39bc8" },
    "states": { "href": "/api/states" }
  }
}
```

### Interactive Documentation
GET /api/docs/ui

A Swagger UI interface that provides interactive documentation for all API endpoints.

## Features

1. **HATEOAS Links**: Each response includes `_links` for discoverable navigation
2. **Session Management**: Tracks conversations with unique session IDs
3. **Emotional Journey**: Tracks state transitions and durations
4. **Rich Metadata**: Each state includes:
   - Name and description
   - Emoji icon
   - Particle effect description
   - Color theme
5. **Contextual Responses**: 
   - Main response matching emotional state
   - Follow-up questions for deeper reflection
   - Transition insights when changing states

## Available Emotional States

1. 🍃 Peaceful: Calm tranquility
2. 💧 Anxious: Ripples of unease
3. ✨ Reflective: Contemplative mirror pool
4. 🌿 Overwhelmed: Dense foliage seeking space
5. 🌱 Hopeful: Reaching for sunlight
6. 🌫️ Uncertain: Misty paths ahead
7. 🌸 Grateful: Garden in full bloom
8. 💭 Processing: Flowing stream of thoughts
