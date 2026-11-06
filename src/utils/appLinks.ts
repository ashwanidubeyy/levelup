import { Linking } from 'react-native';

export const openShortcut = (app: string, web: string): Promise<unknown> =>
  Linking.openURL(app).catch(() => Linking.openURL(web));
