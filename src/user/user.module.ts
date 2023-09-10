import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';

import { TestInfoRepository } from 'src/user/repositories/testinfo.repository';
import { UserSocialRepository } from 'src/user/repositories/usersocial.repository'
import { RoleRepository } from 'src/user/repositories/role.repository'
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserRoleRepository } from 'src/user/repositories/userrole.repository'
import { PermissionRepository } from 'src/user/repositories/permission.repository';

import { TestInfoSchema } from 'src/user/schemas/testinfo.schema';
import { RoleSchema } from 'src/user/schemas/role.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserSocialSchema } from 'src/user/schemas/usersocial.schema'
import { UserRoleSchema } from 'src/user/schemas/userrole.schema';
import { PermissionSchema } from 'src/user/schemas/permission.schema';

import { UserService } from 'src/user/services/user.service';
import { UserSocialService } from 'src/user/services/usersocial.service';
import { RoleService } from 'src/user/services/role.service';
import { TestInfoService } from 'src/user/services/testinfo.service';
import { UserRoleService } from 'src/user/services/userrole.service';
import { PermissionService } from 'src/user/services/permission.service';

import { UserController } from 'src/user/controllers/user.controller';
import { AdminUserController } from 'src/user/controllers/admin.user.controller';
import { AdminTestInfoController } from 'src/user/controllers/admin.testinfo.controller';
import { RoleController } from 'src/user/controllers/role.controller';
import { UserRoleController } from 'src/user/controllers/userrole.controller';
import { PermissionController } from 'src/user/controllers/permission.controller';
import { UserSettingsSchema } from './schemas/usersettings.schema';
import { AdminUserSettingsController } from './controllers/admin.usersettings.controller';
import { UserSettingsRepository } from './repositories/usersettings.repository';
import { UserSettingsService } from './services/usersettings.service';
import { SocialController } from './controllers/social.controller';
import { SocialRepository } from './repositories/social.repository';
import { SocialSchema } from './schemas/social.schema';
import { SocialService } from './services/social.service';
// import { PhoneController } from './controllers/phone.controller';
import { PhoneRepository } from './repositories/phone.repository';
import { PhoneSchema } from './schemas/phone.schema';
import { PhoneService } from './services/phone.service';
// import NomenclatureModule from 'src/nomenclature/nomenclature.module';
// import GalleryModule from 'src/gallery/gallery.module';
// import AddressModule from 'src/address/address.module';
// import LanguageModule from 'src/language/language.module';

import { UserSettingsController } from 'src/user/controllers/usersettings.controller';
// import StudentModule from 'src/student/student.module';
// import TeacherModule from 'src/teacher/teacher.module';


@Module({
  imports: [
    forwardRef(() => AppModule),
    forwardRef(() => AuthModule),
    // forwardRef(() => NomenclatureModule),
    // forwardRef(() => GalleryModule),
    // forwardRef(() => AddressModule),
    // forwardRef(() => LanguageModule),
    // forwardRef(() => StudentModule),
    // forwardRef(() => TeacherModule),
    
    
    MongooseModule.forFeature([
      { name: 'TestInfo', schema: TestInfoSchema },
      { name: 'User', schema: UserSchema },
      { name: 'UserSocial', schema: UserSocialSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'UserRole', schema: UserRoleSchema },
      { name: 'UserSettings', schema: UserSettingsSchema },
      { name: 'Permission', schema: PermissionSchema },
      { name: 'Social', schema: SocialSchema },
      { name: 'Phone', schema: PhoneSchema },
      
    ]),
  ],
  controllers: [
    AdminTestInfoController, 
    AdminUserController, 
    UserController,
    RoleController,
    UserRoleController,
    PermissionController,
    AdminUserSettingsController,
    UserSettingsController,
    SocialController,
    // PhoneController,
  ],
  providers: [
    TestInfoRepository, 
    TestInfoService, 
    UserRepository, 
    UserService, 
    UserSocialRepository, 
    UserSocialService,
    RoleRepository,
    RoleService,
    UserRoleRepository,
    UserRoleService,
    PermissionService,
    PermissionRepository,
    CommonTools,
    UserSettingsService,
    UserSettingsRepository,
    SocialService,
    SocialRepository,
    PhoneService,
    PhoneRepository,
  ],
  exports: [
    UserRepository, 
    UserService, 
    UserSocialService,
    UserRoleService,
    PermissionService,
    UserSettingsService
  ],
})
export default class UserModule { }
