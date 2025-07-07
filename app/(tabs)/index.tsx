import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const exploreData = {
  title: "Discover Top Picks",
  count: "+100",
  subtitle: "lessons",
  button: "Explore more",
  image: require("./../../assets/images/exploreimg.png"),
};

const initialPopularLessons = [
  {
    title: "Figma master class",
    subtitle: "UI Design (28 lessons)",
    time: "6h 30min",
    rating: "4.9",
    image: require("./../../assets/images/figma-masterclass.png"),
    liked: false,
  },
  {
    title: "Web design class",
    subtitle: "UX Design (26 lessons)",
    time: "8h 30min",
    rating: "4.7",
    image: require("./../../assets/images/web-design-class.png"),
    liked: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [lessons, setLessons] = useState(initialPopularLessons);

  const toggleLike = (index) => {
    const updated = [...lessons];
    updated[index].liked = !updated[index].liked;
    setLessons(updated);
  };

  return (
    <View className="flex-1 bg-gray-50 px-4">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Greeting + Icon */}
        <View className="flex-row justify-between items-center mt-6">
          <View>
            <Text className="text-2xl font-bold">Hi, Jerel</Text>
            <Text className="text-[15px] text-gray-500">
              Find your lessons today!
            </Text>
          </View>
          <TouchableOpacity className="p-2 bg-white rounded-xl">
            <Icon
              name="notifications-outline"
              size={24}
              color="#333"
              className="bg-white rounded-xl size-10 text-center p-1"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center mt-4 mb-4">
          {/* Search Input */}
          <Pressable onPress={() => router.push("/search")} className="flex-1">
            <View className="flex-row items-center bg-white px-4 py-2 rounded-xl">
              <Icon name="search" size={20} color="#888" />
              <TextInput
                placeholder="Search now..."
                className="ml-2 flex-1 text-base text-black"
                placeholderTextColor="#888"
                editable={false}
                pointerEvents="none"
              />
            </View>
          </Pressable>

          <View className="w-3" />

          {/* Options Button */}
          <TouchableOpacity className="bg-[#4285F4] rounded-xl p-2 size-14">
            <Icon name="options-outline" size={34} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Explore Card */}
        <View className="bg-blue-100 px-4 rounded-2xl mt-5 flex-row justify-between items-center">
          {/* Left: Text */}
          <View className="flex-1 pr-2">
            <Text className="text-base font-semibold text-blue-900">
              {exploreData.title}
            </Text>
            <Text className="text-2xl font-bold text-blue-900">
              {exploreData.count}{" "}
              <Text className="text-base font-medium">
                {exploreData.subtitle}
              </Text>
            </Text>
            <TouchableOpacity className="bg-blue-500 mt-2 px-4 py-2 rounded-xl self-start">
              <Text className="text-white font-medium">
                {exploreData.button}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Right: Image */}
          <Image
            source={exploreData.image}
            alt="lessons-banner"
            className=""
            resizeMode="contain"
          />
        </View>

        {/* Popular Lessons Section */}
        <View className="flex-row justify-between items-center mt-6 mb-4">
          <Text className="text-base font-semibold">Popular lessons</Text>
          <Text className="text-sm text-blue-600">See All</Text>
        </View>

        {/* Horizontal Lesson Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {lessons.map((lesson, index) => (
            <Pressable
              key={index}
              onPress={() => router.push(`/course/${index}`)}
            >
              <View className="bg-white mr-4 p-2 rounded-2xl shadow w-56 relative">
                {/* Like Icon */}
                <TouchableOpacity
                  className="absolute right-3 top-3 z-10 bg-white p-1 rounded-full shadow"
                  onPress={() => toggleLike(index)}
                >
                  <Icon
                    name={lesson.liked ? "heart" : "heart-outline"}
                    size={18}
                    color={lesson.liked ? "red" : "#888"}
                  />
                </TouchableOpacity>

                {/* Lesson Image */}
                <Image
                  source={lesson.image}
                  className="w-full h-28 rounded-xl"
                  resizeMode="cover"
                />

                {/* Lesson Info */}
                <Text className="mt-2 font-semibold text-sm">
                  {lesson.title}
                </Text>
                <Text className="text-gray-500 text-xs mb-4">
                  {lesson.subtitle}
                </Text>

                {/* Time & Rating */}
                <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center bg-blue-100 rounded-xl px-2 py-1">
                    <Icon name="time-outline" size={14} color="#4285F4" />
                    <Text className="ml-1 text-xs text-[#4285F4]">
                      {lesson.time}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Icon name="star" size={14} color="#FDBA12" />
                    <Text className="ml-1 text-xs text-gray-600">
                      {lesson.rating}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
