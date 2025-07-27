import { AppBar } from "@/components/Appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
export default function Home() {
  return (
    <main className="">
      <AppBar />
      <Hero />
      <HeroVideo />
    </main>
  );
}
