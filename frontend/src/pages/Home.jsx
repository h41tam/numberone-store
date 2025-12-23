// src/pages/Home.jsx
import Hero from "../components/hero"
import ProductStory from "../components/productStory"
import FeaturedSection from "../components/featuredSection"
import MoreProducts from "../components/moreProducts"
import { usePageEnter } from "@/lib/anim"
export default function Home() {
  const ref = usePageEnter()
  return (
    <div ref={ref}>
      <Hero />
      <ProductStory />
      <FeaturedSection />
      <MoreProducts />
    </div>
  )
}
