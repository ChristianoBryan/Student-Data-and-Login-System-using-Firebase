import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="tampilanLogin"
        options={{ title: "Login" }}
      />
      <Tabs.Screen
        name="mahasiswaList"
        options={{ title: "Mahasiswa" }}
      />
    </Tabs>
  );
}
