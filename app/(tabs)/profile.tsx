import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { fetchProfile } from "../lib/api";
import tw from "../lib/tw";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfileScreen() {
  const { user, login, logout } = useAuthStore();
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const handleLogin = () => {
    login({
      id: data.id,
      name: data.name,
      email: data.email,
    });
  };

  if (isLoading) return <ActivityIndicator style={tw`mt-4`} size={"large"} />;
  if (error)
    return <Text style={tw`text-red-500`}>Error Loading Userdata</Text>;

  return (
    <View style={tw`flex-1 bg-white p-10 items-center`}>
      {user ? (
        <>
          <Text style={tw`text-xl`}>{data.name}</Text>
          <Text style={tw`text-lg`}>{data.email}</Text>
          <Button title={"Logout"} onPress={logout} />
        </>
      ) : (
        <Button title={"Login"} onPress={handleLogin} />
      )}
    </View>
  );
}
