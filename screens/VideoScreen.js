import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

export default function VideoScreen() {
  const route = useRoute();
  const { videoId } = route.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View className="flex-1">
      <WebView source={{ uri: videoUrl }} />
    </View>
  );
}
