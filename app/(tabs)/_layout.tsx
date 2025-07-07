import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Icon from "react-native-vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import { StatusBar } from "expo-status-bar";
export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4285F4",
        tabBarInactiveTintColor: "#C0C0C0",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
          },
          android: {
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#fff",
            elevation: 8,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
            <StatusBar style="auto" />
      
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} className="mt-2" />
          ),
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: "Education",
          tabBarIcon: ({ color }) => (
            <Icon name="school" size={24} color={color} className="mt-2" />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "Docs",
          tabBarIcon: ({ color }) => (
            <Icon
              name="document-text"
              size={24}
              color={color}
              className="mt-2"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={24} color={color} className="mt-2" />
          ),
        }}
      />
    </Tabs>
  );
}
