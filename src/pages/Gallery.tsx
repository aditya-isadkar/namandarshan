import React from "react";
import Layout from "../components/layout/Layout";
import { Container } from "../components/ui/container";

const GALLERY_IMAGES = [
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115968/neelkanth-3_gg9djt.jpg", alt: "Neelkanth Mahadev" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115000/o_yux8jp.jpg", alt: "Temple Darshan" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115004/n_c16tqe.jpg", alt: "Pilgrimage Site" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115008/m_l3axkh.jpg", alt: "Devotees" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115017/l_syn8d5.jpg", alt: "Holy Shrine" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115012/j_o3tyts.jpg", alt: "Ganga Aarti" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115972/k_o5a6cu.jpg", alt: "Mountain Temple" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115975/ste_atxo2b.jpg", alt: "Spiritual Journey" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115978/lmn_rjlith.jpg", alt: "Sacred Rituals" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115981/bd_xphbyb.jpg", alt: "Temple Architecture" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115984/mn_tyawm2.jpg", alt: "Divine Blessings" },
    { url: "https://res.cloudinary.com/dryickpre/image/upload/v1770115987/nl_zytrga.jpg", alt: "Yatra Experience" },
];

const Gallery = () => {
    return (
        <Layout>
            <Container className="py-12 md:py-20">
                <div className="text-center mb-12">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">Gallery</h1>
                    <p className="text-xl text-stone-600">Glimpses of spiritual journeys with Naman</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {GALLERY_IMAGES.map((image, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl aspect-[4/3] cursor-pointer">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {image.alt}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Layout>
    );
};

export default Gallery;
