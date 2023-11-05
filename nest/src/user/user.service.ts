import { Injectable } from '@nestjs/common';
import { NewUserDTO } from 'src/dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2"

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findUserByUsername(username: string) {
        return await this.prisma.user.findUnique({
            where: {
                username: username
            },
        });
    }

    async createUser(newUser: NewUserDTO){
        const createdUser = await this.prisma.user.create({
            data: {
                name: newUser.name,
                email: newUser.email,
                passwordHash: await argon.hash(newUser.password),
                username: newUser.username,
                }
            }
        )
        delete createdUser.passwordHash;
        return createdUser;
    }
}
