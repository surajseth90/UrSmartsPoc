export const mobileNumberValidator = (value) => {
  let input = value.replace(/\D/g, "");
  if (input.length > 10) {
    input = input.slice(0, 10);
  }
  return input;
};

export const genderFilters = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

export const shiftFilters = [
  {
    label: "Half Day",
    value: "PART_TIME",
  },
  {
    label: "Full Day",
    value: "FULL_TIME",
  },
  {
    label: "One Time",
    value: "ONE_TIME",
  },
];

export const getShiftsStr = (shift) => {
  let str = [];
  if (shift && shift?.length > 0)
    shift.forEach((element) => {
      element.subCategoryName === "FULL_TIME"
        ? (str.push("Full Day"))
        : element.subCategoryName === "PART_TIME"
        ? (str.push("Half Day"))
        : (str.push("One Time"));
    });

  return str.toString();
};

export const expFilters = [
  {
    label: "Fresher",
    value: "fresher",
  },
  {
    label: "1 Year - 2 Years",
    value: "1-2_years",
  },
  {
    label: "3 Years - 5 Years",
    value: "3-5_years",
  },
  {
    label: "6 Years - 10 Years",
    value: "6-10_years",
  },
  {
    label: "Above 10 Years",
    value: "above_10",
  },
];

export const regionFilters = [
  {
    label: "Bihar",
    value: "Bihar",
  },
  {
    label: "Punjab",
    value: "Punjab",
  },
  {
    label: "Himachal",
    value: "Himachal",
  },
  {
    label: "Maharastra",
    value: "Maharastra",
  },
  {
    label: "West Bengal",
    value: "West Bengal",
  },
  {
    label: "Uttar Pradesh",
    value: "Uttar Pradesh",
  },
  {
    label: "Madhya Pradesh",
    value: "Madhya Pradesh",
  },
  {
    label: "Karnataka",
    value: "Karnataka",
  },
  {
    label: "Gujrat",
    value: "Gujrat",
  },
  {
    label: "Rajsthan",
    value: "Rajsthan",
  },
];

export const langFilters = [
  {
    label: "Hindi",
    value: "Hindi",
  },
  {
    label: "English",
    value: "English",
  },
  {
    label: "Bengali",
    value: "Bengali",
  },
  {
    label: "Urdu",
    value: "Urdu",
  },
  {
    label: "Punjabi",
    value: "Punjabi",
  },
  {
    label: "Marathi",
    value: "Marathi",
  },
  {
    label: "Gujrati",
    value: "Gujrati",
  },
  {
    label: "Tamil",
    value: "Tamil",
  },
];

export const babySitters = [
  {
    id: "user_1",
    name: "Vimla Kumari",
    gender: "female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    salary: "8,000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],

    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    language: "hindi",
  },
  {
    id: "user_2",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
    language: "hindi",

  },
  {
    id: "user_3",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
    language: "hindi",

  },
  {
    id: "user_4",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
    language: "hindi",

  },
  {
    id: "user_5",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    language: "hindi",

    hobbies: ["Movie", "Music"],
  },
  {
    id: "user_6",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    language: "hindi",

    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
  },
  {
    id: "user_7",
    name: "Vimla Kumari",
    language: "hindi",

    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    language: "hindi",

    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
  },
  {
    id: "user_8",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    language: "hindi",

    hobbies: ["Movie", "Music"],
  },
  {
    id: "user_9",
    name: "Vimla Kumari",
    gender: "Female",
    service: "Babysitter",
    address: "Mamura Chawk, Sector-62, Noida",
    rating: 3.5,
    shift: [
      {
        subCategoryId: 1,
        subCategoryName: "FULL_TIME",
      },
      {
        subCategoryId: 2,
        subCategoryName: "PART_TIME",
      },
      {
        subCategoryId: 3,
        subCategoryName: "ONE_TIME",
      },
    ],
    salary: "8000",
    speak: ["Hindi", "Bengali"],
    education: "12th Standard",
    experience: "6 Years",
    reviews: [],
    // ---------------------------
    fullDaySalary: "12,000",
    halfDaySalary: "7,000",
    oneTimeSalary: "8,00",
    age: 47,
    hobbies: ["Movie", "Music"],
  },
];
