// 旅记 TravelLog — Font Loading
// Noto Serif SC (headings) + Noto Sans SC (body)

import {
  useFonts as useNotoSerif,
  NotoSerifSC_400Regular,
  NotoSerifSC_500Medium,
  NotoSerifSC_600SemiBold,
  NotoSerifSC_700Bold,
} from '@expo-google-fonts/noto-serif-sc';

import {
  useFonts as useNotoSans,
  NotoSansSC_300Light,
  NotoSansSC_400Regular,
  NotoSansSC_500Medium,
  NotoSansSC_600SemiBold,
  NotoSansSC_700Bold,
} from '@expo-google-fonts/noto-sans-sc';

import { Fonts } from './editorial';

/**
 * Hook: Load all editorial fonts.
 * Returns { loaded, error } — display splash/loading until loaded=true.
 */
export function useEditorialFonts() {
  const [serifLoaded, serifError] = useNotoSerif({
    [Fonts.serif.regular]: NotoSerifSC_400Regular,
    [Fonts.serif.medium]: NotoSerifSC_500Medium,
    [Fonts.serif.semiBold]: NotoSerifSC_600SemiBold,
    [Fonts.serif.bold]: NotoSerifSC_700Bold,
  });

  const [sansLoaded, sansError] = useNotoSans({
    [Fonts.sans.light]: NotoSansSC_300Light,
    [Fonts.sans.regular]: NotoSansSC_400Regular,
    [Fonts.sans.medium]: NotoSansSC_500Medium,
    [Fonts.sans.semiBold]: NotoSansSC_600SemiBold,
    [Fonts.sans.bold]: NotoSansSC_700Bold,
  });

  return {
    loaded: serifLoaded && sansLoaded,
    error: serifError || sansError,
  };
}
