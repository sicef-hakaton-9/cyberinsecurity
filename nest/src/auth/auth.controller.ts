import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO, Role } from 'src/dtos';
import { LocalAuthGuard } from './guard/local-guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './guard/roles.decorator';
import { RolesGuard } from './guard/roles.guard';



@Controller('auth')
export class AuthController {
    constructor(private service: AuthService){}

    @Post('register')
    async register(@Body() body: NewUserDTO) {
        
        return await this.service.register(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return this.service.login(req.user);
    }
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('me')
    async getMe(@Request() req){
        return await this.service.getMe(req.user);
    }
}
