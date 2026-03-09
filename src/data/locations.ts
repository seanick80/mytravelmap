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
    date: "2025-05-01",
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
    date: "2025-05-20",
    description: "Final days in Manhattan before departing",
    blogUrl: "https://www.ouryearofwander.com/post/until-next-time-manhattan",
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    date: "2025-05-22",
    description: "Arriving in Greece",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Naxos, Greece",
    lat: 37.1036,
    lng: 25.3763,
    date: "2025-05-23",
    description: "Basiliko cooking class on Naxos",
    blogUrl:
      "https://www.ouryearofwander.com/post/basiliko-%CF%84%CE%BF-%CE%B2%CE%B1%CF%83%CE%B9%CE%BB%CE%B9%CE%BA%CE%BF-cooking-class-on-naxos",
  },
  {
    name: "Santorini, Greece",
    lat: 36.3932,
    lng: 25.4615,
    date: "2025-06-01",
    description: "Island hopping from Naxos to Santorini",
    blogUrl:
      "https://www.ouryearofwander.com/post/greece-and-the-sun-princess",
  },
  {
    name: "Athens, Greece",
    lat: 37.9838,
    lng: 23.7275,
    date: "2025-05-28",
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
    date: "2025-06-15",
    description: "Valencian paella cooking class",
    blogUrl:
      "https://www.ouryearofwander.com/post/valencian-paella-cooking-class",
  },
  {
    name: "Madrid, Spain",
    lat: 40.4168,
    lng: -3.7038,
    date: "2025-06-30",
    description: "Spanish tapas cooking class",
    blogUrl:
      "https://www.ouryearofwander.com/post/spanish-tapas-cooking-class-in-madrid",
  },
  {
    name: "Barcelona, Spain",
    lat: 41.3874,
    lng: 2.1686,
    date: "2025-06-10",
    description: "Exploring Spain — multiple cities and local cuisine",
    blogUrl: "https://www.ouryearofwander.com/post/spain",
  },
  {
    name: "Stockholm, Sweden",
    lat: 59.3293,
    lng: 18.0686,
    date: "2025-07-17",
    description: "Viking history tour in Sweden",
    blogUrl: "https://www.ouryearofwander.com/post/sweden-and-estonia",
  },
  {
    name: "Tallinn, Estonia",
    lat: 59.437,
    lng: 24.7536,
    date: "2025-07-20",
    description: "Exploring Estonia",
    blogUrl: "https://www.ouryearofwander.com/post/sweden-and-estonia",
  },
  {
    name: "London, England",
    lat: 51.5074,
    lng: -0.1278,
    date: "2025-08-06",
    description: "Exploring London",
    blogUrl: "https://www.ouryearofwander.com/post/united-kingdom",
  },
  {
    name: "Cotswolds, England",
    lat: 51.8306,
    lng: -1.6833,
    date: "2025-08-10",
    description: "The English countryside",
    blogUrl: "https://www.ouryearofwander.com/post/united-kingdom",
  },
  {
    name: "Edinburgh, Scotland",
    lat: 55.9533,
    lng: -3.1883,
    date: "2025-08-15",
    description: "Exploring Edinburgh",
    blogUrl: "https://www.ouryearofwander.com/post/united-kingdom",
  },
  {
    name: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    date: "2025-08-27",
    description: "August in Paris and Quincy-Voisins",
    blogUrl: "https://www.ouryearofwander.com/post/france",
  },
  {
    name: "Guernsey, Channel Islands",
    lat: 49.4482,
    lng: -2.5895,
    date: "2025-09-25",
    description: "Month-long stay on Guernsey with family",
    blogUrl: "https://www.ouryearofwander.com/post/guernsey",
  },
  {
    name: "Tuoro sul Trasimeno, Italy",
    lat: 43.1833,
    lng: 12.0833,
    date: "2025-09-30",
    description: "Italian cooking class at an agrotourism olive farm",
    blogUrl: "https://www.ouryearofwander.com/post/italian-cooking-class",
  },
  {
    name: "Rome, Italy",
    lat: 41.9028,
    lng: 12.4964,
    date: "2025-10-05",
    description: "Final European stop — ancient Rome",
    blogUrl: "https://www.ouryearofwander.com/post/italy",
  },
  {
    name: "Minneapolis, Minnesota, USA",
    lat: 44.9778,
    lng: -93.265,
    date: "2025-11-01",
    description: "Back in the USA for a wedding",
    blogUrl:
      "https://www.ouryearofwander.com/post/usa-minneapolis-and-seattle",
  },
  {
    name: "Seattle, Washington, USA",
    lat: 47.6062,
    lng: -122.3321,
    date: "2025-11-11",
    description: "Brief return home before heading to Australia",
    blogUrl:
      "https://www.ouryearofwander.com/post/usa-minneapolis-and-seattle",
  },
  {
    name: "North Queensland, Australia",
    lat: -16.9186,
    lng: 145.7781,
    date: "2025-12-03",
    description: "Following the sun across Australia, visiting family",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "New South Wales, Australia",
    lat: -33.8688,
    lng: 151.2093,
    date: "2025-12-15",
    description: "Continuing the Australian adventure",
    blogUrl:
      "https://www.ouryearofwander.com/post/north-queensland-and-new-south-wales-australia",
  },
  {
    name: "Octopus Resort, Fiji",
    lat: -17.7399,
    lng: 177.0917,
    date: "2026-02-19",
    description: "Island life after Australia",
    blogUrl: "https://www.ouryearofwander.com/post/octopus-resort-in-fiji",
  },
];

export default locations;
