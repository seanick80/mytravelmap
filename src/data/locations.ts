export interface Location {
  name: string;
  lat: number;
  lng: number;
  date: string;
  description: string;
  blogUrl?: string;
}

const locations: Location[] = [
  {
    name: "Seattle, Washington, USA",
    lat: 47.6062,
    lng: -122.3321,
    date: "2025-05-11",
    description: "Home base — where the Year of Wander began",
  },
  {
    name: "New York City, USA",
    lat: 40.7128,
    lng: -74.006,
    date: "2025-05-12",
    description: "First stop on the Year of Wander",
    blogUrl: "https://www.ouryearofwander.com/post/new-york-new-york",
  },
  {
    name: "Manhattan, New York, USA",
    lat: 40.7831,
    lng: -73.9712,
    date: "2025-05-16",
    description: "Final days in Manhattan before departing",
    blogUrl: "https://www.ouryearofwander.com/post/until-next-time-manhattan",
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    date: "2025-05-17",
    description: "Arriving in Greece",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Naxos, Greece",
    lat: 37.1036,
    lng: 25.3763,
    date: "2025-05-18",
    description: "Basiliko cooking class on Naxos",
    blogUrl:
      "https://www.ouryearofwander.com/post/basiliko-%CF%84%CE%BF-%CE%B2%CE%B1%CF%83%CE%B9%CE%BB%CE%B9%CE%BA%CE%BF-cooking-class-on-naxos",
  },
  {
    name: "Santorini, Greece",
    lat: 36.3932,
    lng: 25.4615,
    date: "2025-05-24",
    description: "Island hopping from Naxos to Santorini",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    date: "2025-05-27",
    description: "Back to Athens after the islands",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Chania, Crete, Greece",
    lat: 35.5138,
    lng: 24.0180,
    date: "2025-06-01",
    description: "One day in Chania",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Bar, Montenegro",
    lat: 42.0936,
    lng: 19.1005,
    date: "2025-06-03",
    description: "Stop in Bar, Montenegro",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Corfu, Greece",
    lat: 39.6243,
    lng: 19.9217,
    date: "2025-06-04",
    description: "Day in Corfu",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Messina, Sicily, Italy",
    lat: 38.1938,
    lng: 15.5540,
    date: "2025-06-05",
    description: "Day in Messina, Sicily",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Valencia, Spain",
    lat: 39.4699,
    lng: -0.3763,
    date: "2025-06-07",
    description: "Valencian paella cooking class",
    blogUrl:
      "https://www.ouryearofwander.com/post/valencian-paella-cooking-class",
  },
  {
    name: "Ses Salines, Mallorca, Spain",
    lat: 39.3385,
    lng: 3.0530,
    date: "2025-06-14",
    description: "Mallorca",
    blogUrl:
      "https://www.ouryearofwander.com/post/spain",
  },
  {
    name: "Granada, Spain",
    lat: 37.1825,
    lng: -3.6012,
    date: "2025-06-19",
    description: "Granada Spain - Alhambra, Generalife and many local sights",
    blogUrl: "https://www.ouryearofwander.com/post/spain",
  },
  {
    name: "Madrid, Spain",
    lat: 40.4167,
    lng: -3.7033,
    date: "2025-06-24",
    description: "Madrid, Messy Play and Spanish tapas cooking class",
    blogUrl:
      "https://www.ouryearofwander.com/post/spanish-tapas-cooking-class-in-madrid",
  },
  {
    name: "Stockholm, Sweden",
    lat: 59.3293,
    lng: 18.0686,
    date: "2025-07-02",
    description: "Viking history tour in Sweden",
    blogUrl: "https://www.ouryearofwander.com/post/sweden-and-estonia",
  },
  {
    name: "Tallinn, Estonia",
    lat: 59.437,
    lng: 24.7536,
    date: "2025-07-08",
    description: "Exploring Estonia",
    blogUrl: "https://www.ouryearofwander.com/post/sweden-and-estonia",
  },
  {
    name: "London, England",
    lat: 51.5074,
    lng: -0.1278,
    date: "2025-07-11",
    description: "Exploring London",
    blogUrl: "https://www.ouryearofwander.com/post/united-kingdom",
  },
  {
    name: "Cotswolds, England",
    lat: 52.418,
    lng: -1.6786,
    date: "2025-07-21",
    description: "The English countryside",
    blogUrl: "https://www.ouryearofwander.com/post/united-kingdom",
  },
  {
    name: "Edinburgh, Scotland",
    lat: 55.9533,
    lng: -3.1883,
    date: "2025-07-28",
    description: "Exploring Edinburgh",
    blogUrl: "https://www.ouryearofwander.com/post/united-kingdom",
  },
  {
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    date: "2025-08-03",
    description: "August in Paris and Quincy-Voisins",
    blogUrl: "https://www.ouryearofwander.com/post/france",
  },
  {
    name: "Magny-le-Hongre, France",
    lat: 48.8629,
    lng: 2.8148,
    date: "2025-08-13",
    description: "August in Paris and Quincy-Voisins",
    blogUrl: "https://www.ouryearofwander.com/post/france",
  },
  {
    name: "St. Malo, France",
    lat: 48.6492,
    lng: 2.0184,
    date: "2025-08-17",
    description: "August in Paris and Quincy-Voisins",
    blogUrl: "https://www.ouryearofwander.com/post/france",
  },
  {
    name: "Guernsey, Channel Islands",
    lat: 49.4482,
    lng: -2.5895,
    date: "2025-08-20",
    description: "Month-long stay on Guernsey with family",
    blogUrl: "https://www.ouryearofwander.com/post/guernsey",
  },
  {
    name: "Tuoro sul Trasimeno, Italy",
    lat: 43.1833,
    lng: 12.0833,
    date: "2025-09-20",
    description: "Italian cooking class at an agrotourism olive farm",
    blogUrl: "https://www.ouryearofwander.com/post/italian-cooking-class",
  },
  {
    name: "Rome, Italy",
    lat: 41.9028,
    lng: 12.4964,
    date: "2025-09-26",
    description: "Final European stop — Ancient Rome",
    blogUrl: "https://www.ouryearofwander.com/post/italy",
  },
  {
    name: "Minneapolis, Minnesota, USA",
    lat: 44.9778,
    lng: -93.265,
    date: "2025-09-29",
    description: "Back in the USA for a wedding",
    blogUrl:
      "https://www.ouryearofwander.com/post/usa-minneapolis-and-seattle",
  },
  {
    name: "Seattle, Washington, USA",
    lat: 47.6062,
    lng: -122.3321,
    date: "2025-10-06",
    description: "Brief return home before heading to Australia",
    blogUrl:
      "https://www.ouryearofwander.com/post/usa-minneapolis-and-seattle",
  },
  {
    name: "Sydney, NSW Australia",
    lat: -33.8688,
    lng: 151.2093,
    date: "2025-10-06",
    description: "Stop in Sydney before heading to North Queensland",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "Bunya Mountains, Queensland, Australia",
    lat: -26.8758,
    lng: 151.4034,
    date: "2025-10-22",
    description: "Stay in a cabin in Bunya Mountains with family",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "The Gap, Queensland, Australia",
    lat: -27.4432,
    lng: 152.9232,
    date: "2025-10-27",
    description: "Visiting family in Brisbane",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "Magnetic Island, Queensland, Australia",
    lat: -19.1385,
    lng: 146.8339,
    date: "2025-11-03",
    description: "Visiting family on Magnetic Island",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "Hobart, Tasmania, Australia",
    lat: -42.8826,
    lng: 147.3257,
    date: "2025-11-15",
    description: "Continuing the Australian adventure in Tasmania",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "Octopus Resort, Fiji",
    lat: -16.7589,
    lng: 177.5450,
    date: "2026-01-17",
    description: "Visiting Octopus Resort on Fiji",
    blogUrl: "https://www.ouryearofwander.com/post/octopus-resort-in-fiji",
  },
  {
    name: "Melbourne, Victoria, Australia",
    lat: -37.8142,
    lng: 144.9632,
    date: "2026-01-25",
    description: "Continuing the Australian adventure in Melbourne",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "Coles Bay, Tasmania, Australia",
    lat: -42.1225,
    lng: 148.2894,
    date: "2026-01-27",
    description: "Continuing the Australian adventure in Tasmania",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
];

export default locations;
