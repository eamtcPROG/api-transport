import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';

import { BlogCategorySchema } from './schemas/blogcategory.schema';
import { BlogCategoryValueSchema } from './schemas/blogcategoryvalue.schema';
import { BlogCategoryRepository } from './repositories/blogcategory.repository';
import { BlogCategoryValueRepository } from './repositories/blogcategoryvalue.repository';
import { BlogCategoryService } from './services/blogcategory.service';
import { BlogCategoryValueService } from './services/blogcategoryvalue.service';
import { AdminBlogCategoryController } from './controllers/admin.blogcategory.controller';


import { BlogSchema } from './schemas/blog.schema';
import { BlogValueSchema } from './schemas/blogvalue.schema';
import { BlogRepository } from './repositories/blog.repository';
import { BlogValueRepository } from './repositories/blogvalue.repository';
import { BlogService } from './services/blog.service';
import { BlogValueService } from './services/blogvalue.service';
import { AdminBlogController } from './controllers/admin.blog.controller';
import NomenclatureModule from 'src/nomenclature/nomenclature.module';

@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),
        forwardRef(() => NomenclatureModule),

        MongooseModule.forFeature([
            { name: 'BlogCategory', schema: BlogCategorySchema },
            { name: 'BlogCategoryValue', schema: BlogCategoryValueSchema },

            { name: 'Blog', schema: BlogSchema },
            { name: 'BlogValue', schema: BlogValueSchema },
        ]),
    ],
    controllers: [
        AdminBlogCategoryController,

        AdminBlogController,
    ],
    providers: [
        CommonTools,
        BlogCategoryRepository,
        BlogCategoryValueRepository,
        BlogCategoryService,
        BlogCategoryValueService,


        BlogRepository,
        BlogValueRepository,
        BlogService,
        BlogValueService,
    ],
    exports: [BlogService],
})
export default class BlogModule { }