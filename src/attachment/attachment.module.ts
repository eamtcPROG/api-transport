import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { AttachmentSchema } from './schemas/attachment.schema';
import { AttachmentValueSchema } from './schemas/attachmentvalue.schema';
import { AttachmentRepository } from './repositories/attachment.repository';
import { AttachmentValueRepository } from './repositories/attachmentvalue.repository';
import { AttachmentService } from './services/attachment.service';
import { AttachmentValueService } from './services/attachmentvalue.service';
import { AdminAttachmentController } from './controllers/admin.attachment.controller';
import FileModule from 'src/file/file.module';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),
    forwardRef(() => FileModule),

        MongooseModule.forFeature([
            { name: 'Attachment', schema: AttachmentSchema },
            { name: 'AttachmentValue', schema: AttachmentValueSchema },
        ]),
    ],
    controllers: [
        AdminAttachmentController,
    ],
    providers: [
        CommonTools,
        AttachmentRepository,
        AttachmentValueRepository,
        AttachmentService,
        AttachmentValueService,
    ],
    exports: [
        AttachmentRepository
    ],
})
export default class AttachmentModule { }