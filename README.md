# 🏔️ Dream Destination | Namaste Bharat

**Smart, Safe & Sustainable Tourism in India**

Dream Destination is a smart tourism web app that helps travellers plan budget-friendly trips to offbeat Indian destinations, while sending their spending directly to local homestay hosts, artisans and certified guides instead of middlemen.

> A B.Tech Computer Science & Engineering (Year 2) academic mini-project.
> Domain: Web Development & HCI | Theme: Sustainable Tourism (UN SDG 8 & 12)

---

## ✨ Features

| Section | What it does |
|---|---|
| 🧠 **Smart Trip Planner** | Enter destination, days, budget (₹), travel mood and pace to get a day-wise itinerary, budget breakdown and eco tips |
| 🌍 **Destinations** | Browse offbeat and popular places (Chitkul, Hampi, Spiti, Majuli, Ziro and more) with category filters and live search |
| 🗺️ **Dream Map** | Interactive Leaflet.js map of India with colour-coded pins (Culture, Peace, Adventure, Eco-villages) |
| 🏡 **Homestays** | Verified local stays such as Kath-Kuni cottages, havelis and bamboo stilt houses |
| 🛍️ **Artisan Hub** | Direct workshops in Madhubani painting, blue pottery, pashmina weaving |
| 🧑‍🏫 **Guides** | Certified local guides and eco-specialists |
| 🤝 **Community** | Stories from village elders, farmers and folk musicians |
| 🎭 **Culture & Etiquette** | Temple, dining and do's/don'ts guidance for respectful travel |
| ⭐ **Reviews** | Read traveller reviews and add your own (saved in the browser) |
| 👤 **Accounts** | Sign in / create an account as Traveller, Homestay Host or Artisan/Guide, plus one-click demo login |
| ❤️ **Saved** | Save favourites and trips and view them from the navbar |

---

## 🛠️ Tech Stack

- **HTML5**, **CSS3**, **ES6 JavaScript** (no framework)
- **[Leaflet.js](https://leafletjs.com/)** 1.9.4 with OpenStreetMap tiles
- **Font Awesome 6** icons and **Google Fonts (Poppins)**
- **LocalStorage** for saved items, reviews and demo login state
- **Vite** dev server for local development

---

## 📁 Project Structure

```
Mini_Project_1/
├── index.html        # Single-page layout and all sections
├── css/
│   └── style.css     # Master stylesheet
├── js/
│   ├── data.js       # Mock data (destinations, homestays, guides, reviews...)
│   └── app.js        # App logic, navigation, planner, map, auth, modals
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended). Check with `node -v` and `npm -v`.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shivang2212/Mini_Project_1.git

# 2. Go into the project folder
cd Mini_Project_1

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

### Without Node.js

Because this is a static site, you can also open `index.html` directly in a browser, or use an extension such as VS Code Live Server. An internet connection is needed for the map, fonts and icons, which load from CDNs.

---

## 🧪 Demo Mode

On the **Join Community** page, use **1-Click Login (Evaluator)** or **Demo Host** to explore the app without filling in any forms.

> ⚠️ Authentication is a front-end simulation. Accounts and reviews are stored only in your browser's LocalStorage. Do not enter real passwords.

---

## 🔧 Troubleshooting

| Problem | Fix |
|---|---|
| `Missing script: "dev"` | Run the command from the folder that contains `package.json`, and make sure it has a `dev` script (`"dev": "vite"`) |
| `'vite' is not recognized` | Run `npm install` (or `npm install vite --save-dev`), then `npm run dev` again |
| Map or icons not loading | Check your internet connection (Leaflet, Font Awesome and Google Fonts load from CDNs) |

---

## 🗺️ Roadmap

- Real backend and authentication
- Persistent saved trips and reviews
- Itinerary export (PDF) and share link
- Host and artisan dashboards
- Enquiry and booking flow
- Multilingual UI (Hindi and regional languages)
- Carbon-footprint estimate per itinerary

---

## 📌 Notes

- Statistics, ratings and testimonials shown in the UI (for example "100% Verified Homestays", "4.9 / 5") are sample content for demonstration.
- The "Smart Trip Planner" generates plans from the inputs on the client side; no external AI service is called.

---

## 👤 Author

**Shivang** ([@Shivang2212](https://github.com/Shivang2212))
B.Tech CSE, Year 2

---

*Atithi Devo Bhava: the guest is God. 🇮🇳*
