import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { API_PATHS } from "../../constants/api-paths";
console.info("🟡 USING MOCK SERVICE (Branch Locator)");

const branches = [
  {
    id: "1",
    name: "Sandton City Branch",
    province: "Gauteng",
    address: {
      street: "5 Rivonia Road",
      suburb: "Sandton",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2196",
    },
    coordinates: {
      latitude: -26.1076,
      longitude: 28.0567,
    },
    languages: ["English", "Zulu", "Xitsonga"],
    facilities: ["Parking", "ATM", "Wheelchair Access", "WiFi"],
    services: ["Loans", "Insurance", "Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550101",
      email: "sandton@bank.co.za",
    },
    rating: 4.8,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Busy" },
        { time: "09:00", level: "Moderate" },
        { time: "13:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: "Located inside Sandton City Mall.",
  },

  {
    id: "2",
    name: "Rosebank Branch",
    province: "Gauteng",
    address: {
      street: "50 Oxford Road",
      suburb: "Rosebank",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2196",
    },
    coordinates: {
      latitude: -26.1466,
      longitude: 28.0418,
    },
    languages: ["English", "Zulu", "Sotho"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550102",
      email: "rosebank@bank.co.za",
    },
    rating: 4.6,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Quiet" },
        { time: "10:00", level: "Very Busy" },
        { time: "13:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "3",
    name: "Menlyn Branch",
    province: "Gauteng",
    address: {
      street: "12 Atterbury Road",
      suburb: "Menlyn",
      city: "Pretoria",
      province: "Gauteng",
      postalCode: "0181",
    },
    coordinates: {
      latitude: -25.785,
      longitude: 28.276,
    },
    languages: ["English", "Xitsonga", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Loans", "Savings"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0125550103",
      email: "menlyn@bank.co.za",
    },
    rating: 4.5,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Moderate" },
        { time: "09:00", level: "Quiet" },
        { time: "15:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "11",
    name: "Fourways Branch",
    province: "Gauteng",
    address: {
      street: "2 Fourways Boulevard",
      suburb: "Fourways",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2055",
    },
    coordinates: {
      latitude: -26.0128,
      longitude: 28.0098,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM", "WiFi", "Wheelchair Access"],
    services: ["Loans", "Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550111",
      email: "fourways@bank.co.za",
    },
    rating: 4.4,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Very Busy" },
        { time: "14:00", level: "Busy" },
        { time: "16:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "12",
    name: "Midrand Branch",
    province: "Gauteng",
    address: {
      street: "18 New Road",
      suburb: "Halfway House",
      city: "Midrand",
      province: "Gauteng",
      postalCode: "1685",
    },
    coordinates: {
      latitude: -25.9992,
      longitude: 28.1123,
    },
    languages: ["English", "Zulu"],
    facilities: ["Parking", "ATM"],
    services: ["Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550112",
      email: "midrand@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "10:00", level: "Busy" },
        { time: "14:00", level: "Moderate" },
        { time: "16:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "13",
    name: "Centurion Branch",
    province: "Gauteng",
    address: {
      street: "1 Heuwel Avenue",
      suburb: "Centurion Central",
      city: "Centurion",
      province: "Gauteng",
      postalCode: "0157",
    },
    coordinates: {
      latitude: -25.8603,
      longitude: 28.1894,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Loans", "Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0125550113",
      email: "centurion@bank.co.za",
    },
    rating: 4.6,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Very Busy" },
        { time: "09:00", level: "Quiet" },
        { time: "13:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "14",
    name: "Soweto Branch",
    province: "Gauteng",
    address: {
      street: "120 Vilakazi Street",
      suburb: "Orlando West",
      city: "Soweto",
      province: "Gauteng",
      postalCode: "1804",
    },
    coordinates: {
      latitude: -26.2384,
      longitude: 27.9042,
    },
    languages: ["English", "Zulu", "Sotho"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Savings", "Loans", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550114",
      email: "soweto@bank.co.za",
    },
    rating: 4.7,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "12:00", level: "Quiet" },
        { time: "13:00", level: "Very Busy" },
        { time: "14:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "15",
    name: "Pretoria CBD Branch",
    province: "Gauteng",
    address: {
      street: "225 Church Street",
      suburb: "CBD",
      city: "Pretoria",
      province: "Gauteng",
      postalCode: "0002",
    },
    coordinates: {
      latitude: -25.7479,
      longitude: 28.1879,
    },
    languages: ["English", "Afrikaans", "Sepedi"],
    facilities: ["Parking", "ATM", "WiFi", "Wheelchair Access"],
    services: ["Loans", "Insurance", "Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0125550115",
      email: "pretoriacbd@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "14:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "16",
    name: "Randburg Branch",
    province: "Gauteng",
    address: {
      street: "9 Bram Fischer Drive",
      suburb: "Randburg",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2194",
    },
    coordinates: {
      latitude: -26.0939,
      longitude: 28.0064,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM"],
    services: ["Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550116",
      email: "randburg@bank.co.za",
    },
    rating: 4.0,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Quiet" },
        { time: "11:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "17",
    name: "Boksburg Branch",
    province: "Gauteng",
    address: {
      street: "30 Trichardt Road",
      suburb: "Boksburg Central",
      city: "Boksburg",
      province: "Gauteng",
      postalCode: "1459",
    },
    coordinates: {
      latitude: -26.212,
      longitude: 28.259,
    },
    languages: ["English", "Zulu"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Loans", "Savings"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550117",
      email: "boksburg@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Moderate" },
        { time: "12:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "4",
    name: "Cape Town CBD Branch",
    province: "Western Cape",
    address: {
      street: "80 Adderley Street",
      suburb: "CBD",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "8001",
    },
    coordinates: {
      latitude: -33.9249,
      longitude: 18.4241,
    },
    languages: ["English", "Afrikaans", "Xhosa"],
    facilities: ["Parking", "ATM", "WiFi", "Wheelchair Access"],
    services: ["Loans", "Insurance", "Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550104",
      email: "capetown@bank.co.za",
    },
    rating: 4.9,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Busy" },
        { time: "12:00", level: "Moderate" },
        { time: "14:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "5",
    name: "Century City Branch",
    province: "Western Cape",
    address: {
      street: "Century Boulevard",
      suburb: "Century City",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7441",
    },
    coordinates: {
      latitude: -33.8938,
      longitude: 18.508,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["Parking", "ATM"],
    services: ["Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550105",
      email: "centurycity@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Busy" },
        { time: "13:00", level: "Quiet" },
        { time: "16:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "18",
    name: "Claremont Branch",
    province: "Western Cape",
    address: {
      street: "3 Main Road",
      suburb: "Claremont",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7708",
    },
    coordinates: {
      latitude: -33.9819,
      longitude: 18.4649,
    },
    languages: ["English", "Afrikaans", "Xhosa"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Loans", "Savings"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550118",
      email: "claremont@bank.co.za",
    },
    rating: 4.5,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Very Busy" },
        { time: "11:00", level: "Very Busy" },
        { time: "16:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "19",
    name: "Stellenbosch Branch",
    province: "Western Cape",
    address: {
      street: "12 Dorp Street",
      suburb: "Stellenbosch Central",
      city: "Stellenbosch",
      province: "Western Cape",
      postalCode: "7600",
    },
    coordinates: {
      latitude: -33.9346,
      longitude: 18.8601,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550119",
      email: "stellenbosch@bank.co.za",
    },
    rating: 4.6,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Busy" },
        { time: "13:00", level: "Quiet" },
        { time: "16:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "20",
    name: "George Branch",
    province: "Western Cape",
    address: {
      street: "45 York Street",
      suburb: "Central",
      city: "George",
      province: "Western Cape",
      postalCode: "6529",
    },
    coordinates: {
      latitude: -33.9628,
      longitude: 22.4573,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["Parking", "ATM"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0445550120",
      email: "george@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Very Busy" },
        { time: "13:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "21",
    name: "Bellville Branch",
    province: "Western Cape",
    address: {
      street: "27 Voortrekker Road",
      suburb: "Bellville Central",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7530",
    },
    coordinates: {
      latitude: -33.9,
      longitude: 18.6292,
    },
    languages: ["English", "Afrikaans", "Xhosa"],
    facilities: ["Parking", "ATM", "WiFi", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550121",
      email: "bellville@bank.co.za",
    },
    rating: 4.4,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "11:00", level: "Moderate" },
        { time: "12:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "6",
    name: "Durban Central Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "101 Dr Pixley KaSeme Street",
      suburb: "CBD",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4001",
    },
    coordinates: {
      latitude: -29.8587,
      longitude: 31.0218,
    },
    languages: ["English", "Zulu"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0315550106",
      email: "durban@bank.co.za",
    },
    rating: 4.5,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "14:00", level: "Moderate" },
        { time: "15:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "7",
    name: "Umhlanga Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "1 Lighthouse Road",
      suburb: "Umhlanga",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4320",
    },
    coordinates: {
      latitude: -29.7266,
      longitude: 31.0845,
    },
    languages: ["English", "Zulu"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0315550107",
      email: "umhlanga@bank.co.za",
    },
    rating: 4.7,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "12:00", level: "Very Busy" },
        { time: "13:00", level: "Very Busy" },
        { time: "16:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "22",
    name: "Pietermaritzburg Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "210 Church Street",
      suburb: "CBD",
      city: "Pietermaritzburg",
      province: "KwaZulu-Natal",
      postalCode: "3201",
    },
    coordinates: {
      latitude: -29.6006,
      longitude: 30.3794,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Loans", "Savings"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0335550122",
      email: "pmb@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "10:00", level: "Very Busy" },
        { time: "11:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "23",
    name: "Ballito Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "10 Ballito Drive",
      suburb: "Ballito Central",
      city: "Ballito",
      province: "KwaZulu-Natal",
      postalCode: "4420",
    },
    coordinates: {
      latitude: -29.5385,
      longitude: 31.2141,
    },
    languages: ["English", "Zulu"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0325550123",
      email: "ballito@bank.co.za",
    },
    rating: 4.6,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Moderate" },
        { time: "09:00", level: "Very Busy" },
        { time: "15:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "24",
    name: "Newcastle Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "55 Murchison Street",
      suburb: "Newcastle Central",
      city: "Newcastle",
      province: "KwaZulu-Natal",
      postalCode: "2940",
    },
    coordinates: {
      latitude: -27.7573,
      longitude: 29.9319,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0345550124",
      email: "newcastle@bank.co.za",
    },
    rating: 3.9,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "14:00", level: "Very Busy" },
        { time: "16:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "8",
    name: "Gqeberha Branch",
    province: "Eastern Cape",
    address: {
      street: "25 Govan Mbeki Avenue",
      suburb: "Central",
      city: "Gqeberha",
      province: "Eastern Cape",
      postalCode: "6001",
    },
    coordinates: {
      latitude: -33.9608,
      longitude: 25.6022,
    },
    languages: ["English", "Xhosa"],
    facilities: ["ATM", "Parking"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0415550108",
      email: "gqeberha@bank.co.za",
    },
    rating: 4.2,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Quiet" },
        { time: "16:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "25",
    name: "East London Branch",
    province: "Eastern Cape",
    address: {
      street: "33 Oxford Street",
      suburb: "CBD",
      city: "East London",
      province: "Eastern Cape",
      postalCode: "5201",
    },
    coordinates: {
      latitude: -33.0153,
      longitude: 27.9116,
    },
    languages: ["English", "Xhosa", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Savings", "Loans", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0435550125",
      email: "eastlondon@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Very Busy" },
        { time: "10:00", level: "Moderate" },
        { time: "13:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "26",
    name: "Mthatha Branch",
    province: "Eastern Cape",
    address: {
      street: "14 Sutherland Street",
      suburb: "CBD",
      city: "Mthatha",
      province: "Eastern Cape",
      postalCode: "5099",
    },
    coordinates: {
      latitude: -31.5889,
      longitude: 28.7844,
    },
    languages: ["English", "Xhosa"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0475550126",
      email: "mthatha@bank.co.za",
    },
    rating: 4.0,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Moderate" },
        { time: "12:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "9",
    name: "Bloemfontein Branch",
    province: "Free State",
    address: {
      street: "155 Nelson Mandela Drive",
      suburb: "Westdene",
      city: "Bloemfontein",
      province: "Free State",
      postalCode: "9301",
    },
    coordinates: {
      latitude: -29.1183,
      longitude: 26.2299,
    },
    languages: ["English", "Sotho", "Afrikaans"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0515550109",
      email: "bloem@bank.co.za",
    },
    rating: 4.4,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "11:00", level: "Moderate" },
        { time: "12:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "27",
    name: "Welkom Branch",
    province: "Free State",
    address: {
      street: "22 Stateway",
      suburb: "Welkom Central",
      city: "Welkom",
      province: "Free State",
      postalCode: "9459",
    },
    coordinates: {
      latitude: -27.9789,
      longitude: 26.7362,
    },
    languages: ["English", "Sotho", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0575550127",
      email: "welkom@bank.co.za",
    },
    rating: 3.8,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "13:00", level: "Quiet" },
        { time: "15:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "10",
    name: "Polokwane Branch",
    province: "Limpopo",
    address: {
      street: "45 Market Street",
      suburb: "CBD",
      city: "Polokwane",
      province: "Limpopo",
      postalCode: "0700",
    },
    coordinates: {
      latitude: -23.9045,
      longitude: 29.4689,
    },
    languages: ["English", "Xitsonga", "Sepedi"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Savings", "Loans", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0155550110",
      email: "polokwane@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "12:00", level: "Moderate" },
        { time: "13:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "28",
    name: "Tzaneen Branch",
    province: "Limpopo",
    address: {
      street: "8 Danie Joubert Street",
      suburb: "Tzaneen Central",
      city: "Tzaneen",
      province: "Limpopo",
      postalCode: "0850",
    },
    coordinates: {
      latitude: -23.8339,
      longitude: 30.1633,
    },
    languages: ["English", "Sepedi", "Xitsonga"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0155550128",
      email: "tzaneen@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Quiet" },
        { time: "11:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "29",
    name: "Nelspruit Branch",
    province: "Mpumalanga",
    address: {
      street: "19 Louis Trichardt Street",
      suburb: "Nelspruit Central",
      city: "Mbombela",
      province: "Mpumalanga",
      postalCode: "1200",
    },
    coordinates: {
      latitude: -25.4753,
      longitude: 30.9694,
    },
    languages: ["English", "Siswati", "Zulu"],
    facilities: ["Parking", "ATM", "WiFi", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0135550129",
      email: "nelspruit@bank.co.za",
    },
    rating: 4.4,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Very Busy" },
        { time: "10:00", level: "Moderate" },
        { time: "16:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "30",
    name: "Witbank Branch",
    province: "Mpumalanga",
    address: {
      street: "5 Mandela Street",
      suburb: "CBD",
      city: "eMalahleni",
      province: "Mpumalanga",
      postalCode: "1035",
    },
    coordinates: {
      latitude: -25.8749,
      longitude: 29.2325,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0135550130",
      email: "witbank@bank.co.za",
    },
    rating: 3.9,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "14:00", level: "Moderate" },
        { time: "16:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "31",
    name: "Rustenburg Branch",
    province: "North West",
    address: {
      street: "14 Nelson Mandela Drive",
      suburb: "CBD",
      city: "Rustenburg",
      province: "North West",
      postalCode: "0299",
    },
    coordinates: {
      latitude: -25.6672,
      longitude: 27.2424,
    },
    languages: ["English", "Setswana", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0145550131",
      email: "rustenburg@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "12:00", level: "Busy" },
        { time: "14:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "32",
    name: "Mahikeng Branch",
    province: "North West",
    address: {
      street: "33 Nelson Mandela Drive",
      suburb: "CBD",
      city: "Mahikeng",
      province: "North West",
      postalCode: "2745",
    },
    coordinates: {
      latitude: -25.8654,
      longitude: 25.6438,
    },
    languages: ["English", "Setswana"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0185550132",
      email: "mahikeng@bank.co.za",
    },
    rating: 4.0,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "15:00", level: "Quiet" },
        { time: "16:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "33",
    name: "Kimberley Branch",
    province: "Northern Cape",
    address: {
      street: "7 Du Toitspan Road",
      suburb: "CBD",
      city: "Kimberley",
      province: "Northern Cape",
      postalCode: "8301",
    },
    coordinates: {
      latitude: -28.7383,
      longitude: 24.7642,
    },
    languages: ["English", "Afrikaans", "Setswana"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0535550133",
      email: "kimberley@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Busy" },
        { time: "11:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "34",
    name: "Upington Branch",
    province: "Northern Cape",
    address: {
      street: "18 Schroder Street",
      suburb: "CBD",
      city: "Upington",
      province: "Northern Cape",
      postalCode: "8801",
    },
    coordinates: {
      latitude: -28.4478,
      longitude: 21.2561,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0545550134",
      email: "upington@bank.co.za",
    },
    rating: 3.7,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Moderate" },
        { time: "16:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "35",
    name: "Kempton Park Branch",
    province: "Gauteng",
    address: {
      street: "14 Pretoria Road",
      suburb: "Kempton Park Central",
      city: "Kempton Park",
      province: "Gauteng",
      postalCode: "1619",
    },
    coordinates: {
      latitude: -26.1015,
      longitude: 28.2294,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550135",
      email: "kemptonpark@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Moderate" },
        { time: "09:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "36",
    name: "Vereeniging Branch",
    province: "Gauteng",
    address: {
      street: "22 Voortrekker Street",
      suburb: "CBD",
      city: "Vereeniging",
      province: "Gauteng",
      postalCode: "1930",
    },
    coordinates: {
      latitude: -26.6731,
      longitude: 27.9317,
    },
    languages: ["English", "Afrikaans", "Sotho"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0165550136",
      email: "vereeniging@bank.co.za",
    },
    rating: 3.9,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Quiet" },
        { time: "13:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "37",
    name: "Krugersdorp Branch",
    province: "Gauteng",
    address: {
      street: "5 Human Street",
      suburb: "CBD",
      city: "Krugersdorp",
      province: "Gauteng",
      postalCode: "1739",
    },
    coordinates: {
      latitude: -26.1023,
      longitude: 27.7739,
    },
    languages: ["English", "Afrikaans", "Zulu"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Loans", "Savings"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550137",
      email: "krugersdorp@bank.co.za",
    },
    rating: 4.0,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "12:00", level: "Moderate" },
        { time: "15:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "38",
    name: "Alberton Branch",
    province: "Gauteng",
    address: {
      street: "10 Voortrekker Road",
      suburb: "Alberton North",
      city: "Alberton",
      province: "Gauteng",
      postalCode: "1449",
    },
    coordinates: {
      latitude: -26.2669,
      longitude: 28.1219,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550138",
      email: "alberton@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Very Busy" },
        { time: "14:00", level: "Very Busy" },
        { time: "15:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "39",
    name: "Paarl Branch",
    province: "Western Cape",
    address: {
      street: "90 Main Street",
      suburb: "Paarl Central",
      city: "Paarl",
      province: "Western Cape",
      postalCode: "7646",
    },
    coordinates: {
      latitude: -33.7342,
      longitude: 18.9621,
    },
    languages: ["English", "Afrikaans", "Xhosa"],
    facilities: ["Parking", "ATM"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550139",
      email: "paarl@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Very Busy" },
        { time: "13:00", level: "Busy" },
        { time: "16:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "40",
    name: "Mitchells Plain Branch",
    province: "Western Cape",
    address: {
      street: "1 AZ Berman Drive",
      suburb: "Town Centre",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7785",
    },
    coordinates: {
      latitude: -34.0378,
      longitude: 18.6182,
    },
    languages: ["English", "Afrikaans", "Xhosa"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550140",
      email: "mitchellsplain@bank.co.za",
    },
    rating: 4.0,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "14:00", level: "Quiet" },
        { time: "15:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "41",
    name: "Worcester Branch",
    province: "Western Cape",
    address: {
      street: "33 High Street",
      suburb: "Worcester Central",
      city: "Worcester",
      province: "Western Cape",
      postalCode: "6849",
    },
    coordinates: {
      latitude: -33.6464,
      longitude: 19.4483,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0235550141",
      email: "worcester@bank.co.za",
    },
    rating: 3.8,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Busy" },
        { time: "14:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "42",
    name: "Richards Bay Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "7 Krail Street",
      suburb: "CBD",
      city: "Richards Bay",
      province: "KwaZulu-Natal",
      postalCode: "3900",
    },
    coordinates: {
      latitude: -28.7807,
      longitude: 32.0383,
    },
    languages: ["English", "Zulu"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0355550142",
      email: "richardsbay@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Moderate" },
        { time: "16:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "43",
    name: "Chatsworth Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "12 Higginson Highway",
      suburb: "Chatsworth Centre",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "4030",
    },
    coordinates: {
      latitude: -29.9167,
      longitude: 30.8833,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0315550143",
      email: "chatsworth@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "10:00", level: "Moderate" },
        { time: "14:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "44",
    name: "Queenstown Branch",
    province: "Eastern Cape",
    address: {
      street: "40 Cathcart Road",
      suburb: "CBD",
      city: "Queenstown",
      province: "Eastern Cape",
      postalCode: "5320",
    },
    coordinates: {
      latitude: -31.8976,
      longitude: 26.8753,
    },
    languages: ["English", "Xhosa", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0455550144",
      email: "queenstown@bank.co.za",
    },
    rating: 3.9,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "11:00", level: "Quiet" },
        { time: "15:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "45",
    name: "Uitenhage Branch",
    province: "Eastern Cape",
    address: {
      street: "18 Caledon Street",
      suburb: "CBD",
      city: "Kariega",
      province: "Eastern Cape",
      postalCode: "6229",
    },
    coordinates: {
      latitude: -33.7614,
      longitude: 25.3967,
    },
    languages: ["English", "Xhosa", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0415550145",
      email: "uitenhage@bank.co.za",
    },
    rating: 4.0,
    isOpen: false,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Quiet" },
        { time: "16:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "46",
    name: "Sasolburg Branch",
    province: "Free State",
    address: {
      street: "9 Fichardt Street",
      suburb: "CBD",
      city: "Sasolburg",
      province: "Free State",
      postalCode: "1947",
    },
    coordinates: {
      latitude: -26.8146,
      longitude: 27.8156,
    },
    languages: ["English", "Afrikaans", "Sotho"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0165550146",
      email: "sasolburg@bank.co.za",
    },
    rating: 3.8,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Moderate" },
        { time: "11:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "47",
    name: "Thohoyandou Branch",
    province: "Limpopo",
    address: {
      street: "3 University Road",
      suburb: "CBD",
      city: "Thohoyandou",
      province: "Limpopo",
      postalCode: "0950",
    },
    coordinates: {
      latitude: -22.9767,
      longitude: 30.4842,
    },
    languages: ["English", "Tshivenda", "Xitsonga"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0155550147",
      email: "thohoyandou@bank.co.za",
    },
    rating: 4.1,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "15:00", level: "Moderate" },
        { time: "16:00", level: "Very Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "48",
    name: "Secunda Branch",
    province: "Mpumalanga",
    address: {
      street: "15 Horwood Street",
      suburb: "CBD",
      city: "Secunda",
      province: "Mpumalanga",
      postalCode: "2302",
    },
    coordinates: {
      latitude: -26.5225,
      longitude: 29.1739,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM"],
    services: ["Loans", "Savings", "Insurance"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0175550148",
      email: "secunda@bank.co.za",
    },
    rating: 4.0,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Very Busy" },
        { time: "10:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "49",
    name: "Klerksdorp Branch",
    province: "North West",
    address: {
      street: "28 Margaretha Prinsloo Street",
      suburb: "CBD",
      city: "Klerksdorp",
      province: "North West",
      postalCode: "2570",
    },
    coordinates: {
      latitude: -26.8523,
      longitude: 26.6667,
    },
    languages: ["English", "Afrikaans", "Setswana"],
    facilities: ["ATM", "Parking", "Wheelchair Access"],
    services: ["Savings", "Loans", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0185550149",
      email: "klerksdorp@bank.co.za",
    },
    rating: 4.2,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "12:00", level: "Very Busy" },
        { time: "14:00", level: "Busy" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "50",
    name: "Springbok Branch",
    province: "Northern Cape",
    address: {
      street: "11 Voortrekker Street",
      suburb: "CBD",
      city: "Springbok",
      province: "Northern Cape",
      postalCode: "8240",
    },
    coordinates: {
      latitude: -29.6643,
      longitude: 17.8865,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Savings", "Loans"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0275550150",
      email: "springbok@bank.co.za",
    },
    rating: 3.7,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "14:00", level: "Moderate" },
        { time: "15:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "51",
    name: "Benoni Branch",
    province: "Gauteng",
    address: {
      street: "66 Tom Jones Street",
      suburb: "Benoni Central",
      city: "Benoni",
      province: "Gauteng",
      postalCode: "1501",
    },
    coordinates: {
      latitude: -26.1883,
      longitude: 28.3208,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["Parking", "ATM", "WiFi"],
    services: ["Loans", "Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0115550151",
      email: "benoni@bank.co.za",
    },
    rating: 4.3,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Quiet" },
        { time: "11:00", level: "Busy" },
        { time: "12:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "52",
    name: "Somerset West Branch",
    province: "Western Cape",
    address: {
      street: "41 Main Road",
      suburb: "Somerset West Central",
      city: "Cape Town",
      province: "Western Cape",
      postalCode: "7130",
    },
    coordinates: {
      latitude: -34.0836,
      longitude: 18.8503,
    },
    languages: ["English", "Afrikaans"],
    facilities: ["Parking", "ATM", "Wheelchair Access"],
    services: ["Savings", "Insurance", "Account Opening"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0215550152",
      email: "somersetwest@bank.co.za",
    },
    rating: 4.5,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "08:00", level: "Moderate" },
        { time: "12:00", level: "Quiet" },
        { time: "15:00", level: "Quiet" }
      ],
    },
    imageUrl: null,
    notes: null,
  },

  {
    id: "53",
    name: "Pinetown Branch",
    province: "KwaZulu-Natal",
    address: {
      street: "17 Josiah Gumede Road",
      suburb: "Pinetown Central",
      city: "Durban",
      province: "KwaZulu-Natal",
      postalCode: "3610",
    },
    coordinates: {
      latitude: -29.8153,
      longitude: 30.8556,
    },
    languages: ["English", "Zulu", "Afrikaans"],
    facilities: ["ATM", "Parking"],
    services: ["Loans", "Savings"],
    operatingHours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-16:00",
      saturday: "09:00-13:00",
      sunday: "Closed",
    },
    contacts: {
      phone: "0315550153",
      email: "pinetown@bank.co.za",
    },
    rating: 4.0,
    isOpen: true,
    busyTimes: {
      Monday: [
        { time: "09:00", level: "Quiet" },
        { time: "10:00", level: "Moderate" }
      ],
    },
    imageUrl: null,
    notes: null,
  }];

/* ------------------------------------------------------------------
   Branch Locator Mock Endpoints
-------------------------------------------------------------------*/

export const branchLocatorService = [

      /**
   * ------------------------------------------------------------------
   * GET /v1/branches
   * ------------------------------------------------------------------
   */
  http.get(API_PATHS.BRANCHES, async ({ request }) => {
    await delay(800);

    const url = new URL(request.url);

    const simulateError = url.searchParams.get("simulateError");

    if (simulateError === "400") {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        {
          status: 400,
        },
      );
    }

    if (simulateError === "500") {
      return HttpResponse.json(
        {
          success: false,
          message: "Internal server error.",
        },
        {
          status: 500,
        },
      );
    }

    const province = url.searchParams.get("province");
    const language = url.searchParams.get("language");
    const facility = url.searchParams.get("facility");
    const service = url.searchParams.get("service");
    const search = url.searchParams.get("search");

    const page = Number(url.searchParams.get("page") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 20);

    let filtered = [...branches];

    if (province) {
      filtered = filtered.filter(
        (branch) => branch.province === province,
      );
    }

    if (language) {
      filtered = filtered.filter((branch) =>
        branch.languages.includes(language),
      );
    }

    if (facility) {
      filtered = filtered.filter((branch) =>
        branch.facilities.includes(facility),
      );
    }

    if (service) {
      filtered = filtered.filter((branch) =>
        branch.services.includes(service),
      );
    }

    if (search) {
      const value = search.toLowerCase();

      filtered = filtered.filter(
        (branch) =>
          branch.name.toLowerCase().includes(value) ||
          branch.address.city.toLowerCase().includes(value) ||
          branch.address.suburb
            ?.toLowerCase()
            .includes(value),
      );
    }

    const total = filtered.length;

    const start = (page - 1) * pageSize;

    const end = start + pageSize;

    const paginatedBranches = filtered.slice(start, end);

    return HttpResponse.json({
      success: true,
      branches: paginatedBranches.map((branch) => ({
        id: branch.id,
        name: branch.name,
        province: branch.province,
        coordinates: branch.coordinates,
        address: `${branch.address.street}, ${branch.address.city}`,
        rating: branch.rating,
        isOpen: branch.isOpen,
      })),
      total,
      page,
      pageSize,
    });
  }),

  /**
   * ------------------------------------------------------------------
   * GET /v1/branches/:branchId
   * ------------------------------------------------------------------
   */
  http.get(
    `${API_PATHS.BRANCHES}/:branchId`,
    async ({ params, request }) => {
      await delay(600);

      const url = new URL(request.url);

      const simulateError =
        url.searchParams.get("simulateError");

      if (simulateError === "500") {
        return HttpResponse.json(
          {
            success: false,
            message: "Internal server error.",
          },
          {
            status: 500,
          },
        );
      }

      const branch = branches.find(
        (branch) => branch.id === params.branchId,
      );

      if (!branch) {
        return HttpResponse.json(
          {
            success: false,
            message: "Branch not found.",
          },
          {
            status: 404,
          },
        );
      }

      return HttpResponse.json({
        success: true,
        ...branch,
      });
    },
  ),
];
export const worker = setupWorker(...branchLocatorService);