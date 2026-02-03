import Chadhava from ".";

export interface Offering {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    image: string;
    tag: string;
    features?: string[];
    significance?: { title: string; description: string }[];
    reviews?: { name: string; location: string; comment: string; rating: number }[];
    faqs?: { question: string; answer: string }[];
    templeName: string;
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export const offerings: Offering[] = [
    {
        id: "1",
        slug: "brahmin-panda-seva-chadhava",
        templeName: "Moksha Teerth",
        name: "Brahmin-Panda Seva",
        description: "On Jaya Ekadashi, Purohitji will offer Brahmin and Panda Seva at 4 moksha teerth locations.",
        longDescription: "Honor the guardians of our sacred pilgrimages with this special Seva on the auspicious occasion of Jaya Ekadashi. Our dedicated Purohits will perform a comprehensive Brahmin and Panda Seva across 4 key Moksha Teerth locations on your behalf.\n\nThis act of gratitude involves feeding, clothing, and offering Dakshina to the Brahmins who have preserved our Vedic traditions for generations. It is believed that serving them brings the direct blessings of the ancestors and ensures the flow of divine grace into your lineage.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114558/kashi-vishwanath_h25c9s.png",
        tag: "SPECIAL",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Rahul Sharma", location: "Delhi", comment: "The video update was very touching. Felt like I was there.", rating: 5 },
            { name: "Suman Gupta", location: "Mumbai", comment: "Very well organized seva. Blessings to the team.", rating: 5 }
        ],
        faqs: [
            { question: "How will I know the Seva is done?", answer: "We will share a video of the Seva being performed with your Sankalp details via WhatsApp." },
            { question: "Can I perform this for my ancestors?", answer: "Yes, this Seva is highly recommended for ancestral blessings (Pitru Dosha Nivaran)." }
        ]
    },
    {
        id: "2",
        slug: "triple-devi-blessings-chadhava",
        templeName: "Kali, Lakshmi, & Saraswati Temples",
        name: "Triple Devi Blessings",
        description: "Gupt Navratri Mahanavami Chadhava at Kali, Lakshmi, and Saraswati temples.",
        longDescription: "Unlock the trifold power of the Divine Feminine during the secret and potent days of Gupt Navratri. This restricted offering allows you to send Chadhava to the three supreme forms of Shakti: Mahakali, Mahalakshmi, and Mahasaraswati.\n\nPerformed on Mahanavami, this ritual is designed to grant you strength, wealth, and wisdom. Your offerings of red chunri, fruits, and sweets will be presented at their respective temples, invoking protection against negativity, abundance in life, and clarity of mind.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114546/mata-vaishno-devi_k20q9o.png",
        tag: "NAVRATRI",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Anita Desai", location: "Gujarat", comment: "Received the blessings. Felt very peaceful.", rating: 5 },
            { name: "Priya Singh", location: "UP", comment: "Great initiative for those who cannot travel.", rating: 4 }
        ],
        faqs: [
            { question: "What is included in the Chadhava?", answer: "The Chadhava includes Red Chunri, Fruits, Sweets, and Sringar items for the Goddesses." },
            { question: "Is this done on a specific day?", answer: "Yes, this offering is performed specifically on Mahanavami of Gupt Navratri." }
        ]
    },
    {
        id: "3",
        slug: "kundali-grah-shanti-chadhava",
        templeName: "Shani Shingnapur & Navgrah Temples",
        name: "Kundali Grah Shanti",
        description: "Seek powerful blessings through Karma Shanti Chadhava offered at 6 sacred temples.",
        longDescription: "Balance the cosmic influences in your life with our comprehensive Kundali Grah Shanti Chadhava. This ritual is meticulously designed to pacify planetary disturbances by making offerings at 6 historically significant energy centers.\n\nWhether you are facing hurdles in career, health, or relationships, this multi-temple offering aims to neutralize negative karma and enhance positive planetary vibes. Our Purohits will chant specific mantras for your Gotra at each location, creating a protective shield of spiritual energy around you.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114505/3.2_d7t8tf.jpg",
        tag: "6 TEMPLES",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Vikram Malhotra", location: "Bangalore", comment: "I removed many obstacles in my business after this.", rating: 5 },
            { name: "Neha Kapoor", location: "Delhi", comment: "Very professional service. Recommended.", rating: 5 }
        ],
        faqs: [
            { question: "Which temples are included?", answer: "We perform offerings at 6 major temples known for planetary peace, including Shani Shingnapur and Navgrah Temples." },
            { question: "Do I need to check my Kundali first?", answer: "It is beneficial but not mandatory. This is a general Grah Shanti for overall well-being." }
        ]
    },
    {
        id: "4",
        slug: "khatu-shyam-aaradhana-chadhava",
        templeName: "Khatu Shyam Ji Temple",
        name: "Khatu Shyam Aaradhana",
        description: "Worship Khatu Shyam Ji for protection. Includes Chadhava, Akhand Jyoti, Hawan & Abhishek.",
        longDescription: "Surrender to the grace of the 'God of the Losers' and find victory in your endeavors. This complete Khatu Shyam Aaradhana package is a powerful way to seek the support of Baba Shyam in times of distress.\n\nThe service includes a grand Chadhava offering, the lighting of an Akhand Jyoti in your name to dispel darkness, a purifying Hawan to cleanse the atmosphere, and a sacred Abhishek. It is a holistic approach to worship that promises protection, reversal of bad fortune, and the fulfillment of heartfelt wishes.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114541/tirumala_bzup4u.jpg",
        tag: "PROTECTION",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Sanjay Kumar", location: "Jaipur", comment: "Jai Shree Shyam! The video was excellent.", rating: 5 }
        ],
        faqs: [
            { question: "Will I get Prasad?", answer: "Yes, dry Prasad from Khatu Shyam Ji will be delivered to your address." },
            { question: "What is Akhand Jyoti?", answer: "It is a continuous flame lit in your name for 24 hours to invoke divine light and remove darkness." }
        ]
    },
    {
        id: "5",
        slug: "shiv-mantra-jaap-chadhava",
        templeName: "Pashupatinath Temple",
        name: "Shiv Mantra Jaap",
        description: "Align your zodiac with Rashi Anusaar Shiv Mantra Jaap at Pashupatinath Temple.",
        longDescription: "Align your spiritual energy with your Zodiac. This Maghi Purnima, seek the blessings of Lord Pashupatinath through a personalized Vedic Jaap ceremony. Lord Shiva is the controller of all planetary movements, and performing a Jaap specific to your Rashi (Zodiac) is believed to provide targeted relief from planetary afflictions.\n\nPerformed at the holy Pashupatinath temple circuit, our Purohits will identify the specific Shiv Mantra that resonates with your Rashi. A dedicated Sankalp will be taken using your Name, Gotra, and Date of Birth to ensure the vibrations of the Jaap directly benefit your astrological chart.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114558/kashi-vishwanath_h25c9s.png",
        tag: "NAVGRAH",
        features: [
            "Rashi-Specific Mantra Selection",
            "108 Repetitions in Your Name",
            "Personal Sankalp at Pashupatinath",
            "Digital Video Proof via WhatsApp"
        ],
        significance: [
            { title: "Planetary Relief", description: "Targeted mantras help pacify the ‘Shanti’ requirements of your specific moon sign." },
            { title: "Maghi Purnima", description: "This full moon day is spiritually charged for beginning any new mantra sadhana." },
            { title: "Pashupatinath", description: "Performing this at the temple of the “Lord of all Creatures” ensures universal protection." }
        ],
        reviews: [
            { name: "Arun Verma", location: "Pune", comment: "Felt a lot of positivity after the Jaap. Thank you.", rating: 5 },
            { name: "Meera Reddy", location: "Hyderabad", comment: "Authentic Vedic process followed.", rating: 4 }
        ],
        faqs: [
            { question: "How do you know my Rashi?", answer: "We will ask for your Date of Birth and Time to calculate your Rashi before the Jaap." },
            { question: "Can I watch the Jaap live?", answer: "We provide a recorded video of the Sankalp and a part of the Jaap due to temple restrictions on live streaming." }
        ]
    },
    {
        id: "6",
        slug: "maghi-purnima-snan-chadhava",
        templeName: "Triveni Sangam, Prayagraj",
        name: "Maghi Purnima Snan",
        description: "Offerings at Teerthraj Prayag's Sangam for peace and liberation. Includes Satyanarayan Katha.",
        longDescription: "Participate in the most meritorious bath of the year from the comfort of your home. The Maghi Purnima Snan at the Triveni Sangam in Prayagraj is legendary for washing away lifetimes of sins. We facilitate a symbolic offering and ritual on your behalf at this holy confluence.\n\nAlongside the Snan rituals, a Satyanarayan Katha will be recited in your name to invoke truth, abundance, and family well-being. This combination of purification and prayer is ideal for those seeking spiritual reset and the blessing of Moksha.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114519/Jagannath-Temple-Puri-Odisha-scaled_avinzs.jpg",
        tag: "MOKSHA",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Ramesh Tiwari", location: "Varanasi", comment: "A very pious act. Glad I could participate remotely.", rating: 5 }
        ],
        faqs: [
            { question: "What is Triveni Sangam?", answer: "It is the sacred confluence of three rivers: Ganga, Yamuna, and Saraswati." },
            { question: "What is the benefit of Snan on Maghi Purnima?", answer: "It is believed to wash away sins and pave the way for Moksha (liberation)." }
        ]
    },
    {
        id: "7",
        slug: "maha-shivratri-seva-chadhava",
        templeName: "Pashupatinath Temple",
        name: "Maha Shivratri Seva",
        description: "The night of Shiv-Shakti union. Purohitji will perform Mahamantra Sadhana at Pashupatinath.",
        longDescription: "Celebrate the 'Great Night of Shiva' with a powerful Mahamantra Sadhana at the ancient Pashupatinath Temple. Maha Shivratri is the most potent time for Shiva worship, representing the union of consciousness (Shiva) and energy (Shakti).\n\nOn this holy night, our learned Purohits will chant the Mahamritunjaya and other sacred mantras while performing Rudrabhishek in your name. This service is especially beneficial for health, longevity, and marital bliss. It is a unique opportunity to tap into the cosmic energy of Shiva.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114505/3.2_d7t8tf.jpg",
        tag: "SHIVRATRI",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Kiran Bedi", location: "Chandigarh", comment: "Cannot wait for Shivratri. Booked for my whole family.", rating: 5 }
        ],
        faqs: [
            { question: "When is Maha Shivratri?", answer: "It falls on [Date] this year." },
            { question: "What is Mahamrityunjaya Mantra?", answer: "It is a life-restoring mantra addressed to Lord Shiva for health and longevity." }
        ]
    },
    {
        id: "8",
        slug: "jyotirlinga-chadhava-chadhava",
        templeName: "Omkareshwar & Trimbakeshwar",
        name: "Jyotirlinga Chadhava",
        description: "Offerings at Omkareshwar & Trimbakeshwar Jyotirlingas for spiritual growth.",
        longDescription: "Connect with the supreme light of Shiva through offerings at two of the twelve revered Jyotirlingas: Omkareshwar and Trimbakeshwar. These sites are powerful sources of cosmic radiation and are ancient centers of pilgrimage.\n\nYour Chadhava will include Bilva patra, Jal (water), and flowers offered directly to the Lingams. Worshipping at these Jyotirlingas is said to burn past karmas and illuminate the path to spiritual enlightenment. It is a profound way to seek inner peace and divine guidance.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114558/kashi-vishwanath_h25c9s.png",
        tag: "2 TEMPLES",
        features: ["Traditional Vedic Rituals", "Sankalp in Your Name", "Prasadam Delivery", "Video Update"],
        significance: [
            { title: "Divine Blessings", description: "Experience the profound spiritual energy and grace of the deity." },
            { title: "Dosha Nivaran", description: "Helps in alleviating planetary afflictions and bringing peace." },
            { title: "Family Harmony", description: "Brings prosperity, health, and happiness to your family." }
        ],
        reviews: [
            { name: "Alok Nath", location: "Indore", comment: "Blessed to have darshan of Jyotirlingas.", rating: 5 }
        ],
        faqs: [
            { question: "Why these two Jyotirlingas?", answer: "They are geographically close and represent powerful aspects of Shiva." },
            { question: "Is travel included?", answer: "No, this is a remote offering service. We perform the rituals on your behalf." }
        ]
    },
    {
        id: "9",
        slug: "mangalnath-mahadev-chadhava",
        templeName: "Mangalnath Temple, Ujjain",
        name: "Mangalnath Mahadev",
        description: "Invoke Mangal's blessings and ease Mangal doshas at the Mangalnath Temple.",
        longDescription: "Heal your Mangal Dosha at the Center of the Earth.Located in Ujjain, the Mangalnath Temple is uniquely situated at the intersection of the Tropic of Cancer and the Earth’s center, making it the most spiritually potent site for rituals dedicated to the planet Mars (Mangal).\n\nOur Purohits will perform the Mangal Shanti Chadhava on your behalf.This ritual is specifically recommended for those facing delays in marriage, property disputes, or high levels of aggression.The Sankalp is taken in your Name and Gotra, invoking the cooling grace of Lord Shiva to pacify the fiery energy of Mars.",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114505/3.2_d7t8tf.jpg",
        tag: "TUESDAY",
        features: [
            "Special Bhat Puja (Cooked Rice Offering)",
            "Red Kumkum & Flower Chadhava",
            "Sankalp for Mangal Shanti",
            "Digital Video Evidence on WhatsApp"
        ],
        significance: [
            { title: "Dosha Nivaran", description: "Performing Chadhava here is the foremost remedy for ‘Manglik’ chart corrections." },
            { title: "Victory & Courage", description: "Invoke the positive traits of Mars—courage, vitality, and leadership—while removing its negative impacts." },
            { title: "Geographical Potency", description: "As the mythological birthplace of Mars, the vibrations here are unmatched for planetary pacification." }
        ],
        reviews: [
            { name: "Arjun Mehra", location: "London", comment: "I was advised to perform a Mangal Shanti ritual. Being in the UK, I couldn’t travel to Ujjain. This digital Seva was very helpful, and the video proof was clear and authentic.", rating: 5 },
            { name: "Shalini Tiwari", location: "Indore", comment: "I was advised to perform a Mangal Shanti ritual. Being in the UK, I couldn’t travel to Ujjain. This digital Seva was very helpful, and the video proof was clear and authentic.", rating: 5 }
        ],
        faqs: [
            { question: "Is this specifically for Mangliks?", answer: "While highly effective for Mangliks, any individual facing anger issues, debt, or property problems can perform this Seva to balance Mars’ influence." },
            { question: "What is Bhat Puja?", answer: "Bhat Puja is a traditional Ujjain ritual where cooked rice is offered to the deity. Rice represents the moon (cooling) and is used to ‘cool down’ the fiery nature of Mangal." },
            { question: "Can I perform this on a specific Tuesday?", answer: "Tuesdays are the most auspicious for Mangalnath. Please specify your preferred Tuesday in the ‘Message’ box, and we will try our best to accommodate it." },
            { question: "How many names can be added?", answer: "Standard booking is for one individual. If multiple family members have Mangal Dosha, we recommend separate bookings for distinct Sankalps." }
        ]
    }
];
