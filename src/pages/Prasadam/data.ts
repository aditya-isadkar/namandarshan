
export interface PrasadamData {
    id: string;
    title: string;
    image: string;
    description: string;
    templeName: string;
    location: string;
    inclusions?: { item: string }[];
    reviews?: { name: string; location: string; comment: string; rating: number }[];
    significance?: { item: string; description: string }[];
    faqs?: { question: string; answer: string }[];
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export const prasadams: PrasadamData[] = [
    {
        id: "ram-mandir-ayodhya",
        slug: "ram-mandir-prasad-prasadam",
        title: "Ram Mandir Prasad",
        templeName: "Ram Janmabhoomi",
        location: "Ayodhya",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114496/Ayodhya_Ram_Mandir_Inauguration_fhfbun.jpg",
        description: "Receive the divine blessings of Lord Ram directly from Ayodhya. This prasadam includes dry sweets and sacred tulsi leaves offered at the feet of Ram Lalla.",
        inclusions: [
            { item: "Elaichi Dana (Cardamom Seeds)" },
            { item: "Besan Laddu (Pure Ghee)" },
            { item: "Sacred Tulsi Leaves" },
            { item: "Ram Mandir Photo Card" }
        ],
        reviews: [
            {
                name: "Rajesh Kumar",
                location: "Delhi",
                comment: "I couldn’t visit Ayodhya due to health reasons, but receiving this Prasadam felt like Lord Ram came home. The laddu was fresh and packaging was very secure.",
                rating: 5
            },
            {
                name: "Anjali Sharma",
                location: "Mumbai",
                comment: "The divine smell of the Prasad when I opened the box was mesmerizing. Thank you Namandarshan for this service.",
                rating: 5
            }
        ],
        significance: [
            { item: "Elaichi Dana", description: "Traditional offering for ‘Bal Swarup’ (Child form), symbolizing purity and innocence." },
            { item: "Besan Laddu", description: "A tribute to Hanuman Garhi. In Ayodhya, worship is incomplete without the blessings of Bajrangbali." },
            { item: "Tulsi Leaves", description: "Dear to Lord Vishnu and his avatars; no offering to Lord Ram is complete without it." }
        ],
        faqs: [
            { question: "Is this prasadam authentic?", answer: "Yes, we procure the prasadam directly from Ayodhya after offering it at the temple." },
            { question: "How long does delivery take?", answer: "Delivery usually takes 5-7 working days depending on your location." },
            { question: "Can we consume the Tulsi leaves?", answer: "Yes, the Tulsi leaves are sacred and can be consumed or kept in your home temple." }
        ]
    },
    {
        id: "tirupati-balaji-laddu",
        slug: "tirupati-balaji-laddu-prasadam",
        title: "Tirupati Balaji Laddu",
        templeName: "Tirumala Venkateswara Temple",
        location: "Tirupati",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114541/tirumala_bzup4u.jpg",
        description: "The world-famous Tirupati Laddu, enriched with ghee, cashews, and raisins. A sweet symbol of Lord Venkateswara's grace.",
        inclusions: [
            { item: "Srivari Laddu (Big Size)" },
            { item: "Premium Dry Fruits (Cashew & Kishmish)" },
            { item: "Sacred Mishri" },
            { item: "Lord Venkateswara Photo Card" }
        ],
        reviews: [
            {
                name: "Suresh Reddy",
                location: "Hyderabad",
                comment: "The Laddu was so fresh and the aroma filled the house as soon as I opened the box. Truly felt like I was in Tirumala. Govinda!",
                rating: 5
            },
            {
                name: "Meera Iyer",
                location: "Chennai",
                comment: "Blessed to receive Lord Balaji’s prasad at home. The packing was excellent and delivery was on time. Highly recommended.",
                rating: 5
            }
        ],
        significance: [
            { item: "Srivari Laddu", description: "The most sought-after prasadam in the world, symbolizing the sweet grace of Lord Balaji." },
            { item: "Mishri & Dry Fruits", description: "Represents abundance and the sweetness of devotion (Bhakti)." },
            { item: "Lord Venkateswara", description: "Known as Kaliyuga Varada, he grants boons and protects devotees in this age." }
        ],
        faqs: [
            { question: "What is the shelf life of the Laddu?", answer: "The Srivari Laddu has a shelf life of about 10-12 days if kept in a cool, dry place." },
            { question: "Is this the big Laddu?", answer: "Yes, this includes the standard 175g Srivari Laddu offered at the temple." },
            { question: "How is it packaged?", answer: "It is carefully packed in food-grade containers to ensure freshness and prevent damage during transit." }
        ]
    },
    {
        id: "mahakaleshwar-ujjain",
        slug: "mahakaleshwar-prasad-prasadam",
        title: "Mahakaleshwar Prasad",
        templeName: "Mahakaleshwar Jyotirlinga",
        location: "Ujjain",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114505/3.2_d7t8tf.jpg",
        description: "Sacred Bhasma and dry prasad from the Mahakal Bhasma Aarti. A powerful blessing for protection and strength.",
        inclusions: [
            { item: "Sacred Bhasma" },
            { item: "Dry Prasad" },
            { item: "Rudraksha" }
        ],
        reviews: [
            {
                name: "Vikram Singh",
                location: "Indore",
                comment: "Receiving the Bhasma from Mahakal was a dream come true. The packaging was respectful and secure. Jai Mahakal!",
                rating: 5
            },
            {
                name: "Priya Desai",
                location: "Pune",
                comment: "The dry prasad was very fresh. It feels amazing to start the day with Mahakal’s blessings. Highly recommended.",
                rating: 5
            }
        ],
        significance: [
            { item: "Bhasma", description: "The ash from the Aarti symbolizes the destruction of ego and purity of the soul." },
            { item: "Rudraksha", description: "Believed to be the tears of Lord Shiva, offering health and protection from negativity." },
            { item: "Dry Prasad", description: "A source of pure energy (Prana) blessed by the cosmic form of Shiva." }
        ],
        faqs: [
            { question: "What is Bhasma?", answer: "Bhasma is the sacred ash from the Bhasma Aarti, symbolizing the eternal nature of the soul." },
            { question: "How to use the Bhasma?", answer: "You can apply a small pinch on your forehead or consume a tiny amount for spiritual protection." },
            { question: "Is the Rudraksha original?", answer: "Yes, we provide authentic 5-mukhi Rudraksha beads sourced from trusted vendors." }
        ]
    },
    {
        id: "kashi-vishwanath",
        slug: "kashi-vishwanath-prasad-prasadam",
        title: "Kashi Vishwanath Prasad",
        templeName: "Kashi Vishwanath Temple",
        location: "Varanasi",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114558/kashi-vishwanath_h25c9s.png",
        description: "Blessings from spiritual capital of India. Includes Vibhuti, Rudraksha, and dry sweets offered to Lord Shiva.",
        inclusions: [
            { item: "Bel Patra" },
            { item: "Rudraksha" },
            { item: "Lal Peda" }
        ],
        reviews: [
            {
                name: "Amit Verma",
                location: "Varanasi",
                comment: "The Lal Peda was delicious and the Bel Patra was still fresh. Har Har Mahadev! Thank you for this service.",
                rating: 5
            },
            {
                name: "Sneha Gupta",
                location: "Delhi",
                comment: "I couldn’t visit Kashi this year, but this prasadam made me feel connected to Baba Vishwanath. Very happy.",
                rating: 5
            }
        ],
        significance: [
            { item: "Bel Patra", description: "The favorite leaf of Lord Shiva, believed to cool his temper and grant wishes." },
            { item: "Rudraksha", description: "Symbolizing the tears of Shiva, it offers divine protection and health." },
            { item: "Lal Peda", description: "A traditional sweet from Varanasi, offered as ‘Bhog’ to the deity." }
        ],
        faqs: [
            { question: "What is Lal Peda?", answer: "Lal Peda is a famous roasted condensed milk sweet unique to Varanasi, known for its rich taste." },
            { question: "Will the Bel Patra be fresh?", answer: "We pack semi-dried Bel Patra to ensure it doesn't spoil during transit while retaining its sanctity." },
            { question: "Can I wear the Rudraksha?", answer: "Yes, you can wear the Rudraksha after a simple energizing ritual (Prana Pratishtha) at home." }
        ]
    },
    {
        id: "mata-vaishno-devi",
        slug: "mata-vaishno-devi-prasad-prasadam",
        title: "Mata Vaishno Devi Prasad",
        templeName: "Vaishno Devi Shrine",
        location: "Katra",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114546/mata-vaishno-devi_k20q9o.png",
        description: "Special dry fruits, mishri, and a sacred coin from the holy cave of Mata Vaishno Devi.",
        inclusions: [
            { item: "Premium Walnuts & Dry Apple" },
            { item: "Sacred Mishri (Rock Sugar)" },
            { item: "Mata ka Sikka (Holy Coin)" },
            { item: "Sacred Red Mauli (Thread)" },
            { item: "Mata Rani Photo Card" }
        ],
        reviews: [
            {
                name: "Simran Kaur",
                location: "Chandigarh",
                comment: "Receiving Mata ka Sikka was such a blessing. I have kept it in my temple. The dry fruits were high quality.",
                rating: 5
            },
            {
                name: "Rahul Khanna",
                location: "Delhi",
                comment: "Jai Mata Di! The packing was very secure and I felt the positive vibes as soon as I received the parcel.",
                rating: 5
            }
        ],
        significance: [
            { item: "Mata Ka Sikka", description: "Known as ‘Khazana’, keeping this in your locker or purse is believed to bring wealth and abundance." },
            { item: "Walnuts (Akhrot)", description: "A traditional offering from the cold mountains of Katra, representing health and strength." },
            { item: "Mishri", description: "Represents the sweetness of the mother-child bond between the devotee and Maa." }
        ],
        faqs: [
            { question: "Is the coin made of silver?", answer: "The 'Mata Ka Sikka' is a commemorative mixed-metal coin, blessed at the shrine." },
            { question: "What should I do with the coin?", answer: "It is considered a 'Khazana' (treasure). You can keep it in your locker or wallet for prosperity." },
            { question: "Are the walnuts from Kashmir?", answer: "Yes, we source high-quality walnuts from the Katra/Kashmir region." }
        ]
    },
    {
        id: "jagannath-puri-khaja",
        slug: "jagannath-puri-khaja-prasadam",
        title: "Jagannath Puri Khaja",
        templeName: "Jagannath Temple",
        location: "Puri",
        image: "https://res.cloudinary.com/dryickpre/image/upload/v1770114519/Jagannath-Temple-Puri-Odisha-scaled_avinzs.jpg",
        description: "Traditional crispy layered sweet (Khaja) offered as Mahaprasad to Lord Jagannath. Delivers the taste of devotion.",
        inclusions: [
            { item: "Khaja" },
            { item: "Nirmalya" },
            { item: "Mahaprasad" }
        ],
        reviews: [
            {
                name: "Anirban Das",
                location: "Kolkata",
                comment: "The Khaja was perfectly crispy and fresh. It felt like I was standing in Anand Bazaar in Puri. Jai Jagannath!",
                rating: 5
            },
            {
                name: "Rakesh Panda",
                location: "Bhubaneswar",
                comment: "Receiving the Nirmalya with the Prasad was a blessing. The packaging kept everything safe and pure.",
                rating: 5
            }
        ],
        significance: [
            { item: "Khaja", description: "A crispy, layered sweet delight that is the favorite of Lord Jagannath, representing the layers of devotion." },
            { item: "Nirmalya", description: "The dried flowers offered to the deity; unlike others, Puri’s nirmalya is eternal and offers strong spiritual protection." },
            { item: "Mahaprasad", description: "Eating it connects the devotee directly to the divine consciousness of the Lord." }
        ],
        faqs: [
            { question: "Is the Khaja fresh?", answer: "Khaja is a dry sweet with a long shelf life. We ensure it is fresh when dispatched." },
            { question: "What is Nirmalya?", answer: "Nirmalya consists of dried flowers that were offered to Lord Jagannath. It acts as a powerful protective talisman." },
            { question: "How long does delivery to South India take?", answer: "Delivery typically takes 5-7 days across India." }
        ]
    }
];
