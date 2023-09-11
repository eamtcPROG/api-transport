import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { SiteSocialSchema } from 'src/sitesocial/schemas/sitesocial.schema';
import { SiteSocialRepository } from 'src/sitesocial/repositories/sitesocial.repository';
import { SiteSocialService } from 'src/sitesocial/services/sitesocial.service';
import { AdminSiteSocialController } from 'src/sitesocial/controllers/admin.sitesocial.controller';
import NomenclatureModule from 'src/nomenclature/nomenclature.module';
import { SiteSocialController } from 'src/sitesocial/controllers/sitesocial.controller';
@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),
        forwardRef(() => NomenclatureModule),

        MongooseModule.forFeature([
            { name: 'SiteSocial', schema: SiteSocialSchema },
            
        ]),
    ],
    controllers: [
        AdminSiteSocialController,
        SiteSocialController,
    ],
    providers: [
        CommonTools,
        SiteSocialRepository,
        
        SiteSocialService,
        
    ],
    exports: [
        
    ],
})
export default class SiteSocialModule { }