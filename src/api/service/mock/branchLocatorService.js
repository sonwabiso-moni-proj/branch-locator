import { delay, http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { API_PATHS } from "../../constants/api-paths";

console.info("🟡 USING MOCK SERVICE (Branch Locator)");

const DEFAULT_OPERATING_HOURS = {
  monday: "08:00-17:00",
  tuesday: "08:00-17:00",
  wednesday: "08:00-17:00",
  thursday: "08:00-17:00",
  friday: "08:00-16:00",
  saturday: "09:00-13:00",
  sunday: "Closed",
};

const PROVINCE_LANGUAGES = {
  Gauteng: ["English", "Zulu", "Afrikaans"],
  "Western Cape": ["English", "Afrikaans", "Xhosa"],
  "KwaZulu-Natal": ["English", "Zulu"],
  "Eastern Cape": ["English", "Xhosa", "Afrikaans"],
  "Free State": ["English", "Sotho", "Afrikaans"],
  Limpopo: ["English", "Sepedi", "Tshivenda", "Tsonga"],
  Mpumalanga: ["English", "Zulu", "Siswati"],
  "North West": ["English", "Setswana", "Afrikaans"],
  "Northern Cape": ["English", "Afrikaans", "Setswana"],
};

const FACILITY_SETS = [
  ["ATM", "Parking"],
  ["ATM", "Cash Accepting ATM", "Parking"],
  ["ATM", "Parking", "WiFi"],
  ["ATM", "Cash Accepting ATM", "Parking", "Wheelchair Access"],
  ["ATM", "Parking", "WiFi", "Wheelchair Access"],
];

const SERVICE_SETS = [
  ["Savings", "Loans"],
  ["Savings", "Insurance", "Account Opening"],
  ["Loans", "Insurance", "Savings"],
  ["Loans", "Insurance", "Savings", "Account Opening"],
  ["Savings", "Smart ID Services", "Account Opening"],
  ["Business Banking Centre", "Account Opening"],
  ["Savings", "Business Banking Centre", "Loans"],
];

const BUSY_LEVELS = ["Not Busy", "Moderate", "Busy", "Very Busy"];

const BRANCH_LOCATIONS = [
  // Gauteng
  {
    name: "Sandton City Branch",
    province: "Gauteng",
    street: "5 Rivonia Road",
    suburb: "Sandton",
    city: "Johannesburg",
    postalCode: "2196",
    latitude: -26.1076,
    longitude: 28.0567,
    phonePrefix: "011",
  },
  {
    name: "Rosebank Branch",
    province: "Gauteng",
    street: "50 Oxford Road",
    suburb: "Rosebank",
    city: "Johannesburg",
    postalCode: "2196",
    latitude: -26.1466,
    longitude: 28.0418,
    phonePrefix: "011",
  },
  {
    name: "Menlyn Branch",
    province: "Gauteng",
    street: "12 Atterbury Road",
    suburb: "Menlyn",
    city: "Pretoria",
    postalCode: "0181",
    latitude: -25.785,
    longitude: 28.276,
    phonePrefix: "012",
  },
  {
    name: "Fourways Branch",
    province: "Gauteng",
    street: "2 Fourways Boulevard",
    suburb: "Fourways",
    city: "Johannesburg",
    postalCode: "2055",
    latitude: -26.0128,
    longitude: 28.0098,
    phonePrefix: "011",
  },
  {
    name: "Midrand Branch",
    province: "Gauteng",
    street: "18 New Road",
    suburb: "Halfway House",
    city: "Midrand",
    postalCode: "1685",
    latitude: -25.9992,
    longitude: 28.1123,
    phonePrefix: "011",
  },
  {
    name: "Centurion Branch",
    province: "Gauteng",
    street: "1 Heuwel Avenue",
    suburb: "Centurion Central",
    city: "Centurion",
    postalCode: "0157",
    latitude: -25.8603,
    longitude: 28.1894,
    phonePrefix: "012",
  },
  {
    name: "Soweto Branch",
    province: "Gauteng",
    street: "120 Vilakazi Street",
    suburb: "Orlando West",
    city: "Soweto",
    postalCode: "1804",
    latitude: -26.2384,
    longitude: 27.9042,
    phonePrefix: "011",
  },
  {
    name: "Boksburg Branch",
    province: "Gauteng",
    street: "30 Trichardt Road",
    suburb: "Boksburg Central",
    city: "Boksburg",
    postalCode: "1459",
    latitude: -26.212,
    longitude: 28.259,
    phonePrefix: "011",
  },

  // Western Cape
  {
    name: "Cape Town CBD Branch",
    province: "Western Cape",
    street: "80 Adderley Street",
    suburb: "CBD",
    city: "Cape Town",
    postalCode: "8001",
    latitude: -33.9249,
    longitude: 18.4241,
    phonePrefix: "021",
  },
  {
    name: "Century City Branch",
    province: "Western Cape",
    street: "Century Boulevard",
    suburb: "Century City",
    city: "Cape Town",
    postalCode: "7441",
    latitude: -33.8938,
    longitude: 18.508,
    phonePrefix: "021",
  },
  {
    name: "Bellville Branch",
    province: "Western Cape",
    street: "27 Voortrekker Road",
    suburb: "Bellville Central",
    city: "Cape Town",
    postalCode: "7530",
    latitude: -33.9,
    longitude: 18.6292,
    phonePrefix: "021",
  },
  {
    name: "Claremont Branch",
    province: "Western Cape",
    street: "3 Main Road",
    suburb: "Claremont",
    city: "Cape Town",
    postalCode: "7708",
    latitude: -33.9819,
    longitude: 18.4649,
    phonePrefix: "021",
  },
  {
    name: "Stellenbosch Branch",
    province: "Western Cape",
    street: "12 Dorp Street",
    suburb: "Stellenbosch Central",
    city: "Stellenbosch",
    postalCode: "7600",
    latitude: -33.9346,
    longitude: 18.8601,
    phonePrefix: "021",
  },
  {
    name: "George Branch",
    province: "Western Cape",
    street: "45 York Street",
    suburb: "Central",
    city: "George",
    postalCode: "6529",
    latitude: -33.9628,
    longitude: 22.4573,
    phonePrefix: "044",
  },
  {
    name: "Paarl Branch",
    province: "Western Cape",
    street: "90 Main Street",
    suburb: "Paarl Central",
    city: "Paarl",
    postalCode: "7646",
    latitude: -33.7342,
    longitude: 18.9621,
    phonePrefix: "021",
  },
  {
    name: "Mitchells Plain Branch",
    province: "Western Cape",
    street: "1 AZ Berman Drive",
    suburb: "Town Centre",
    city: "Cape Town",
    postalCode: "7785",
    latitude: -34.0378,
    longitude: 18.6182,
    phonePrefix: "021",
  },

  // KwaZulu-Natal
  {
    name: "Durban Central Branch",
    province: "KwaZulu-Natal",
    street: "101 Dr Pixley KaSeme Street",
    suburb: "CBD",
    city: "Durban",
    postalCode: "4001",
    latitude: -29.8587,
    longitude: 31.0218,
    phonePrefix: "031",
  },
  {
    name: "Umhlanga Branch",
    province: "KwaZulu-Natal",
    street: "1 Lighthouse Road",
    suburb: "Umhlanga",
    city: "Durban",
    postalCode: "4320",
    latitude: -29.7266,
    longitude: 31.0845,
    phonePrefix: "031",
  },
  {
    name: "Pietermaritzburg Branch",
    province: "KwaZulu-Natal",
    street: "210 Church Street",
    suburb: "CBD",
    city: "Pietermaritzburg",
    postalCode: "3201",
    latitude: -29.6006,
    longitude: 30.3794,
    phonePrefix: "033",
  },
  {
    name: "Ballito Branch",
    province: "KwaZulu-Natal",
    street: "10 Ballito Drive",
    suburb: "Ballito Central",
    city: "Ballito",
    postalCode: "4420",
    latitude: -29.5385,
    longitude: 31.2141,
    phonePrefix: "032",
  },
  {
    name: "Newcastle Branch",
    province: "KwaZulu-Natal",
    street: "55 Murchison Street",
    suburb: "Newcastle Central",
    city: "Newcastle",
    postalCode: "2940",
    latitude: -27.7573,
    longitude: 29.9319,
    phonePrefix: "034",
  },
  {
    name: "Richards Bay Branch",
    province: "KwaZulu-Natal",
    street: "7 Krail Street",
    suburb: "CBD",
    city: "Richards Bay",
    postalCode: "3900",
    latitude: -28.7807,
    longitude: 32.0383,
    phonePrefix: "035",
  },
  {
    name: "Westville Branch",
    province: "KwaZulu-Natal",
    street: "35 Jan Hofmeyr Road",
    suburb: "Westville",
    city: "Durban",
    postalCode: "3629",
    latitude: -29.8291,
    longitude: 30.9258,
    phonePrefix: "031",
  },

  // Eastern Cape
  {
    name: "Gqeberha Branch",
    province: "Eastern Cape",
    street: "25 Govan Mbeki Avenue",
    suburb: "Central",
    city: "Gqeberha",
    postalCode: "6001",
    latitude: -33.9608,
    longitude: 25.6022,
    phonePrefix: "041",
  },
  {
    name: "East London Branch",
    province: "Eastern Cape",
    street: "33 Oxford Street",
    suburb: "CBD",
    city: "East London",
    postalCode: "5201",
    latitude: -33.0153,
    longitude: 27.9116,
    phonePrefix: "043",
  },
  {
    name: "Mthatha Branch",
    province: "Eastern Cape",
    street: "14 Sutherland Street",
    suburb: "CBD",
    city: "Mthatha",
    postalCode: "5099",
    latitude: -31.5889,
    longitude: 28.7844,
    phonePrefix: "047",
  },
  {
    name: "Queenstown Branch",
    province: "Eastern Cape",
    street: "40 Cathcart Road",
    suburb: "CBD",
    city: "Queenstown",
    postalCode: "5320",
    latitude: -31.8976,
    longitude: 26.8753,
    phonePrefix: "045",
  },
  {
    name: "Kariega Branch",
    province: "Eastern Cape",
    street: "18 Caledon Street",
    suburb: "CBD",
    city: "Kariega",
    postalCode: "6229",
    latitude: -33.7614,
    longitude: 25.3967,
    phonePrefix: "041",
  },
  {
    name: "Makhanda Branch",
    province: "Eastern Cape",
    street: "8 High Street",
    suburb: "Makhanda Central",
    city: "Makhanda",
    postalCode: "6139",
    latitude: -33.3106,
    longitude: 26.5256,
    phonePrefix: "046",
  },
  {
    name: "Jeffreys Bay Branch",
    province: "Eastern Cape",
    street: "22 Da Gama Road",
    suburb: "Jeffreys Bay Central",
    city: "Jeffreys Bay",
    postalCode: "6330",
    latitude: -34.0507,
    longitude: 24.9145,
    phonePrefix: "042",
  },

  // Free State
  {
    name: "Bloemfontein Branch",
    province: "Free State",
    street: "155 Nelson Mandela Drive",
    suburb: "Westdene",
    city: "Bloemfontein",
    postalCode: "9301",
    latitude: -29.1183,
    longitude: 26.2299,
    phonePrefix: "051",
  },
  {
    name: "Welkom Branch",
    province: "Free State",
    street: "22 Stateway",
    suburb: "Welkom Central",
    city: "Welkom",
    postalCode: "9459",
    latitude: -27.9789,
    longitude: 26.7362,
    phonePrefix: "057",
  },
  {
    name: "Sasolburg Branch",
    province: "Free State",
    street: "9 Fichardt Street",
    suburb: "CBD",
    city: "Sasolburg",
    postalCode: "1947",
    latitude: -26.8146,
    longitude: 27.8156,
    phonePrefix: "016",
  },
  {
    name: "Bethlehem Branch",
    province: "Free State",
    street: "20 Commissioner Street",
    suburb: "Bethlehem Central",
    city: "Bethlehem",
    postalCode: "9701",
    latitude: -28.2308,
    longitude: 28.3071,
    phonePrefix: "058",
  },
  {
    name: "Kroonstad Branch",
    province: "Free State",
    street: "12 Cross Street",
    suburb: "Kroonstad Central",
    city: "Kroonstad",
    postalCode: "9499",
    latitude: -27.6505,
    longitude: 27.2349,
    phonePrefix: "056",
  },
  {
    name: "Parys Branch",
    province: "Free State",
    street: "9 Bree Street",
    suburb: "Parys Central",
    city: "Parys",
    postalCode: "9585",
    latitude: -26.9033,
    longitude: 27.4573,
    phonePrefix: "056",
  },

  // Limpopo
  {
    name: "Polokwane Branch",
    province: "Limpopo",
    street: "45 Market Street",
    suburb: "CBD",
    city: "Polokwane",
    postalCode: "0700",
    latitude: -23.9045,
    longitude: 29.4689,
    phonePrefix: "015",
  },
  {
    name: "Tzaneen Branch",
    province: "Limpopo",
    street: "8 Danie Joubert Street",
    suburb: "Tzaneen Central",
    city: "Tzaneen",
    postalCode: "0850",
    latitude: -23.8339,
    longitude: 30.1633,
    phonePrefix: "015",
  },
  {
    name: "Thohoyandou Branch",
    province: "Limpopo",
    street: "3 University Road",
    suburb: "CBD",
    city: "Thohoyandou",
    postalCode: "0950",
    latitude: -22.9767,
    longitude: 30.4842,
    phonePrefix: "015",
  },
  {
    name: "Mokopane Branch",
    province: "Limpopo",
    street: "25 Nelson Mandela Drive",
    suburb: "Mokopane Central",
    city: "Mokopane",
    postalCode: "0601",
    latitude: -24.1944,
    longitude: 29.0097,
    phonePrefix: "015",
  },
  {
    name: "Bela-Bela Branch",
    province: "Limpopo",
    street: "7 Chris Hani Way",
    suburb: "Bela-Bela Central",
    city: "Bela-Bela",
    postalCode: "0480",
    latitude: -24.8833,
    longitude: 28.2833,
    phonePrefix: "014",
  },
  {
    name: "Giyani Branch",
    province: "Limpopo",
    street: "5 Main Road",
    suburb: "Giyani Central",
    city: "Giyani",
    postalCode: "0826",
    latitude: -23.3025,
    longitude: 30.7187,
    phonePrefix: "015",
  },

  // Mpumalanga
  {
    name: "Mbombela Branch",
    province: "Mpumalanga",
    street: "19 Louis Trichardt Street",
    suburb: "Nelspruit Central",
    city: "Mbombela",
    postalCode: "1200",
    latitude: -25.4753,
    longitude: 30.9694,
    phonePrefix: "013",
  },
  {
    name: "eMalahleni Branch",
    province: "Mpumalanga",
    street: "5 Mandela Street",
    suburb: "CBD",
    city: "eMalahleni",
    postalCode: "1035",
    latitude: -25.8749,
    longitude: 29.2325,
    phonePrefix: "013",
  },
  {
    name: "Secunda Branch",
    province: "Mpumalanga",
    street: "15 Horwood Street",
    suburb: "CBD",
    city: "Secunda",
    postalCode: "2302",
    latitude: -26.5225,
    longitude: 29.1739,
    phonePrefix: "017",
  },
  {
    name: "Middelburg Branch",
    province: "Mpumalanga",
    street: "20 Cowen Ntuli Street",
    suburb: "Middelburg Central",
    city: "Middelburg",
    postalCode: "1050",
    latitude: -25.7699,
    longitude: 29.4648,
    phonePrefix: "013",
  },
  {
    name: "Ermelo Branch",
    province: "Mpumalanga",
    street: "16 Joubert Street",
    suburb: "Ermelo Central",
    city: "Ermelo",
    postalCode: "2351",
    latitude: -26.5333,
    longitude: 29.9833,
    phonePrefix: "017",
  },
  {
    name: "Hazyview Branch",
    province: "Mpumalanga",
    street: "11 Main Road",
    suburb: "Hazyview Central",
    city: "Hazyview",
    postalCode: "1242",
    latitude: -25.0431,
    longitude: 31.1277,
    phonePrefix: "013",
  },

  // North West
  {
    name: "Rustenburg Branch",
    province: "North West",
    street: "14 Nelson Mandela Drive",
    suburb: "CBD",
    city: "Rustenburg",
    postalCode: "0299",
    latitude: -25.6672,
    longitude: 27.2424,
    phonePrefix: "014",
  },
  {
    name: "Mahikeng Branch",
    province: "North West",
    street: "33 Nelson Mandela Drive",
    suburb: "CBD",
    city: "Mahikeng",
    postalCode: "2745",
    latitude: -25.8654,
    longitude: 25.6438,
    phonePrefix: "018",
  },
  {
    name: "Klerksdorp Branch",
    province: "North West",
    street: "28 Margaretha Prinsloo Street",
    suburb: "CBD",
    city: "Klerksdorp",
    postalCode: "2570",
    latitude: -26.8523,
    longitude: 26.6667,
    phonePrefix: "018",
  },
  {
    name: "Potchefstroom Branch",
    province: "North West",
    street: "55 Walter Sisulu Avenue",
    suburb: "Potchefstroom Central",
    city: "Potchefstroom",
    postalCode: "2531",
    latitude: -26.7145,
    longitude: 27.097,
    phonePrefix: "018",
  },
  {
    name: "Brits Branch",
    province: "North West",
    street: "8 Murray Avenue",
    suburb: "Brits Central",
    city: "Brits",
    postalCode: "0250",
    latitude: -25.6347,
    longitude: 27.7802,
    phonePrefix: "012",
  },
  {
    name: "Vryburg Branch",
    province: "North West",
    street: "10 Market Street",
    suburb: "Vryburg Central",
    city: "Vryburg",
    postalCode: "8601",
    latitude: -26.9566,
    longitude: 24.7284,
    phonePrefix: "053",
  },

  // Northern Cape
  {
    name: "Kimberley Branch",
    province: "Northern Cape",
    street: "7 Du Toitspan Road",
    suburb: "CBD",
    city: "Kimberley",
    postalCode: "8301",
    latitude: -28.7383,
    longitude: 24.7642,
    phonePrefix: "053",
  },
  {
    name: "Upington Branch",
    province: "Northern Cape",
    street: "18 Schroder Street",
    suburb: "CBD",
    city: "Upington",
    postalCode: "8801",
    latitude: -28.4478,
    longitude: 21.2561,
    phonePrefix: "054",
  },
  {
    name: "Springbok Branch",
    province: "Northern Cape",
    street: "11 Voortrekker Street",
    suburb: "CBD",
    city: "Springbok",
    postalCode: "8240",
    latitude: -29.6643,
    longitude: 17.8865,
    phonePrefix: "027",
  },
  {
    name: "Kuruman Branch",
    province: "Northern Cape",
    street: "18 Main Street",
    suburb: "Kuruman Central",
    city: "Kuruman",
    postalCode: "8460",
    latitude: -27.4524,
    longitude: 23.4325,
    phonePrefix: "053",
  },
  {
    name: "Kathu Branch",
    province: "Northern Cape",
    street: "16 Hendrik Van Eck Road",
    suburb: "Kathu Central",
    city: "Kathu",
    postalCode: "8446",
    latitude: -27.6957,
    longitude: 23.0493,
    phonePrefix: "053",
  },
  {
    name: "De Aar Branch",
    province: "Northern Cape",
    street: "12 Voortrekker Street",
    suburb: "De Aar Central",
    city: "De Aar",
    postalCode: "7000",
    latitude: -30.6497,
    longitude: 24.0123,
    phonePrefix: "053",
  },
];

function getListItem(list, index) {
  return list[index % list.length];
}

function createEmailName(value) {
  return value
    .toLowerCase()
    .replace(" branch", "")
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("'", "");
}

function createBusyTimes(index) {
  return {
    Monday: [
      {
        time: "09:00",
        level: getListItem(BUSY_LEVELS, index),
      },
      {
        time: "12:00",
        level: getListItem(BUSY_LEVELS, index + 1),
      },
      {
        time: "15:00",
        level: getListItem(BUSY_LEVELS, index + 2),
      },
    ],
  };
}

function generateMockBranches(count = 60) {
  return BRANCH_LOCATIONS.slice(0, count).map((location, index) => {
    const id = String(index + 1);
    const facilities = getListItem(FACILITY_SETS, index);
    const services = getListItem(SERVICE_SETS, index);
    const emailName = createEmailName(location.name);

    return {
      id,
      name: location.name,
      province: location.province,
      address: {
        street: location.street,
        suburb: location.suburb,
        city: location.city,
        province: location.province,
        postalCode: location.postalCode,
      },
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      languages: PROVINCE_LANGUAGES[location.province],
      facilities,
      services,
      operatingHours: DEFAULT_OPERATING_HOURS,
      contacts: {
        phone: `${location.phonePrefix}555${String(index + 1).padStart(4, "0")}`,
        email: `${emailName}@bank.co.za`,
      },
      rating: Number((3.7 + (index % 13) * 0.1).toFixed(1)),
      isOpen: index % 7 !== 0,
      busyTimes: createBusyTimes(index),
      imageUrl: null,
      notes: null,
    };
  });
}

const branches = generateMockBranches(60);

function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((earthRadius * c).toFixed(1));
}

function getBranchSummary(branch) {
  return {
    id: branch.id,
    name: branch.name,
    province: branch.province,
    coordinates: branch.coordinates,
    address: `${branch.address.street}, ${branch.address.city}`,
    rating: branch.rating,
    isOpen: branch.isOpen,
  };
}

export const branchLocatorService = [
  /**
   * ------------------------------------------------------------------
   * GET /v1/branches
   * ------------------------------------------------------------------
   */
  http.get(API_PATHS.BRANCHES, async ({ request }) => {
    await delay(150);

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
    const pageSize = Number(
      url.searchParams.get("pageSize") || branches.length,
    );

    let filteredBranches = [...branches];

    if (province) {
      filteredBranches = filteredBranches.filter(
        (branch) => branch.province === province,
      );
    }

    if (language) {
      filteredBranches = filteredBranches.filter((branch) =>
        branch.languages.includes(language),
      );
    }

    if (facility) {
      filteredBranches = filteredBranches.filter((branch) =>
        branch.facilities.includes(facility),
      );
    }

    if (service) {
      filteredBranches = filteredBranches.filter((branch) =>
        branch.services.includes(service),
      );
    }

    if (search) {
      const value = search.toLowerCase();

      filteredBranches = filteredBranches.filter(
        (branch) =>
          branch.name.toLowerCase().includes(value) ||
          branch.province.toLowerCase().includes(value) ||
          branch.address.street.toLowerCase().includes(value) ||
          branch.address.suburb.toLowerCase().includes(value) ||
          branch.address.city.toLowerCase().includes(value),
      );
    }

    const total = filteredBranches.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedBranches = filteredBranches.slice(start, end);

    return HttpResponse.json({
      success: true,
      branches: paginatedBranches.map(getBranchSummary),
      total,
      page,
      pageSize,
    });
  }),

  /**
   * ------------------------------------------------------------------
   * POST /v1/branches/search
   * ------------------------------------------------------------------
   */
  http.post(API_PATHS.BRANCH_SEARCH, async ({ request }) => {
    await delay(150);

    const body = await request.json();

    const latitude = body?.coordinates?.latitude;
    const longitude = body?.coordinates?.longitude;

    if (latitude === undefined || longitude === undefined) {
      return HttpResponse.json(
        {
          success: false,
          message: "Coordinates are required.",
        },
        {
          status: 400,
        },
      );
    }

    const nearestBranches = branches
      .map((branch) => ({
        ...getBranchSummary(branch),
        distance: getDistanceInKm(
          latitude,
          longitude,
          branch.coordinates.latitude,
          branch.coordinates.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return HttpResponse.json({
      success: true,
      branches: nearestBranches,
      total: nearestBranches.length,
    });
  }),

  /**
   * ------------------------------------------------------------------
   * GET /v1/branches/:branchId
   * ------------------------------------------------------------------
   */
  http.get(`${API_PATHS.BRANCHES}/:branchId`, async ({ params, request }) => {
    await delay(150);

    const url = new URL(request.url);
    const simulateError = url.searchParams.get("simulateError");

    if (simulateError === "404") {
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

    const branch = branches.find(
      (item) => item.id === params.branchId,
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
  }),
];

export const worker = setupWorker(...branchLocatorService);