
export interface LiveChannel {
    slug: string;
    name: string;
    location: string;
    videoId: string;
    status: "Live Now" | "Offline";
    customImage?: string;
    description?: string;
    witnessPoints?: string[];
    whyPoints?: string[];
    devotionalTitle?: string;
    devotionalMessage?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export const liveChannels: LiveChannel[] = [
    {
        slug: "ram-mandir",
        name: "Ram Mandir",
        location: "Ayodhya, Uttar Pradesh",
        videoId: "s8TUOyVqZpY",
        status: "Live Now",
        customImage: "https://res.cloudinary.com/dryickpre/image/upload/v1770115084/Gemini_Generated_Image_vtrtn1vtrtn1vtrt_scwv8g.png",
        description: "Experience the divine presence of Maryada Purushottam Prabhu Shri Ram. The Ram Janmabhoomi Teerth Kshetra in Ayodhya is the birthplace of Lord Ram, bringing millions of devotees together in prayer and devotion.",
        witnessPoints: [
            "Mangala, Bhog & Shringar Aarti",
            "Sandhya & Shayan Aarti",
            "Sacred view of the Ram Lalla",
            "Spiritual ambiance of the Garbhagriha",
            "Live rituals and Vedic chants"
        ],
        whyPoints: [
            "Real-time spiritual connection",
            "Ideal for prayers and meditation",
            "Perfect for senior citizens",
            "Smooth, distraction-free experience"
        ],
        devotionalTitle: "Jai Shri Ram",
        devotionalMessage: "May the divine blessings of Lord Ram bring peace and prosperity to your life.",
        seoTitle: "Ram Mandir Ayodhya Live Darshan | Watch Aarti Online",
        seoDescription: "Watch Live Darshan of Ram Lalla from Ayodhya. Experience the divine morning and evening Aarti. Your digital gateway to Ram Janmabhoomi.",
        seoKeywords: ["ram mandir live darshan", "ayodhya live aarti", "ram lalla online darshan", "watch ram mandir live"]
    },
    {
        slug: "kashi-vishwanath",
        name: "Kashi Vishwanath",
        location: "Varanasi, Uttar Pradesh",
        videoId: "80pL3f-HHlM",
        status: "Live Now",
        customImage: "https://kashi.gov.in/cmsadmin/getApiFile/CMS/68c3e3daadb281757668314~jpg",
        description: "Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva. It is located in Varanasi, Uttar Pradesh, India. The temple stands on the western bank of the holy river Ganga, and is one of the twelve Jyotirlingas, the holiest of Shiva temples.",
        witnessPoints: [
            "Mangala Aarti & Rudrabhishek",
            "Bhog & Shringar Darshan",
            "Sacred view of the Jyotirlinga",
            "Ganga Aarti participation",
            "Ancient Vedic chants"
        ],
        whyPoints: [
            "Direct connection to Kashi",
            "Experience divine energy at home",
            "Peaceful meditation aid",
            "High-quality streaming"
        ],
        devotionalTitle: "Har Har Mahadev",
        devotionalMessage: "May Lord Shiva bless you with peace, prosperity, and spiritual enlightenment."
    },
    {
        slug: "mahakaleshwar",
        name: "Mahakaleshwar",
        location: "Ujjain, Madhya Pradesh",
        videoId: "qaKmTdse0XY",
        status: "Live Now",
        customImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJbGMIu4WoE_BoM4dP-fNOt6RJvS4QEtl-Q&s",
        description: "Mahakaleshwar Jyotirlinga is a Hindu temple dedicated to Shiva and is one of the twelve Jyotirlingas, shrines which are said to be the most sacred abodes of Shiva. It is located in the ancient city of Ujjain in the state of Madhya Pradesh, India.",
        witnessPoints: [
            "Bhasma Aarti (Live)",
            "Jal Abhishek rituals",
            "Evening Shringar Darshan",
            "Palki Sawari (Procession)",
            "Divine Jyotirlinga view"
        ],
        whyPoints: [
            "Witness rare Bhasma Aarti",
            "Spiritual cleansing from afar",
            "Connect with Lord Mahakal",
            "24/7 Live Access"
        ],
        devotionalTitle: "Jai Mahakal",
        devotionalMessage: "May Mahakaleshwar protect you from all obstacles and guide you towards moksha."
    },
    {
        slug: "tirupati-balaji",
        name: "Tirupati Balaji",
        location: "Tirupati, Andhra Pradesh",
        videoId: "A27CHZAxh3w",
        status: "Live Now",
        customImage: "https://media.easemytrip.com/media/Blog/India/638815210318949997/638815210318949997CgNttb.png",
        description: "Venkateswara Temple is a Hindu temple situated in the hill town of Tirumala at Tirupati in Chittoor district of Andhra Pradesh, India. The Temple is dedicated to Venkateswara, a form of Vishnu, who is believed to have appeared here to save mankind from trials and troubles of Kali Yuga.",
        witnessPoints: [
            "Suprabhatam Seva",
            "Kalyanotsavam (Marriage Ritual)",
            "Veda Parayanam",
            "Unjal Seva (Swing Service)",
            "Ekantha Seva"
        ],
        whyPoints: [
            "Blessings of Lord Venkateswara",
            "Experience Tirumala's sanctity",
            "Participate in daily sevas",
            "Devotional immersion"
        ],
        devotionalTitle: "Om Namo Venkatesaya",
        devotionalMessage: "May Lord Venkateswara wash away your sins and grant you eternal happiness."
    },
    {
        slug: "vaishno-devi",
        name: "Vaishno Devi",
        location: "Katra, Jammu and Kashmir",
        videoId: "YeyFfqMwQvk",
        status: "Live Now",
        customImage: "https://www.tourmyindia.com/states/jammu-kashmir/image/mata-vaishno-devi3.jpg",
        description: "Vaishno Devi Temple is a Hindu temple dedicated to the Hindu Goddess Vaishno Devi, located in Katra at the Trikuta Mountains within the Indian Union territory of Jammu and Kashmir.",
        witnessPoints: [
            "Morning & Evening Aarti",
            "Holy Pindies Darshan",
            "Bhawan Atmosphere",
            "Bhajan & Kirtan",
            "Divine Mother's Blessings"
        ],
        whyPoints: [
            "Virtual Yatra experience",
            "Connect with Mata Rani",
            "Peace and tranquility",
            "Live from Trikuta Hills"
        ],
        devotionalTitle: "Jai Mata Di",
        devotionalMessage: "May Mata Vaishno Devi fulfill all your wishes and keep you in her divine shelter."
    },
    {
        slug: "somnath-temple",
        name: "Somnath Temple",
        location: "Prabhas Patan, Gujarat",
        videoId: "9CdAndCm7j4",
        status: "Live Now",
        customImage: "https://www.shivkhori.in/wp-content/uploads/2025/08/somnath-jyotir-lingam-1024x1024.webp",
        description: "The Somnath temple located in Prabhas Patan near Veraval in Saurashtra on the western coast of Gujarat, India is believed to be the first among the twelve jyotirlinga shrines of Shiva.",
        witnessPoints: [
            "Detailed Shringar Darshan",
            "Sound & Light Show insights",
            "Samudra Aarti",
            "Grandeur of the Temple",
            "History coming alive"
        ],
        whyPoints: [
            "First Jyotirlinga Darshan",
            "Historical significance",
            "Ocean-side spiritual vibes",
            "Eternal devotion"
        ],
        devotionalTitle: "Om Namah Shivay",
        devotionalMessage: "May the eternal light of Lord Somnath illuminate your path and bring you inner peace."
    },
    {
        slug: "jagannath-temple",
        name: "Jagannath Temple",
        location: "Puri, Odisha",
        videoId: "5Ts6KxuckVI",
        status: "Live Now",
        customImage: "https://thetempleguru.com/wp-content/uploads/2023/04/Jagannath-temple-puri.jpg",
        description: "The Jagannath Temple is an important Hindu temple dedicated to Jagannath, a form of Sri Krishna in Puri in the state of Odisha on the eastern coast of India.",
        witnessPoints: [
            "Abakash & Vesha Darshan",
            "Ratha Yatra (Seasonal)",
            "Chhappan Bhog offerings",
            "Temple Architecture view",
            "Cultural heritage"
        ],
        whyPoints: [
            "Lord of the Universe's blessings",
            "Key Char Dham site",
            "Witness unique rituals",
            "Spiritual fulfillment"
        ],
        devotionalTitle: "Jai Jagannath",
        devotionalMessage: "May Lord Jagannath shower you with his divine grace and guide you on the path of truth."
    },
    {
        slug: "badrinath-temple",
        name: "Badrinath Temple",
        location: "Badrinath, Uttarakhand",
        videoId: "H1OJ9l3x1EE",
        status: "Live Now",
        customImage: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg",
        description: "Badrinath or Badrinarayan Temple is a Hindu temple dedicated to Vishnu which is situated in the town of Badrinath in Uttarakhand, India. The temple and town form one of the four Char Dham and Chota Char Dham pilgrimage sites.",
        witnessPoints: [
            "Maha Abhishek",
            "Alaknanda River Aarti",
            "Vishnu Sahasrananam",
            "Himalayan backdrop",
            "Sacred Badrinath Town"
        ],
        whyPoints: [
            "Himalayan Char Dham",
            "Moksha Dham connection",
            "Serene mountain vibes",
            "Ancient holiness"
        ],
        devotionalTitle: "Jai Badri Vishal",
        devotionalMessage: "May Lord Badri Vishal bless your family with prosperity and spiritual wellness."
    },
    {
        slug: "kedarnath-temple",
        name: "Kedarnath Temple",
        location: "Kedarnath, Uttarakhand",
        videoId: "H1OJ9l3x1EE",
        status: "Live Now",
        customImage: "https://www.viacation.com/_next/image?url=https%3A%2F%2Fwp.viacation.com%2Fwp-content%2Fuploads%2F2025%2F02%2F442441.webp&w=2560&q=75",
        description: "Kedarnath Temple is a Hindu temple dedicated to the Hindu God Shiva. The temple is located on the Garhwal Himalayan range near the Mandakini river, in the state of Uttarakhand, India.",
        witnessPoints: [
            "Morning Shiva Puja",
            "Snow-capped peaks view",
            "Evening Aarti",
            "Nandi Statue Darshan",
            "Mystical atmosphere"
        ],
        whyPoints: [
            "Highest Jyotirlinga",
            "Trek virtually",
            "Ultimate Shiva Bhakti",
            "Raw nature & divinity"
        ],
        devotionalTitle: "Jai Baba Kedar",
        devotionalMessage: "May Lord Kedarnath's blessings protect you and lead you to ultimate salvation."
    },
    {
        slug: "golden-temple",
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        videoId: "mH-a7jmGfC4",
        status: "Live Now",
        customImage: "https://static.toiimg.com/photo/61820954.cms",
        description: "The Golden Temple, also known as Sri Harmandir Sahib, is a Gurdwara located in the city of Amritsar, Punjab, India. It is the holiest Gurdwara and the most important pilgrimage site of Sikhism.",
        witnessPoints: [
            "Palki Sahib Ceremony",
            "Gurbani Kirtan",
            "Sarovar View",
            "Golden Dome Shimmer",
            "Community Kitchen (Langar) spirit"
        ],
        whyPoints: [
            "Universal brotherhood",
            "Peaceful Gurbani",
            "Visual splendor",
            "Soulful experience"
        ],
        devotionalTitle: "Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh",
        devotionalMessage: "May Waheguru bless you with chardi kala (eternal optimism) and spiritual strength."
    }
];
