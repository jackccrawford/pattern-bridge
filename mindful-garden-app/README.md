# Mindful Garden App

A serene React application that helps users process their emotions through a peaceful garden metaphor. The app provides a calming space where users can express their feelings and receive mindful responses in a visually engaging environment.

## Features

- **Emotional State Visualization**
  - Dynamic background gradients
  - State-specific particle effects
  - Meaningful icons for each state
  - Smooth transitions

- **Mindful Chat Interface**
  - Natural language responses
  - Contextual AI feedback
  - Engaging animations
  - Beautiful UI design

- **Visual Elements**
  - Floating leaves and light particles
  - Responsive design
  - Calming color palette
  - Smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mindful-garden-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ./restart.sh
   ```
   This will start the app on port 5401.

### Development

The app is structured as follows:

```
mindful-garden-app/
├── src/
│   ├── App.js              # Main application component
│   ├── App.css             # Core styles
│   └── components/
│       └── GardenParticles.js  # Particle animation system
├── public/
│   └── index.html          # HTML template
├── package.json            # Dependencies and scripts
└── restart.sh             # Server management script
```

## Emotional States

The app supports various emotional states, each with unique visual characteristics:

- **Peaceful**: Balanced, gentle movements with medium opacity
- **Anxious**: More particles, quicker movements, lower opacity
- **Reflective**: Fewer particles, graceful motion, higher opacity
- **Overwhelmed**: Few large particles, slow movement
- **Hopeful**: Lively particles with balanced movement
- **Uncertain**: Moderate particles with varied speeds
- **Grateful**: Rich with leaves, gentle motion
- **Processing**: Steady flow with balanced elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by mindfulness and nature
- Built with React and modern web technologies
- Designed for emotional well-being
