import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, Pressable } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BlurView } from 'expo-blur';

// [AI-FREEZE]
type Pattern = 'masonry' | 'cowbell' | 'cardswipe' | 'infinitescroll';

// [AI-MUTABLE]
const patterns: { label: string; value: Pattern }[] = [
  { label: 'Masonry Grid', value: 'masonry' },
  { label: 'Party Mode', value: 'cowbell' },
  { label: 'Card Swipe', value: 'cardswipe' },
  { label: 'Infinite Scroll', value: 'infinitescroll' },
];

// MD3 state layer opacities
const stateLayer = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  selected: 0.08,
  dragged: 0.16,
};

export const Header: React.FC<{
  selectedPattern: Pattern;
  onPatternChange: (pattern: Pattern) => void;
}> = ({ selectedPattern, onPatternChange }) => {
  const { theme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = React.useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? 0 : 1;
    setIsDrawerOpen(!isDrawerOpen);
    Animated.spring(drawerAnimation, {
      toValue,
      useNativeDriver: true,
      damping: 20,
      mass: 0.8,
      stiffness: 150,
    }).start();
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-360, 0], // Changed from [300, 0] to match left side and drawer width
  });

  const overlayOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5], // MD3 scrim opacity
  });

  return (
    <>
      {/* Top App Bar */}
      <View style={[styles.headerContainer, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.headerContent}>
          {/* Hamburger Menu Button - MD3 spec */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleDrawer}
            accessibilityLabel="Open menu"
            accessibilityRole="button"
            accessibilityState={{ expanded: isDrawerOpen }}
          >
            <Menu 
              size={24} 
              color={theme.colors.onSurface}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            Pattern Bridge
          </Text>
        </View>
      </View>

      {/* Scrim Overlay */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.drawerOverlay,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // MD3 scrim color
            opacity: overlayOpacity,
            zIndex: 1000,
            display: isDrawerOpen ? 'flex' : 'none',
          },
        ]}
        pointerEvents={isDrawerOpen ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={toggleDrawer} />
      </Animated.View>

      {/* Navigation Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerTranslateX }],
            backgroundColor: theme.colors.surface,
            zIndex: 1001,
          },
        ]}
        pointerEvents={isDrawerOpen ? 'auto' : 'none'}
      >
        {/* Drawer Header */}
        <View style={[styles.drawerHeader, { borderBottomColor: 'rgba(0, 0, 0, 0.12)' }]}>
          <Text style={[styles.drawerTitle, { color: theme.colors.onSurface }]}>
            Patterns
          </Text>
        </View>

        {/* Drawer Items */}
        {patterns.map((pattern) => {
          const isSelected = pattern.value === selectedPattern;
          return (
            <TouchableOpacity
              key={pattern.value}
              disabled={isSelected}
              style={[
                styles.drawerItem,
                isSelected && {
                  backgroundColor: `rgba(0, 0, 0, ${stateLayer.selected})`,
                },
              ]}
              onPress={() => {
                onPatternChange(pattern.value);
                toggleDrawer();
              }}
              accessibilityRole="menuitem"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.drawerItemText,
                  {
                    color: theme.colors.onSurface,
                    opacity: isSelected ? 0.38 : 1, // MD3 disabled state
                  },
                ]}
              >
                {pattern.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: Platform.select({ ios: 44, android: 56 }), // MD3 heights
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)', // MD3 border opacity
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4, // MD3 spacing
  },
  title: {
    fontSize: 22, // MD3 title large
    fontWeight: '400',
    marginLeft: 24, // MD3 spacing
  },
  menuButton: {
    width: 48, // MD3 touch target
    height: 48, // MD3 touch target
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4, // MD3 spacing
  },
  menuIcon: {
    opacity: 0.87, // MD3 icon opacity
  },
  drawerOverlay: {
    backgroundColor: '#000',
  },
  drawer: {
    position: 'absolute',
    top: Platform.select({ ios: 44, android: 56 }), // Match header height
    left: 0, // Changed from right: 0
    width: 360,
    bottom: 0, // Use bottom: 0 instead of fixed height
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 }, // Changed from -2 to 2 for left side
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  drawerHeader: {
    height: Platform.select({ ios: 44, android: 56 }), // MD3 heights
    justifyContent: 'center',
    paddingHorizontal: 16, // MD3 spacing
    borderBottomWidth: 1,
  },
  drawerTitle: {
    fontSize: 16, // MD3 title medium
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  drawerItem: {
    height: 56, // MD3 list item height
    justifyContent: 'center',
    paddingHorizontal: 24, // MD3 spacing
  },
  drawerItemText: {
    fontSize: 14, // MD3 body large
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
