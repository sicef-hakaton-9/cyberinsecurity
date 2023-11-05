import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local-strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './jwt';

@Module({
    imports: [UserModule, PassportModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET_KEY}`,
            signOptions: { expiresIn: '60s' },
          }),
        ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
