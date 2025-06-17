import { useLocalSearchParams } from "expo-router";
import React, { useActionState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import tw from "../lib/tw";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import { useMutation } from "@tanstack/react-query";
import { bookProperty } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";

export default function PropertyDetails() {
  const { user } = useAuthStore();
  const { data } = useLocalSearchParams();
  const property = JSON.parse(data as string);

  const features = property.features;
  const location = property.location;

  const mutation = useMutation({
    mutationFn: bookProperty,
    onSuccess: () => Alert.alert("Success", "Property booked Successfully"),
    onError: () => Alert.alert("Error", "Failed to book Property"),
  });

  const handleBooking = () => {
    if (!user) return Alert.alert("Error", "You must have to be Login");
    if (data) {
      mutation.mutate({
        propertyId: property.id,
        userId: user?.id,
        checkIn: "",
        checkOut: "",
        status: "pending",
      });
    }
  };

  return (
    <View style={tw`flex-1 m-3`}>
      <StatusBar hidden />
      <MapView
        style={tw`h-100`}
        initialRegion={{
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={location.coordinates}
          description={location.address}
        />
      </MapView>

      <Text style={tw`text-xl font-semibold mb-2`}>{property.title}</Text>
      {/* Features */}
      <View style={tw`px-4 pb-6`}>
        <Text style={tw`text-xl font-semibold mb-2`}>Features</Text>
        <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={tw`text-base text-gray-700 mb-1`}>• {item}</Text>
          )}
        />
      </View>
      <Button title="Book Property" onPress={handleBooking} />
    </View>
  );
}
