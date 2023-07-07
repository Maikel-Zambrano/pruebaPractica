import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteInput, UpdateClienteInput } from './dto/inputs';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {

  constructor( 
    @InjectRepository(Cliente)
    private readonly clientesRepository:Repository<Cliente> ){}

  async create(createClienteInput: CreateClienteInput): Promise<Cliente>  {
    const newCliente= this.clientesRepository.create(createClienteInput);
    return await this.clientesRepository.save(newCliente); 
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async findOne(id: string): Promise<Cliente> {
     const cliente= await  this.clientesRepository.findOneBy({id});
     if (!cliente) throw new NotFoundException(`Not found`)
     return cliente;
  }

  async update(id: string, updateClienteInput: UpdateClienteInput): Promise<Cliente> {
    
    const cliente = await this.clientesRepository.preload(updateClienteInput);
    if (!cliente) throw new NotFoundException(`Not found`)
    return this.clientesRepository.save(cliente);

  }

  async remove(id: string): Promise<Cliente> {

    const cliente= await  this.findOne(id);

    // await this.estudiantesRepository.update({id:id},{estado:true  });

    //await this.clientesRepository.remove(cliente);
    await this.clientesRepository.update({id:id}, {estado:false});

    return {...cliente, id};

  }
}
