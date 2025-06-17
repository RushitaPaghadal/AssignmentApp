import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "../lib/tw";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties, Property } from "../lib/api";
import { useState } from "react";
import { router } from "expo-router";

export default function HomeScreen() {
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const [search, setSearch] = useState("");

  const filtered = data?.filter((property: { title: string; }) =>
    property.title.toLowerCase().includes(search)
  );

  const handlePress = (item : Property[]) => {
    router.push({
      pathname:'../property',
      params: {data : JSON.stringify(item)}
    })
  }

  if (isLoading) return <ActivityIndicator style={tw`mt-4`} size={"large"} />;
  if (error)
    return <Text style={tw`text-red-500`}>Error Loading Properties</Text>;

  return (
    <View style={tw`flex-1 p-4`}>
      <TextInput
        placeholder="Enter something..."
        value={search}
        onChangeText={setSearch}
        style={tw`border border-gray-300 rounded-md p-3 text-base bg-white`}
        placeholderTextColor="#888"
      />
      <FlatList
        data={filtered}
        keyExtractor={( item ) => item.id}
        contentContainerStyle={tw`p-3`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={tw`mb-4 p-3 bg-white rounded-md`} onPress={() => handlePress(item)}>
              <Text style={tw`text-lg`}>{item.title}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
