import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestInfoRepository } from '../repositories/testinfo.repository';
// import { TestInfoDto } from '../dto/testinfo.dto';
import { TestInfo } from '../schemas/testinfo.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
// import { PostTestInfoDto } from '../dto/posttestinfo.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
// import { PutTestInfoDto } from '../dto/puttestinfo.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class TestInfoService
  extends GeneralService<TestInfoRepository, null>
  implements IService
{
  constructor(
    private readonly testInfoRepository: TestInfoRepository,
    protected readonly configService: ConfigService,
  ) {
    super(testInfoRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['name']);
    return rez;
  }

  toDto(obj: any): Idto {
    // const rez = new TestInfoDto();
let rez
    rez.id = this.testInfoRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('info')) rez.info = obj.info;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    // const obj: TestInfoDto = new TestInfoDto();
    let obj;
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('info')) obj.info = postObj.info;
    return obj;
  }
}
