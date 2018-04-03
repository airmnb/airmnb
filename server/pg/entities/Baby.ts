import {Entity, Column, CreateDateColumn, ManyToOne} from 'typeorm';

import {Person} from './Person';
import {User} from './User';

@Entity({
  name: 'babies',
  schema: 'public',
})
export class Baby extends Person {

  @Column('text')
  email: string;

  // @ManyToOne(type => User, user => user.babies)
  // parent: User;
  @Column({
    name: 'parent_id',
    type: 'uuid'
  })
  parentId: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
