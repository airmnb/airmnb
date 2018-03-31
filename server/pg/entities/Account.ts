import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryColumn({type: "uuid"}) id: string;

  @Column() source: string;
  @Column() name: string;

}
