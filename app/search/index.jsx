import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const allCategories = [
  "ui design",
  "ux design",
  "website design",
  "prototyping",
  "animation",
  "graphic design",
  "typography",
  "responsive design",
  "color theory",
  "design systems",
];

const courseList = [
  {
    title: "Mobile UI Essentials",
    level: "Intermediate",
    lessons: 28,
    time: "6h 30min",
    rating: 4.9,
    image: require("./../../assets/images/ui1.png"),
    liked: true,
    category: "ui design",
  },
  {
    title: "UI Animation Basics",
    level: "Beginner",
    lessons: 24,
    time: "3h 42min",
    rating: 4.8,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "animation",
  },
  {
    title: "Web UI Best Practices",
    level: "Advanced",
    lessons: 46,
    time: "8h 28min",
    rating: 4.6,
    image: require("./../../assets/images/ui1.png"),
    liked: false,
    category: "website design",
  },
  {
    title: "Prototype with Figma",
    level: "Intermediate",
    lessons: 39,
    time: "2h 34min",
    rating: 4.9,
    image: require("./../../assets/images/ui4.png"),
    liked: false,
    category: "prototyping",
  },
  {
    title: "Fundamentals of UX Design",
    level: "Beginner",
    lessons: 20,
    time: "4h 10min",
    rating: 4.7,
    image: require("./../../assets/images/ui1.png"),
    liked: false,
    category: "ux design",
  },
  {
    title: "Responsive Design for Web",
    level: "Intermediate",
    lessons: 30,
    time: "5h 45min",
    rating: 4.8,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "responsive design",
  },
  {
    title: "Intro to Graphic Design",
    level: "Beginner",
    lessons: 22,
    time: "3h 20min",
    rating: 4.5,
    image: require("./../../assets/images/ui1.png"),
    liked: false,
    category: "graphic design",
  },
  {
    title: "Typography Mastery",
    level: "Advanced",
    lessons: 27,
    time: "6h 15min",
    rating: 4.9,
    image: require("./../../assets/images/ui4.png"),
    liked: false,
    category: "typography",
  },
  {
    title: "Design Systems Explained",
    level: "Intermediate",
    lessons: 25,
    time: "4h 45min",
    rating: 4.6,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "design systems",
  },
  {
    title: "Color Theory for Designers",
    level: "Beginner",
    lessons: 18,
    time: "2h 50min",
    rating: 4.7,
    image: require("./../../assets/images/ui1.png"),
    liked: false,
    category: "color theory",
  },
  {
    title: "Advanced UI Design Patterns",
    level: "Advanced",
    lessons: 40,
    time: "7h 20min",
    rating: 4.9,
    image: require("./../../assets/images/ui4.png"),
    liked: false,
    category: "ui design",
  },
  {
    title: "Prototyping in Adobe XD",
    level: "Intermediate",
    lessons: 35,
    time: "5h 10min",
    rating: 4.6,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "prototyping",
  },
  {
    title: "Creative UX Research Methods",
    level: "Beginner",
    lessons: 21,
    time: "3h 15min",
    rating: 4.7,
    image: require("./../../assets/images/ui1.png"),
    liked: false,
    category: "ux design",
  },
  {
    title: "Accessible Web Design",
    level: "Intermediate",
    lessons: 26,
    time: "4h 30min",
    rating: 4.8,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "website design",
  },
  {
    title: "Logo & Brand Identity",
    level: "Advanced",
    lessons: 30,
    time: "6h 00min",
    rating: 4.9,
    image: require("./../../assets/images/ui4.png"),
    liked: false,
    category: "graphic design",
  },
  {
    title: "Motion Graphics for UI",
    level: "Intermediate",
    lessons: 33,
    time: "5h 40min",
    rating: 4.8,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "animation",
  },
  {
    title: "Design Thinking Crash Course",
    level: "Beginner",
    lessons: 15,
    time: "2h 10min",
    rating: 4.5,
    image: require("./../../assets/images/ui1.png"),
    liked: false,
    category: "ux design",
  },
  {
    title: "Wireframing for Beginners",
    level: "Beginner",
    lessons: 20,
    time: "3h 00min",
    rating: 4.6,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "prototyping",
  },
  {
    title: "Dark Mode Design Patterns",
    level: "Intermediate",
    lessons: 19,
    time: "2h 45min",
    rating: 4.7,
    image: require("./../../assets/images/ui4.png"),
    liked: false,
    category: "ui design",
  },
  {
    title: "Advanced Layout Grids",
    level: "Advanced",
    lessons: 28,
    time: "4h 50min",
    rating: 4.9,
    image: require("./../../assets/images/ui2.png"),
    liked: false,
    category: "responsive design",
  },
];

export default function Search() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(courseList);
  const [activeCourse, setActiveCourse] = useState(null);
  const router = useRouter();

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const toggleLike = (index) => {
    const updated = [...courses];
    updated[index].liked = !updated[index].liked;
    setCourses(updated);
  };

  const getFilteredCourses = () => {
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);
      return matchesSearch && matchesCategory;
    });
  };

  const filteredCourses = getFilteredCourses();

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            name="chevron-back"
            size={28}
            color="#333"
            className="bg-white rounded-xl size-12 text-center p-2"
          />
        </TouchableOpacity>
        <Text className="text-base font-semibold">Search</Text>
        <TouchableOpacity className="p-2 bg-white rounded-xl">
          <Icon name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center mt-4 mb-4">
        <View className="flex-1">
          <View className="flex-row items-center bg-white px-4 py-2 rounded-xl">
            <Icon name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search now..."
              className="ml-2 flex-1 text-base text-black"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
        </View>

        <View className="w-3" />

        <TouchableOpacity className="bg-[#4285F4] rounded-xl p-2 size-14">
          <Icon name="options-outline" size={34} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 h-14"
      >
        {allCategories.map((category, index) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => toggleCategory(category)}
              className={`h-10 px-4 mr-3 rounded-full flex-row items-center ${
                isSelected ? "bg-blue-100" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm font-semibold mr-1 ${
                  isSelected ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {category}
              </Text>
              {isSelected && <Icon name="close" size={14} color="#3B82F6" />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Course List with FlatList */}
      {filteredCourses.length === 0 ? (
        <View className="flex-1 items-center mt-10">
          <Text className="text-gray-400">No courses found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 360,
            paddingTop: 8,
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const isActive = activeCourse === index;
            return (
              <TouchableOpacity
                onPress={() => setActiveCourse(index)}
                className={`flex-row items-center mb-4 p-3 rounded-2xl shadow-inherit ${
                  isActive ? "bg-blue-400" : "bg-white"
                }`}
              >
                <Image
                  source={item.image}
                  className="rounded-xl mr-3"
                  resizeMode="cover"
                  style={{ width: 80, height: 80 }}
                />
                <View className="flex-1">
                  <Text
                    className={`text-sm font-semibold ${
                      isActive ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className={`text-xs ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {item.level} / {item.lessons} lessons
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Icon name="star" size={14} color="#FDBA12" />
                    <Text
                      className={`ml-1 text-xs ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {item.rating}
                    </Text>
                    <Text
                      className={`mx-2 text-xs ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    >
                      •
                    </Text>
                    <Text
                      className={`text-xs ${
                        isActive ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => toggleLike(index)}>
                  <Icon
                    name={item.liked ? "heart" : "heart-outline"}
                    size={18}
                    color={item.liked ? "red" : "#D1D5DB"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
