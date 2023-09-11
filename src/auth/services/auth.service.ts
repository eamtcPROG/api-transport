import { ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PostUserDto } from 'src/user/dto/postuser.dto';
import { PutUserDto } from 'src/user/dto/putuser.dto';
import { UserDto } from 'src/user/dto/user.dto';

import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/services/user.service';
import { SignInDto } from '../dto/signin.dto';
import ResultSignInDTO from '../dto/resultsignin.dto';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { Status } from 'src/app/tools/status';
import { JwtPayload } from '../dto/jwtpayload.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../dto/accesstoken.dto';
import { ToolsDate } from 'src/app/tools/tooldate';
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { SignInHashDto } from 'src/auth/dto/signinhash.dto';

import { UserSocialService } from 'src/user/services/usersocial.service';
import { SocialSignInDto } from '../dto/socialsignin.dto';
import { UserRoleService } from 'src/user/services/userrole.service';
import { UserSettingsService } from 'src/user/services/usersettings.service';
import Idto from 'src/app/interfaces/idto.interface';
import { RoleDto } from 'src/user/dto/role.dto';
import { UserRoleDto } from 'src/user/dto/userrole.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    protected readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly accessTokenStrategy: AccessTokenStrategy,
    private readonly userSocialService: UserSocialService,
    private readonly userRoleService: UserRoleService,
    private readonly userSettingsService: UserSettingsService,

  ) {}

  async processPassword(
    obj: UserDto | PostUserDto | PutUserDto,
  ): Promise<UserDto | PostUserDto | PutUserDto> {
    if (obj.password == undefined) return obj;
    if (obj.password == null) return obj;
    if (obj.password == '-1') return obj;

    obj.password = await this.hashPass(obj.password);

    return obj;
  }
  
  async hashPass(pass: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(pass, salt);
    return hash;
  }

  async isCorectPass(pass: string, h: string): Promise<boolean> {
    const match: boolean = await bcrypt.compare(pass, h);
    return match;
  }

  protected singIn_PrepareInitResult(): ResultSignInDTO {
    const rez = new ResultSignInDTO();
    rez.err = false;
    rez.mustchangepassword = false;
    rez.messages = [];
    return rez;
  }

  protected async singIn_getObjects(req: SignInDto): Promise<any[]> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const tf = new RequestFilterDTO();
    tf.field = 'email';
    tf.values = [req.identifier];

    rLDTO.filters.push(tf);

    return await this.userRepository.findAll(rLDTO);
  }

  protected async singIn_checkPassword(
    rez: ResultSignInDTO,
    obj: UserDto,
    req: SignInDto,
  ): Promise<ResultSignInDTO> {
    const isCorrectPassword = await this.isCorectPass(
      req.password,
      obj.password,
    );
    if (!isCorrectPassword) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(
        MessageTypes.USER_PASSWORD_NOTCORRECT,
      );
      return rez;
    }

    return rez;
  }

  

  async singIn_checkUser(
    rez: any,
    obj: any,
  ): Promise<any> {
    if (obj.status != Status.ACTIVE) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_ACTIVE);
      return rez;
    }
    rez.roles = await this.userRoleService.getUserRoles(obj.id);
    rez.usersettings = await this.userSettingsService.getUserSettingsByIdUser(obj.id);
    rez.obj = obj;

    return rez;
  }

  singIn_Processmustchangepassword(
    rez: ResultSignInDTO,
  ): ResultSignInDTO {
    rez.mustchangepassword =
      rez.obj.statuspassword == Status.ACTIVE || rez.obj.statuspassword == Status.ACCOUNT_REGISTER_SOCIAL ? false : true;
    return rez;
  }

  async singIn_processAccessToken(
    rez: ResultSignInDTO,
  ): Promise<ResultSignInDTO> {
    const accessToken: AccessTokenDto = await this.getToken(rez);
    rez.accesstoken = accessToken;
    return rez;
  }

  async singIn(req: SignInDto): Promise<ResultSignInDTO> {
    let rez:any = this.singIn_PrepareInitResult();
    const objects:any = await this.singIn_getObjects(req);

    if (!objects.length) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_FOUND);
      return rez;
    }


    const obj: any = this.userService.toDto(objects[0]);
    // console.log('singIn', obj)

    rez = await this.singIn_checkPassword(rez, obj, req);
    if (rez.err) {
      return rez;
    }
    rez = await this.singIn_checkUser(rez, obj);
    if (rez.err) {
      return rez;
    }

    rez = this.singIn_Processmustchangepassword(rez);
    rez = await this.singIn_processAccessToken(rez);

    return rez;
  }


  async singInHash(req: SignInHashDto): Promise<any> {
    let rez:any = this.singIn_PrepareInitResult();
    const object: any = await this.userService.getById(req.id);
    
    // console.log('singInHash', object);

    if (object == null) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_FOUND);
      return rez;
    }


    if (object.hash != req.hash) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_WRONG_HASH);
      return rez;
    }
    rez = await this.singIn_checkUser(rez, object);
    if (rez.err) {
      return rez;
    }

    rez = this.singIn_Processmustchangepassword(rez);
    rez = await this.singIn_processAccessToken(rez);

    return rez;
  }



  public getPayLoad(obj: ResultSignInDTO): JwtPayload {
    const rez: JwtPayload = {
      id: obj.obj.id,
      email: obj.obj.email,
      rolesid: obj.roles,
      usersettings: obj.usersettings,
    };
    return rez;
  }

  protected async getToken(obj: ResultSignInDTO): Promise<AccessTokenDto> {
    const rez = new AccessTokenDto();

    const payLoadObj: JwtPayload = this.getPayLoad(obj);

    const expVal = this.configService.get<string>('jwt.access_lifetime');
    const expSec = parseInt(expVal) / 1000;

    rez.accesstoken = await this.jwtService.signAsync(payLoadObj, {
      secret: this.configService.get<string>('jwt.access_secret'),
      expiresIn: expVal,
    });

    rez.tokentype = 'Bearer';
    rez.expiresin = expSec;
    rez.untildate = ToolsDate.getTimeStamp() + expSec;

    return rez;
  }

  parseToken(token: string): JwtPayload | any {
    token = token.replace('Bearer ', '');
    const decodedJwtAccessToken: any = this.jwtService.decode(token);
    return decodedJwtAccessToken;
  }

  async getCurrentUser(token: string): Promise<Idto> {
    const decoded: any = this.parseToken(token);

    const tobj:any = await this.userRepository.findById(decoded.id);
    const obj: any = this.userService.toDto(tobj);

    return obj;
  }

  async refreshToken(token: string): Promise<ResultSignInDTO> {
    const obj: any = await this.getCurrentUser(token);

    let rez = this.singIn_PrepareInitResult();
    rez = await this.singIn_checkUser(rez, obj);
    if (rez.err) {
      return rez;
    }

    rez = this.singIn_Processmustchangepassword(rez);
    rez = await this.singIn_processAccessToken(rez);

    return rez;
  }

  // -----------------------------------------

  async getEncryptedPass(pass: string): Promise<string> {
    const hash = await this.hashPass(pass);

    // console.log('pass', pass);
    // console.log('hash', hash);

    return hash;
  }

  async signInSocialExecCreate(req: SocialSignInDto): Promise<Idto> {
    const newUser:any = await this.userService.createUserForSocial(req.socialuseridentifier)
    if (newUser == null) return null;
    const newSocialObj:any = {
      iduser: newUser.id,
      socialidentifier: this.userSocialService.setSocialIdentifier(req.socialidentifier),
      socialid: req.socialid,
      socialuseridentifier: req.socialuseridentifier
    }

    const objSocial:any = await this.userSocialService.createUserSocial(newSocialObj)
    if (!objSocial) return null;
    return newUser;

  }

  async signInSocial(req: SocialSignInDto): Promise<ResultSignInDTO> {
    let rez:any = this.singIn_PrepareInitResult();
    const obj:any = await this.userSocialService.getUserSocialBySocialUserIdentifier(req);
    let user: any;
    if (obj == null) {

      const checkUserAlreadyExist = await this.userService.findUserByEmail(req.socialuseridentifier);

      if (checkUserAlreadyExist == null) {
        user = await this.signInSocialExecCreate(req);
        if (user == null) {
          rez.err = true;
          rez.messages = MessageTypes.processMessage(MessageTypes.USER_SOCIAL_ERROR);
          return rez;
        }

      } else {
        user = checkUserAlreadyExist;
      }

    } else {
      user = await this.userService.getById(obj.iduser);
    }

    rez = await this.singIn_checkUser(rez, user);
    if (rez.err) {
      return rez;
    }

    rez = this.singIn_Processmustchangepassword(rez);
    rez = await this.singIn_processAccessToken(rez);
    return rez;
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}
