import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ defaultValue: false })
  isActive: boolean;
}