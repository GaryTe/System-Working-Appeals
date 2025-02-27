import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column
} from 'typeorm';

import {StatusAppeal} from '../../libs/enum/index.js';

@Entity({name: 'appeal'})
export class AppealEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @CreateDateColumn({name: 'created_at'})
  public createdAt!: Date;

  @Column({type: 'text'})
  public client!: string;

  @Column({type: 'text'})
  public email!: string;

  @Column({type: 'text', name: 'topic_appeal'})
  public topicAppeal!: string;

  @Column({type: 'text', name: 'appeal'})
  public appeal!: string;

  @Column({type: 'text',default: StatusAppeal.New})
  public status!: string;
}
