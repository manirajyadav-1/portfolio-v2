import { useEffect } from "react"
import "aos/dist/aos.css"
import "../styles/global.css"

export default function App({ Component, pageProps }) {
    // If JS is disabled the class stays on and CSS reveals all [data-aos] content.
    useEffect(() => { document.documentElement.classList.remove("no-js") }, [])

    // Cursor spotlight on every .gridbg panel. One passive document listener,
    // coalesced into a single rAF, so moving the mouse costs two style writes.
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return

        let frame = null
        let pending = null
        let lit = null

        const paint = () => {
            frame = null
            if (!pending) return
            const { x, y } = pending

            const el = document.elementFromPoint(x, y)?.closest(".gridbg") || null

            if (lit && lit !== el) {
                lit.classList.remove("is-lit")
            }
            if (el) {
                const r = el.getBoundingClientRect()
                el.style.setProperty("--mx", `${x - r.left}px`)
                el.style.setProperty("--my", `${y - r.top}px`)
                el.classList.add("is-lit")
            }
            lit = el
        }

        const onMove = (e) => {
            pending = { x: e.clientX, y: e.clientY }
            if (frame === null) frame = requestAnimationFrame(paint)
        }

        const onLeave = () => {
            if (lit) { lit.classList.remove("is-lit"); lit = null }
        }

        document.addEventListener("mousemove", onMove, { passive: true })
        document.addEventListener("mouseleave", onLeave)

        return () => {
            document.removeEventListener("mousemove", onMove)
            document.removeEventListener("mouseleave", onLeave)
            if (frame !== null) cancelAnimationFrame(frame)
            onLeave()
        }
    }, [])

    return <Component {...pageProps} />
}
