import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import React, { useRef } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// Initialize Supabase Cloud Infrastructure
const supabaseUrl = 'https://wnfpxozpeucrwqmrqpzv.supabase.co';
const supabaseKey = 'sb_publishable_g6JfCH6FefIwEmXztgkdTw_Md1z4se5';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default function RootLayout() {
  const webViewRef = useRef(null);

  // Native Bridge: Listens for postMessage events from q-core.js
  const handleMessage = async (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      
      if (msg.action === 'SECURE_STORE_SET') {
        console.log(`[NATIVE BRIDGE] Syncing ${msg.key} to cloud...`);
        // Supabase UPSERT logic will be mapped here
      }
      
      if (msg.action === 'HAPTIC_PULSE') {
        // Haptic feedback execution will drop here
      }
    } catch (error) {
      console.error('[NATIVE BRIDGE ERROR]:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://thequadrature.app/personal/index.html' }}
          style={styles.webview}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          bounces={false}
          overScrollMode="never"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  webview: { flex: 1, backgroundColor: '#000' }
});