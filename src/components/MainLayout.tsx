import { Outlet } from 'react-router-dom'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  )
}

export default MainLayout