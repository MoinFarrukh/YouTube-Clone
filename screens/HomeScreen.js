import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import YouTubeLogo from "../assets/youtube.png"; // Ensure the correct path
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const YOUTUBE_API_KEY = "anfiheiohfqjb34o13h24oihbajsdkfwerf"; // Replace with your actual API key

export default function HomeScreen() {
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=React%20Native&type=video&maxResults=100&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(
            data.items.map((item) => ({
              id: item.id?.videoId || item.id.kind,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high.url,
              channelTitle: item.snippet.channelTitle,
              url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
            }))
          );
        } else {
          console.error("YouTube API Error:", data);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <StyledView className="flex-1 bg-white mt-9">
      {/* ✅ Top Navigation with YouTube Logo & Name */}
      <StyledView className="flex-row justify-between items-center px-4 py-3 border-b border-gray-300 bg-white">
        <StyledView className="flex-row items-center">
          <StyledImage source={YouTubeLogo} className="w-24 h-10 -ml-8" resizeMode="contain" />
          <StyledText className="text-xl font-bold text-black -ml-6">YouTube</StyledText>
        </StyledView>

        <StyledView className="flex-row space-x-4">
          <Ionicons name="search" size={24} color="black" />
          <MaterialIcons name="notifications-none" size={24} color="black" />
          <Ionicons name="person-circle-outline" size={24} color="black" />
        </StyledView>
      </StyledView>

      {/* ✅ Video List */}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="mb-4" onPress={() => navigation.navigate("Video", { video: item })}>
            <StyledImage source={{ uri: item.thumbnail }} className="w-full h-48" />
            <StyledView className="flex-row p-2">
              <Ionicons name="person-circle-outline" size={40} color="gray" />
              <StyledView className="ml-2 flex-1">
                <StyledText className="text-lg font-bold">{item.title}</StyledText>
                <StyledText className="text-gray-500 text-sm">
                  {item.channelTitle} • 1.2M views • 3 days ago
                </StyledText>
              </StyledView>
            </StyledView>
          </TouchableOpacity>
        )}
      />

      {/* ✅ Bottom Navigation */}
      <StyledView className="flex-row justify-around py-3 border-t border-gray-300 bg-white">
        <StyledView className="items-center">
          <MaterialIcons name="home" size={24} color="black" />
          <StyledText className="text-xs text-black">Home</StyledText>
        </StyledView>
        <StyledView className="items-center">
          <MaterialIcons name="video-library" size={24} color="gray" />
          <StyledText className="text-xs text-gray-500">Shorts</StyledText>
        </StyledView>
        <StyledView className="items-center">
          <MaterialIcons name="subscriptions" size={24} color="gray" />
          <StyledText className="text-xs text-gray-500">Subscriptions</StyledText>
        </StyledView>
        <StyledView className="items-center">
          <Ionicons name="person-outline" size={24} color="gray" />
          <StyledText className="text-xs text-gray-500">Profile</StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}
