import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

type LayoutProps = {
  children?: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

// fix problem
// type LayoutProps = {
//   children: React.ReactNode
// }
// const Layout = (props: LayoutProps) => {
//   return (
//     <div>
//       <Nav />
//       <main className="relative">{props.children}</main>
//       <Footer />
//     </div>
//   )
// }
export default Layout
