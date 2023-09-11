import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { PageSchema } from 'src/page/schemas/page.schema';
import { PageValueSchema } from 'src/page/schemas/pagevalue.schema';
import { PageRepository } from 'src/page/repositories/page.repository';
import { PageValueRepository } from 'src/page/repositories/pagevalue.repository';
import { PageService } from 'src/page/services/page.service';
import { PageValueService } from 'src/page/services/pagevalue.service';
import { AdminPageController } from 'src/page/controllers/admin.page.controller';
import { PageController } from 'src/page/controllers/page.controller';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),

        MongooseModule.forFeature([
            { name: 'Page', schema: PageSchema },
            { name: 'PageValue', schema: PageValueSchema },
        ]),
    ],
    controllers: [
        AdminPageController,
        PageController,
    ],
    providers: [
        CommonTools,
        PageRepository,
        PageValueRepository,
        PageService,
        PageValueService,
    ],
    exports: [
        PageRepository,
        PageService
    ],
})
export default class PageModule { }