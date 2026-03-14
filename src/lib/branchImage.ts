/**
 * Kampüs fotoğrafı URL'sini döndürür.
 * - Super Admin'de logo girilmişse onu kullanır
 * - Yoksa public/branches/{slug}.jpg dosyasını dener (projeye yüklenen fotoğraflar)
 * - O da yoksa placeholder döner
 */
const PLACEHOLDER = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop'

export function getBranchImageSrc(b: { logo?: string; slug: string }): string {
  // Super Admin'de özel URL veya /branches/xxx.jpg gibi yol girilmişse
  if (b.logo?.trim()) {
    const url = b.logo.trim()
    if (url.startsWith('/') || url.startsWith('http')) return url
    if (url.startsWith('branches/')) return `/${url}`
  }
  // Projeye yüklenen dosya: public/branches/{slug}.jpg
  return `/branches/${b.slug}.jpg`
}

export const BRANCH_IMAGE_PLACEHOLDER = PLACEHOLDER
