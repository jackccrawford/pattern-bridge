import React from 'react';
import { StyleSheet, Text, Platform, View, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { PanGestureHandler, State, PanGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

interface CardProps {
  data: {
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
  };
  isActive?: boolean;
  style?: any;
  onDismiss?: (direction: 'left' | 'right' | 'up') => void;
}

const SWIPE_THRESHOLD = 100;

export function Card({ data, isActive = false, style, onDismiss }: CardProps) {
  const { styles: theme } = useTheme();
  const translateX = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(0)).current;

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 8,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 8,
      }),
    ]).start();
  };

  const handleStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      const x = event.nativeEvent.translationX;
      const y = event.nativeEvent.translationY;

      if (Math.abs(x) > SWIPE_THRESHOLD) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const direction = x > 0 ? 'right' : 'left';
        
        Animated.timing(translateX, {
          toValue: x * 2,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onDismiss?.(direction);
          resetPosition();
        });
      } else if (y < -SWIPE_THRESHOLD) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        
        Animated.timing(translateY, {
          toValue: -500,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onDismiss?.('up');
          resetPosition();
        });
      } else {
        resetPosition();
      }
    }
  };

  const getPriorityColor = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'High':
        return theme.colors.error;
      case 'Medium':
        return theme.colors.tertiary;
      case 'Low':
        return theme.colors.secondary;
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleStateChange}
      enabled={isActive}
    >
      <Animated.View
        style={[
          styles.container,
          style,
          {
            transform: [
              { translateX },
              { translateY },
            ],
          },
        ]}
      >
        <View style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
          <Text style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>
            {data.title}
          </Text>
          <Text style={[styles.content, { color: theme.colors.onPrimaryContainer }]}>
            {data.content}
          </Text>
          
          {data.details && (
            <View style={styles.details}>
              <Text style={[styles.description, { color: theme.colors.onPrimaryContainer }]}>
                {data.details.description}
              </Text>
              
              <View style={styles.metadata}>
                <View style={styles.metadataRow}>
                  <Text style={[styles.label, { color: theme.colors.onPrimaryContainer }]}>
                    Status:
                  </Text>
                  <Text style={[styles.value, { color: theme.colors.onPrimaryContainer }]}>
                    {data.details.status}
                  </Text>
                </View>
                
                <View style={styles.metadataRow}>
                  <Text style={[styles.label, { color: theme.colors.onPrimaryContainer }]}>
                    Priority:
                  </Text>
                  <View style={[styles.priority, { backgroundColor: getPriorityColor(data.details.priority) }]}>
                    <Text style={[styles.priorityText, { color: theme.colors.onPrimary }]}>
                      {data.details.priority}
                    </Text>
                  </View>
                </View>

                {data.details.assignee && (
                  <View style={styles.metadataRow}>
                    <Text style={[styles.label, { color: theme.colors.onPrimaryContainer }]}>
                      Assignee:
                    </Text>
                    <Text style={[styles.value, { color: theme.colors.onPrimaryContainer }]}>
                      {data.details.assignee}
                    </Text>
                  </View>
                )}

                <View style={styles.metadataRow}>
                  <Text style={[styles.label, { color: theme.colors.onPrimaryContainer }]}>
                    Updated:
                  </Text>
                  <Text style={[styles.value, { color: theme.colors.onPrimaryContainer }]}>
                    {data.details.lastUpdated}
                  </Text>
                </View>
              </View>

              {data.details.tags && (
                <View style={styles.tags}>
                  {data.details.tags.map((tag, index) => (
                    <View 
                      key={index}
                      style={[styles.tag, { backgroundColor: theme.colors.secondaryContainer }]}
                    >
                      <Text style={[styles.tagText, { color: theme.colors.onSecondaryContainer }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.15,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  metadata: {
    marginBottom: 12,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    width: 70,
  },
  value: {
    fontSize: 13,
    flex: 1,
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
