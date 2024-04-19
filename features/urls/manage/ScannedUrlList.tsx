import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { View, StyleSheet, ViewToken } from 'react-native';
import React, { useRef } from 'react';
import { ScannedUrlListItem } from '@/features/urls/manage/ScannedUrlListItem';
import { useUrlManager } from '@/features/urls/hooks/useUrlManager';
import { useSharedValue } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';

interface ScannedUrlItemProps {
  items: ScannedUrl[];
}

export function ScannedUrlList({ items }: ScannedUrlItemProps) {
  const { urls, removeUrl } = useUrlManager();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={urls}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item }) => (
          <ScannedUrlListItem
            item={item}
            onDelete={() => removeUrl(item.id)}
            scrollRef={scrollRef}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
