import FeaturesSection from "../components/HomePage/FeaturesSection";
import HeroSection from "../components/HomePage/HeroSection";
import FaqSection from "../components/Faq/FaqSection";

const HomePage = ({ faqRef, featuresRef }) => {
    return (
        <>
            <HeroSection />
            <FeaturesSection featuresRef={featuresRef} />
            <FaqSection faqRef={faqRef} />
        </>
    );
};

export default HomePage;
