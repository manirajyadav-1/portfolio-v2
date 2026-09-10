import React, { useEffect, useState } from "react"
import { NavBar, Header, DomHead } from ".."
import { ResponsiveNavbar } from "../Navbar"

function Layout({ children }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 700)
        onResize()
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return (
        <div className="w-full min-h-screen">
            <DomHead />
            <Header>
                <NavBar />
            </Header>
            {children}
            {isMobile && <ResponsiveNavbar />}
        </div>
    )
}

export default Layout
