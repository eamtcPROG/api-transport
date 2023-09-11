import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { CurrencySchema } from './schemas/currency.schema';
import { CurrencyValueSchema } from './schemas/currencyvalue.schema';
import { CurrencyRepository } from './repositories/currency.repository';
import { CurrencyValueRepository } from './repositories/currencyvalue.repository';
import { CurrencyService } from './services/currency.service';
import { CurrencyValueService } from './services/currencyvalue.service';
import { AdminCurrencyController } from './controllers/admin.currency.controller';
import { AdminCurrencyRateController } from './controllers/admin.currencyrate.controller';
import { CurrencyRateRepository } from './repositories/currencyrate.repository';
import { CurrencyRateSchema } from './schemas/currencyrate.schema';
import { CurrencyRateService } from './services/currencyrate.service';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),

        MongooseModule.forFeature([
            { name: 'Currency', schema: CurrencySchema },
            { name: 'CurrencyValue', schema: CurrencyValueSchema },
            { name: 'CurrencyRate', schema: CurrencyRateSchema },
        ]),
    ],
    controllers: [
        AdminCurrencyController,
        AdminCurrencyRateController,
    ],
    providers: [
        CommonTools,
        CurrencyRepository,
        CurrencyValueRepository,
        CurrencyService,
        CurrencyValueService,

        CurrencyRateRepository,
        CurrencyRateService,
    ],
    exports: [
        CurrencyRepository
    ],
})
export default class CurrencyModule { }