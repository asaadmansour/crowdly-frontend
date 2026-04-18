import Hero from "../components/Hero"
import Favorites from "../components/Favorites"
import Latest from "../components/Latest"
import Featured from "../components/Featured"
import Motive from "../components/Motive"

export default function Home() {
  return (
    <main className="flex flex-col justify-center">
      <Hero />
      <Favorites />
      <Latest />
      <Featured />
      <Motive/>
    </main>
  )
}