import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const fullText = "Olá, me chamo Giovana.";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Glow overlay */}
      <div className="absolute inset-0 glow-overlay pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm mt-4">
              <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse " />
              Desenvolvedora Full Stack
            </span>
          </motion.div>

          {/* Name with typing effect */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl"
          >
            {displayedText}
            <span
              className={`inline-block w-[4px] h-[0.9em] bg-primary ml-1 align-middle ${
                isTypingComplete ? "animate-pulse" : ""
              }`}
            />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isTypingComplete ? 1 : 0,
              y: isTypingComplete ? 0 : 30,
            }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Transformo ideias em experiências digitais. Com paixão por código
            limpo e design elegante, construo aplicações web completas — do
            backend ao frontend.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isTypingComplete ? 1 : 0,
              y: isTypingComplete ? 0 : 30,
            }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-12 flex justify-center"
          >
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => navigate("/home")}
            >
              Conhecer mais
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Tech stack hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          ></motion.div>
        </div>
      </main>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Index;
