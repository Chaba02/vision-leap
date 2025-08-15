import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Canvas con onde intrecciate tipo DNA responsive
const DNAWavesCanvas = ({ trigger }: { trigger: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let opacity = 0;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Incrementa gradualmente l'opacità per l'effetto di formazione
      if (opacity < 1) {
        opacity += 0.02;
      }

      const centerY = canvas.height / 2;
      // Adatta l'ampiezza per mobile
      const amplitude = isMobile ? canvas.height / 6 : canvas.height / 4;
      const wavelength = isMobile ? canvas.width / 1.5 : canvas.width / 2;
      const speed = isMobile ? 0.015 : 0.02;

      // Palette di blu/azzurri delicati
      const colors = [
        ["#b3d9ff", "#66b2ff"],
        ["#99ccff", "#3385ff"],
        ["#cce6ff", "#80bfff"],
      ];

      colors.forEach((gradientColors, index) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x++) {
          const y =
            centerY +
            Math.sin((x / wavelength) * Math.PI * 2 + time + index) *
              amplitude *
              Math.cos(time + index / 2);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(1, gradientColors[1]);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isMobile ? 1.5 : 2;
        ctx.globalAlpha = 0.6 * opacity;
        ctx.shadowBlur = isMobile ? 4 : 8;
        ctx.shadowColor = gradientColors[1];
        ctx.stroke();
      });

      time += speed;
      animationRef.current = requestAnimationFrame(draw);
    };

    // Delay iniziale per l'effetto di formazione
    const timeout = setTimeout(draw, 500);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [trigger, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Variants per animazioni responsive
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const subtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.8,
    },
  },
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 1.2 + i * 0.1,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [controls]);

  const scrollToNext = () => {
    document.getElementById("chi-siamo")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Dividi il titolo in parole per l'animazione
  const titleWords = "Un luogo di pace e comunità a Cantù".split(" ");
  const highlightIndex = titleWords.findIndex((word) => word === "pace");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Sfondo con onde DNA */}
      <DNAWavesCanvas trigger={inView} />

      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Titolo con animazione parola per parola */}
          <motion.h1
            variants={titleVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 tracking-tight leading-none mb-6 sm:mb-8"
          >
            <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  className={`inline-block ${
                    index === highlightIndex ? "text-[#1877F2] relative" : ""
                  }`}
                  style={{
                    transformOrigin: "center bottom",
                    perspective: "1000px",
                  }}
                >
                  {word}
                  {index === highlightIndex && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1877F2]/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    />
                  )}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          {/* Sottotitolo con effetto blur */}
          <motion.p
            variants={subtitleVariants}
            className="text-lg sm:text-xl md:text-2xl font-light text-neutral-600 leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto text-center"
          >
            <span className="block text-[#1877F2] text-[22px] sm:text-[26px] italic">
              السلام عليكم ورحمة الله وبركاته
            </span>
            <span className="block mt-2 text-neutral-600 text-lg sm:text-xl italic">
              Pace, misericordia e benedizioni di Dio siano su di voi
            </span>
          </motion.p>

          {/* Bottoni con animazioni classiche */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
            variants={containerVariants}
          >
            <motion.button
              custom={0}
              variants={buttonVariants}
              className="group relative flex justify-center items-center overflow-hidden rounded-full bg-[#1877F2]/90 backdrop-blur-md px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white shadow-lg transition-all duration-500 ease-out hover:bg-[#1877F2] hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Scopri di più</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </span>
            </motion.button>

            <motion.button
              custom={1}
              variants={buttonVariants}
              className="group rounded-full border border-neutral-300 px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-neutral-700 transition-all duration-500 ease-out hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 hover:scale-105"
            >
              I nostri eventi
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
