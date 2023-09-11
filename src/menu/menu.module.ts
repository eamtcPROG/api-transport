import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { MenuSchema } from './schemas/menu.schema';
import { MenuValueSchema } from './schemas/menuvalue.schema';
import { MenuRepository } from './repositories/menu.repository';
import { MenuValueRepository } from './repositories/menuvalue.repository';
import { MenuService } from './services/menu.service';
import { MenuValueService } from './services/menuvalue.service';
import { AdminMenuController } from './controllers/admin.menu.controller';
import { MenuController } from './controllers/menu.controller';
import PageModule from 'src/page/page.module';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),
        forwardRef(() => PageModule),

        MongooseModule.forFeature([
            { name: 'Menu', schema: MenuSchema },
            { name: 'MenuValue', schema: MenuValueSchema },
        ]),
    ],
    controllers: [
        AdminMenuController,
        MenuController
    ],
    providers: [
        CommonTools,
        MenuRepository,
        MenuValueRepository,
        MenuService,
        MenuValueService,
    ],
    exports: [MenuService],
})
export default class MenuModule { }