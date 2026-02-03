import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { testimonials } from "@/data/testimonialsData";

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Devotees Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join lakhs of satisfied devotees who have experienced divine moments with us
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-6xl mx-auto px-8">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-6">
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border relative h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="absolute -top-0 right-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-foreground mb-6 leading-relaxed flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>

                    {/* Service Tag */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {testimonial.temple}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
