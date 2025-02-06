// Mindful responses for different emotional states
// Each response uses nature metaphors and gentle prompts for reflection

const responses = {
  peaceful: [
    "The garden is serene today, like your spirit. What brings you this sense of peace?",
    "Like leaves gently swaying in the breeze, you seem at ease. What helps you find this tranquility?",
    "There's a gentle stillness here, much like your presence. What moments bring you the most peace?",
    "Your calmness ripples like a still pond. What practices help you maintain this serenity?"
  ],
  
  anxious: [
    "Like ripples on water, anxiety can spread. Let's watch them gradually settle. What's creating these ripples?",
    "Even in a storm, roots grow deeper. What grounds you when things feel uncertain?",
    "Sometimes the garden rustles with restless energy. What's stirring within you?",
    "Like leaves in the wind, thoughts can scatter. Which one would you like to gently catch first?"
  ],
  
  reflective: [
    "The garden pool mirrors the sky above, just as you're looking inward now. What do you see?",
    "Like morning dew, clarity often comes in quiet moments. What insights are forming?",
    "In still waters, reflections become clear. What's becoming clearer to you?",
    "Each leaf holds a drop of wisdom. What understanding is emerging for you?"
  ],
  
  overwhelmed: [
    "Let's create some space, like these gentle clearings between the leaves. What would help you feel less crowded?",
    "Even in a dense garden, there are quiet spaces. Where might you find your clearing?",
    "Sometimes we need shelter, like plants beneath a canopy. What would offer you protection right now?",
    "The garden grows at its own pace. What small step could give you breathing room?"
  ],
  
  hopeful: [
    "Like buds reaching for sunlight, hope grows gradually. What's beginning to bloom for you?",
    "New growth appears in unexpected places. Where do you see possibility emerging?",
    "Spring always returns to the garden. What's awakening in you?",
    "Each seed holds potential, just waiting to grow. What hopes are you nurturing?"
  ],
  
  uncertain: [
    "Mist can make familiar paths seem new. What feels unclear right now?",
    "Even in fog, roots know their way. What helps you stay grounded when things are uncertain?",
    "The garden's paths wind in many directions. Which one draws your curiosity?",
    "Sometimes clarity comes like morning light, gradually. What would help you find your way?"
  ],
  
  grateful: [
    "Like a garden in full bloom, gratitude fills the heart. What's blossoming in yours?",
    "Each flower is a small celebration. What moments bring you joy?",
    "The garden offers its gifts freely. What are you thankful for today?",
    "Gratitude grows like well-tended plants. What nurtures your appreciation?"
  ],
  
  processing: [
    "Like a stream finding its path, thoughts need time to flow. What's moving through your mind?",
    "Change happens like seasons, each at its own pace. What's shifting for you?",
    "The garden processes sunlight into growth. What are you working to transform?",
    "Sometimes we need to let things settle, like soil after rain. What needs time to clarify?"
  ]
};

// Get a random response for a given emotional state
const getResponse = (emotionalState) => {
  const stateResponses = responses[emotionalState.toLowerCase()];
  if (!stateResponses) return null;
  
  const randomIndex = Math.floor(Math.random() * stateResponses.length);
  return stateResponses[randomIndex];
};

// Get a follow-up response that encourages deeper reflection
const getFollowUp = (emotionalState) => {
  const followUps = {
    peaceful: "As you rest in this peaceful moment, what would you like to cultivate?",
    anxious: "While we sit with these feelings, what small comfort could we create?",
    reflective: "As these thoughts surface, which ones feel most important to explore?",
    overwhelmed: "Among all that's present, what needs your attention most?",
    hopeful: "With this spark of hope, what small step feels possible?",
    uncertain: "In this space of not knowing, what feels true to you?",
    grateful: "As you hold this gratitude, how might you share its light?",
    processing: "While things settle, what support would help you most?"
  };
  
  return followUps[emotionalState.toLowerCase()] || null;
};

module.exports = { getResponse, getFollowUp };
