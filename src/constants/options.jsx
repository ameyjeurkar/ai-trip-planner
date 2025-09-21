export const SelectTravelList = [
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people:'1 person'
    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 people'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    }
]

export const SelectExperienceType = [
    {
      "id": 1,
      "title": "Nightlife",
      "desc": "Experience the vibrant nightlife with clubs, bars, live music, and late-night entertainment unique to the destination.",
      "icon": "🌃"
    },
    {
      "id": 2,
      "title": "Adventure",
      "desc": "Engage in thrilling activities like hiking, trekking, water sports, or extreme sports for adrenaline seekers.",
      "icon": "🧗"
    },
    {
      "id": 3,
      "title": "Heritage & Culture",
      "desc": "Discover the rich cultural heritage, monuments, museums, temples, and traditions of the destination.",
      "icon": "🏛️"
    },
    {
      "id": 4,
      "title": "Relaxation & Wellness",
      "desc": "Unwind with spa treatments, yoga retreats, meditation, and tranquil natural settings for rejuvenation.",
      "icon": "🧘"
    },
    {
      "id": 5,
      "title": "Food & Culinary",
      "desc": "Taste authentic local cuisines, street food, and fine dining experiences to explore flavors of the region.",
      "icon": "🍲"
    },
    {
      "id": 6,
      "title": "Shopping",
      "desc": "Enjoy shopping at local markets, boutiques, luxury malls, and unique souvenir stores.",
      "icon": "🛍️"
    },
    {
      "id": 7,
      "title": "Nature & Scenic",
      "desc": "Explore natural beauty like mountains, beaches, lakes, and wildlife sanctuaries.",
      "icon": "🌿"
    },
    {
      "id": 8,
      "title": "Festivals & Events",
      "desc": "Participate in cultural festivals, concerts, seasonal fairs, and unique local celebrations.",
      "icon": "🎉"
    }
  ]

  export const numberOfActivitiesForDay = [
    {
      id: 1,
      title: "1 activity"
    },
    {
      id: 2,
      title: "2 activities"
    },
    {
      id: 3,
      title: "3 activities"
    },
    {
      id: 4,
      title: "4 activities"
    },
  ]
  

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'
// export const AI_PROMPT = 'Generate Travel Itinerary Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget per person which curates itinerary keeping in mind {typeOfExperience} wanted by the individual, Give me a Hotels options list with Hotel Name, Hotel Address, Price, hotel image url, geo coordinates, rating, descriptions, provided facilities and reviews. Also provide itinerary list with Place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit the place and give what places should be visited in morning, afternoon and evening and late night based on {numberOfActivitiesForDay} per day. Give me the list of 5-10 must try local food options in {location} with Food name, Food Description, food ingredients if available or else empty, type of food(dessert, savoury, tangy etc), address where this must be tried, location details like in which city it should be tried in JSON format';