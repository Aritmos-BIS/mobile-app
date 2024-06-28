interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface CompanyAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: CompanyAddress;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface Hair {
  color: string;
  type: string;
}

interface Group {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  name: string;
  lastname: string;
  email: string;
  additionQuiz: any | null | number;
  substractionQuiz: any | null | number;
  group: Group;
  urlImage: any | null | string;
}

export interface User {
  address: Address;
  age: number;
  bank: Bank;
  birthDate: string;
  bloodGroup: string;
  company: Company;
  crypto: Crypto;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: Hair;
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}
