import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';

import { JournalSchema } from './schemas/journal.schema';
import { JournalRepository } from './repositories/journal.repository';
import { JournalService } from './services/journal.service';
import { AdminJournalController } from './controllers/admin.journal.controller';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),

        MongooseModule.forFeature([
            { name: 'Journal', schema: JournalSchema },
           
        ]),
    ],
    controllers: [
        AdminJournalController,
    ],
    providers: [
        CommonTools,
        JournalRepository,
        
        JournalService,
        
    ],
    exports: [],
})
export default class JournalModule { }