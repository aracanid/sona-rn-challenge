import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { useUrlManager } from '@/features/urls/hooks/useUrlManager';
import { ScannedUrlList } from '@/features/urls/manage/ScannedUrlList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ManageUrlScreen() {
  const { urls, removeUrl } = useUrlManager();

  return (
    <View style={styles.container}>
      <ScannedUrlList items={urls} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
