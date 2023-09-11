import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';
import { VideoSchema } from './schemas/video.schema';
import { VideoValueSchema } from './schemas/videovalue.schema';
import { VideoRepository } from './repositories/video.repository';
import { VideoValueRepository } from './repositories/videovalue.repository';
import { VideoService } from './services/video.service';
import { VideoValueService } from './services/videovalue.service';
import { AdminVideoController } from './controllers/admin.video.controller';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),

        MongooseModule.forFeature([
            { name: 'Video', schema: VideoSchema },
            { name: 'VideoValue', schema: VideoValueSchema },
        ]),
    ],
    controllers: [
        AdminVideoController,
    ],
    providers: [
        CommonTools,
        VideoRepository,
        VideoValueRepository,
        VideoService,
        VideoValueService,
    ],
    exports: [
        VideoRepository
    ],
})
export default class VideoModule { }