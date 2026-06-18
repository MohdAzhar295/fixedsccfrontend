/**
 * Homepage — hero, categories, best sellers, why-us, visit shop + Instagram.
 */
import HeroSection from "../components/HeroSection";
import InstagramReelsStrip from "../components/InstagramReelsStrip";
import ShopByCategory from "../components/ShopByCategory";
import BestSellingParts from "../components/BestSellingParts";
import WhyUsSection from "../components/WhyUsSection";
import WholesaleSection from "../components/WholesaleSection";
import VisitOurStore from "../components/VisitOurStore";
import InstagramSection from "../components/InstagramSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InstagramReelsStrip />
      <ShopByCategory />
      <BestSellingParts />
      <WhyUsSection />
      <WholesaleSection />
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <VisitOurStore />
          <InstagramSection />
        </div>
      </section>
    </>
  );
}
