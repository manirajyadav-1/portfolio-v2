import { useEffect } from "react"
import Aos from "aos"
import {
    Layout, Container, Intro, Stack, Experience, Education,
    Projects, Architecture, OpenSource, Contact, Footer, DomHead
} from "../components"
import { DataContextProvider } from "../context/DataContext"

export default function HomePage() {
    useEffect(() => {
        Aos.init({ duration: 700, once: true, offset: 60 })
    }, [])

    return (
        <DataContextProvider>
            <DomHead />
            <Layout>
                <Container>
                    <Intro        index={1} />
                    <Stack        index={2} />
                    <Experience   index={3} />
                    <Education    index={4} />
                    <Projects     index={5} />
                    <Architecture index={6} />
                    <OpenSource   index={7} />
                </Container>
                <Contact index={8} />
                <Footer />
            </Layout>
        </DataContextProvider>
    )
}
