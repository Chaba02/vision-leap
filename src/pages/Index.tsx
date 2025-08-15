import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChiSiamoSection from "@/components/ChiSiamoSection";
import PrayerSection from "@/components/PrayerSection";
import EventiSection from "@/components/EventiSection";
import DonazioniSection from "@/components/DonazioniSection";
import ContattiSection from "@/components/ContattiSection";
import Footer from "@/components/Footer";
import ChappFooter from "@/components/ChappFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-pure-white">
      <Header />
      <main>
        <HeroSection />
        <ChiSiamoSection />
        <PrayerSection />
        <EventiSection />
        <DonazioniSection />
        <ContattiSection />
      </main>
      <ChappFooter />
    </div>
  );
};

export default Index;
