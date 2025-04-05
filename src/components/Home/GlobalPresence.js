import React from "react";

const BrandCarousel = () => {
  const brands = [
    "https://static.wixstatic.com/media/6f0655_d3592fdd8034452da8183dd732281034~mv2.jpg/v1/fill/w_335,h_210,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6f0655_d3592fdd8034452da8183dd732281034~mv2.jpg",
    "https://static.wixstatic.com/media/6f0655_5775797c90954f5c861dfb13d0b93d2b~mv2.png/v1/fill/w_410,h_73,al_c,lg_1,q_85,enc_avif,quality_auto/6f0655_5775797c90954f5c861dfb13d0b93d2b~mv2.png",
    "https://static.wixstatic.com/media/6f0655_f9592640a7de4c6785c2c81e9c6fb83c~mv2.jpg/v1/fill/w_253,h_106,al_c,lg_1,q_80,enc_avif,quality_auto/6f0655_f9592640a7de4c6785c2c81e9c6fb83c~mv2.jpg",
    "https://static.wixstatic.com/media/6f0655_26397306643540f5b3321e99444bf674~mv2.png/v1/fill/w_328,h_203,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6f0655_26397306643540f5b3321e99444bf674~mv2.png",
    "https://static.wixstatic.com/media/6f0655_05ae087fb7eb4b408bc00edf65269664~mv2.png/v1/fill/w_280,h_168,al_c,lg_1,q_85,enc_avif,quality_auto/6f0655_05ae087fb7eb4b408bc00edf65269664~mv2.png",
    "https://static.wixstatic.com/media/6f0655_36f6838244574beda710a1162192db5d~mv2.png/v1/fill/w_202,h_179,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6f0655_36f6838244574beda710a1162192db5d~mv2.png",
    "https://static.wixstatic.com/media/6f0655_8f2a0d801ce14290876b5d08593e38a2~mv2.jpg/v1/fill/w_425,h_185,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6f0655_8f2a0d801ce14290876b5d08593e38a2~mv2.jpg",
    "https://static.wixstatic.com/media/6f0655_8247170a3d0546a39cdb10cc78f98371~mv2.jpg/v1/fill/w_299,h_185,al_c,lg_1,q_80,enc_avif,quality_auto/6f0655_8247170a3d0546a39cdb10cc78f98371~mv2.jpg",
    "https://static.wixstatic.com/media/6f0655_2adbf342c7ec41f29f2be84683599f02~mv2.png/v1/fill/w_323,h_168,al_c,lg_1,q_85,enc_avif,quality_auto/6f0655_2adbf342c7ec41f29f2be84683599f02~mv2.png",
  ];

  return (
    <section id="presence" className="brand-carousel overflow-hidden position-relative w-100">
      <div className="container">
        <h3 className="text-center" style={{ marginBottom: "80px" }}>
          GLOBAL PRESENCE
        </h3>
      </div>
      <div className="carousel-track d-flex">
        {/* Duplicating the logos to create an infinite scrolling effect */}
        {[...brands, ...brands].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Brand ${index}`}
            className="brand-logo"
          />
        ))}
      </div>
    </section>
  );
};

export default BrandCarousel;
