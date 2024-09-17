import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from './skills/skills.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.host,
        port: parseInt(process.env.port),
        username: process.env.login,
        password: process.env.password,
        database: process.env.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        schema: 'public',
      }),
    }),
    SkillsModule,
  ],
})
export class AppModule {}
