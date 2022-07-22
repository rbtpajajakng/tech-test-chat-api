import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async checkUserExistence(userId: number) {
    return await this.prisma.user.count({
      where: { id: userId }
    });
  }
}
