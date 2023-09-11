import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileRepository } from '../repositories/file.repository';
import { FileDto } from '../dto/file.dto';
import { AddPermissionDto } from '../dto/addpermission.dto';
import { File } from '../schemas/file.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostFileDto } from '../dto/postfile.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { extname } from 'path';
import { StorageManager, Storage, ContentResponse } from '@slynova/flydrive';
import { DiskType, DiskTypeAll, Disks, StorageEntityType } from 'src/file/tools/disk';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { ToolsDate } from 'src/app/tools/tooldate';
import { v4 as uuid } from 'uuid';

import * as fs from 'fs';

@Injectable()
export class FileService
  extends GeneralService<FileRepository, null>
  implements IService
{
  

  async parseForSave(postObj: any): Promise<Idto> {
    return await this.prepareAddFile(postObj);
  }
 
  constructor(
    private readonly fileRepository: FileRepository,
    protected readonly configService: ConfigService,
    private storage: StorageManager,
  ) {
    super(fileRepository);
  }

  private disk: Storage = null;

  // toDto(obj: any): Idto {
  //   const rez = new FileDto();
  //   rez.id = obj._id;
  //   rez.name = obj.name;
  //   rez.hash = obj.hash;
  //   rez.location = obj.location;
  //   rez.permissions = obj.permissions;
  //   rez.size = obj.size;
  //   rez.storage = obj.storage;
  //   rez.type = obj.type;
  //   rez.value = obj.value;

  //   return rez;
  // }
  getKeys(): any[] {
    const rez = [];
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new FileDto();
   
    rez.id = this.fileRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('hash')) rez.hash = obj.hash;
    if (obj.hasOwnProperty('location')) rez.location = obj.location;
    if (obj.hasOwnProperty('permissions')) rez.permissions = obj.permissions;
    if (obj.hasOwnProperty('size')) rez.size = obj.size;
    if (obj.hasOwnProperty('permissions')) rez.permissions = obj.permissions;
    if (obj.hasOwnProperty('storage')) rez.storage = obj.storage;
    if (obj.hasOwnProperty('type')) rez.type = obj.type;
    if (obj.hasOwnProperty('value')) rez.value = obj.value;
    if (obj.hasOwnProperty('fullpath')) rez.fullpath = obj.fullpath;
    return rez;
  }

  // UNVERIFIED

  async getMd5(filePath: string, disk: DiskTypeAll): Promise<string> {
    const file = await this.getFile(disk, filePath);

    return new Promise((resolve, reject) => {
      const hash = createHash('md5');
      const stream = file;
      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', (error) => reject(error));
    });
  }

  async prepareAddFile(postObj: any): Promise<FileDto> {
    const obj = new FileDto();
    obj.name = postObj.name;
    obj.hash = await this.getMd5(
      postObj.location,
      this.toDiskType(postObj.storage),
    );
    obj.location = postObj.location;
    obj.permissions = [];
    obj.size = postObj.size;
    obj.storage = postObj.storage;
    obj.type = postObj.type;
    obj.value = '';
    return obj;
  }

  async add(postObj: PostFileDto): Promise<Idto> {
    const objToAdd = await this.prepareAddFile(postObj);
    const obj = await this.save(objToAdd);
    return obj;
  }

  async delete(id: string): Promise<ResultDeleteDTO> {
    const obj = await this.fileRepository.delete(id);

    if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
    return CommonTools.toDeleteResult(true);
  }

  async addPermission(id: string, arr: AddPermissionDto): Promise<Idto> {
    const obj = new PostFileDto();
    obj.permissions = arr.permission;
    return await this.update(id, obj);
  }

  async update(id: string, putObj: PostFileDto): Promise<Idto> {
    const obj = await this.save(putObj,id);
    
    return obj;
  }

  //Function to work with files on storage

  public generateFileName(originalFileName: string) {
    const fileExtName = extname(originalFileName);
    const now = new Date();
    const dsql = ToolsDate.getDateTimeFile();
    const uid = uuid();
    console.log('generateFileNamegenerateFileName', dsql);
    return `file-${dsql}-${uid}${fileExtName}`;
  }

  toDiskType(type: string) {
    if (type == 'public') {
      return DiskType.public;
    } else if (type == 'private') {
      return DiskType.private;
    }
  }

  private async initializeDisk(disktype: DiskTypeAll) {
    if (disktype == 'public') {
      this.disk = await this.storage.disk(Disks.public);
    } else if (disktype == 'private') {
      this.disk = await this.storage.disk(Disks.private);
    } else if (disktype == 'root') {
      this.disk = await this.storage.disk(Disks.root);
    } else {
      this.disk = await this.storage.disk(Disks.public);
    }
  }

  public async deleteFile(
    disktype: DiskTypeAll,
    path: string,
  ): Promise<boolean> {
    await this.initializeDisk(disktype);
    if (this.disk && path) {
      const { wasDeleted } = await this.disk.delete(path);
      return wasDeleted;
    } else {
      return false;
    }
  }

  public async getFile(
    disktype: DiskTypeAll,
    path: string,
  ): Promise<NodeJS.ReadableStream | null> {
    await this.initializeDisk(disktype);
    if (this.disk && path) {
      const { exists } = await this.disk.exists(path);
      if (exists) {
        return await this.disk.getStream(path);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  public async getFileStream(
    disktype: DiskTypeAll,
    path: string,
  ): Promise<any> {
    await this.initializeDisk(disktype);
    
    const localFilePath = this.disk['$root'] + path;
    const fileStream = fs.createReadStream(localFilePath);

    return fileStream;
  }

  public createPath(
    storageEntityType: StorageEntityType,
    subpath: string | number,
  ): string {
    let rez = '/';
    if (
      Object.values(StorageEntityType).includes(storageEntityType)
      
    ) {
      if (subpath)
      {
        rez += `${storageEntityType}/${subpath}`;
      } else
      {
        rez += `${storageEntityType}`;        
      }
    }

    rez = rez.replace('//', '/');
    rez = CommonTools.rtrimSymbolWithRegex(rez, '/');
    if (rez == '') rez = '/';

    return rez;
  }

  public async storeFileAndGetId(
    disktype: DiskTypeAll,
    storageEntityType: StorageEntityType,
    subpath: string,
    file: Express.Multer.File,
  ): Promise<string | null> {
    const path = await this.storeFileAndGetPath(disktype, storageEntityType, subpath, file);

    const postObj = new FileDto;
    postObj.name = file.originalname;
    postObj.type = file.mimetype;
    postObj.location = path;
    postObj.storage = disktype;
    postObj.size = file.size;
    postObj.value = '';

    const obj:FileDto = await this.save(postObj) as FileDto;
    
    if (obj == null) return null;

    const rez:string = (obj && obj.id) ? obj.id  : null;

    return rez;
  }

  public async storeFileAndGetPath(
    disktype: DiskTypeAll,
    storageEntityType: StorageEntityType,
    subpath: string,
    file: Express.Multer.File,
  ): Promise<string | null> {
    await this.initializeDisk(disktype);
    const { originalname, buffer } = file;

    const savePath = this.createPath(storageEntityType, subpath);

    // console.log(
    //   'storeFileAndGetPathstoreFileAndGetPath 11111111111111',
    //   'savePath',
    //   savePath,
    // );

    // console.log(
    //   'storeFileAndGetPathstoreFileAndGetPath 222222222222222222222222',
    //   disktype,
    //   storageEntityType,
    //   subpath,
    //   file,
    // );

    const fullName = savePath + '/' + this.generateFileName(originalname);
    if (this.disk) {
      await this.disk.put(fullName, buffer);

      return fullName;
    } else {
      return null;
    }
  }

  public async deleteFolder(
    disktype: DiskType,
    storageEntityTypes: StorageEntityType,
    subpath: string,
  ): Promise<boolean> {
    await this.initializeDisk(disktype);
    const fileSystemDriver = await this.disk.driver();

    const path = this.createPath(storageEntityTypes, subpath);
    if (!path) return false;

    const exists = await this.disk.exists(path);
    if (!exists) return false;

    // https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove.md
    //@ts-ignore
    await fileSystemDriver.remove(this.disk.$root + path);
    return true;
  }

  parseFileObjectForDataBase(
    file,
    diskType: DiskType,
    location: string,
  ): PostFileDto {
    const obj = new PostFileDto();
    obj.name = file.originalname;
    obj.location = location;
    obj.size = file.size;
    obj.storage = diskType;
    obj.type = file.mimetype;

    return obj;
  }
  async storePublic(file): Promise<Idto> {
    if (file == null || file == undefined) return null;
    const location = await this.storeFileAndGetPath(
      DiskType.public,
      StorageEntityType.tests,
      'test',
      file,
    );
    const postObj = this.parseFileObjectForDataBase(
      file,
      DiskType.public,
      location,
    );

    const obj = await this.add(postObj);

    return obj;
  }

  async store(
    file,
    disk: DiskTypeAll,
    storageEntityType: StorageEntityType,
    path?: string,
  ): Promise<Idto> {
    if (file == null || file == undefined) return null;
    if (path == undefined) path = CommonTools.generateRandomString(3);
    const location = await this.storeFileAndGetPath(
      disk,
      storageEntityType,
      path,
      file,
    );
    const postObj = this.parseFileObjectForDataBase(
      file,
      this.toDiskType(disk),
      location,
    );

    const obj = await this.add(postObj);

    return obj;
  }

  async discardFile(id: string): Promise<ResultDeleteDTO> {
    const file:any = await this.getById(id);
    if (file == null) return CommonTools.toDeleteResult(false);
    const path = file.location;
    const type = this.toDiskType(file.type);
    const deleted = await this.deleteFile(type, path);
    if (!deleted) return CommonTools.toDeleteResult(false);
    const rez = this.delete(id);
    return rez;
  }
}