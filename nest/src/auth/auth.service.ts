import { Injectable } from '@nestjs/common';
import { NewUserDTO } from 'src/dtos';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}
    async register(body: NewUserDTO) {
        const newUser = await this.userService.createUser(body);
        if (newUser){
            return await this.login(newUser);
        }
    }

    async validateUser(username: string, pass: string): Promise<any> {
        console.log(username, pass);
        const user = await this.userService.findUserByUsername(username);
        console.log(user);
        if (user && argon.verify(user.passwordHash, pass)) {
          const { passwordHash, ...result } = user;
          return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, role: user.role, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async getMe(user: any) {
        return await this.userService.findUserByUsername(user.username);
    }
}
