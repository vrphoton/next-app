import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { MongooseModule } from "@nestjs/mongoose";
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/cafe'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [MenuModule],
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MenuModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
