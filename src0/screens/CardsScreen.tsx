import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, RefreshControl, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../components/Card';
import { useToast } from '../components/Toast/ToastProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CardData {
  id: number;
  title: string;
  content: string;
  details?: {
    description: string;
    lastUpdated: string;
    status: string;
    priority: 'Low' | 'Medium' | 'High';
    assignee?: string;
    tags?: string[];
  };
  total: number;
}

const initialCards = [
  { 
    id: 1, 
    title: 'Getting Started', 
    content: 'Welcome to our app! Here are some tips to get you started.',
    details: {
      description: 'A comprehensive guide to help new users understand the core features and functionality of our application. Includes interactive examples and best practices for getting the most out of the platform.',
      lastUpdated: '2025-01-14',
      status: 'Published',
      priority: 'High',
      assignee: 'Sarah Chen',
      tags: ['onboarding', 'tutorial', 'documentation']
    },
    total: 5 
  },
  { 
    id: 2, 
    title: 'Material Design', 
    content: 'Our app uses Material Design 3 for a modern look and feel.',
    details: {
      description: 'Detailed overview of our Material Design 3 implementation, including our custom theme, component library, and design tokens. Learn about our color system, typography, and spacing guidelines.',
      lastUpdated: '2025-01-10',
      status: 'In Review',
      priority: 'Medium',
      assignee: 'Alex Wong',
      tags: ['design', 'ui', 'guidelines']
    },
    total: 5 
  },
  { 
    id: 3, 
    title: 'Dark Mode', 
    content: 'Toggle between light and dark themes in the settings.',
    details: {
      description: 'Implementation details of our dynamic theming system. Covers automatic theme switching, custom color palettes for both light and dark modes, and best practices for maintaining visual hierarchy across themes.',
      lastUpdated: '2025-01-12',
      status: 'Completed',
      priority: 'Medium',
      assignee: 'Maya Patel',
      tags: ['theme', 'accessibility', 'user-preference']
    },
    total: 5 
  },
  { 
    id: 4, 
    title: 'Haptics', 
    content: 'Feel the satisfying haptic feedback as you interact.',
    details: {
      description: 'Deep dive into our haptic feedback system. Learn about the different types of haptic patterns we use, when to use them, and how they enhance the user experience across different devices and platforms.',
      lastUpdated: '2025-01-13',
      status: 'In Progress',
      priority: 'Low',
      assignee: 'James Wilson',
      tags: ['interaction', 'feedback', 'mobile']
    },
    total: 5 
  },
  { 
    id: 5, 
    title: 'Cross Platform', 
    content: 'Works seamlessly on iOS, Android, and Web.',
    details: {
      description: 'Technical documentation of our cross-platform architecture. Includes platform-specific considerations, shared component library, and strategies for maintaining consistency across different operating systems.',
      lastUpdated: '2025-01-11',
      status: 'Under Review',
      priority: 'High',
      assignee: 'David Kim',
      tags: ['architecture', 'mobile', 'web']
    },
    total: 5 
  },
];

export function CardsScreen() {
  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState<CardData>(initialCards[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const { showToast, showUndoToast } = useToast();
  const { styles: theme } = useTheme();

  const expandAnim = React.useRef(new Animated.Value(1)).current;

  const toggleExpand = useCallback(() => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    Animated.spring(expandAnim, {
      toValue,
      useNativeDriver: false,
      bounciness: 8,
    }).start();
  }, [isExpanded, expandAnim]);

  const cardHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['25%', '75%']
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Reset to initial state
    setCards(initialCards);
    setSelectedCard(initialCards[0]);
    showToast('Cards refreshed', 'success');
    setRefreshing(false);
  }, [showToast]);

  const handleDismiss = useCallback((direction: 'left' | 'right' | 'up') => {
    // Find the index of the selected card
    const currentIndex = cards.findIndex(card => card.id === selectedCard.id);
    const nextIndex = (currentIndex + 1) % cards.length;
    
    // Remove the current card and update selected card
    setCards(prevCards => {
      const newCards = prevCards.filter(card => card.id !== selectedCard.id);
      // If there are no cards left, don't update selection
      if (newCards.length === 0) return newCards;
      
      // Select the next card
      setSelectedCard(newCards[nextIndex % newCards.length]);
      return newCards;
    });

    const removedCard = selectedCard;
    switch (direction) {
      case 'left':
        showUndoToast('Card dismissed', () => {
          setCards(prevCards => {
            const newCards = [...prevCards];
            newCards.splice(currentIndex, 0, removedCard);
            return newCards;
          });
          setSelectedCard(removedCard);
        });
        break;
      case 'right':
        showToast('Card approved', 'success');
        break;
      case 'up':
        showToast('Card archived', 'info');
        break;
    }
  }, [cards, selectedCard, showToast, showUndoToast]);

  const handleListItemPress = useCallback((card: CardData) => {
    setSelectedCard(card);
  }, []);

  if (cards.length === 0) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.emptyContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <Text style={[styles.emptyText, { color: theme.colors.onBackground }]}>
          Pull down to refresh the cards
        </Text>
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Main Card */}
      <Animated.View style={[styles.mainCardContainer, { height: cardHeight }]}>
        <ScrollView 
          bounces={false}
          contentContainerStyle={styles.cardScrollContent}
        >
          <Card
            data={selectedCard}
            isActive={true}
            onDismiss={handleDismiss}
            style={styles.mainCard}
          />
        </ScrollView>
      </Animated.View>

      {/* Collapse Control */}
      <Pressable 
        onPress={toggleExpand}
        style={[
          styles.collapseControl,
          { 
            backgroundColor: theme.colors.surfaceVariant,
            borderTopColor: theme.colors.outlineVariant,
            borderBottomColor: theme.colors.outlineVariant,
          }
        ]}
      >
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.primary}
        />
      </Pressable>

      {/* List View */}
      <View style={styles.listOuterContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
          scrollEnabled={true}
          bounces={true}
        >
          {cards.map((card, index) => (
            <Pressable
              key={card.id}
              style={({ pressed }) => [
                styles.listItem,
                {
                  backgroundColor: card.id === selectedCard.id ? theme.colors.surfaceVariant : theme.colors.background,
                  opacity: pressed ? 0.7 : 1,
                  borderBottomColor: theme.colors.outlineVariant,
                  borderBottomWidth: index === cards.length - 1 ? 0 : 1,
                },
              ]}
              onPress={() => handleListItemPress(card)}
            >
              <View style={styles.listItemContent}>
                <Text 
                  style={[
                    styles.listItemTitle,
                    { 
                      color: theme.colors.onBackground,
                      fontWeight: card.id === selectedCard.id ? '600' : '400',
                    }
                  ]}
                  numberOfLines={1}
                >
                  {card.title}
                </Text>
                <Text 
                  style={[styles.listItemSubtitle, { color: theme.colors.onSurfaceVariant }]}
                  numberOfLines={1}
                >
                  {card.content}
                </Text>
              </View>
            </Pressable>
          ))}
          <View style={styles.listBottomPadding} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCardContainer: {
    paddingHorizontal: 12,
  },
  cardScrollContent: {
    padding: 0,
    paddingBottom: 8,
  },
  mainCard: {
    marginBottom: 0,
  },
  collapseControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 0,
  },
  listOuterContainer: {
    flex: 1,
    minHeight: 100, // Ensure minimum height for scrollability
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  listItem: {
    paddingHorizontal: 12,
  },
  listItemContent: {
    paddingVertical: 10,
  },
  listItemTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  listBottomPadding: {
    height: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 24,
  },
});
