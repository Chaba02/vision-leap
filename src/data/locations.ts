export interface Location {
  id: string;
  name: string;
  city: string;
  type: string;
  capacity: number;
  priceRange: string;
  image: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const tunisianCities = [
  "Tunisi",
  "Hammamet", 
  "Sousse",
  "Djerba",
  "Monastir",
  "Sfax",
  "Mahdia",
  "Tozeur",
  "Sidi Bou Said",
  "Tabarka",
  "Kairouan",
  "Bizerte"
];

export const venueTypes = [
  "villa",
  "resort", 
  "hotel",
  "palazzo",
  "riad"
];

export const mockLocations: Location[] = [
  {
    id: "1",
    name: "Villa El Hana",
    city: "Hammamet",
    type: "villa",
    capacity: 150,
    priceRange: "€3000-5000",
    image: "/src/assets/villa-el-hana.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 47,
    description: "Elegante villa affacciata sul mare con architettura tradizionale tunisina. Ampi spazi esterni con giardini curati e vista panoramica sulla costa di Hammamet.",
    features: [
      "Vista mare panoramica",
      "Giardini mediterranei",
      "Piscina privata",
      "Catering interno",
      "Parcheggio privato",
      "Aria condizionata"
    ],
    reviews: [
      {
        id: "1",
        author: "Sara & Ahmed",
        rating: 5,
        comment: "Location da sogno! Staff professionale e vista mozzafiato. Il nostro matrimonio è stato perfetto grazie alla loro attenzione ai dettagli.",
        date: "2024-01-15"
      },
      {
        id: "2", 
        author: "Leila M.",
        rating: 5,
        comment: "Architettura stupenda e servizio impeccabile. I nostri ospiti sono rimasti incantati dalla bellezza del posto.",
        date: "2024-02-03"
      }
    ]
  },
  {
    id: "2",
    name: "Le Mirage Resort",
    city: "Sousse",
    type: "resort",
    capacity: 300,
    priceRange: "€5000-8000",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 89,
    description: "Resort di lusso sulla costa di Sousse con design moderno e servizi esclusivi. Perfetto per matrimoni eleganti con vista sul mare.",
    features: [
      "Spiaggia privata",
      "Suite per sposi",
      "Spa & wellness",
      "Ristorante gourmet",
      "Animazione",
      "Transfer aeroporto"
    ],
    reviews: [
      {
        id: "3",
        author: "Marco & Fatima",
        rating: 5,
        comment: "Resort fantastico con servizi di altissimo livello. La spiaggia privata ha reso il nostro matrimonio unico e romantico.",
        date: "2024-01-28"
      }
    ]
  },
  {
    id: "3",
    name: "Riad du Palmier",
    city: "Tunis",
    type: "riad",
    capacity: 80,
    priceRange: "€2000-3500",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.7,
    reviewCount: 34,
    description: "Autentico riad nel cuore della medina di Tunisi. Atmosfera magica con architettura tradizionale e cortile interno con fontana.",
    features: [
      "Architettura autentica",
      "Cortile con fontana",
      "Cucina tradizionale",
      "Musica dal vivo",
      "Decorazioni artigianali",
      "Fotografia inclusa"
    ],
    reviews: [
      {
        id: "4",
        author: "Yasmine & Omar",
        rating: 5,
        comment: "Esperienza magica in un ambiente autentico. Le decorazioni tradizionali e l'atmosfera del riad hanno reso tutto speciale.",
        date: "2024-02-14"
      }
    ]
  },
  {
    id: "4",
    name: "Palazzo Azzurro",
    city: "Djerba",
    type: "palazzo",
    capacity: 200,
    priceRange: "€4000-6500",
    image: "/src/assets/villa-el-hana.jpg",
    verified: false,
    rating: 4.6,
    reviewCount: 23,
    description: "Palazzo storico ristrutturato nell'isola di Djerba. Mix perfetto tra tradizione e modernità con spazi interni ed esterni eleganti.",
    features: [
      "Palazzo storico",
      "Terrazze panoramiche", 
      "Piscina a sfioro",
      "Cucina fusion",
      "Wi-Fi gratuito",
      "Servizio fotografico"
    ],
    reviews: [
      {
        id: "5",
        author: "Elena & Karim",
        rating: 4,
        comment: "Location molto bella ma alcuni dettagli da migliorare nel servizio. Nel complesso soddisfatti della scelta.",
        date: "2024-01-10"
      }
    ]
  },
  {
    id: "5",
    name: "Villa des Oliviers",
    city: "Monastir",
    type: "villa",
    capacity: 120,
    priceRange: "€2500-4000",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 56,
    description: "Villa circondata da uliveti secolari con vista sul golfo di Monastir. Ambiente raccolto e romantico per matrimoni intimi.",
    features: [
      "Uliveti secolari",
      "Vista golfo",
      "Cerimonia all'aperto",
      "Menu biologico",
      "Parcheggio gratuito",
      "Sistemazione ospiti"
    ],
    reviews: [
      {
        id: "6",
        author: "Amina & David",
        rating: 5,
        comment: "Villa incantevole immersa nella natura. Lo staff è stato fantastico e il cibo eccellente. Consigliatissima!",
        date: "2024-02-20"
      }
    ]
  },
  {
    id: "6",
    name: "Hotel Marina Palace",
    city: "Mahdia",
    type: "hotel",
    capacity: 250,
    priceRange: "€3500-5500",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.5,
    reviewCount: 78,
    description: "Hotel di charme nel porto di Mahdia con vista marina. Sale eleganti e terrazze panoramiche per matrimoni raffinati.",
    features: [
      "Vista porto",
      "Sale panoramiche",
      "Terrazza rooftop",
      "Menu di mare",
      "Servizio bar",
      "Concierge"
    ],
    reviews: [
      {
        id: "7",
        author: "Nadia & Luca",
        rating: 4,
        comment: "Hotel elegante con personale cordiale. La terrazza con vista mare è stata il punto forte del nostro ricevimento.",
        date: "2024-01-05"
      }
    ]
  },
  {
    id: "7",
    name: "Dar El Medina",
    city: "Tunisi",
    type: "riad",
    capacity: 60,
    priceRange: "€1500-2500",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 42,
    description: "Riad tradizionale nel cuore della medina di Tunisi. Atmosfera autentica con cortile interno e decorazioni artigianali.",
    features: ["Architettura tradizionale", "Cortile interno", "Cucina locale", "Musica tradizionale", "Wi-Fi gratuito", "Parcheggio vicino"],
    reviews: [
      {
        id: "8",
        author: "Fatima & Ali",
        rating: 5,
        comment: "Esperienza autentica in un ambiente magico. Lo staff è stato fantastico e il cibo delizioso.",
        date: "2024-02-10"
      }
    ]
  },
  {
    id: "8",
    name: "Resort Les Palmiers",
    city: "Hammamet",
    type: "resort",
    capacity: 400,
    priceRange: "€6000-9000",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    description: "Resort di lusso con spiaggia privata e servizi esclusivi. Perfetto per matrimoni grandi con tutti i comfort.",
    features: ["Spiaggia privata", "Piscine multiple", "Spa & wellness", "Ristoranti gourmet", "Animazione", "Transfer aeroporto", "Suite sposi", "Concierge 24h"],
    reviews: [
      {
        id: "9",
        author: "Sofia & Mehdi",
        rating: 5,
        comment: "Resort fantastico con servizi di altissimo livello. La nostra famiglia è rimasta incantata!",
        date: "2024-01-20"
      }
    ]
  },
  {
    id: "9",
    name: "Villa des Roses",
    city: "Sidi Bou Said",
    type: "villa",
    capacity: 100,
    priceRange: "€4000-6000",
    image: "/src/assets/villa-el-hana.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 67,
    description: "Villa bianca e blu tipica di Sidi Bou Said con vista panoramica sul mare. Atmosfera romantica e elegante.",
    features: ["Vista mare panoramica", "Architettura tipica", "Giardini curati", "Terrazza privata", "Catering gourmet", "Fotografo incluso"],
    reviews: [
      {
        id: "10",
        author: "Elena & Youssef",
        rating: 5,
        comment: "Location da sogno con vista mozzafiato. Il nostro matrimonio è stato perfetto!",
        date: "2024-02-18"
      }
    ]
  },
  {
    id: "10",
    name: "Hotel Thalasso Djerba",
    city: "Djerba",
    type: "hotel",
    capacity: 180,
    priceRange: "€3000-4500",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.6,
    reviewCount: 89,
    description: "Hotel thalasso con centro benessere e spiaggia privata. Perfetto per matrimoni rilassanti e rigeneranti.",
    features: ["Centro thalasso", "Spiaggia privata", "Spa completa", "Menu healthy", "Yoga matutino", "Transfer aeroporto"],
    reviews: [
      {
        id: "11",
        author: "Maria & Samir",
        rating: 4,
        comment: "Hotel molto bello con servizi wellness eccellenti. Consigliato per chi cerca relax.",
        date: "2024-01-30"
      }
    ]
  },
  {
    id: "11",
    name: "Palazzo delle Arti",
    city: "Tunisi",
    type: "palazzo",
    capacity: 300,
    priceRange: "€5000-7500",
    image: "/src/assets/villa-el-hana.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 124,
    description: "Palazzo storico ristrutturato nel centro di Tunisi. Sale eleganti con affreschi originali e giardini interni.",
    features: ["Palazzo storico", "Affreschi originali", "Sale multiple", "Giardini interni", "Cucina gourmet", "Servizio fotografico", "Parcheggio privato"],
    reviews: [
      {
        id: "12",
        author: "Giulia & Ahmed",
        rating: 5,
        comment: "Palazzo magnifico con storia e charme unici. Il nostro matrimonio è stato indimenticabile!",
        date: "2024-02-05"
      }
    ]
  },
  {
    id: "12",
    name: "Villa del Golfo",
    city: "Monastir",
    type: "villa",
    capacity: 80,
    priceRange: "€2000-3500",
    image: "/src/assets/riad-palmier.jpg",
    verified: false,
    rating: 4.4,
    reviewCount: 23,
    description: "Villa moderna affacciata sul golfo di Monastir. Design contemporaneo con ampi spazi esterni e piscina.",
    features: ["Vista golfo", "Design moderno", "Piscina privata", "Terrazza panoramica", "Cucina attrezzata", "Wi-Fi gratuito"],
    reviews: [
      {
        id: "13",
        author: "Anna & Khalil",
        rating: 4,
        comment: "Villa molto bella con vista spettacolare. Consigliata per matrimoni intimi.",
        date: "2024-01-12"
      }
    ]
  },
  {
    id: "13",
    name: "Resort Sahara",
    city: "Tozeur",
    type: "resort",
    capacity: 150,
    priceRange: "€2500-4000",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.5,
    reviewCount: 45,
    description: "Resort nel deserto del Sahara con architettura berbera. Esperienza unica per matrimoni esotici e avventurosi.",
    features: ["Deserto del Sahara", "Architettura berbera", "Camel ride", "Cena sotto le stelle", "Musica tradizionale", "Escursioni guidate"],
    reviews: [
      {
        id: "14",
        author: "Laura & Tarek",
        rating: 5,
        comment: "Esperienza unica nel deserto! Il nostro matrimonio è stato magico e indimenticabile.",
        date: "2024-02-25"
      }
    ]
  },
  {
    id: "14",
    name: "Hotel Marina",
    city: "Sfax",
    type: "hotel",
    capacity: 200,
    priceRange: "€2800-4200",
    image: "/src/assets/villa-el-hana.jpg",
    verified: true,
    rating: 4.3,
    reviewCount: 67,
    description: "Hotel moderno nel porto di Sfax con vista marina. Sale eleganti e servizi completi per matrimoni raffinati.",
    features: ["Vista porto", "Sale eleganti", "Ristorante gourmet", "Bar panoramico", "Servizio concierge", "Parcheggio gratuito"],
    reviews: [
      {
        id: "15",
        author: "Francesca & Omar",
        rating: 4,
        comment: "Hotel confortevole con buon servizio. La vista sul porto è molto suggestiva.",
        date: "2024-01-18"
      }
    ]
  },
  {
    id: "15",
    name: "Villa des Palmiers",
    city: "Hammamet",
    type: "villa",
    capacity: 120,
    priceRange: "€3500-5500",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.7,
    reviewCount: 78,
    description: "Villa circondata da palme secolari con piscina a sfioro e vista mare. Ambiente tropicale e rilassante.",
    features: ["Palme secolari", "Piscina a sfioro", "Vista mare", "Giardino tropicale", "Cucina gourmet", "Sistemazione ospiti"],
    reviews: [
      {
        id: "16",
        author: "Chiara & Youssef",
        rating: 5,
        comment: "Villa incantevole immersa nella natura. Il nostro matrimonio è stato perfetto!",
        date: "2024-02-12"
      }
    ]
  },
  {
    id: "16",
    name: "Riad El Andalous",
    city: "Kairouan",
    type: "riad",
    capacity: 50,
    priceRange: "€1800-2800",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.6,
    reviewCount: 34,
    description: "Riad tradizionale nella città santa di Kairouan. Atmosfera spirituale e autentica per matrimoni intimi e significativi.",
    features: ["Città santa", "Architettura tradizionale", "Cortile con fontana", "Cucina halal", "Musica spirituale", "Guida turistica"],
    reviews: [
      {
        id: "17",
        author: "Aisha & Mohamed",
        rating: 5,
        comment: "Luogo sacro e magico per il nostro matrimonio. Esperienza spirituale unica!",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: "17",
    name: "Resort Tabarka",
    city: "Tabarka",
    type: "resort",
    capacity: 250,
    priceRange: "€4000-6500",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 112,
    description: "Resort sulla costa di Tabarka con spiaggia di sabbia dorata. Perfetto per matrimoni estivi con attività acquatiche.",
    features: ["Spiaggia dorata", "Sport acquatici", "Piscine multiple", "Spa & wellness", "Ristoranti tematici", "Animazione serale"],
    reviews: [
      {
        id: "18",
        author: "Valentina & Karim",
        rating: 5,
        comment: "Resort fantastico con spiaggia bellissima. I nostri ospiti si sono divertiti tantissimo!",
        date: "2024-02-08"
      }
    ]
  },
  {
    id: "18",
    name: "Villa des Orangers",
    city: "Sousse",
    type: "villa",
    capacity: 90,
    priceRange: "€2200-3800",
    image: "/src/assets/villa-el-hana.jpg",
    verified: false,
    rating: 4.2,
    reviewCount: 28,
    description: "Villa con aranceti secolari e vista sul mare di Sousse. Ambiente rustico e accogliente per matrimoni informali.",
    features: ["Aranceti secolari", "Vista mare", "Giardino rustico", "Cucina tradizionale", "Parcheggio gratuito", "Wi-Fi gratuito"],
    reviews: [
      {
        id: "19",
        author: "Martina & Ali",
        rating: 4,
        comment: "Villa carina con atmosfera rustica. Perfetta per matrimoni informali e familiari.",
        date: "2024-01-08"
      }
    ]
  },
  {
    id: "19",
    name: "Hotel Bizerte Palace",
    city: "Bizerte",
    type: "hotel",
    capacity: 160,
    priceRange: "€3200-4800",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.4,
    reviewCount: 56,
    description: "Hotel storico nel porto di Bizerte con architettura coloniale. Sale eleganti e terrazze panoramiche sul Mediterraneo.",
    features: ["Architettura coloniale", "Vista Mediterraneo", "Sale storiche", "Terrazze panoramiche", "Cucina mediterranea", "Servizio concierge"],
    reviews: [
      {
        id: "20",
        author: "Sara & Hassan",
        rating: 4,
        comment: "Hotel con charme storico e vista spettacolare. Consigliato per chi ama l'eleganza.",
        date: "2024-02-15"
      }
    ]
  },
  {
    id: "20",
    name: "Villa El Ksar",
    city: "Mahdia",
    type: "villa",
    capacity: 110,
    priceRange: "€3000-5000",
    image: "/src/assets/villa-el-hana.jpg",
    verified: true,
    rating: 4.7,
    reviewCount: 73,
    description: "Villa moderna con design contemporaneo e vista sul mare di Mahdia. Spazi ampi e luminosi per matrimoni eleganti.",
    features: ["Design contemporaneo", "Vista mare", "Spazi luminosi", "Piscina privata", "Cucina gourmet", "Sistemazione ospiti"],
    reviews: [
      {
        id: "21",
        author: "Elena & Nabil",
        rating: 5,
        comment: "Villa moderna e confortevole con vista spettacolare. Il nostro matrimonio è stato perfetto!",
        date: "2024-02-22"
      }
    ]
  },
  {
    id: "21",
    name: "Resort Les Dunes",
    city: "Djerba",
    type: "resort",
    capacity: 180,
    priceRange: "€3500-5500",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.5,
    reviewCount: 89,
    description: "Resort tra le dune di Djerba con architettura tradizionale. Esperienza unica tra deserto e mare per matrimoni esotici.",
    features: ["Tra le dune", "Architettura tradizionale", "Spiaggia privata", "Piscina naturale", "Cucina locale", "Escursioni guidate"],
    reviews: [
      {
        id: "22",
        author: "Giulia & Tarek",
        rating: 4,
        comment: "Resort unico tra deserto e mare. Esperienza indimenticabile per il nostro matrimonio!",
        date: "2024-01-14"
      }
    ]
  },
  {
    id: "22",
    name: "Villa des Figuiers",
    city: "Sidi Bou Said",
    type: "villa",
    capacity: 70,
    priceRange: "€2500-4000",
    image: "/src/assets/riad-palmier.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 45,
    description: "Villa con fichi secolari e vista panoramica su Sidi Bou Said. Atmosfera romantica e pittoresca per matrimoni intimi.",
    features: ["Fichi secolari", "Vista panoramica", "Atmosfera romantica", "Terrazza privata", "Cucina gourmet", "Fotografo incluso"],
    reviews: [
      {
        id: "23",
        author: "Alessia & Youssef",
        rating: 5,
        comment: "Villa incantevole con vista mozzafiato. Il nostro matrimonio è stato da sogno!",
        date: "2024-02-28"
      }
    ]
  },
  {
    id: "23",
    name: "Hotel Medina",
    city: "Tunisi",
    type: "hotel",
    capacity: 140,
    priceRange: "€2000-3500",
    image: "/src/assets/villa-el-hana.jpg",
    verified: true,
    rating: 4.3,
    reviewCount: 67,
    description: "Hotel nel cuore della medina di Tunisi con architettura tradizionale. Atmosfera autentica per matrimoni culturali.",
    features: ["Medina di Tunisi", "Architettura tradizionale", "Sale storiche", "Cucina locale", "Musica tradizionale", "Guida culturale"],
    reviews: [
      {
        id: "24",
        author: "Federica & Ahmed",
        rating: 4,
        comment: "Hotel autentico nel cuore della medina. Perfetto per chi ama la cultura tunisina.",
        date: "2024-01-22"
      }
    ]
  },
  {
    id: "24",
    name: "Villa des Lauriers",
    city: "Hammamet",
    type: "villa",
    capacity: 130,
    priceRange: "€4000-6500",
    image: "/src/assets/le-mirage-resort.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 95,
    description: "Villa di lusso con giardini di allori e vista mare. Servizi esclusivi e attenzione ai dettagli per matrimoni di lusso.",
    features: ["Giardini di allori", "Vista mare", "Servizi esclusivi", "Piscina privata", "Cucina gourmet", "Butler privato", "Sistemazione lusso"],
    reviews: [
      {
        id: "25",
        author: "Cristina & Samir",
        rating: 5,
        comment: "Villa di lusso con servizi impeccabili. Il nostro matrimonio è stato perfetto in ogni dettaglio!",
        date: "2024-02-16"
      }
    ]
  }
];