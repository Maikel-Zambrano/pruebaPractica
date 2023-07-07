import { Module } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { ClientesResolver } from './cliente.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Module({
  providers: [ClientesResolver, ClientesService],
  imports:[
    TypeOrmModule.forFeature([Cliente])
  ]
})
export class ClientesModule {}
