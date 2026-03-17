import mongoose from 'mongoose'

const mainAcademicCalendarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  type: { type: String, default: 'diger' }, // kayit, sinav, tatil, donem, diger
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MainAcademicCalendar', mainAcademicCalendarSchema)
