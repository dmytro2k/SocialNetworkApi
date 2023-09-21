import { PrismaClient } from '@prisma/client';

export class PrismaProvider {
  private static prismaInstance: PrismaClient;

  public static getInstance() {
    if (!this.prismaInstance) {
      this.prismaInstance = new PrismaClient();
    }

    return this.prismaInstance;
  }
}
