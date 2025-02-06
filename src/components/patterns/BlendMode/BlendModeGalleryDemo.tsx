import React from 'react';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../contexts/ThemeContext';
import Animated, {
  FadeIn,
  Layout,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BlendModeExample {
  id: string;
  mode: string;
  colors: string[];
  description: string;
}

const BLEND_EXAMPLES: BlendModeExample[] = [
  {
    id: '1',
    mode: 'multiply',
    colors: ['#FF6B6B', '#4ECDC4'],
    description: 'Multiply blends colors by multiplying them together',
  },
  {
    id: '2',
    mode: 'screen',
    colors: ['#45B7D1', '#FFEEAD'],
    description: 'Screen creates lighter colors by inverting, multiplying, and inverting back',
  },
  {
    id: '3',
    mode: 'overlay',
    colors: ['#96CEB4', '#FF6B6B'],
    description: 'Overlay combines multiply and screen effects',
  },
];

export const BlendModeGalleryDemo = () => {
  const { theme } = useTheme();
  const [selectedMode, setSelectedMode] = React.useState<string>('multiply');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blend Mode Gallery</Text>
      
      {/* Blend Mode Examples */}
      <View style={styles.gallery}>
        {BLEND_EXAMPLES.map((example) => (
          <Animated.View
            key={example.id}
            entering={FadeIn.duration(300)}
            layout={Layout.springify()}
            style={[
              styles.exampleContainer,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Pressable
              onPress={() => setSelectedMode(example.mode)}
              style={[
                styles.blendContainer,
                { borderColor: selectedMode === example.mode ? theme.colors.primary : 'transparent' },
              ]}
            >
              {/* First Color Layer */}
              <View
                style={[
                  styles.colorLayer,
                  { backgroundColor: example.colors[0] },
                ]}
              />
              
              {/* Second Color Layer with Blend Mode */}
              <View
                style={[
                  styles.colorLayer,
                  {
                    backgroundColor: example.colors[1],
                    mixBlendMode: example.mode as any,
                  },
                ]}
              />
            </Pressable>
            
            <Text style={styles.modeName}>{example.mode}</Text>
            <Text style={styles.description}>{example.description}</Text>
          </Animated.View>
        ))}
      </View>
      
      {/* Interactive Demo Area */}
      <View style={styles.demoArea}>
        <Text style={styles.demoTitle}>Try It Yourself</Text>
        <View style={styles.interactiveDemo}>
          {/* Add interactive controls here */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  exampleContainer: {
    width: Math.min(SCREEN_WIDTH * 0.4, 200),
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  blendContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
  },
  colorLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  modeName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  demoArea: {
    marginTop: 32,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  interactiveDemo: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
});
