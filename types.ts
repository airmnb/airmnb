export interface AccountProvider extends Account, HumanBio {
	phone: string;
	address: {
		address1: string;
		address2?: string;
		city: string;
		state: string;
		country: string;
		postcode: string;
	};
	idCertificate: IdCertificate[];
}

export interface AccountConsumer extends Account {
	phone: string;
}

export interface Baby extends HumanBio {
	id: string;
	consumerId: string;
	nickname?: string;
	enabled?: boolean;
	allergy?: string;
	accessibilityCondition?: string;
	medicalCondition?: string;
	like?: string;
	dislike?: string;
}

export interface LoginInfo {
  name: string;
  password: string;
  role: Role;
}

export interface Account {
  id: string;
  name: string;
	secret: string;
	enabled: boolean;
	email: string;
	wechat?: string;
}

export interface AccountProfile  {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: Gender;
  preferredMap?: string;
  // For provider
  location?: MapLocation;
  images?: string[];
  languages?: string[];
  description?: string;
  // For consumer
  babies?: string[];
}

export interface HumanBio {
	surname: string;
	givenName: string;
	otherNames?: string;
	dateOfBirth: Date;
	gender: boolean;
}

export interface IdCertificate {
	type: "passport" | "driveLicense" | "creditCard" | "idCard";
	primary: string;
	secondary?: string;
	tertiary?: string;
}

export interface ProviderImage {
  id: string;
  providerId: string;
  imageName: string;
}

export interface Order {
	id: string;
	slotId: string;
	consumerId: string;
	babyId: string;
	status: "ordered" | "canceled" | "done" | "expired";
}

export enum BookingStatus {
  Created,
  Cancelled,
  Ongoing,
  Finished,
  Terminated
}

export interface ServiceSlot {
	id: string;
  providerId: string;
  title: string;
  text?: string;
  date: Date;
  timeFrom: number;
  timeTo: number;
	gender: Gender; // 0 for girl, 1 for boy, 2 for either
	ageFrom: number;
	ageTo: number;
	description: string;
  price: number;
  capping: number;
  bookingCount: number;
  images?: string[];
  eventPlaceId: string;
  siteId: string;
  location: MapLocation;
  locationMongoGeo: {
    type: "Point",
    coordinates: Array<number>
  };
}

export interface EventPlace {
  id: string;
  providerId: string;
  name: string;
  description?: string;
  location: MapLocation;
  images?: string[];
}

export enum Gender {
  Girl = 0,
  Boy = 1,
  Either = 2
}

export enum Role {
  Consumer = 0,
  Provider = 1
}

export interface SearchQuery {
  mapCenter?: MapCoord;
  distance?: number;
  age?: number;
  start?: Date;
  end?: Date;
  gender?: Gender;
}

export interface MapCoord {
  lng: number;
  lat: number;
}

export interface Image {
  id: string;
  imageName: string;
}

export interface EventSite {
  id: string;
  providerId: string;
  name: string;
  location: MapLocation;
  info?: string;
  images: string[];
}

export interface BabyProfile {
  id: string;
  consumerId: string;
  nickName: string;
  dob: Date;
  gender: Gender;
  hobby?: string;
  info?: string;
  images: string[]; // base64 images
}

export interface MapLocation extends MapCoord {
  address: string;
}

export interface Booking {
  id: string;
  providerId: string;
  consumerId: string;
  slotId: string;
  babyId: string;
  createdAt: Date;
  cancelledAt?: Date;
  startedAt?: Date;
  terminatedAt?: Date;
  finishedAt?: Date;
  providerCheckInImage?: string;
  consumerCheckInImage?: string;
  providerCheckOutImage?: string;
  consumerCheckOutImage?: string;
  consumerCheckInAt?: Date;
  providerCheckInAt?: Date;
  consumerCheckOutAt?: Date;
  providerCheckOutAt?: Date;
}

export interface SelectOption {
  value: any;
  label?: string;
  disabled?: boolean;
}
