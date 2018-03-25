interface AccountProvider extends MnbAccount, HumanBio {
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

interface AccountConsumer extends MnbAccount {
	phone: string;
}

interface Baby extends HumanBio {
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

interface LoginInfo {
  name: string;
  password: string;
  role: MnbRole;
}

interface MnbAccount {
  id: string;
  name: string;
	secret: string;
	enabled: boolean;
	email: string;
  wechat?: string;
  provider: string; // google, facebook, wechat, local
  displayName: string;
}

interface AccountProfile  {
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

interface HumanBio {
	surname: string;
	givenName: string;
	otherNames?: string;
	dateOfBirth: Date;
	gender: boolean;
}

interface IdCertificate {
	type: "passport" | "driveLicense" | "creditCard" | "idCard";
	primary: string;
	secondary?: string;
	tertiary?: string;
}

interface ProviderImage {
  id: string;
  providerId: string;
  imageName: string;
}

interface Order {
	id: string;
	slotId: string;
	consumerId: string;
	babyId: string;
	status: "ordered" | "canceled" | "done" | "expired";
}

declare const enum BookingStatus {
  Created,
  Cancelled,
  Ongoing,
  Finished,
  Terminated
}

interface ServiceSlot {
	id: string;
  providerId: string;
  title: string;
  text?: string;
  date: string; // YYYY-MM-DD
  timeFrom: string; // HH:mm
  timeTo: string; // HH:mm
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

interface EventPlace {
  id: string;
  providerId: string;
  name: string;
  description?: string;
  location: MapLocation;
  images?: string[];
}

declare const enum Gender {
  Girl = 0,
  Boy = 1,
  Either = 2
}

declare const enum MnbRole {
  Consumer = 0,
  Provider = 1
}

interface SearchQuery {
  mapCenter?: MapCoord;
  distance?: number;
  age?: number;
  start?: Date;
  end?: Date;
  gender?: Gender;
}

interface MapCoord {
  lng: number;
  lat: number;
}

interface Image {
  id: string;
  imageName: string;
}

interface EventSite {
  id: string;
  providerId: string;
  name: string;
  location: MapLocation;
  info?: string;
  images: string[];
}

interface BabyProfile {
  id: string;
  consumerId: string;
  nickName: string;
  dob: Date;
  gender: Gender;
  hobby?: string;
  info?: string;
  images: string[]; // base64 images
}

interface MapLocation extends MapCoord {
  address: string;
}

interface Booking {
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

interface SelectOption {
  value: any;
  label?: string;
  disabled?: boolean;
}
