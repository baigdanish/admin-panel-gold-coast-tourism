export const dummyTours = [
  {
    id: 1,
    name: "Dubai Desert Safari with BBQ Dinner",
    city: "Dubai",
    category: "Desert Safari",
    shortDescription: "Evening desert safari with dune bashing and BBQ dinner",

    adultPrice: 250,
    childPrice: 200,
    infantPrice: 0,

    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    timeSlots: ["Evening"],

    capacity: 50,
    booked: 32,

    pickupIncluded: true,
    pickupLocations: ["Deira", "Bur Dubai", "Marina"],
    transferType: "SIC",

    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
    childPolicy: "Children under 3 years are free",
    refundPolicy: "No refund for no-shows",

    status: "published",
  },
  {
    id: 2,
    name: "Dubai City Tour",
    city: "Dubai",
    category: "City Tour",
    shortDescription: "Half-day guided city tour of Dubai",

    adultPrice: 180,
    childPrice: 140,
    infantPrice: 0,

    availableDays: ["Sun", "Mon", "Wed", "Fri"],
    timeSlots: ["Morning"],

    capacity: 30,
    booked: 18,

    pickupIncluded: true,
    pickupLocations: ["Downtown", "JBR", "Business Bay"],
    transferType: "SIC",

    cancellationPolicy: "Free cancellation up to 12 hours before the tour",
    childPolicy: "Child price applies from 3–10 years",
    refundPolicy: "Refund within 7 working days",

    status: "published",
  },
  {
    id: 3,
    name: "Dhow Cruise Marina Dinner",
    city: "Dubai",
    category: "Cruise",
    shortDescription: "Luxury dinner cruise at Dubai Marina",

    adultPrice: 220,
    childPrice: 180,
    infantPrice: 0,

    availableDays: ["Thu", "Fri", "Sat"],
    timeSlots: ["Evening"],

    capacity: 40,
    booked: 40,

    pickupIncluded: true,
    pickupLocations: ["Sharjah", "Ajman", "Dubai"],
    transferType: "Private",

    cancellationPolicy: "Non-refundable within 24 hours",
    childPolicy: "Children below 5 years are free",
    refundPolicy: "Refund only if tour is cancelled by operator",

    status: "inactive",
  },
];
