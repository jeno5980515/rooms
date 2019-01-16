import { Entity, PrimaryGeneratedColumn, Column, ValueTransformer, ManyToOne, Unique } from 'typeorm'
import { ObjectType, Field } from 'type-graphql'

import { Room } from '../room/Room'
import { RoomModuleType, RoomModuleTypeScalar } from '../../room-modules/types'

import { GraphQLScalarType, Kind } from 'graphql'

export const JSONObject = new GraphQLScalarType({
  name: 'JSONObject',
  description: 'Generic JSON object',
  parseValue(value: string) {
    console.log('parse')
    console.log(value)
    try {
      return JSON.parse(value)
    } catch {
      return {}
    }
  },
  serialize(value: any) {
    console.log('searilize')
    console.log(value)
    return value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return ''
  },
})

@ObjectType({ description: 'RoomModuleState Type' })
@Entity()
@Unique(['room', 'moduleType'])
export class RoomModuleState {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field(type => Room)
  @ManyToOne(type => Room, { eager: true })
  room: Room

  @Field(types => RoomModuleTypeScalar)
  @Column({ type: String })
  moduleType: RoomModuleType

  @Field(types => JSONObject)
  @Column('simple-json')
  state: Object
}

