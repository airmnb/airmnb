import { Injectable } from '@angular/core';
import { SelectOption } from '../../../types';

@Injectable()
export class SelectOptionService {

  ageFromOptions: SelectOption[] = [
    {label: "--", value: -1, disabled: true},
    {label: "2 years old", value: 2},
    {label: "3 years old", value: 3},
    {label: "4 years old", value: 4},
    {label: "5 years old", value: 5},
    {label: "6 years old", value: 6},
  ];
  constructor() { }

}
