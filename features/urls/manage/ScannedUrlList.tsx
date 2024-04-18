import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ScannedUrlListItem } from '@/features/urls/manage/ScannedUrlListItem';

interface ScannedUrlItemProps {
  items: ScannedUrl[];
}

export function ScannedUrlList({ items }: ScannedUrlItemProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ScannedUrlListItem item={item} />}
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
