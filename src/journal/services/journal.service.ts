import { Inject, Injectable, forwardRef,ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JournalRepository } from '../repositories/journal.repository';
import { JournalDto } from '../dto/journal.dto';
import { Journal } from '../schemas/journal.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';



import { JournalPopulateDto } from '../dto/journalpopulate.dto';
import { PostJournalDto } from '../dto/postjournal.dto';
import { ToolsDate } from 'src/app/tools/tooldate';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { AuthService } from 'src/auth/services/auth.service';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';



@Injectable()
export class JournalService
  extends GeneralService<JournalRepository, null>
  implements IService
{
 
  constructor(
    private readonly journalRepository: JournalRepository,
    private readonly authService: AuthService,
    protected readonly configService: ConfigService,
  ) {
    super(journalRepository);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new JournalDto();

    rez.id = this.journalRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('iduser')) rez.iduser = this.journalRepository.getParsedIdStr(obj.iduser);
    if (obj.hasOwnProperty('type')) rez.type = obj.type;
    if (obj.hasOwnProperty('date')) rez.date = obj.date;
    if (obj.hasOwnProperty('info')) rez.info = obj.info;

    if (obj.hasOwnProperty('user')) rez.user = obj.user;
    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    const obj: JournalDto = new JournalDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    obj.date = ToolsDate.getTimeStamp();
    if (postObj.hasOwnProperty('type')) obj.type = postObj.type;
    if (postObj.hasOwnProperty('info')) obj.info = postObj.info;
    

    return obj;
  }
  // toDto(obj: any): Idto {
  //   const rez = new JournalDto();
  //   rez.id = obj._id;
  //   rez.type = obj.type;
  //   rez.date = obj.date;
  //   rez.iduser = obj.iduser;
  //   rez.info = obj.info;

  //   return rez;
  // }

  // // UNVERIFIED

  // prepareToAdd(postObj: PostJournalDto): PostJournalDto {
  //   const obj = new PostJournalDto();
  //   obj.iduser = postObj.iduser;
  //   obj.type = postObj.type;
  //   obj.info = postObj.info;
  //   obj.date = ToolsDate.getTimeStamp();
  //   return obj;
  // }
  // async add(postObj: PostJournalDto): Promise<Idto> {
  //   const objToAdd = this.prepareToAdd(postObj);
  //   const obj = await this.journalRepository.save(objToAdd);

  //   return this.toDto(obj);
  // }

  async registerInJournal(token: string, type: number, info?: string) {
    const payload = this.authService.parseToken(token);
    const obj = new PostJournalDto();
    obj.iduser = payload.id;
    obj.type = type;
    obj.info = info != undefined ? info : '';
    return await this.save(obj);
  }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.journalRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: PostJournalDto): Promise<Idto> {
  //   if (putObj != null) putObj.date = ToolsDate.getTimeStamp();
  //   const obj = await this.journalRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async toPopulateDto(obj): Promise<JournalPopulateDto> {
  //   const object = new JournalPopulateDto();
  //   object.id = obj._id;
  //   object.info = obj.info;
  //   object.type = obj.type;
  //   object.date = obj.date;
  //   object.user = {
  //     id: obj.iduser._id,
  //     email: obj.iduser.email,
  //   };
  //   return object;
  // }

  // async toPopulateDtoArray(objs) {
  //   const rez = new Array<JournalPopulateDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toPopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async getAllPopulate(options: RequestListDTO): Promise<JournalPopulateDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['iduser'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.journalRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toPopulateDtoArray(objs);
  // }

  // async findByIdAndPopulate(id: string): Promise<JournalPopulateDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['iduser'];

  //   const obj = await this.journalRepository.findById(id, requestPopulateDTO);
  //   if (obj == null) return null;

  //   return await this.toPopulateDto(obj);
  // }
}