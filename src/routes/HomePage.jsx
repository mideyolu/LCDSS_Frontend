import FeaturesSection from "../components/HomePage/FeaturesSection";
import HeroSection from "../components/HomePage/HeroSection";
import FaqSection from "../components/Faq/FaqSection";
import MeetOurTeam from "../components/HomePage/MeetOurTeam";

const HomePage = ({ faqRef, featuresRef, teamRef }) => {
    return (
        <>
            <HeroSection />
            <FeaturesSection featuresRef={featuresRef} />
            <FaqSection faqRef={ faqRef } />
            <MeetOurTeam teamRef={teamRef}/>

        </>
    );
};

export default HomePage;
