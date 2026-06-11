// 旅记 TravelLog — App Navigator
// 5 Bottom Tabs × Stack Navigators + Auth Modal Stack

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Borders } from '../shared/styles/editorial';
import { Badge } from '../shared/components/Badge';

// Auth
import { LoginScreen } from '../domains/auth/pages/LoginScreen';
import { RegisterScreen } from '../domains/auth/pages/RegisterScreen';

// Content (Home Tab)
import { HomeScreen } from '../domains/content/pages/HomeScreen';
import { ContentDetailScreen } from '../domains/content/pages/ContentDetailScreen';
import { CategoryListScreen } from '../domains/content/pages/CategoryListScreen';

// Search Tab
import { SearchScreen } from '../domains/search/pages/SearchScreen';
import { SearchResultScreen } from '../domains/search/pages/SearchResultScreen';

// Map Tab
import { MapScreen } from '../domains/map/pages/MapScreen';

// Notifications Tab
import { NotificationScreen } from '../domains/interaction/pages/NotificationScreen';

// Profile Tab
import { ProfileScreen } from '../domains/user/pages/ProfileScreen';
import { EditProfileScreen } from '../domains/user/pages/EditProfileScreen';
import { MyFavoritesScreen } from '../domains/user/pages/MyFavoritesScreen';
import { MyContentsScreen } from '../domains/user/pages/MyContentsScreen';
import { SettingsScreen } from '../domains/user/pages/SettingsScreen';
import { AboutScreen } from '../domains/user/pages/AboutScreen';
import { BrowseHistoryScreen } from '../domains/user/pages/BrowseHistoryScreen';
import { PublishScreen } from '../domains/user/pages/PublishScreen';

// Types
import type {
  RootStackParamList, AuthStackParamList,
  MainTabParamList, HomeStackParamList,
  SearchStackParamList, MapStackParamList,
  NotificationsStackParamList, ProfileStackParamList,
} from './types';

// Mock
import { useAuthStore } from '../domains/auth/store/authStore';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SearchStackNav = createNativeStackNavigator<SearchStackParamList>();
const MapStackNav = createNativeStackNavigator<MapStackParamList>();
const NotifStack = createNativeStackNavigator<NotificationsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// ── Auth Stack ──
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// ── Home Tab Stack ──
function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bg },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontFamily: 'NotoSerifSC-SemiBold' },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CategoryList" component={CategoryListScreen} options={{ headerTitle: '' }} />
      <HomeStack.Screen
        name="ContentDetail"
        component={ContentDetailScreen}
        options={{ headerTitle: '' }}
      />
    </HomeStack.Navigator>
  );
}

// ── Search Tab Stack ──
function SearchNavigator() {
  return (
    <SearchStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bg },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontFamily: 'NotoSerifSC-SemiBold' },
      }}
    >
      <SearchStackNav.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <SearchStackNav.Screen name="SearchResult" component={SearchResultScreen} options={{ headerTitle: '' }} />
      <SearchStackNav.Screen name="ContentDetail" component={ContentDetailScreen} options={{ headerTitle: '' }} />
    </SearchStackNav.Navigator>
  );
}

// ── Map Tab Stack ──
function MapNavigator() {
  return (
    <MapStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bg },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontFamily: 'NotoSerifSC-SemiBold' },
      }}
    >
      <MapStackNav.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <MapStackNav.Screen name="ContentDetail" component={ContentDetailScreen} options={{ headerTitle: '' }} />
    </MapStackNav.Navigator>
  );
}

// ── Notifications Tab Stack ──
function NotificationsNavigator() {
  return (
    <NotifStack.Navigator screenOptions={{ headerShown: false }}>
      <NotifStack.Screen name="Notifications" component={NotificationScreen} />
    </NotifStack.Navigator>
  );
}

// ── Profile Tab Stack ──
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bg },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontFamily: 'NotoSerifSC-SemiBold' },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerTitle: '编辑资料' }} />
      <ProfileStack.Screen name="MyFavorites" component={MyFavoritesScreen} options={{ headerTitle: '我的收藏' }} />
      <ProfileStack.Screen name="MyContents" component={MyContentsScreen} options={{ headerTitle: '我的发布' }} />
      <ProfileStack.Screen name="BrowseHistory" component={BrowseHistoryScreen} options={{ headerTitle: '浏览历史' }} />
      <ProfileStack.Screen name="Publish" component={PublishScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: '设置' }} />
      <ProfileStack.Screen name="About" component={AboutScreen} options={{ headerTitle: '关于' }} />
    </ProfileStack.Navigator>
  );
}

// ── Main Tab Navigator ──
function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bg,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'NotoSansSC-Regular',
          fontSize: 10,
          marginTop: 2,
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            HomeTab: 'home-outline',
            SearchTab: 'search-outline',
            MapTab: 'map-outline',
            NotificationsTab: 'notifications-outline',
            ProfileTab: 'person-outline',
          };
          return (
            <Ionicons
              name={icons[route.name] as any}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ tabBarLabel: '首页' }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchNavigator}
        options={{ tabBarLabel: '搜索' }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapNavigator}
        options={{ tabBarLabel: '地图' }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsNavigator}
        options={{
          tabBarLabel: '消息',
          tabBarBadge: 3, // unread count (mock)
          tabBarBadgeStyle: { fontSize: 10 },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{ tabBarLabel: '我的' }}
      />
    </Tab.Navigator>
  );
}

// ── Root Navigator ──
export function AppNavigator() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ presentation: 'fullScreenModal' }}
        />
      )}
    </RootStack.Navigator>
  );
}
