import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
    const faqs = [
        {
            question: "What is Naman VIP Darshan?",
            answer: "Naman VIP Darshan is our exclusive service designed to redefine your temple visits. We transform chaotic trips into seamless, privileged spiritual journeys by managing all the logistics, so you can step into the world of divine ease."
        },
        {
            question: "Why should I choose Namandarshan for my temple visit?",
            answer: "We understand the deep spiritual bond between you and the deity. Our service eliminates the hassles of long queues and tedious waiting times, allowing you to prioritize tranquility and focus solely on the joy of your divine encounter."
        },
        {
            question: "Is Namandarshan just a booking platform?",
            answer: "No, we are more than that. We act as your \"Reliable Friend\" and trusted partner throughout your pilgrimage. From planning to darshan, we are committed to ensuring your visit is memorable, comfortable, and deeply spiritual."
        },
        {
            question: "Is the VIP Darshan service suitable for senior citizens?",
            answer: "Absolutely. Our \"Easy Temple Visits\" philosophy is perfect for the elderly. We ensure special care and shorter wait times so that age or health never becomes a barrier to receiving blessings."
        },
        {
            question: "How do I book a VIP Darshan slot?",
            answer: "Booking is simple. Just select your desired temple on our homepage, choose your preferred date, and select the \"VIP Darshan\" option. We handle the rest and send you a confirmed schedule."
        },
        {
            question: "Can I get Prasadam if I am unable to visit the temple personally?",
            answer: "Yes! Through our \"Prasadam at Doorstep\" service, we deliver authentic, sanctified offerings from India’s most revered temples directly to your home, keeping you connected to the divine from anywhere."
        },
        {
            question: "Which temples are covered under Naman VIP Darshan?",
            answer: "We cover major temples across India. Please check our \"Temple Trails\" section for the most up-to-date list of shrines where our VIP services are available."
        }
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-base font-bold text-orange-500 uppercase tracking-widest mb-3">Common Questions</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-primary">Frequently Asked Questions</h3>
                    <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-10 border border-slate-100">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 last:border-0">
                                <AccordionTrigger className="text-left text-lg md:text-xl font-bold text-slate-800 hover:text-orange-500 hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 text-base md:text-lg leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
