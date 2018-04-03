import {Entity, Column, OneToMany} from 'typeorm';

import {Person} from './Person';
import {Baby} from './Baby';

@Entity({
  name: 'users',
})
export class User extends Person {

  @Column('text')
  email: string;

  @Column('text')
  sourceType: string;

  @Column('bytea')
  avartar: string;

  @Column('timestamp with time zone')
  created_at: string;

  // @OneToMany(type => Baby, baby => baby.parent)
  // babies: Baby[];
}
