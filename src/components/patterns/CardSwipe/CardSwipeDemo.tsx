import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions, Platform, GestureResponderEvent } from 'react-native';
import { Text } from '../../Text';
import { useTheme } from '../../../contexts/ThemeContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CARD_ASPECT_RATIO = 1.5;

interface Card {
  id: number;
  title: string;
  color: string;
}

const DEMO_CARDS: Card[] = [
  { id: 1, title: 'Swipe Right to Like', color: '#FF6B6B' },
  { id: 2, title: 'Swipe Left to Skip', color: '#4ECDC4' },
  { id: 3, title: 'Keep Going!', color: '#45B7D1' },
  { id: 4, title: 'Almost There...', color: '#96CEB4' },
  { id: 5, title: 'Last One!', color: '#FFEEAD' },
];

export const CardSwipeDemo = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [cards, setCards] = React.useState(DEMO_CARDS);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardRef = useRef<View>(null);
  const [cardPosition, setCardPosition] = React.useState({ x: 0, y: 0 });
  
  const [dimensions, setDimensions] = React.useState(() => {
    const window = Dimensions.get('window');
    const cardWidth = Math.min(window.width * 0.8, 400);
    return {
      screenWidth: window.width,
      cardWidth,
      swipeThreshold: window.width * 0.3,
    };
  });

  // Handle window resize on web
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const handleResize = () => {
        const window = Dimensions.get('window');
        const cardWidth = Math.min(window.width * 0.8, 400);
        setDimensions({
          screenWidth: window.width,
          cardWidth,
          swipeThreshold: window.width * 0.3,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Update card position when mounted or resized
  React.useEffect(() => {
    if (Platform.OS === 'web' && cardRef.current) {
      const updateCardPosition = () => {
        const element = cardRef.current as unknown as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          setCardPosition({ x: rect.left, y: rect.top });
        }
      };

      updateCardPosition();
      window.addEventListener('resize', updateCardPosition);
      return () => window.removeEventListener('resize', updateCardPosition);
    }
  }, [dimensions]);

  const removeTopCard = React.useCallback(() => {
    setCards(currentCards => currentCards.slice(1));
    translateX.value = 0;
    translateY.value = 0;
  }, [translateX, translateY]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (event) => {
      if (Math.abs(translateX.value) > dimensions.swipeThreshold) {
        translateX.value = withSpring(
          Math.sign(translateX.value) * dimensions.screenWidth * 1.5,
          {},
          () => runOnJS(removeTopCard)()
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  // Web touch handlers
  const handleTouchStart = React.useCallback((e: React.TouchEvent | GestureResponderEvent) => {
    if (Platform.OS === 'web') {
      const webEvent = e as React.TouchEvent;
      const touch = webEvent.touches[0];
      const touchX = touch.clientX - cardPosition.x;
      const touchY = touch.clientY - cardPosition.y;
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          const deltaX = touch.clientX - cardPosition.x - touchX;
          const deltaY = touch.clientY - cardPosition.y - touchY;
          translateX.value = deltaX;
          translateY.value = deltaY;
        }
      };

      const handleTouchEnd = () => {
        if (Math.abs(translateX.value) > dimensions.swipeThreshold) {
          translateX.value = withSpring(
            Math.sign(translateX.value) * dimensions.screenWidth * 1.5,
            {},
            () => removeTopCard()
          );
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
  }, [cardPosition, dimensions.screenWidth, dimensions.swipeThreshold, removeTopCard, translateX, translateY]);

  const rTopCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-dimensions.screenWidth / 2, 0, dimensions.screenWidth / 2],
      [8, 0, -8]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const rSecondCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(translateX.value),
      [0, dimensions.screenWidth],
      [0.9, 1]
    );

    return {
      transform: [{ scale }],
    };
  });

  if (cards.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={[styles.noMoreCards, { color: theme.colors.text }]}>
          No more cards!
        </Text>
      </View>
    );
  }

  const CardWrapper = Platform.OS === 'web' ? View : PanGestureHandler;
  const cardWrapperProps = Platform.OS === 'web' 
    ? { 
        onTouchStart: handleTouchStart as (e: GestureResponderEvent) => void,
        ref: cardRef,
      }
    : { 
        onGestureEvent: gestureHandler,
      };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.cardContainer, { height: dimensions.cardWidth * CARD_ASPECT_RATIO }]}>
        {cards.length > 1 && (
          <Animated.View
            style={[
              styles.card,
              rSecondCardStyle,
              { 
                backgroundColor: cards[1]?.color || theme.colors.background,
                width: dimensions.cardWidth,
                height: dimensions.cardWidth * CARD_ASPECT_RATIO,
              },
            ]}
          >
            <Text style={styles.cardText}>{cards[1]?.title || ''}</Text>
          </Animated.View>
        )}
        
        <CardWrapper {...cardWrapperProps}>
          <Animated.View
            style={[
              styles.card,
              rTopCardStyle,
              { 
                backgroundColor: cards[0]?.color || theme.colors.background,
                width: dimensions.cardWidth,
                height: dimensions.cardWidth * CARD_ASPECT_RATIO,
              },
            ]}
          >
            <Text style={styles.cardText}>{cards[0]?.title || ''}</Text>
          </Animated.View>
        </CardWrapper>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom || 20 }]}>
        <Text style={[styles.instructions, { color: theme.colors.text }]}>
          ← Swipe cards left or right →
        </Text>
        {Platform.OS === 'web' && (
          <Text style={[styles.webNote, { color: theme.colors.text }]}>
            💡 For the best experience, try this pattern on your mobile device with Expo Go
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    borderRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    opacity: 0.7,
  },
  noMoreCards: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  webNote: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
