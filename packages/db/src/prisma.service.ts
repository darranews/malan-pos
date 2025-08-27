// PrismaService - wrap Prisma Client cho NestJS
// # Kết nối DB khi app start, đóng kết nối khi app stop

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // # Tuỳ chọn log cho dev. Có thể tắt 'query' nếu ồn.
    super({
      log: [{ emit: 'stdout', level: 'warn' }, { emit: 'stdout', level: 'error' }],
    });
  }

  async onModuleInit() {
    // # Kết nối Postgres theo DATABASE_URL trong .env
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
