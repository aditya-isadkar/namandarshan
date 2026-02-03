import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import YatraPackageCard from "../../Yatra/components/YatraPackageCard";
import kedarnathImg from "@/assets/kedarnath.jpg";
import vrindavanImg from "@/assets/vrindavan.jpg";
import ayodhyaImg from "@/assets/ayodhya.jpg";
import badrinathImg from "@/assets/badrinath.jpg";

const PopularYatras = () => {
  const yatras = [
    {
      id: "kedarnath",
      title: "Kedarnath Yatra",
      description: "A holy journey to the abode of Lord Shiva in the Himalayas.",
      image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114985/kedarnath-300x300_ftg56k.webp",
      link: "/kedarnath-yatra",
      duration: "5 Days / 4 Nights",
      location: "Uttarakhand"
    },
    {
      id: "vrindavan",
      title: "Vrindavan Yatra",
      description: "Experience the divine love of Radha and Krishna in Vrindavan.",
      image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114989/Mathura-Vrindavan-Spiritual-haven-for-devotees-Prem-Mandir-Image-3-300x200_epa3t3.webp",
      link: "/vrindavan-yatra",
      duration: "3 Days / 2 Nights",
      location: "Uttar Pradesh"
    },
    {
      id: "ayodhya",
      title: "Ayodhya Yatra",
      description: "The birthplace of Lord Ram and spiritual capital of devotion.",
      image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115141/ram-murti_hlfmqw.jpg",
      link: "/ayodhya-yatra",
      duration: "3 Days / 2 Nights",
      location: "Ayodhya, UP"
    },
    {
      id: "chardham",
      title: "Char Dham Yatra",
      description: "One of the most sacred Hindu pilgrimages covering four divine abodes.",
      image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114982/badrinath-2-300x225_kqgg5s.jpg",
      link: "/char-dham-yatra",
      duration: "11 Days / 10 Nights",
      location: "Uttarakhand"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Most Popular Packages
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover India's most sacred pilgrimage destinations and embark on a spiritual journey
          </p>
        </div>

        {/* Yatra Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {yatras.map((yatra, index) => (
            <div key={yatra.id} style={{ animationDelay: `${index * 100}ms` }} className="p-2 h-full">
              <YatraPackageCard
                title={yatra.title}
                image={yatra.image}
                description={yatra.description}
                duration={yatra.duration}
                location={yatra.location}
                slug={yatra.link}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/yatra">
            <Button variant="outline" size="lg" className="gap-2">
              View All Yatras
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularYatras;
