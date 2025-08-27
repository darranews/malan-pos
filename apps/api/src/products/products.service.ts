import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  list() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: any) {
    return this.prisma.product.create({ data: dto });
  }
}
