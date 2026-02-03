export interface PujaData {
    id: string;
    title: string;
    image: string;
    description: string;
    about: string;
    benefits: string;
    samagri: string;
    timing: string;
    duration: string;
    location: string;

    imageFit?: "contain" | "cover";
    gloryTitle?: string;
    process?: { title: string; description: string }[];
    faqs?: { question: string; answer: string }[];
    importance?: { title: string; description: string }[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export const pujas: PujaData[] = [
    {
        id: "sunderkand-path-puja",
        title: "Personalized Sunderkand Paath in Ayodhya",
        gloryTitle: "Sunderkand in Ayodhya",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115072/Gemini_Generated_Image_obzwdrobzwdrobzw_xff0xs.png", // Lord Hanuman/Ram related
        description: "Experience the divine vibrations of Hanuman Ji at the holy birthplace of Shri Ram. We facilitate authentic Vedic recitations with your specific Name and Gotra to bring protection, peace, and prosperity to your home.",
        about: "Sunderkand is the most blessed segment of the Ramayana. It portrays the devotion of Lord Hanuman towards Lord Rama. Reciting it is believed to remove afflictions, obstacles, and bring peace and prosperity to the devotee's life.",
        benefits: "Removal of obstacles, strength, courage, peace of mind, and protection from negative energies.",
        samagri: "Hanuman Sindoor, Jasmine Oil, Red Flowers, Sweets (Laddoo), Betel Leaves.",
        timing: "Tuesday or Saturday",
        duration: "2 to 3 hours",
        location: "Online / Temple",


        imageFit: "contain",
        process: [
            { title: "Personal Sankalp Grahan", description: "Pandit Ji chants your Name and Purpose to establish your spiritual presence in the holy Dham." },
            { title: "Complete Vedic Paath", description: "Full recitation of 60 chapters by Ayodhya Brahmins following traditional Gurukul Chhanda rhythms." },
            { title: "WhatsApp Proof", description: "A personalized video recording of your Sankalp is sent to you immediately after completion for total faith." }
        ],
        faqs: [
            { question: "Can I perform this puja online?", answer: "Yes, this puja is performed in Ayodhya/Temple and streamed live via WhatsApp/Zoom." },
            { question: "What details are needed?", answer: "We need your Full Name, Gotra (if known), and current City for the Sankalp." },
            { question: "Will I get Prasad?", answer: "Yes, dry Prasad and blessed threads (Raksha Sutra) can be couriered to your address upon request." }
        ],
        importance: [
            { title: "Kotwal of Ayodhya", description: "Hanuman Ji is the eternal protector of Ayodhya. A puja performed here ensures that your prayers reach the feet of Lord Ram with his divine recommendation." },
            { title: "Remedy for Shani Dosh", description: "Scriptures confirm Sunderkand as the supreme remedy for planetary imbalances, Shani Dosh, and mental distress. It infuses life with courage and wisdom." },
            { title: "Authentic Vibrations", description: "Chanting verses in the vibrations of Ayodhya Janmabhoomi multiplies the spiritual impact a thousandfold compared to regular recitations." }
        ],
        seoTitle: "Sunderkand Path Ayodhya Booking | Online Hanuman Puja",
        seoDescription: "Book personalized Sunderkand Path at Ayodhya. Experience divine vibrations of Hanuman Ji. Complete Vedic recitation with video proof.",
        seoKeywords: ["sunderkand path ayodhya", "online hanuman puja", "ayodhya ram mandir puja", "personal sankalp rituals"]
    },
    {
        id: "shiv-rudrabhishek-puja",
        title: "Shiv Rudrabhishek",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115078/Gemini_Generated_Image_y6utrty6utrty6ut_x8hlhj.png", // Lord Shiva related
        description: "A powerful Vedic ritual bathing the Shivling with sacred offerings while chanting the Rudra Suktam to please Lord Shiva.",
        about: "Rudrabhishek is one of the most significant rituals to please Lord Shiva. It involves bathing the Shivling with sacred materials like milk, honey, ghee, yogurt, and gangajal while chanting Rudra Suktam.",
        benefits: "Health, wealth, prosperity, removal of sins, and fulfillment of desires.",
        samagri: "Milk, Curd, Honey, Ghee, Sugar, Gangajal, Bilva Patra, Datura, Flowers.",
        timing: "Every Monday or Pradosh",
        duration: "45 to 60 minutes",
        location: "Kashi / Kedarnath / Home",
        faqs: [
            { question: "What is the best time for Rudrabhishek?", answer: "Early morning (Brahma Muhurat) or Pradosh Kaal on Mondays are considered most auspicious." },
            { question: "Can we perform this at home?", answer: "Yes, our pandits can visit your home or perform it online with a designated Shivling." },
            { question: "Is fasting required?", answer: "Fasting is recommended but not mandatory. A satvik diet is advised on the day of the puja." }
        ],
        seoTitle: "Shiv Rudrabhishek Puja Booking | Online Shiva Puja",
        seoDescription: "Book Shiv Rudrabhishek Puja online for health, wealth, and prosperity. Perform authentic Vedic ritual for Lord Shiva with experienced Pandits.",
        seoKeywords: ["Shiv Rudrabhishek Puja booking", "Online Rudrabhishek Puja", "Lord Shiva Puja", "Rudra Abhishek benefits", "Shiva temple ritual"]
    },
    {
        id: "maha-laxmi-mata-puja",
        title: "Maha Laxmi Mata Puja",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115084/Gemini_Generated_Image_vtrtn1vtrtn1vtrt_scwv8g.png", // Divine/Aarti related
        description: "Worship of Goddess Laxmi, the deity of wealth and prosperity, to invite abundance and financial stability into your life.",
        about: "Maha Laxmi Puja is performed to invoke the blessings of the Goddess of Wealth. It is especially auspicious on Fridays and festive occasions like Diwali.",
        benefits: "Financial stability, wealth accumulation, success in business, and overall abundance.",
        samagri: "Lotus flowers, Coins, Sweets, Red Cloth, Kumkum, Turmeric.",
        timing: "Friday or Purnima",
        duration: "1 to 1.5 hours",
        location: "Home / Temple",
        faqs: [
            { question: "When should I perform Laxmi Puja?", answer: "It is best performed on Fridays, Purnima (Full Moon), or during Deepavali." },
            { question: "Does this help with debt?", answer: "Yes, worshipping Mahalaxmi with true devotion helps clear financial blockages and debts." },
            { question: "What should I wear?", answer: "Red or pink colored clothes are preferred for this puja." }
        ],
        seoTitle: "Maha Laxmi Puja Booking | Wealth & Prosperity Ritual",
        seoDescription: "Book Maha Laxmi Mata Puja online to invite wealth and abundance. Authentic Vedic rituals for financial stability and business success.",
        seoKeywords: ["Maha Laxmi Puja booking", "Online Laxmi Puja", "Wealth puja", "Prosperity rituals", "Diwali Laxmi Puja", "Financial stability puja"]
    },
    {
        id: "panchamrut-abhishek-puja",
        title: "Panchamrut Abhishek",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115093/panc-main_t40eog.jpg",
        description: "Ceremonial bathing of the deity with a sacred mixture of five nectars: milk, curd, honey, ghee, and sugar.",
        about: "Panchamrut Abhishek involves bathing the deity with a mixture of five sacred liquids: milk, curd, honey, ghee, and sugar. Each ingredient holds deep spiritual significance.",
        benefits: "Purification of mind and body, health, vitality, and spiritual upliftment.",
        samagri: "Milk, Curd, Honey, Ghee, Sugar.",
        timing: "Morning",
        duration: "30 minutes",
        location: "Any Temple",
        faqs: [
            { question: "What is Panchamrut?", answer: "It is a mixture of five holy foods: Milk, Curd, Ghee, Honey, and Sugar." },
            { question: "Can I drink Panchamrut?", answer: "Yes, it is distributed as Charanamrit (sacred nectar) after the Abhishekam." },
            { question: "Which deities accept Panchamrut?", answer: "It is commonly offered to Lord Shiva, Vishnu, and other major deities." }
        ],
        seoTitle: "Panchamrut Abhishek Booking | Sacred Bathing Ritual",
        seoDescription: "Book Panchamrut Abhishek online. Experience the sacred bathing ritual with five nectars for purification and spiritual upliftment.",
        seoKeywords: ["Panchamrut Abhishek booking", "Panchamrit Puja benefits", "Abhishekam ritual", "Lord Shiva Abhishek", "Hindu bathing ritual"]
    },
    {
        id: "shodashopachar-puja",
        title: "Shodashopachar Puja",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115096/sodh-main_zg2dc3.jpg",
        description: "An elaborate 16-step worship ritual offering various sacred items to the deity for complete devotion and blessings.",
        about: "Shodashopachar Puja consists of sixteen necessary stages of worship. Offerings of flowers, incense, light, food, and other symbolic objects are made to the deity with specific mantras.",
        benefits: "Complete connection with the divine, fulfillment of all wishes, and deep spiritual satisfaction.",
        samagri: "16 specific offerings including Vastram, Gandham, Pushpam, Dhoopam, Deepam, Naivedyam etc.",
        timing: "Special Occasions",
        duration: "1.5 to 2 hours",
        location: "Temple",
        faqs: [
            { question: "What does 'Shodashopachar' mean?", answer: "It means '16 ways of service' or offering 16 types of hospitalities to the deity." },
            { question: "Is this suitable for all gods?", answer: "Yes, this 16-step process is the standard Vedic way to worship any major deity." },
            { question: "Can I do this daily?", answer: "While typically done on special days, it can be performed daily if one has the time and resources." }
        ],
        seoTitle: "Shodashopachar Puja Ritual | 16-Step Vedic Worship",
        seoDescription: "Perform Shodashopachar Puja, the complete 16-step Vedic worship ritual. invoke divine blessings with elaborate offerings and mantras.",
        seoKeywords: ["Shodashopachar Puja ritual", "16 step puja", "Vedic worship steps", "Hindu deity worship", "Shodasha Upachara"]
    },
    {
        id: "maha-shakti-tridevi-puja",
        title: "Maha Shakti Tridevi Puja",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770115090/Gemini_Generated_Image_2kqx2p2kqx2p2kqx_mz29pb.png",
        description: "Worship of the three supreme Goddesses – Durga (Power), Laxmi (Wealth), and Saraswati (Knowledge) – for holistic wellbeing.",
        about: "This powerful puja invokes the blessings of the Tridevi. It combines the energies of strength, wealth, and wisdom.",
        benefits: "Overall success, power, protection, wisdom, and prosperity.",
        samagri: "Red, White and Yellow flowers, Special Sarees, bangles, sweets.",
        timing: "Navratri or Fridays",
        duration: "2 to 3 hours",
        location: "Shakti Peeth / Home",
        faqs: [
            { question: "Who are the Tridevi?", answer: "Durga (Strength), Laxmi (Wealth), and Saraswati (Wisdom)." },
            { question: "Is this helpful for students?", answer: "Yes, worshipping Goddess Saraswati as part of this puja aids in education and arts." },
            { question: "Why perform Tridevi Puja?", answer: "It balances all aspects of life: Material success, mental peace, and spiritual power." }
        ],
        seoTitle: "Maha Shakti Tridevi Puja | Worship Durga, Laxmi, Saraswati",
        seoDescription: "Book Maha Shakti Tridevi Puja for holistic wellbeing. Invoke blessings of Durga, Laxmi, and Saraswati for power, wealth, and wisdom.",
        seoKeywords: ["Maha Shakti Tridevi Puja", "Tridevi worship", "Durga Laxmi Saraswati puja", "Navratri puja booking", "Goddess worship rituals"]
    }
];
