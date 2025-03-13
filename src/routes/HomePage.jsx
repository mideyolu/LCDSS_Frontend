import FeaturesSection from "../components/HomePage/FeaturesSection";
import HeroSection from "../components/HomePage/HeroSection";
import FaqSection from "../components/Faq/FaqSection";

const HomePage = ({ faqRef }) => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <FaqSection faqRef={faqRef} />
        </div>
    );
};

export default HomePage;
