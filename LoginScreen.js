
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleLogin = () => {
    navigation.replace('Quotes', { userName: name || 'Clearview' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clearview Login</Text>
      <TextInput
        placeholder="Your name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Button title="Enter" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 }
});
