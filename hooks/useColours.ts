import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export function useColours() {
  const colourScheme = useColorScheme();

  return Colors[colourScheme ?? 'light'];
}
