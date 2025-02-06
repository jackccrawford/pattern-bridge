import React, { useState } from 'react';
import { StyleSheet, View, Platform, Modal, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Text } from './Text';

// [AI-FREEZE] Pattern type definition - core app pattern types should remain stable
type Pattern = 'masonry' | 'cowbell' | 'cardswipe' | 'infinitescroll';

// [AI-FREEZE] Component interface - maintains consistent prop structure
interface HeaderProps {
  selectedPattern: Pattern;
  onPatternChange: (pattern: Pattern) => void;
}

// [AI-MUTABLE] Pattern options may change as new patterns are added
const patterns = [
  { label: 'Masonry Grid', value: 'masonry' },
  { label: 'Party Mode', value: 'cowbell' },
  { label: 'Card Swipe', value: 'cardswipe' },
  { label: 'Infinite Scroll', value: 'infinitescroll' },
];

export const Header: React.FC<HeaderProps> = ({ selectedPattern, onPatternChange }) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  // [AI-MUTABLE] Pattern label mapping may change with UI updates
  const selectedLabel = patterns.find(p => p.value === selectedPattern)?.label || '';

  return (
    <>
      {/* [AI-FREEZE] Header container structure - follows MD3 header pattern */}
      <View style={[styles.headerContainer, { backgroundColor: '#eee' }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Pattern Bridge</Text>
          <TouchableOpacity
            style={[styles.selectorButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.selectedText, { color: theme.colors.text }]}>{selectedLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* [AI-FREEZE] Modal implementation - follows MD3 bottom sheet pattern */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable 
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          />
          <View style={[
            styles.modalContent,
            { backgroundColor: theme.colors.surface }
          ]}>
            <View style={styles.modalHeader} />
            {/* [AI-MUTABLE] Pattern option rendering - content may change */}
            {patterns
              .filter(pattern => pattern.value !== selectedPattern)
              .map((pattern) => (
                <TouchableOpacity
                  key={pattern.value}
                  style={styles.patternOption}
                  onPress={() => {
                    onPatternChange(pattern.value);
                    setModalVisible(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.patternText,
                      { color: theme.colors.onSurface }
                    ]}
                  >
                    {pattern.label}
                  </Text>
                </TouchableOpacity>
              ))}
            <View style={styles.modalFooter} />
          </View>
        </View>
      </Modal>
    </>
  );
};

// [AI-FREEZE] Style definitions - follows MD3 specifications and React Native best practices
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    height: Platform.select({ ios: 44, android: 56 }),
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 0,
  },
  selectorButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    position: 'relative',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    position: 'absolute',
    bottom: Platform.select({ ios: 49, android: 56 }), // Height of bottom tab bar
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  modalHeader: {
    height: 24,
  },
  modalFooter: {
    height: 16,
  },
  patternOption: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 48,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  patternText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
});
