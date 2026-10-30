import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Opening } from "./components/Opening";
import { Banner } from "./components/Banner";
import { MusicPlayer } from "./components/MusicPlayer";
import { Memories } from "./components/Memories";
import { Letter } from "./components/Letter";
import { Counter } from "./components/Counter";
import { VoiceMessage } from "./components/VoiceMessage";
import { FooterSection } from "./components/FooterSection";
import { Quiz } from "./components/Quiz";
import { content } from "./content";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState(false);

  useEffect(() => {
    const preload = [
      "/images/banner.jpg",
      "/images/album.jpg",
      "/images/footer.jpg",
      "/images/hands.jpg",
      "/images/rose.jpg",
      ...content.memories.map((m) => m.src),
    ];
    preload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-dvh bg-[#0c0507] md:flex md:items-center md:justify-center md:py-6">
      <div className="relative mx-auto h-dvh w-full max-w-[430px] overflow-hidden bg-wine md:h-[min(844px,100dvh)] md:rounded-[2.4rem] md:shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
        <AnimatePresence mode="wait">
          {!opened ? (
            <Opening key="opening" onOpen={() => setOpened(true)} />
          ) : (
            <div
              key="letter"
              className={`no-scrollbar snap-frame h-full ${quiz ? "overflow-hidden" : "overflow-y-auto"}`}
            >
              <Banner />
              <MusicPlayer />
              <Memories />
              <Letter />
              <Counter />
              <VoiceMessage />
              <FooterSection onOpenQuiz={() => setQuiz(true)} />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>{quiz && <Quiz onClose={() => setQuiz(false)} />}</AnimatePresence>
      </div>
    </div>
  );
}
