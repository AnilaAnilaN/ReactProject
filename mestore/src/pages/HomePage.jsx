import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProductsSection from '../components/home/ProductsSection';
import BlogsSection from '../components/home/BlogsSection';
import AboutSection from '../components/home/AboutSection';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <ProductsSection />
      <BlogsSection />
      <AboutSection />
    </div>
  );
}
