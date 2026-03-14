import News from '../models/News.js'
import { createCrudRoutes } from './crudFactory.js'
export default createCrudRoutes(News)
