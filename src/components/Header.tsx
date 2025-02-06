import React, { useState } from 'react';
import { StyleSheet, View, Platform, Modal, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Text } from './Text';
import { Menu } from 'lucide-react-native';

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
            style={[styles.menuButton]}
            onPress={() => setModalVisible(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Menu 
              size={24} 
              color={theme.colors.text}
              style={styles.menuIcon}
            />
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
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {selectedLabel}
              </Text>
            </View>
            {/* [AI-MUTABLE] Pattern option rendering - content may change */}
            {patterns
              .filter(pattern => pattern.value !== selectedPattern)
              .map((pattern) => (
                <TouchableOpacity
                  key={pattern.value}
                  style={[styles.patternOption, { minHeight: 48 }]}
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
    fontSize: 20,
    fontWeight: '500',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.select({ ios: 34, android: 24 }),
  },
  modalHeader: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  patternOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  patternText: {
    fontSize: 16,
  },
  modalFooter: {
    height: 8,
  },
});
