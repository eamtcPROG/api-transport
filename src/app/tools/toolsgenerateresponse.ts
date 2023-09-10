import { HttpStatus, Res } from '@nestjs/common';
import ResultObjectDTO from '../dto/resultobject.dto';
import ResultListDTO from '../dto/resultlist.dto';
import Idto from '../interfaces/idto.interface';
import { MessageTypes } from './messagetypes';
import RequestListDTO from '../dto/requestlist.dto';
import { CommonTools } from './commontools';
// import { RoleDto } from 'src/user/dto/role.dto';

export class ToolsGenerateResponse {
  public static getOk(@Res() res, rez: object): any {
    return this.getErr(res, HttpStatus.OK, rez);
  }
  public static getErr(@Res() res, errType: number, rez: object): any {
    return res.status(errType).json(rez);
  }

  public static async getOkObject(@Res() res, obj: Idto): Promise<any> {
    const rez = new ResultObjectDTO();
    rez.err = false;
    rez.obj = obj;
    // console.log(res)
    // if(res.hasOwnProperty('method') && (res.method == 'POST' || res.method == 'PUT')){
    // rez.messages = MessageTypes.processMessage(MessageTypes.ACTION_SUCCESS);}
    return this.getOk(res, rez);
  }

  public static async getOkList(
    @Res() res,
    objs: Array<Idto>,
    requestinfo: RequestListDTO,
    total: number,
    // roles?:RoleDto[]
  ): Promise<any> {
    const rez = new ResultListDTO();
    rez.err = false;
    rez.objects = objs;
    rez.requestinfo = requestinfo;
    rez.total = total;
    rez.totalpages = CommonTools.setTotalPages(requestinfo, total);
    // if(roles != undefined) rez.roles = roles;
    return this.getOk(res, rez);
  }

  public static async getErrObject(
    @Res() res,
    errType: number,
    messages: number | Array<number>,
  ): Promise<any> {
    const rez = new ResultObjectDTO();
    rez.err = true;
    rez.messages = MessageTypes.processMessage(messages);

    return this.getErr(res, errType, rez);
  }

  public static async getSuccessObject(
    @Res() res,
    type: number,
    messages: number | Array<number>,
  ): Promise<any> {
    const rez = new ResultObjectDTO();
    rez.err = false;
    rez.messages = MessageTypes.processMessage(messages);

    return this.getErr(res, type, rez);
  }
}
