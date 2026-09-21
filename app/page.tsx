import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ProductGrid from '@/components/sections/ProductGrid';
import CustomPrint from '@/components/sections/CustomPrint';
import HowItWorks from '@/components/sections/HowItWorks';
import Materials from '@/components/sections/Materials';
import ProductionGallery from '@/components/sections/ProductionGallery';
import WhyCashnova from '@/components/sections/WhyCashnova';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Footer from '@/components/sections/Footer';
import WhatsAppButton from '@/components/sections/WhatsAppButton';
import SetupNotice from '@/components/ui/SetupNotice';
import StructuredData from '@/components/ui/StructuredData';
import { getGallery, getProducts, getTestimonials } from '@/lib/content';

/* İçerik en fazla bir dakika önbellekte tutulur.
   Panelden bir kayıt yapıldığında önbellek hemen temizlendiği
   için değişiklikler aslında anında görünür. */
export const revalidate = 60;

export default async function Page() {
  const [products, testimonials, gallery] = await Promise.all([
    getProducts(),
    getTestimonials(),
    getGallery(),
  ]);

  return (
    <>
      <StructuredData />
      <Navbar />
      <main id="icerik">
        <Hero />
        <TrustBar />
        <ProductGrid products={products} />
        <CustomPrint />
        <HowItWorks />
        <Materials />
        <ProductionGallery items={gallery} />
        <WhyCashnova />
        <Testimonials items={testimonials} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <SetupNotice />
    </>
  );
}
