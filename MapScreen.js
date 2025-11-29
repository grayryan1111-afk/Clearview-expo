
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '../config';

export default function MapScreen({ route }) {
  const [address, setAddress] = useState(route.params?.address || '');
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(false);

  const geocode = async () => {
    if (!address) return;
    try {
      setLoading(true);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const loc = data.results[0].geometry.location;
        const reg = {
          latitude: loc.lat,
          longitude: loc.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        };
        setRegion(reg);
      }
    } catch (e) {
      console.warn('Geocode error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) geocode();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Find on Map" onPress={geocode} />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {region ? (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} title={address} />
        </MapView>
      ) : (
        <View style={styles.placeholder}>
          <Text>Enter an address to view it on the map.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  map: { flex: 1, marginTop: 10 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
