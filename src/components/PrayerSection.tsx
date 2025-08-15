import { Clock, Calendar, Compass, MapPin, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import SectionHeader from "./SectionHeader";

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
  const prayerTimes: PrayerTime[] = useMemo(() => [
    { name: "Fajr", arabicName: "الفجر", time: "05:15", description: "Alba" },
    { name: "Dhuhr", arabicName: "الظهر", time: "13:20", description: "Mezzogiorno" },
    { name: "Asr", arabicName: "العصر", time: "17:00", description: "Pomeriggio" },
    { name: "Maghrib", arabicName: "المغرب", time: "20:15", description: "Tramonto" },
    { name: "Isha", arabicName: "العشاء", time: "21:45", description: "Sera" },
  ], []);

  const [islamicDate, setIslamicDate] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const findNextPrayer = (): PrayerTime | null => {
      const now = new Date();
      let upcoming: PrayerTime | null = null;

      for (const prayer of prayerTimes) {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);
        if (prayerDate > now) {
          upcoming = prayer;
          break;
        }
      }
      return upcoming || prayerTimes[0];
    };

    const calculateCountdown = (prayer: PrayerTime | null): string => {
      if (!prayer) return "00:00:00";
      const now = new Date();
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);
      if (target < now) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
      const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      return `${hrs}:${mins}:${secs}`;
    };

    setIslamicDate(getIslamicDate());

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      const next = findNextPrayer();
      setNextPrayer(next);
      setCountdown(calculateCountdown(next));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
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

        {/* Grid Card Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Card component mapping to avoid repetition */}
          {[
            { title: "Ora Attuale", value: currentTime, icon: Clock },
            { title: "Data Islamica", value: islamicDate, icon: Calendar },
            { title: "Prossima Preghiera", value: `${nextPrayer?.name} - ${nextPrayer?.time}`, icon: Compass },
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

        {/* Table Responsive */}
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

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base min-w-[500px]">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-left font-semibold text-neutral-700">Preghiera</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-left font-semibold text-neutral-700">Nome Arabo</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-left font-semibold text-neutral-700">Orario</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-left font-semibold text-neutral-700">Descrizione</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {prayerTimes.map((prayer, index) => {
                  const IconComponent = getPrayerIcon(prayer.name);
                  const isNext = nextPrayer?.name === prayer.name;
                  return (
                    <motion.tr
                      key={prayer.name}
                      className={`transition-all duration-200 hover:bg-neutral-50 ${isNext ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${isNext ? 'text-primary' : 'text-neutral-500'}`} />
                          <span className={`font-medium ${isNext ? 'text-primary' : 'text-neutral-900'}`}>
                            {prayer.name}
                          </span>
                          {isNext && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                              Prossima
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6 italic text-neutral-600 font-arabic text-lg">
                        {prayer.arabicName}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6 font-mono text-base sm:text-lg font-semibold">
                        {prayer.time}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-neutral-600 text-xs sm:text-sm">
                        {prayer.description}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default PrayerSection;
