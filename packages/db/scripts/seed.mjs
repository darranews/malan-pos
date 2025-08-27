// # Seed dữ liệu mẫu (AUD + GST 10%)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const items = [
    { sku: 'CF001', name: 'Vietnamese Iced Coffee', price: 6.50, taxRate: 10, barcode: '200000000001' },
    { sku: 'EC001', name: 'Egg Coffee',                price: 7.50, taxRate: 10, barcode: '200000000002' },
    { sku: 'PT001', name: 'Peach Tea',                 price: 5.50, taxRate: 10, barcode: '200000000003' },
  ];
  for (const p of items) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: p,
      create: p,
    });
  }
  console.log('Seed done ✅');
}

main().finally(() => prisma.$disconnect());
