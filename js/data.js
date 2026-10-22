/**
 * Dream Destination - Central Mock Data Store
 * Contains curated data for Indian destinations, verified homestays,
 * artisan experiences, certified guides, and community reviews.
 */

const DreamData = {
    destinations: [
        {
            id: "chitkul",
            name: "Chitkul",
            state: "Himachal Pradesh",
            category: "peace",
            lat: 31.3506,
            lng: 78.4385,
            tag: "Last Indian Village",
            description: "The last inhabited village near the Indo-Tibet border, surrounded by pristine snow peaks and the gushing Baspa River.",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
            bestSeason: "May - October",
            highlight: "Wooden Kinnauri architecture, organic potato farms, cleanest mountain air."
        },
        {
            id: "hampi",
            name: "Hampi",
            state: "Karnataka",
            category: "culture",
            lat: 15.3350,
            lng: 76.4600,
            tag: "UNESCO World Heritage",
            description: "Magnificent ruins of the 14th-century Vijayanagara Empire scattered across a surreal boulder-strewn landscape.",
            image: "https://images.unsplash.com/photo-1600100397608-f010f444f494?auto=format&fit=crop&w=600&q=80",
            bestSeason: "October - March",
            highlight: "Virupaksha Temple, Stone Chariot, boulder bouldering, sunset at Matanga Hill."
        },
        {
            id: "spiti",
            name: "Spiti Valley",
            state: "Himachal Pradesh",
            category: "adventure",
            lat: 32.2461,
            lng: 78.0349,
            tag: "Middle Land",
            description: "A cold desert mountain valley known for ancient Tibetan monasteries, stargazing, and high altitude fossil villages.",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
            bestSeason: "June - September",
            highlight: "Key Gompa, Chandratal Lake, Pin Valley National Park, fossil hunting at Langza."
        },
        {
            id: "ziro",
            name: "Ziro Valley",
            state: "Arunachal Pradesh",
            category: "peace",
            lat: 27.5644,
            lng: 93.8344,
            tag: "Apatani Cultural Hub",
            description: "A serene valley framed by pine hills, famous for the indigenous Apatani tribe's sustainable paddy-cum-fish farming.",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
            bestSeason: "March - October",
            highlight: "Ziro Music Festival, bamboo groves, tribal villages, sustainable living."
        },
        {
            id: "majuli",
            name: "Majuli Island",
            state: "Assam",
            category: "culture",
            lat: 26.9536,
            lng: 94.2096,
            tag: "World's Largest River Island",
            description: "Cradled by the mighty Brahmaputra, Majuli is the epicenter of Neo-Vaishnavite culture and ancient mask-making art.",
            image: "https://images.unsplash.com/photo-1622308644420-a68131d279cf?auto=format&fit=crop&w=600&q=80",
            bestSeason: "October - March",
            highlight: "Satra monasteries, traditional clay and bamboo mask workshops, birdwatching."
        },
        {
            id: "mawlynnong",
            name: "Mawlynnong",
            state: "Meghalaya",
            category: "nature",
            lat: 25.2014,
            lng: 91.9056,
            tag: "Cleanest Village in Asia",
            description: "A community-run paradise celebrated for eco-friendly practices, 100% literacy, and bio-engineered Living Root Bridges.",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
            bestSeason: "September - May",
            highlight: "Living Root Bridge, Sky View bamboo tower, spotless floral pathways."
        },
        {
            id: "khimsar",
            name: "Khimsar & Jaisalmer",
            state: "Rajasthan",
            category: "culture",
            lat: 27.0375,
            lng: 73.4072,
            tag: "Golden Thar Heritage",
            description: "Golden sand dunes, historic desert fortresses, traditional Kalbelia and Manganiyar folk melodies under starry nights.",
            image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",
            bestSeason: "October - March",
            highlight: "Desert oasis, night safari, authentic Rajasthani village hospitality."
        },
        {
            id: "rishikesh",
            name: "Rishikesh",
            state: "Uttarakhand",
            category: "adventure",
            lat: 30.0869,
            lng: 78.2676,
            tag: "Yoga & Adventure Capital",
            description: "Where the sacred Ganges emerges from the Himalayas, combining serene spirituality with thrilling river rafting.",
            image: "https://images.unsplash.com/photo-1545652985-5edd365b12eb?auto=format&fit=crop&w=600&q=80",
            bestSeason: "September - April",
            highlight: "White-water rafting, Triveni Ghat Maha Aarti, Beatles Ashram, yoga retreats."
        },
        {
            id: "coonoor",
            name: "Coonoor",
            state: "Tamil Nadu",
            category: "peace",
            lat: 11.3530,
            lng: 76.7959,
            tag: "Nilgiri Tea Highlands",
            description: "Quiet hill station nestled in the Nilgiri hills, blanketed by lush green tea plantations, eucalyptus, and Toda tribal heritage.",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
            bestSeason: "October - June",
            highlight: "Heritage Toy Train (UNESCO), tea factory tasting, Dolphin's Nose viewpoint."
        },
        {
            id: "varanasi",
            name: "Varanasi",
            state: "Uttar Pradesh",
            category: "culture",
            lat: 25.3176,
            lng: 82.9739,
            tag: "Spiritual Heart of India",
            description: "One of the world's oldest continuously inhabited cities, celebrated for timeless ghats, morning boat rides, and evening Ganga Aarti.",
            image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
            bestSeason: "October - March",
            highlight: "Dashashwamedh Ghat Aarti, sunrise boat ride, silk weaving lanes, Banarasi cuisine."
        }
    ],

    listings: [
        {
            id: "stay-manali",
            title: "Mountain View Homestay",
            location: "Manali, Himachal Pradesh",
            price: 1500,
            rating: 4.8,
            reviewsCount: 76,
            verified: true,
            image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=600&q=80",
            host: "Negi Family",
            description: "Traditional Kath-Kuni wooden architecture with panoramic views of snow peaks. Authentic home-cooked Himachali meals (Siddu, Madra).",
            amenities: ["Free Wi-Fi", "Home Cooked Food", "Bonfire", "Solar Heated Water", "Local Trek Guide"]
        },
        {
            id: "stay-jaipur",
            title: "Heritage Haveli Stay",
            location: "Jaipur, Rajasthan",
            price: 2000,
            rating: 4.9,
            reviewsCount: 112,
            verified: true,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
            host: "Rathore Family",
            description: "300-year-old preserved haveli in the walled city. Traditional courtyard dining, folk music evenings, and rooftop view of Nahargarh Fort.",
            amenities: ["Heritage Courtyard", "Organic Rajasthani Thali", "Cooking Workshops", "AC Rooms", "Free Tea/Chai"]
        },
        {
            id: "stay-amritsar",
            title: "Punjab Village Farmstay",
            location: "Near Amritsar, Punjab",
            price: 1200,
            rating: 4.7,
            reviewsCount: 54,
            verified: true,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
            host: "Sardar Gurpreet Singh",
            description: "Experience authentic rural Punjab. Organic mustard & wheat farms, tractor rides, fresh buttermilk, and evening village folk stories.",
            amenities: ["Farm Tours", "Clay Oven Cooking", "Bicycle Rental", "Dairy Milking Experience", "Pet Friendly"]
        },
        {
            id: "stay-kumarakom",
            title: "Backwater Eco-Cottage",
            location: "Kumarakom, Kerala",
            price: 2200,
            rating: 4.9,
            reviewsCount: 88,
            verified: true,
            image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
            host: "Mathew & Mini",
            description: "Thatched eco-cottage on peaceful backwater canals. Traditional Sadya meals, canoe rides with local fishermen, and bird sanctuary tours.",
            amenities: ["Canal Front", "Ayurvedic Kitchen", "Traditional Canoe", "Solar Powered", "Fishing Gear"]
        },
        {
            id: "stay-majuli",
            title: "Mishing Bamboo Hut Stay",
            location: "Majuli Island, Assam",
            price: 1100,
            rating: 4.8,
            reviewsCount: 41,
            verified: true,
            image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80",
            host: "Kaman Family",
            description: "Authentic stilt bamboo house built in indigenous Mishing tribal style. Enjoy freshly caught river fish cooked in bamboo hollows.",
            amenities: ["Traditional Stilt House", "Tribal Handloom Tour", "Organic Food", "Bicycle Free", "Birding Guide"]
        },
        {
            id: "stay-coonoor",
            title: "Nilgiri Estate Homestay",
            location: "Coonoor, Tamil Nadu",
            price: 1800,
            rating: 4.9,
            reviewsCount: 63,
            verified: true,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
            host: "Suresh Kumar",
            description: "Colonial-style planter bungalow amidst private tea gardens. Freshly brewed Nilgiri tea, eucalyptus nature trails, and homemade jam.",
            amenities: ["Tea Garden Walk", "Fireplace", "Home Bakery", "Bird Watching", "Pet Friendly"]
        }
    ],

    experiences: [
        {
            id: "exp-madhubani",
            title: "Madhubani Painting Workshop",
            location: "Mithila / Bihar",
            category: "Craft",
            price: 800,
            duration: "3 Hours",
            artisan: "Sita Devi & Artisans",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
            description: "Learn natural mineral pigment art from master Mithila women artisans. Create your own framed folk painting on handmade paper.",
            badge: "Direct Artisan Support"
        },
        {
            id: "exp-pashmina",
            title: "Authentic Pashmina Weaving & Showcase",
            location: "Srinagar, Jammu & Kashmir",
            category: "Handloom",
            price: 500,
            duration: "2 Hours",
            artisan: "Kashmir Crafts Collective",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
            description: "Witness the delicate art of hand-spinning Changthangi wool on traditional charkhas. Certificate of authenticity provided with all handloom goods.",
            badge: "GI Certified"
        },
        {
            id: "exp-pottery",
            title: "Jaipur Blue Pottery Masterclass",
            location: "Jaipur, Rajasthan",
            category: "Craft",
            price: 1000,
            duration: "2.5 Hours",
            artisan: "Kripal Kumbh Studio",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
            description: "Discover the Egyptian clay-free technique using quartz stone, multani mitti, and natural oxide glazes. Take your creation home.",
            badge: "Hands-on Workshop"
        },
        {
            id: "exp-folk",
            title: "Manganiyar Folk Music & Dance Baithak",
            location: "Khimsar / Jaisalmer, Rajasthan",
            category: "Music",
            price: 2500,
            duration: "1.5 Hours",
            artisan: "Ustad Bundu Khan & Troupe",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
            description: "Private evening musical mehfil with soulful Kamaycha, Sarangi, and Khartal performances celebrating Rajasthani desert folklore.",
            badge: "Cultural Heritage"
        },
        {
            id: "exp-masks",
            title: "Majuli Clay & Bamboo Mask Making",
            location: "Majuli, Assam",
            category: "Craft",
            price: 750,
            duration: "2.5 Hours",
            artisan: "Samaguri Satra Artists",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
            description: "Craft mythological Mukha (masks) used in 500-year-old Bhaona theatre, molded entirely using river clay, bamboo splits, and cow dung.",
            badge: "Ancient Craft"
        },
        {
            id: "exp-cooking",
            title: "Himachali Dham Traditional Cooking",
            location: "Kullu / Manali, Himachal",
            category: "Culinary",
            price: 900,
            duration: "3 Hours",
            artisan: "Local Botis (Master Chefs)",
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
            description: "Master the secret slow-cooked spices of Madra, Khatta, and Babru in brass pots called Charoti. Feast together on leaf plates.",
            badge: "Traditional Food"
        }
    ],

    guides: [
        {
            id: "guide-1",
            name: "Ramesh Sharma",
            location: "Khimsar & Jodhpur, Rajasthan",
            languages: ["Hindi", "Rajasthani", "English"],
            experienceYears: 12,
            rating: 4.9,
            reviewsCount: 134,
            badge: "Ministry of Tourism Certified",
            specialization: "Desert Ecology, Rajput Heritage & Folk Legends",
            feePerDay: 1800,
            avatar: "👨‍🌾",
            bio: "Born in a traditional desert village. Passionate about showing guests real village life, stepwells, and wildlife habitats of the Bishnoi community."
        },
        {
            id: "guide-2",
            name: "Vikram Singh Rathore",
            location: "Jaipur & Amer, Rajasthan",
            languages: ["Hindi", "English", "French"],
            experienceYears: 15,
            rating: 5.0,
            reviewsCount: 218,
            badge: "Govt Certified Heritage Guide",
            specialization: "Fort Architecture, Royal Astrology & Hidden Passages",
            feePerDay: 2200,
            avatar: "🧔",
            bio: "Historian by education and guide by heart. I reveal the untold stories behind Jaipur's Pink City gates, astronomical instruments, and fresco art."
        },
        {
            id: "guide-3",
            name: "Sunita Tamang",
            location: "Darjeeling & Sikkim",
            languages: ["Hindi", "Nepali", "English"],
            experienceYears: 8,
            rating: 4.9,
            reviewsCount: 96,
            badge: "Eco-Tour Specialist",
            specialization: "High Altitude Birding, Monastery Ethics & Tea Estates",
            feePerDay: 1600,
            avatar: "👩‍🌾",
            bio: "Promoting zero-waste trekking and respectful cultural immersion across Eastern Himalayan villages and sacred lakes."
        },
        {
            id: "guide-4",
            name: "Tsering Dorje",
            location: "Spiti Valley & Ladakh",
            languages: ["Hindi", "Ladakhi/Tibetan", "English"],
            experienceYears: 10,
            rating: 4.9,
            reviewsCount: 142,
            badge: "Mountain Safety & Culture Certified",
            specialization: "Buddhist Murals, High Altitude Navigation & Stargazing",
            feePerDay: 2000,
            avatar: "🧗‍♂️",
            bio: "Local Spitian native dedicated to preserving our fragile high-altitude ecosystem, ancient Chams dances, and fossil heritage."
        },
        {
            id: "guide-5",
            name: "Lakshmi Devi",
            location: "Raghurajpur Crafts Village, Odisha",
            languages: ["Odia", "Hindi", "Basic English"],
            experienceYears: 18,
            rating: 4.9,
            reviewsCount: 88,
            badge: "Master Crafts Guide",
            specialization: "Pattachitra Palm Leaf Art & Gotipua Folk Traditions",
            feePerDay: 1400,
            avatar: "👩‍🎨",
            bio: "Carrying forward my family's 7 generations of temple scroll art. Every house in our village is a living gallery."
        }
    ],

    communityMembers: [
        {
            name: "Ramesh Sharma",
            village: "Khimsar, Rajasthan",
            culture: "Rajasthani Folk Music & Heritage",
            languages: "Hindi, Rajasthani, English",
            quote: "Tourism should directly feed local artisan families, not just huge corporate resorts. We welcome guests as family (Atithi Devo Bhava).",
            avatar: "👨‍🌾"
        },
        {
            name: "Lakshmi Devi",
            village: "Raghurajpur, Odisha",
            culture: "Pattachitra & Palm Leaf Etching",
            languages: "Odia, Hindi",
            quote: "When travelers learn our art, our heritage survives for another century. Every brushstroke is connected to our spiritual roots.",
            avatar: "👩‍🎨"
        },
        {
            name: "Suresh Kumar",
            village: "Coonoor, Tamil Nadu",
            culture: "Indigenous Nilgiri Tea & Organic Farming",
            languages: "Tamil, English, Hindi",
            quote: "We show visitors how tea is lovingly harvested by hand, free of harsh chemical pesticides, preserving our mountain hills.",
            avatar: "👨‍🍳"
        },
        {
            name: "Bina Devi Negi",
            village: "Reckong Peo, Himachal Pradesh",
            culture: "Kinnauri Handloom & Geometric Weaving",
            languages: "Kinnauri, Hindi",
            quote: "Our woolen shawls carry geometric symbols passed down from our ancestors. Staying in our homestays keeps our hearths warm.",
            avatar: "👵"
        }
    ],

    reviews: [
        {
            id: "rev-1",
            author: "Neha Kapoor",
            city: "Mumbai",
            trip: "Cultural Walk & Haveli Stay in Jaipur",
            rating: 5,
            date: "November 2025",
            text: "Vikram ji took us through secret passages of Amer Fort that ordinary tourists never see. Staying at the Heritage Haveli with the Rathores felt like visiting family. Real sustainable tourism!",
            tag: "Verified Traveler"
        },
        {
            id: "rev-2",
            author: "Amit Sharma",
            city: "Delhi NCR",
            trip: "Mountain View Homestay, Manali",
            rating: 5,
            date: "October 2025",
            text: "Ghar jaisa feel aaya. Aunty made fresh hot Siddu and herbal tea every morning. Uncle guided us to private hidden waterfalls without any tourist crowd. Worth every single rupee.",
            tag: "Eco Homestay"
        },
        {
            id: "rev-3",
            author: "Dr. Priya Menon",
            city: "Bengaluru",
            trip: "Majuli Island Mask Workshop, Assam",
            rating: 5,
            date: "January 2026",
            text: "Making traditional masks alongside the monks of Samaguri Satra was deeply meditative. Dream Destination is doing a wonderful service by connecting us directly to artisans.",
            tag: "Artisan Support"
        },
        {
            id: "rev-4",
            author: "Rahul Verma",
            city: "Pune",
            trip: "Ziro Valley Music & Farmstay",
            rating: 4,
            date: "September 2025",
            text: "Staying in a bamboo home and learning how the Apatani community farms without chemicals was eye-opening. The smart planner gave us a balanced itinerary with plenty of rest time.",
            tag: "Cultural Immersion"
        }
    ]
};
