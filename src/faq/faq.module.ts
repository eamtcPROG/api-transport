import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { FAQSchema } from './schemas/faq.schema';
import { FAQValueSchema } from './schemas/faqvalue.schema';
import { FAQRepository } from './repositories/faq.repository';
import { FAQValueRepository } from './repositories/faqvalue.repository';
import { FAQService } from './services/faq.service';
import { FAQValueService } from './services/faqvalue.service';
import { AdminFAQController } from './controllers/admin.faq.controller';
import { FAQController } from './controllers/faq.controller';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),

        MongooseModule.forFeature([
            { name: 'FAQ', schema: FAQSchema },
            { name: 'FAQValue', schema: FAQValueSchema },
        ]),
    ],
    controllers: [
        AdminFAQController,
        FAQController
    ],
    providers: [
        CommonTools,
        FAQRepository,
        FAQValueRepository,
        FAQService,
        FAQValueService,
    ],
    exports: [],
})
export default class FAQModule { }