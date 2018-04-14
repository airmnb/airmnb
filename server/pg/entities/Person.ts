import {Column, PrimaryColumn } from 'typeorm';

/*
 Column types for postgres

 int, int2, int4, int8, integer, smallint, bigint,
 float4, float8, numeric, decimal, real, double precision,
 time, time with time zone, time without time zone,
 timestamp, timestamp without time zone, timestamp with time zone,
 character varying, character, varchar, char, text, citext,
 smallserial, serial2, serial, serial4, bigserial, serial8,
 money,
 boolean, bool, bytea, date, interval, point, line, lseg, box, circle, path, polygon,
 cidr, inet, macaddr, bit, bit varying, varbit, tsvector, tsquery, uuid, xml, json, jsonb
 */

export abstract class Person {

  @PrimaryColumn({
    type: 'uuid'
  })
  id: string;

  @Column({
    type: 'text',
    name: 'family_name',
    nullable: true,
  })
  familyName: string;

  @Column({
    type: 'text',
    name: 'given_name',
    nullable: true,
  })
  givenName: string;

  @Column('text')
  gender: string;

  @Column('timestamp with time zone')
  dob: Date;

}
