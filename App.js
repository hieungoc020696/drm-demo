import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Video
        source={{
          uri:
            "https://mvvuni-aase.streaming.media.azure.net/fd1e22fe-76cd-4b75-9d8d-6efa12321c39/file_example_MP4_480_1_5MG.ism/manifest(format=m3u8-aapl,encryption=cbcs-aapl)",
        }} // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref;
        }} // Store reference
        onVideoLoad={() => {
          console.log("loi roi");
        }}
        onError={(err) => {
          console.log("loi", err);
        }}
        controls
        style={styles.backgroundVideo}
        drm={{
          type: "fairplay",
          certificateUrl: "https://api.evp.debugger.vn/fairplay",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm46bWljcm9zb2Z0OmF6dXJlOm1lZGlhc2VydmljZXM6Y29udGVudGtleWlkZW50aWZpZXIiOiJmYzUyYWYxNC04OGNhLTQ2NTctOGMwNy0yMTFmOTc5YTc5ZGYiLCJuYmYiOjE1OTkxMDEzMjgsImV4cCI6MTU5OTMxNzYyOCwiaXNzIjoiaHR0cHM6Ly9tdnZ1bmkuZWR1LnZuIiwiYXVkIjoiZWxucGx1cyJ9.-p9CSiYsuFV9S7inudgm3rKSlovnwbhIA6OMZkLgl7g",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          getLicense: (spc, contentId, licenseUrl) => {
            const formData = new FormData();
            formData.append("spc", spc);
            return fetch(licenseUrl.replace("skd", "https"), {
              method: "POST",
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm46bWljcm9zb2Z0OmF6dXJlOm1lZGlhc2VydmljZXM6Y29udGVudGtleWlkZW50aWZpZXIiOiJmYzUyYWYxNC04OGNhLTQ2NTctOGMwNy0yMTFmOTc5YTc5ZGYiLCJuYmYiOjE1OTkxMDEzMjgsImV4cCI6MTU5OTMxNzYyOCwiaXNzIjoiaHR0cHM6Ly9tdnZ1bmkuZWR1LnZuIiwiYXVkIjoiZWxucGx1cyJ9.-p9CSiYsuFV9S7inudgm3rKSlovnwbhIA6OMZkLgl7g",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData,
            })
              .then((response) => {
                return new Promise((resolve, reject) => {
                  response.blob().then((blob) => {
                    new Response(blob).text().then((text) => {
                      resolve(text.replace("<ckc>", "").replace("</ckc>", ""));
                    });
                  });
                });
              })
              .catch((error) => {
                console.error("Error", error);
              });
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
