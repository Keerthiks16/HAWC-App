export const options = {
  headerShown: false,
};

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import YoutubePlayer from "react-native-youtube-iframe";

const courses = [
  {
    title: "Figma master class for beginners",
    time: "6h 30min",
    lessonsCount: 28,
    rating: "4.9",
    price: "$399",
    image: require("./../../assets/images/figma-masterclass.png"),
    youtubeVideoId: "31wzhvz0vsw",
    description:
      "This beginner-friendly Figma course introduces core UI/UX principles, essential Figma tools, prototyping, and collaboration techniques. By the end, you'll be confident in designing and presenting your own professional web/mobile UI designs.",
    lessons: [
      { title: "Introduction to figma", time: "04:28 min" },
      { title: "Understanding Interface", time: "06:12 min" },
      { title: "Create first design project", time: "43:58 min" },
      { title: "Prototyping the design", time: "25:10 min", disabled: true },
    ],
  },
  {
    title: "Web design basics",
    time: "8h 30min",
    lessonsCount: 26,
    rating: "4.7",
    price: "$299",
    image: require("./../../assets/images/web-design-class.png"),
    youtubeVideoId: "rHux0gMZ3Eg", 
    description:
      "Learn the fundamentals of web design including layout, typography, and responsive styling. This course is perfect for aspiring front-end developers and UI designers.",
    lessons: [
      { title: "Web intro", time: "08:00 min" },
      { title: "HTML/CSS Basics", time: "15:10 min" },
      { title: "Responsive Layout", time: "28:00 min" },
      { title: "Final Project", time: "30:45 min", disabled: true },
    ],
  },
];

export default function CourseDetails() {
  const { courseId } = useLocalSearchParams();
  const router = useRouter();
  const course = courses[courseId] ?? courses[0];

  const [activeTab, setActiveTab] = useState("Lessons");
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef(null);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-gray-50 px-4"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            name="chevron-back"
            size={28}
            color="#333"
            className="bg-white rounded-xl size-12 text-center p-2"
          />
        </TouchableOpacity>
        <Text className="text-base font-semibold">Course Overview</Text>
        <TouchableOpacity>
          <Icon
            name="heart-outline"
            size={28}
            color="#333"
            className="bg-white rounded-xl size-12 text-center p-2"
          />
        </TouchableOpacity>
      </View>

      {/* Video or Thumbnail */}
      <View className="rounded-2xl overflow-hidden h-52 w-full relative mt-6 mb-2">
        {showVideo ? (
          <YoutubePlayer
            ref={playerRef}
            height={210}
            width={"100%"}
            videoId={course.youtubeVideoId}
            play={true}
          />
        ) : (
          <>
            <Image
              source={course.image}
              className="size-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => setShowVideo(true)}
              className="absolute inset-0 justify-center items-center flex"
            >
              <View className="bg-white rounded-full p-3 opacity-80">
                <Icon name="play" size={24} color="#4285F4" />
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Info */}
      <Text className="mt-2 text-base font-semibold">{course.title}</Text>
      <View className="flex-row items-center mt-1">
        <Icon name="time-outline" size={14} color="gray" />
        <Text className="ml-1 text-xs text-gray-500">{course.time}</Text>
        <Text className="mx-2 text-xs text-gray-500">•</Text>
        <Text className="text-xs text-gray-500">
          {course.lessonsCount} lessons
        </Text>
        <View className="flex-row items-center ml-auto bg-blue-100 px-2 py-1 rounded-full">
          <Icon name="star" size={14} color="#FDBA12" />
          <Text className="ml-1 text-xs text-gray-600">{course.rating}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row mt-6 mb-2 items-center justify-center">
        <Pressable
          onPress={() => setActiveTab("Lessons")}
          className={`pb-2 mr-6 ${activeTab === "Lessons" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${activeTab === "Lessons" ? "text-blue-600 font-semibold" : "text-gray-400"}`}
          >
            Lessons
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("Description")}
          className={`pb-2 ${activeTab === "Description" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${activeTab === "Description" ? "text-blue-600 font-semibold" : "text-gray-400"}`}
          >
            Description
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      {activeTab === "Lessons" ? (
        <View className="relative mt-2">
          {course.lessons.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between px-3 py-3 rounded-xl h-16"
            >
              {/* Left */}
              <View className="flex-row items-center space-x-3">
                <View
                  className={`p-2 mr-3 rounded-full border ${
                    index === 0
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <Icon
                    name="play"
                    size={14}
                    color={index === 0 ? "white" : "#4285F4"}
                  />
                </View>
                <View>
                  <Text
                    className={`text-sm font-medium ${item.disabled ? "text-gray-400" : "text-black"}`}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-xs text-gray-400">{item.time}</Text>
                </View>
              </View>

              {/* Arrow */}
              <Icon name="chevron-forward" size={18} color="#4285F4" />
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-sm text-gray-700 mt-2 leading-6">
          {course.description}
        </Text>
      )}

      {/* Enroll */}
      <View className="flex-row items-center justify-between mb-10 mt-6">
        <View className="bg-white p-4 rounded-xl">
          <Text className="text-blue-500 text-lg font-bold">
            {course.price}
          </Text>
        </View>
        <View className="flex-1 m-4">
          <TouchableOpacity className="bg-blue-400 px-8 py-3 rounded-xl mx-2">
            <Text className="text-white font-semibold text-lg text-center mt-1">
              Enroll Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
