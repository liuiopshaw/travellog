// 旅记 TravelLog — Navigation Route Types

export type RootStackParamList = {
  // Auth modal stack (presented over tabs)
  Auth: undefined;
  // Main tab navigator
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  MapTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ContentDetail: { contentId: string };
  CategoryList: { categoryId: string; categoryName: string };
};

export type SearchStackParamList = {
  Search: undefined;
  SearchResult: { keyword: string };
  ContentDetail: { contentId: string };
};

export type MapStackParamList = {
  Map: undefined;
  ContentDetail: { contentId: string };
};

export type NotificationsStackParamList = {
  Notifications: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  MyFavorites: undefined;
  MyContents: undefined;
  Publish: { editId?: string } | undefined;
  BrowseHistory: undefined;
  Settings: undefined;
  About: undefined;
  Login: undefined;
};
