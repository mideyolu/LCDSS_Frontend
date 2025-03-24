// import { Layout, Typography, Skeleton } from "antd";
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { NavLinks, SocialLinks } from "../../utils/footerLinks";


// const Footer = ({ className, faqRef, featuresRef, teamRef }) => {
//     const { Text } = Typography;
//     const location = useLocation();
//     const isDashboard = location.pathname === "/dashboard";

//     // Loading State
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
//         return () => clearTimeout(timer);
//     }, []);

//     // Navigation Links Array
//     const navLinks = [
//         { label: "Home", to: "/" },
//         { label: "Features", ref: featuresRef },
//         { label: "FAQ", ref: faqRef },
//         { label: "Team", ref: teamRef },
//     ];

//     // Smooth Scroll Handler
//     const scrollToSection = (ref, e) => {
//         e.preventDefault();
//         ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     };

//     return (
//         <Skeleton
//             loading={loading}
//             active
//             paragraph={{ rows: 4 }}
//             className="w-full"
//         >
//             <Layout.Footer
//                 className={`bg-[#1677FF] text-white py-8 px-6 md:px-16 ${className}`}
//             >
//                 <div className="max-w-6xl mx-auto text-center md:text-left">
//                     {/* Top Section */}
//                     <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
//                         {/* Left - Brand & Description */}
//                         <div>
//                             <h3 className="text-lg font-semibold">
//                                 Respirix Healthcare
//                             </h3>
//                             <Text className="text-white text-sm">
//                                 Innovating AI-powered healthcare solutions.
//                             </Text>
//                         </div>

//                         {/* Center - Quick Links */}
//                         <div>
//                             <h4 className="text-md font-semibold mb-2">
//                                 Quick Links
//                             </h4>
//                             <NavLinks
//                                 navLinks={navLinks}
//                                 scrollToSection={scrollToSection}
//                             />
//                         </div>

//                         {/* Right - Social Links */}
//                         <div className="flex flex-col items-center md:items-start">
//                             <h4 className="text-md font-semibold mb-2">
//                                 Follow Us
//                             </h4>
//                             <SocialLinks />
//                         </div>
//                     </div>

//                     {/* Bottom Section - Copyright */}
//                     <div className="mt-6 text-center border-t text-white pt-4">
//                         <Text className="text-white text-sm">
//                             © {new Date().getFullYear()} Respirix Healthcare.
//                             All rights reserved.
//                         </Text>

//                         {isDashboard && (
//                             <div className="mt-3 text-sm">
//                                 <strong>
//                                     Dashboard | Made by Project Group 9
//                                 </strong>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </Layout.Footer>
//         </Skeleton>
//     );
// };

// export default Footer;


import { Layout, Typography, Skeleton } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLinks, SocialLinks } from "../../utils/footerLinks";

const Footer = ({ className, faqRef, featuresRef, teamRef }) => {
    const { Text } = Typography;
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";

    // Loading State
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    // Navigation Links Array
    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Features", ref: featuresRef },
        { label: "FAQ", ref: faqRef },
        { label: "Team", ref: teamRef },
    ];

    // Smooth Scroll Handler
    const scrollToSection = (ref, e) => {
        e.preventDefault();
        ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <Skeleton
            loading={loading}
            active
            paragraph={{ rows: 4 }}
            className="w-full"
        >
            <Layout.Footer className={`py-8 px-6 md:px-16 ${className}`}>
                <div className="max-w-6xl mx-auto text-center md:text-left">
                    {!isDashboard && (
                        <>
                            {/* Top Section */}
                            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                                {/* Left - Brand & Description */}
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Respirix Healthcare
                                    </h3>
                                    <Text className="text-sm">
                                        Innovating AI-powered healthcare
                                        solutions.
                                    </Text>
                                </div>

                                {/* Center - Quick Links */}
                                <div>
                                    <h4 className="text-md font-semibold mb-2">
                                        Quick Links
                                    </h4>
                                    <NavLinks
                                        navLinks={navLinks}
                                        scrollToSection={scrollToSection}
                                    />
                                </div>

                                {/* Right - Social Links */}
                                <div className="flex flex-col items-center md:items-start">
                                    <h4 className="text-md font-semibold mb-2">
                                        Follow Us
                                    </h4>
                                    <SocialLinks />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Bottom Section - Copyright */}
                    <div className="mt-6 text-center border-t pt-4">
                        <Text className="text-sm">
                            © {new Date().getFullYear()} Respirix Healthcare.
                            All rights reserved.
                        </Text>

                        {isDashboard && (
                            <div className="mt-3 text-sm">
                                <strong>
                                    Dashboard | Made by Project Group 9
                                </strong>
                            </div>
                        )}
                    </div>
                </div>
            </Layout.Footer>
        </Skeleton>
    );
};

export default Footer;
