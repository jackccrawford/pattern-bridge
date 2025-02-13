import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, Pressable, Dimensions, LayoutChangeEvent } from 'react-native';
import { Menu, ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// [AI-FREEZE]
type Pattern = 'masonry' | 'cowbell' | 'cardswipe' | 'infinitescroll';

// [AI-MUTABLE]
const patterns: { label: string; value: Pattern }[] = [
  {
    label: 'Infinite Scroll',
    value: 'infinitescroll',
  },
  {
    label: 'Masonry Grid',
    value: 'masonry',
  },
  {
    label: 'Card Swipe',
    value: 'cardswipe',
  },
  {
    label: 'More Cowbell',
    value: 'cowbell',
  },
];

// MD3 state layer opacities
const stateLayer = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  selected: 0.08,
  dragged: 0.16,
};

interface HeaderProps {
  selectedPattern: Pattern;
  onPatternChange: (pattern: Pattern) => void;
  onHeaderLayout?: (height: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedPattern,
  onPatternChange,
  onHeaderLayout
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = React.useRef(new Animated.Value(0)).current;
  const headerHeight = Platform.select({ ios: 44, android: 56 }) ?? 56;

  const screenWidth = Dimensions.get('window').width;
  const DRAWER_WIDTH = Math.min(screenWidth * 0.5, 280);

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
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const overlayOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const handleHeaderLayout = (event: LayoutChangeEvent) => {
    console.log('Header layout:', {
      height: event.nativeEvent.layout.height,
      headerHeight,
      insetTop: insets.top,
      totalExpected: headerHeight + insets.top
    });
    onHeaderLayout?.(event.nativeEvent.layout.height);
  };

  return (
    <>
      {isDrawerOpen && (
        <>
          <Animated.View
            style={[
              styles.drawerOverlay,
              {
                opacity: overlayOpacity,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 200,
                top: insets.top + headerHeight,
              },
            ]}
            pointerEvents={isDrawerOpen ? 'auto' : 'none'}
          >
            <Pressable style={StyleSheet.absoluteFill} onPress={toggleDrawer} />
          </Animated.View>

          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: drawerTranslateX }],
                backgroundColor: theme.colors.surface,
                width: DRAWER_WIDTH,
                top: insets.top + headerHeight,
              },
            ]}
            pointerEvents={isDrawerOpen ? 'auto' : 'none'}
          >
            <View style={[styles.drawerHeader, { borderBottomColor: 'rgba(0, 0, 0, 0.12)' }]}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={toggleDrawer}
                accessibilityLabel="Close menu"
                accessibilityRole="button"
              >
                <ChevronLeft size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
              <Text style={[styles.drawerTitle, { color: theme.colors.onSurface }]}>
                Patterns
              </Text>
            </View>

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
                        opacity: isSelected ? 0.38 : 1,
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
      )}

      {/* [AI-FREEZE] Header positioning and layout structure */}
      <View
        style={[
          styles.headerContainer,
          {
            top: insets.top,
            backgroundColor: theme.colors.surface,
          },
        ]}
        onLayout={handleHeaderLayout}
      >
        <View
          style={[
            styles.headerContent,
            {
              backgroundColor: theme.colors.surface,
              borderBottomColor: theme.colors.border,
            },
          ]}
        >
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
    </>
  );
};

const styles = StyleSheet.create({
  // [AI-FREEZE] Critical positioning styles for header
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.select({ ios: 44, android: 56 }),
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    marginLeft: 24,
  },
  menuButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  menuIcon: {
    opacity: 0.87,
  },
  drawerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 300,
  },
  drawerHeader: {
    height: Platform.select({ ios: 44, android: 56 }),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: -12,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  drawerItem: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  drawerItemText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
