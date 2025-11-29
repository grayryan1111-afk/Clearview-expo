
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PhotoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        In the next version we can add camera / gallery upload
        and send images to the backend /api/openai/vision to
        count windows or analyze buildings.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  text: { fontSize: 16, textAlign: 'center' }
});
