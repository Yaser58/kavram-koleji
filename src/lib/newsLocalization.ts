/**
 * News/Announcement localization helper.
 * When API returns titleEn, excerptEn, etc., use them for English.
 * Backend can add these fields when content is available in both languages.
 */
export interface NewsItemBase {
  _id: string
  title: string
  excerpt: string
  content?: string
  images?: string[]
  category: string
  day: string
  month: string
  year: string
  slug?: string
  // Optional English fields - backend provides when available
  titleEn?: string
  excerptEn?: string
  contentEn?: string
  categoryEn?: string
  monthEn?: string
  startDate?: string // ISO date for locale-aware formatting
}

export function getLocalizedNews<T extends NewsItemBase>(
  item: T,
  lang: string
): { title: string; excerpt: string; content?: string; category: string; day: string; month: string; year: string } {
  const isEn = lang === 'en'
  const month = isEn && item.monthEn ? item.monthEn : item.month
  const day = item.day
  const year = item.year

  // If startDate exists and we need English, format with en-US
  let displayMonth = month
  if (isEn && item.startDate) {
    try {
      const d = new Date(item.startDate)
      displayMonth = d.toLocaleDateString('en-US', { month: 'short' })
    } catch {
      displayMonth = item.monthEn || month
    }
  } else if (isEn && item.monthEn) {
    displayMonth = item.monthEn
  }

  return {
    title: isEn && item.titleEn ? item.titleEn : item.title,
    excerpt: isEn && item.excerptEn ? item.excerptEn : item.excerpt,
    content: isEn && item.contentEn ? item.contentEn : item.content,
    category: isEn && item.categoryEn ? item.categoryEn : item.category,
    day,
    month: displayMonth,
    year,
  }
}
