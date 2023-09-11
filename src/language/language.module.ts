import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import AppModule from 'src/app/app.module';
import UserModule from 'src/user/user.module';
import AuthModule from 'src/auth/auth.module';

import { CommonTools } from 'src/app/tools/commontools';

import { LanguageService } from 'src/language/services/language.service';

import { AdminLanguageController } from 'src/language/controllers/admin.language.controller';
import { LanguageRepository } from 'src/language/repositories/language.repository';
import { LanguageSchema } from 'src/language/schemas/language.schema';
import LabelModule from 'src/label/label.module';
import { LanguageController } from 'src/language/controllers/language.controller';

@Module({
  imports: [
    forwardRef(() => AppModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => LabelModule),

    MongooseModule.forFeature([{ name: 'Language', schema: LanguageSchema }]),
  ],
  controllers: [AdminLanguageController, LanguageController],
  providers: [LanguageService, LanguageRepository, CommonTools],
  exports: [LanguageService, LanguageRepository],
})
export default class LanguageModule {}
