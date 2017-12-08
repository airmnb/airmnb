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
}

export interface Account {
  id: string;
  name: string;
	secret: string;
	enabled: boolean;
	type: "provider" | "consumer";
	email: string;
	wechat?: string;
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

export interface Transaction {
	transactionId: string;
	cancelledReason?: string;
	orderId: string;
	startAt: Date;
	endAt: Date;
	startConfirmByProvider: string;
	startConfirmByConsumer: string;
	endConfirmByProvider: string;
	endConfirmByConsumer: string;
	roundUnits: number;
	totalFee: number;
}

export interface ServiceSlot {
	id: string;
  providerId: string;
  title: string;
  text?: string;
  start: Date;
  end: Date;
	gender: Gender; // 0 for girl, 1 for boy, 2 for either
	ageFrom: number;
	ageTo: number;
	otherCondition: string;
	price: number;
}

export enum Gender {
  Girl,
  Boy,
  Either
}

export interface SearchQuery {
  age?: number;
  start?: number;
  end?: number;
  gender?: Gender;
}


// 936,706,490
// 1.09:56:04
