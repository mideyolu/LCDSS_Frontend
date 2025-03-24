import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "./service";


// Navigation Links Component
export const NavLinks = ({ navLinks, scrollToSection }) => (
    <ul className="space-y-3  text-sm">
        {navLinks.map((link, index) =>
            link.to ? (
                <li key={index}>
                    <Link to={link.to} className="hover:text-gray-400">
                        {link.label}
                    </Link>
                </li>
            ) : (
                <li key={index}>
                    <button
                        onClick={(e) => scrollToSection(link.ref, e)}
                        className="cursor-pointer hover:text-gray-400"
                    >
                        {link.label}
                    </button>
                </li>
            ),
        )}
    </ul>
);

// Social Links Component
export const SocialLinks = () => (
    <div className="flex gap-4">
        {socialLinks.map(({ icon: Icon, url }, index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                <Icon size={20} className="hover:text-gray-400 transition" />
            </a>
        ))}
    </div>
);
