import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';


import { TestimonialSchema } from './schemas/testimonial.schema';
import { TestimonialController } from './controllers/testimonial.controller';
import { TestimonialRepository } from './repositories/testimonial.repository';
import { TestimonialService } from './services/testimonial.service';
import NomenclatureModule from 'src/nomenclature/nomenclature.module';
import { AdminTestimonialController } from './controllers/admin.testimonial.controller';
import CourseModule from 'src/course/course.module';
import TeacherModule from 'src/teacher/teacher.module';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => CourseModule),
        forwardRef(() => TeacherModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),
        forwardRef(() => NomenclatureModule),

        MongooseModule.forFeature([
            
            { name: 'Testimonial', schema: TestimonialSchema },
        ]),
    ],
    controllers: [
        AdminTestimonialController,
        TestimonialController,
    ],
    providers: [
        CommonTools,
        TestimonialRepository,
        TestimonialService,
    ],
    exports: [],
})
export default class TestimonialModule { }