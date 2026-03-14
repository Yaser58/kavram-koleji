#!/usr/bin/env node
/**
 * Kampüs fotoğraflarını "Kampüsler" klasöründen public/branches/ klasörüne kopyalar.
 * Dosya adları slug formatına çevrilir.
 * 
 * Kullanım: node scripts/copy-branch-photos.js
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const destDir = join(root, 'public', 'branches')

// Slug eşleştirmesi: kaynak dosya adındaki anahtar kelime -> hedef dosya
const SLUG_MAP = [
  ['adana', 'adana'],
  ['batikent', 'ankara-batikent'],
  ['etimesgut', 'ankara-etimesgut'],
  ['kecioren', 'ankara-kecioren'],
  ['keiren', 'ankara-kecioren'],
  ['ovecler', 'ankara-ovecler'],
  ['vecler', 'ankara-ovecler'],
  ['sincan', 'ankara-sincan'],
  ['bandimra', 'bandirma'],
  ['bandirma', 'bandirma'],
  ['bandmra', 'bandirma'],
  ['balikesir', 'bandirma'],
  ['gaziantep', 'gaziantep'],
  ['esenyurt', 'istanbul-esenyurt'],
  ['sancaktepe', 'istanbul-sancaktepe'],
  ['soyak', 'istanbul-soyak'],
  ['kiziltepe', 'mardin-kiziltepe'],
  ['mardin', 'mardin-kiziltepe'],
  ['sivas', 'sivas'],
]

// Olası kaynak klasörler
const possibleSources = [
  join(root, 'Kampüsler'),
  join(root, 'Kampüsler fotoğrafları'),
  join(root, 'Kampusler'),
]

let sourceDir = null
for (const p of possibleSources) {
  if (existsSync(p)) {
    sourceDir = p
    break
  }
}

if (!sourceDir) {
  console.error('Kampüsler klasörü bulunamadı. "Kampüsler" veya "Kampüsler fotoğrafları" adlı klasörü proje köküne ekleyin.')
  process.exit(1)
}

if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true })

const files = readdirSync(sourceDir)
let copied = 0

// Türkçe karakterleri ASCII'ye çevir (ı->i, ğ->g, ü->u, ş->s, ö->o, ç->c)
const trToAscii = (s) => s.toLowerCase()
  .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
  .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')

for (const file of files) {
  const lower = trToAscii(file).replace(/[^a-z0-9]/g, '')
  let slug = null
  let ext = file.includes('.') ? file.split('.').pop() : 'jpg'

  for (const [key, val] of SLUG_MAP) {
    const keyNorm = trToAscii(key).replace(/[^a-z0-9]/g, '')
    if (keyNorm && lower.includes(keyNorm)) {
      slug = val
      break
    }
  }
  if (!slug) continue

  const destName = `${slug}.${ext}`
  const srcPath = join(sourceDir, file)
  const destPath = join(destDir, destName)

  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath)
    console.log(`✓ ${file} → ${destName}`)
    copied++
  }
}
console.log(`\n${copied} dosya kopyalandı.`)
