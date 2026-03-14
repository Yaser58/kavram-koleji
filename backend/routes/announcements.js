import Announcement from '../models/Announcement.js'
import { createCrudRoutes } from './crudFactory.js'
export default createCrudRoutes(Announcement)
