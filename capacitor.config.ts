
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sewasetu.app',
  appName: 'SewaSetu',
  webDir: 'dist',
  server: {
    url: 'https://aedf1c59-d95d-4c66-b20d-3ff041074c26.lovableproject.com?forceHideBadge=true',
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
