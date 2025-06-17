import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import { fetchBooking } from "../lib/api";
import tw from "../lib/tw";

export default function BookingScreen() {
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBooking,
  });

  if (isLoading) return <ActivityIndicator style={tw`mt-4`} size={"large"} />;
  if (error)
    return <Text style={tw`text-red-500`}>Error Loading Bookings</Text>;

  return (
    <View style={tw`flex-1`}>
       <FlatList
        data={data}
        keyExtractor={( item ) => item.id}
        contentContainerStyle={tw`p-3`}
        renderItem={({ item }) => {
          return (
           <View style={tw`mb-4 p-3  rounded-md border bg-white rounded-md `}>
              <Text style={tw`text-lg`}>{item.id}</Text>
              <Text style={tw`text-lg`}>{item.status}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
