import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from './Skeleton';

interface SkeletonContentProps {
  type?: 'list' | 'card' | 'profile';
  repetitions?: number;
}

export function SkeletonContent({ type = 'list', repetitions = 1 }: SkeletonContentProps) {
  const renderContent = () => {
    switch (type) {
      case 'card':
        return (
          <View style={styles.card}>
            <Skeleton width={200} height={200} style={{ marginBottom: 8 }} />
            <View style={styles.cardContent}>
              <Skeleton width={200} height={24} style={{ marginBottom: 8 }} />
              <Skeleton width="100%" height={16} />
              <Skeleton width="60%" height={16} />
            </View>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.profile}>
            <Skeleton width={80} height={80} borderRadius={40} style={{ marginRight: 16, marginBottom: 8 }} />
            <View style={styles.profileContent}>
              <Skeleton width={150} height={24} style={{ marginBottom: 8 }} />
              <Skeleton width={100} height={16} />
              <Skeleton width="80%" height={16} />
            </View>
          </View>
        );
      case 'list':
      default:
        return (
          <View style={styles.listItem}>
            <Skeleton width={40} height={40} borderRadius={20} style={{ marginRight: 12, marginBottom: 8 }} />
            <View style={styles.listContent}>
              <Skeleton width="80%" height={20} style={{ marginBottom: 8 }} />
              <Skeleton width="60%" height={16} />
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(repetitions)].map((_, index) => (
        <View key={index} style={index > 0 ? styles.repeatedItem : undefined}>
          {renderContent()}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  repeatedItem: {
    marginTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContent: {
    flex: 1,
    marginLeft: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
});
