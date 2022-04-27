import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("shares")
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 4, nullable: false })
  type: string;

  @Column("integer", { nullable: false, default: 0 })
  quantity: number;

  @Column("float", { nullable: false })
  price: number;
}
