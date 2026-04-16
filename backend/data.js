
const specialityData = [
  { speciality: 'General physician', image: 'General_physician.svg' },
  { speciality: 'Gynecologist', image: 'Gynecologist.svg' },
  { speciality: 'Dermatologist', image: 'Dermatologist.svg' },
  { speciality: 'Pediatricians', image: 'Pediatricians.svg' },
  { speciality: 'Neurologist', image: 'Neurologist.svg' },
  { speciality: 'Gastroenterologist', image: 'Gastroenterologist.svg' },
];

const doctors = [
  {
    name: 'Dr. Richard James',
    image: 'doc1',
    speciality: 'General physician',
    degree: 'MBBS - General physician',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Emily Larson',
    image: 'doc2',
    speciality: 'Gynecologist',
    degree: 'MBBS - Gynecologist',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Sarah Patel',
    image: 'doc3',
    speciality: 'Dermatologist',
    degree: 'MBBS - Dermatologist',
    experience: '2 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 32,
    address: { line1: '37th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Christopher Lee',
    image: 'doc4',
    speciality: 'Pediatricians',
    degree: 'MBBS - Pediatricians',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '47th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Jennifer Garcia',
    image: 'doc5',
    speciality: 'Neurologist',
    degree: 'MBBS - Neurologist',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 42,
    address: { line1: '57th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Andrew Williams',
    image: 'doc6',
    speciality: 'Gastroenterologist',
    degree: 'MBBS - Gastroenterologist',
    experience: '7 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '67th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Christopher Davis',
    image: 'doc7',
    speciality: 'General physician',
    degree: 'MBBS - General physician',
    experience: '5 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Timothy White',
    image: 'doc8',
    speciality: 'Gynecologist',
    degree: 'MBBS - Gynecologist',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: { line1: '27th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Ava Mitchell',
    image: 'doc9',
    speciality: 'Dermatologist',
    degree: 'MBBS - Dermatologist',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Jeffrey King',
    image: 'doc10',
    speciality: 'Pediatricians',
    degree: 'MBBS - Pediatricians',
    experience: '6 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '47th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Zoe Kelly',
    image: 'doc11',
    speciality: 'Neurologist',
    degree: 'MBBS - Neurologist',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 37,
    address: { line1: '57th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Patrick Harris',
    image: 'doc12',
    speciality: 'Gastroenterologist',
    degree: 'MBBS - Gastroenterologist',
    experience: '2 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 25,
    address: { line1: '67th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Chloe Evans',
    image: 'doc13',
    speciality: 'General physician',
    degree: 'MBBS - General physician',
    experience: '2 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '17th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Ryan Martinez',
    image: 'doc14',
    speciality: 'Gynecologist',
    degree: 'MBBS - Gynecologist',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 29,
    address: { line1: '27th Cross, Richmond', line2: 'London' }
  },
  {
    name: 'Dr. Amelia Hill',
    image: 'doc15',
    speciality: 'Dermatologist',
    degree: 'MBBS - Dermatologist',
    experience: '5 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: { line1: '37th Cross, Richmond', line2: 'London' }
  }
];

module.exports = { doctors, specialityData };