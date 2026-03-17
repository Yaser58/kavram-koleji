/**
 * Fallback translations for slider when API doesn't provide titleEn/subtitleEn.
 * Add new Turkish phrases here as needed.
 */
export const SLIDER_TITLE_TR: Record<string, string> = {
  "Akademik Başarıda Lider Kurum": "Leading Institution in Academic Success",
  "YKS ve LGS'de Üstün Başarı": "Superior Success in YKS and LGS",
  "Geleceğin Liderlerini Yetiştiriyoruz": "Raising the Leaders of Tomorrow",
  "Eğitimde 50 Yıllık Tecrübe": "50 Years of Experience in Education",
  "Kavram Koleji'ne Hoş Geldiniz": "Welcome to Kavram College",
}

export const SLIDER_SUBTITLE_TR: Record<string, string> = {
  "YKS ve LGS'de Üstün Başarı": "Superior Success in YKS and LGS",
  "Akademik Başarıda Lider Kurum": "Leading Institution in Academic Success",
  "Geleceğin Liderlerini Yetiştiriyoruz": "Raising the Leaders of Tomorrow",
  "Eğitimde 50 Yıllık Tecrübe": "50 Years of Experience in Education",
  "Kavram Koleji'ne Hoş Geldiniz": "Welcome to Kavram College",
}

export function getSliderTitle(title: string, titleEn?: string, lang?: string): string {
  if (lang === 'en') {
    if (titleEn) return titleEn
    return SLIDER_TITLE_TR[title] || title
  }
  return title
}

export function getSliderSubtitle(subtitle: string, subtitleEn?: string, lang?: string): string {
  if (lang === 'en') {
    if (subtitleEn) return subtitleEn
    return SLIDER_SUBTITLE_TR[subtitle] || subtitle
  }
  return subtitle
}
