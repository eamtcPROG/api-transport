import { Module, forwardRef } from '@nestjs/common';
import AppModule from 'src/app/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import UserModule from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CommonTools } from 'src/app/tools/commontools';
// import LanguageModule from 'src/language/language.module';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_ACCESS_SECRET}`,
      signOptions: { expiresIn: '1d' },
    }),

    forwardRef(() => AppModule),
    forwardRef(() => UserModule),
    // forwardRef(() => LanguageModule),

    MongooseModule.forFeature([]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    JwtService,
    CommonTools,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export default class AuthModule {}
