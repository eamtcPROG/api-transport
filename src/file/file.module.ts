import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';


import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module';

import { StorageModule } from '@haorama/nestjs-storage';

import { FileSchema } from './schemas/file.schema';
import { FilePermissionSchema } from './schemas/filepermission.schema';
import { FilePermissionController } from './controllers/filepermission.controller';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import { FilePermissionService } from './services/filepermission.service';
import { FileRepository } from './repositories/file.repository';
import { FilePermissionRepository } from './repositories/filepermission.repository';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    forwardRef(() => AppModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => LanguageModule),

    MongooseModule.forFeature([
      { name: 'FilePermission', schema: FilePermissionSchema },
      { name: 'File', schema: FileSchema },
    ]),

    StorageModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          default: 'local',
          disks: {
            local_root: {
              driver: 'local',
              config: {
                root: configService.get('storage.main_path'),
              },
            },
            local_public: {
              driver: 'local',
              config: {
                root: configService.get('storage.public_path'),
              },
            },
            local_private: {
              driver: 'local',
              config: {
                root: configService.get('storage.private_path'),
              },
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController, FilePermissionController],
  providers: [
    CommonTools,
    FileService,
    FilePermissionService,
    FileRepository,
    FilePermissionRepository,
  ],
  exports: [FileService, FileRepository],
})
export default class FileModule {}
