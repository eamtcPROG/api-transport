import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import configuration from 'src/config/configuration';
// import UserModule from 'src/user/user.module';
import Idto from './interfaces/idto.interface';
import Ischema from './interfaces/ischema.interface';
// import AuthModule from 'src/auth/auth.module';
// import LanguageModule from 'src/language/language.module';
// import NomenclatureModule from 'src/nomenclature/nomenclature.module';
// import FileModule from 'src/file/file.module';
// import PageModule from 'src/page/page.module';
// import MenuModule from 'src/menu/menu.module';
// import FAQModule from 'src/faq/faq.module';
// import JournalModule from 'src/journal/journal.module';
// import GalleryModule from 'src/gallery/gallery.module';
// import AttachmentModule from 'src/attachment/attachment.module';
// import TeacherModule from 'src/teacher/teacher.module';
// import VideoModule from 'src/video/video.module';
// import LegalModule from 'src/legal/legal.module';
// import StudentModule from 'src/student/student.module';
// import AddressModule from 'src/address/address.module';
// import BlogModule from 'src/blog/blog.module';
// import CourseModule from 'src/course/course.module';
// import FinanceModule from 'src/finance/finance.module';
// import CurrencyModule from 'src/currency/currency.module';
// import SupportModule from 'src/support/support.module';
// import SiteSocialModule from 'src/sitesocial/sitesocial.module';

// import { MediaService } from 'src/app/services/media.service';
// import { UrlRelationService } from 'src/app/services/urlrelation.service';
// import { UrlRelationRepository } from 'src/app/repositories/urlrelation.repository';
// import { UrlRelationController } from 'src/app/controllers/urlrelation.controller';
// import { UrlRelationSchema } from 'src/app/schemas/urlrelation.schema';
import { CommonTools } from 'src/app/tools/commontools';
// import AdvertisementModule from 'src/advertisement/advertisement.module';
// import TestimonialModule from 'src/testimonial/testimonial.module';
// import { SiteConfigController } from 'src/app/controllers/siteconfig.controller';
// import { SiteConfigService } from 'src/app/services/siteconfig.service';
// import { SiteConfigRepository } from 'src/app/repositories/siteconfig.repository';
// import { SiteConfigSchema } from 'src/app/schemas/siteconfig.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),

    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@transport.cumran5.mongodb.net/?retryWrites=true&w=majority`,
      {
      },
    ),

    // MongooseModule.forFeature([
    //   { name: 'UrlRelation', schema: UrlRelationSchema },
    //   { name: 'SiteConfig', schema: SiteConfigSchema }

    // ]),

    // AuthModule,
    // UserModule,
    // LanguageModule,
    // NomenclatureModule,
    // FileModule,
    // PageModule,
    // MenuModule,
    // FAQModule,
    // JournalModule,
    // GalleryModule,
    // AttachmentModule,
    // TeacherModule,
    // VideoModule,
    // LegalModule,
    // StudentModule,
    // AddressModule,
    // BlogModule,
    // CourseModule,
    // FinanceModule,
    // CurrencyModule,
    // SupportModule,
    // SiteSocialModule,
    // AdvertisementModule,
    // TestimonialModule,

  ],
  controllers: [AppController, 
    // UrlRelationController, 
    // SiteConfigController
  ],
  providers: [AppService,
    Idto,
    Ischema,
    // MediaService,
    // UrlRelationService,
    // UrlRelationRepository,
    CommonTools,
    // SiteConfigService,
    // SiteConfigRepository
  ],
  exports: [
    // MediaService, 
    // UrlRelationService
  ],
})
export default class AppModule { }