import React from "react";
import Container from "./Container";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-lightBg pt-16 pb-8">
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-darkGreen">About Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Morocco Grove Naturals brings authentic Moroccan beauty secrets to
              your daily routine. Our products are crafted with care using
              traditional ingredients from the heart of Morocco to the soul of
              your beauty.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaPinterest].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-600 hover:text-darkGreen transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-darkGreen">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                "Shipping Policy",
                "Returns & Refunds",
                "FAQ",
                "Terms & Conditions",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-darkGreen transition-colors text-sm inline-block border-b border-transparent hover:border-darkGreen"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-darkGreen">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="font-medium">Email:</span>{" "}
                info@moroccogrove.com
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Address:</span> 123 Beauty Lane,
                <br />
                Morocco Grove, MG 12345
              </p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-darkGreen">Newsletter</h3>
            <p className="text-sm text-gray-600">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-darkGreen"
              />
              <button className="w-full bg-darkGreen text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
            <p className="text-gray-500 text-sm text-center">
              © 2024{" "}
              <span className="text-darkGreen font-semibold">Laabousse</span>.
              All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
