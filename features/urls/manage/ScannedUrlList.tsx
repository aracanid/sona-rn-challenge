import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ScannedUrlListItem } from '@/features/urls/manage/ScannedUrlListItem';
import { useUrlManager } from '@/features/urls/hooks/useUrlManager';

interface ScannedUrlItemProps {
  items: ScannedUrl[];
}

export function ScannedUrlList({ items }: ScannedUrlItemProps) {
  const { urls, removeUrl } = useUrlManager();

  return (
    <View style={styles.container}>
      <FlatList
        data={urls}
        renderItem={({ item }) => (
          <ScannedUrlListItem item={item} onDelete={() => removeUrl(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
