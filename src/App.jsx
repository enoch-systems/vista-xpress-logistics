import { Header, TopBanner, VistaImage, BenefitsSection, OfferSection, CourseSection, AboutSection, ProductSection, TestimonialSection, Footer } from "./pages/Home";

const Home = () => {
  return (
    <div className="pt-20">
      <Header />
      <TopBanner />
      <VistaImage />
      <BenefitsSection />
      <OfferSection />
      <CourseSection />
      <AboutSection />
      <ProductSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Home;