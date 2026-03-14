import { Link } from 'react-router-dom'

interface PageBannerProps {
  title: string
  breadcrumbs?: { label: string; to?: string }[]
}

const PageBanner = ({ title, breadcrumbs }: PageBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-[#0f1b2d] py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary rounded-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-gray-400">/</span>}
                {crumb.to ? (
                  <Link to={crumb.to} className="text-gray-300 hover:text-secondary transition">{crumb.label}</Link>
                ) : (
                  <span className="text-secondary font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageBanner