import Link from "next/link";
import Image from "next/image";
import { Scissors, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
              <Image src="/logo.png" alt="Salon Seven Zee Logo" width={24} height={24} className="w-6 h-6 rounded-full" />
              <span>Salon Seven Zee</span>
            </Link>
            <p className="text-neutral-400 max-w-sm">
              Elevating your style with premium hair and beauty services in a luxurious, relaxing environment.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors text-white">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#stylists" className="hover:text-white transition-colors">Our Stylists</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              <li>Hair Styling & Cutting</li>
              <li>Coloring & Highlights</li>
              <li>Nail Care & Art</li>
              <li>Facials & Skincare</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li>123 Beauty Lane,<br/>Style City, SC 12345</li>
              <li>contact@salonsevenzee.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Salon Seven Zee. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
