import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ClientesService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { UpdateClienteInput, CreateClienteInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService) {}

  @Mutation(() => Cliente)
  async createCliente(@Args('createClienteInput') createClienteInput: CreateClienteInput)
  :Promise<Cliente> {
    return this.clientesService.create(createClienteInput);
  }

  @Query(() => [Cliente], { name: 'clientes' })
  async findAll():Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Query(() => Cliente, { name: 'cliente' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  @Mutation(() => Cliente)
  updateCliente(@Args('updateClienteInput') updateClienteInput: UpdateClienteInput): Promise<Cliente> {
    return this.clientesService.update(updateClienteInput.id, updateClienteInput);
  }

  @Mutation(() => Cliente)
  removeCliente(@Args('id', { type: () => ID }) id: string): Promise<Cliente> {
    return this.clientesService.remove(id);
  }
}
