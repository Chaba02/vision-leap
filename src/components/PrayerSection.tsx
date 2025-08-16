import { Clock, Calendar, Compass, MapPin, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import SectionHeader from "./SectionHeader";

const prayerMeta: Record<string, { arabic: string; offset: number; after: number }> = {
  Fajr: { arabic: "الفجر", offset: -23, after: 20 },
  Dhuhr: { arabic: "الظهر", offset: 0, after: 15 },
  Asr: { arabic: "العصر", offset: 0, after: 15 },
  Maghrib: { arabic: "المغرب", offset: 0, after: 10 },
  Isha: { arabic: "العشاء", offset: 21, after: 0 },
};

const applyOffset = (time: string, offset: number) => {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m + offset, 0, 0);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const getIslamicDate = (): string => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      calendar: "islamic"
    };
    return new Intl.DateTimeFormat("it-IT", options).format(new Date());
  } catch {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
};

const getPrayerIcon = (prayerName: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Fajr: Sun,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Moon,
    Isha: Moon
  };
  return iconMap[prayerName] || Clock;
};

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  description: string;
}

const PrayerSection = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [islamicDate, setIslamicDate] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setIslamicDate(getIslamicDate());
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("it-IT")
        .split("/").map(p => p.padStart(2, "0")).join("-");

      try {
        const res = await fetch(`https://api.aladhan.com/v1/timings/${formattedDate}?latitude=45.72556&longitude=9.14770`);
        const data = await res.json();

        if (data?.data?.timings) {
          const timings = data.data.timings;
          const mapped = Object.keys(prayerMeta).map(key => ({
            name: key,
            arabicName: prayerMeta[key].arabic,
            time: applyOffset(timings[key], prayerMeta[key].offset),
            description: `+${prayerMeta[key].after} min dopo`,
          }));
          setPrayerTimes(mapped);
        }
      } catch (err) {
        console.error("Errore fetch orari preghiera:", err);
      }
    };

    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateCountdown = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

      let next: PrayerTime | null = null;
      for (const prayer of prayerTimes) {
        const [h, m] = prayer.time.split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(h, m, 0, 0);
        if (prayerDate > now) {
          next = prayer;
          break;
        }
      }
      if (!next) next = prayerTimes[0];

      setNextPrayer(next);

      const [hours, minutes] = next.time.split(":").map(Number);
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);
      if (target < now) target.setDate(target.getDate() + 1);

      const diff = target.getTime() - now.getTime();
      const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
      const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      setCountdown(`${hrs}:${mins}:${secs}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <section id="preghiere" className="min-h-screen bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Orari delle Preghiere"
          subtitle="Consulta gli orari giornalieri per Cantù, la data islamica e il tempo rimanente alla prossima preghiera."
          className="mb-16 sm:mb-24"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {[
            { title: "Ora Attuale", value: currentTime, icon: Clock },
            { title: "Data Islamica", value: islamicDate, icon: Calendar },
            { title: "Prossima Preghiera", value: nextPrayer ? `${nextPrayer.name} - ${nextPrayer.time}` : "", icon: Compass },
            { title: "Tempo Rimanente", value: countdown, icon: Clock, gradient: true }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className={`rounded-3xl p-6 sm:p-8 h-full text-center border-2 ${card.gradient ? "bg-gradient-to-br from-primary to-primary/80 text-white border-primary" : "bg-white border-gray-300 hover:border-primary"} transition-all duration-200`}>
                <div className="mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto transition-colors duration-200 ${card.gradient ? "bg-white/20" : "bg-neutral-50"}`}>
                    <card.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${card.gradient ? "text-white" : "text-neutral-700 group-hover:text-primary"}`} strokeWidth={1} />
                  </div>
                </div>
                <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 tracking-tight">
                  {card.title}
                </h4>
                <p className={`font-mono font-bold ${card.gradient ? "text-lg sm:text-2xl" : "text-primary text-xl sm:text-2xl"}`}>
                  {card.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 px-4 sm:px-6 py-3 sm:py-4">
            <h3 className="text-base sm:text-xl font-semibold text-white flex items-center gap-2 sm:gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              Orari per Cantù - {new Date().toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
            {prayerTimes.map((prayer, idx) => {
              const Icon = getPrayerIcon(prayer.name);
              const isNext = nextPrayer?.name === prayer.name;
              return (
                <div key={idx} className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 ${isNext ? "border-primary bg-primary/10" : "border-gray-200"} transition-all`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 mb-2 ${isNext ? "text-primary" : "text-gray-700"}`} />
                  <span className="text-sm sm:text-base font-semibold">{prayer.arabicName}</span>
                  <span className="text-lg sm:text-xl font-bold">{prayer.time}</span>
                  <span className="text-xs sm:text-sm text-gray-500">{prayer.description}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrayerSection;
