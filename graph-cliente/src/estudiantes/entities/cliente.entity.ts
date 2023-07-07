import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'cliente'})
@ObjectType()
export class Cliente {
  
    @PrimaryGeneratedColumn('uuid')
    @Field(()=> ID)
    id:string;
    
    @Column()
    @Field(()=> String)
    identificacion:string;

    @Column()
    @Field(()=>String)
    nombre:string;

    @Column()
    @Field(()=>String)
    direccion:string;

    @Column('text',{array:true})
    @Field(()=>[String] ,{nullable:true} )
    telefono:string[];

    @Column()
    @Field(()=> Int)
    tipo: number;

    @Column()
    @Field(()=>Boolean)
    estado:boolean;


}
