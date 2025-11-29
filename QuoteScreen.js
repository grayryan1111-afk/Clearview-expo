
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { createTextQuote } from '../api/openai';

export default function QuoteScreen({ navigation, route }) {
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const userName = route.params?.userName || 'Clearview';

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const prompt = `
You are helping a window cleaning company create a quote.
Address: ${address}
Job details: ${details}
Use these base rules:
- Windows: 5-10$ each depending on size
- Gutter minimum: 150$
- Pressure washing: 100-150$/hr
- House washing: 50-75$/hr
- Rope access: 50$/hr
Return a short, clear quote breakdown and total.`;
      const output = await createTextQuote(prompt);
      setResult(output);
    } catch (e) {
      setResult('Error generating quote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome, {userName}</Text>
      <TextInput
        placeholder="Job address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Job details (floors, windows, extras...)"
        style={[styles.input, { height: 100 }]}
        value={details}
        onChangeText={setDetails}
        multiline
      />
      <Button title={loading ? "Creating quote..." : "Generate Quote"} onPress={handleGenerate} disabled={loading} />
      <View style={{ height: 10 }} />
      <Button title="Open Map" onPress={() => navigation.navigate('Map', { address })} />
      <View style={{ height: 10 }} />
      <Button title="Photo Tools" onPress={() => navigation.navigate('Photos', { address })} />
      {result ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Quote</Text>
          <Text>{result}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  resultBox: { marginTop: 20, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fafafa' },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 }
});
