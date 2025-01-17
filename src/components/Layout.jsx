import ScrollToTop from './ScrollToTop'

function Layout({ children }) {
  return (
    <div className="pt-16 sm:pt-24 overflow-x-hidden">
      {children}
      <ScrollToTop />
    </div>
  )
}

export default Layout 