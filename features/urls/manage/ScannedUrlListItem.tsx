import ScannedUrl from '@/features/urls/types/ScannedUrl';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface ScannedUrlItemProps {
  item: ScannedUrl;
}

export function ScannedUrlListItem({ item }: ScannedUrlItemProps) {
  function handleOnPress() {
    WebBrowser.openBrowserAsync(item.url);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>{item.url}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});
