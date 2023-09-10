import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';
// import { UserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
// import { PostUserDto } from '../dto/postuser.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
// import { PutUserDto } from 'src/user/dto/putuser.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import ResultSignInDTO from 'src/auth/dto/resultsignin.dto';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { ToolsDate } from 'src/app/tools/tooldate';
import { Status } from 'src/app/tools/status'
// import { ResetPasswordCodeDto } from '../dto/resetpasswordcode.dto';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
// import { ResetCodeDto } from '../dto/resetcode.dto';
// import { ResetPasswordDto } from '../dto/resetpassword.dto';
// import { ModifyPasswordDto } from 'src/user/dto/modifypassword.dto';
// import { ModifyPasswordAdminDto } from '../dto/modifypasswordadmin.dto';
import { UserRoleService } from './userrole.service';
import { UserSettingsService } from './usersettings.service';
// import { CreateUserAdminDto } from '../dto/createuseradmin.dto';
// import { UpdateUserAdminDto } from '../dto/updateuseradmin.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
// import { UserSettingsDto } from '../dto/usersettings.dto';
// import { RegisterUserFirstStepDto } from '../dto/registeruserfirststep.dto';
// import { StudentService } from 'src/student/services/student.service';
// import { StudentDto } from 'src/student/dto/student.dto';
// import { PhoneDto } from '../dto/phone.dto';
import { PhoneService } from './phone.service';
// import { BecomeTeacherDto } from '../dto/becometeacher.dto'
// import { TeacherService } from 'src/teacher/services/teacher.service';
// import { TeacherDto } from 'src/teacher/dto/teacher.dto';
// import { UserRoleDto } from '../dto/userrole.dto';
// import { AddressDto } from 'src/address/dto/address.dto';
// import { AddressService } from 'src/address/services/address.service';
// import { SocialDto } from '../dto/social.dto';
// import { SocialService } from './social.service';


@Injectable()
export class UserService
  extends GeneralService<UserRepository, null>
  implements IService {
  constructor(
    private readonly userRepository: UserRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly userRoleService: UserRoleService,
    private readonly userSettingsService: UserSettingsService,


    private readonly phoneService: PhoneService,

  ) {
    super(userRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['email']);
    return rez;
  }

  toDto(obj: any): Idto {
    // const rez = new UserDto();
let rez
    rez.id = this.userRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('registerdate')) rez.registerdate = obj.registerdate;
    if (obj.hasOwnProperty('email')) rez.email = obj.email;
    if (obj.hasOwnProperty('statusemail')) rez.statusemail = obj.statusemail;
    if (obj.hasOwnProperty('password')) rez.password = obj.password;
    if (obj.hasOwnProperty('statuspassword')) rez.statuspassword = obj.statuspassword;
    if (obj.hasOwnProperty('hash')) rez.hash = obj.hash;

    if (obj.hasOwnProperty('userroles')) rez.userroles = obj.userroles;
    if (obj.hasOwnProperty('usersettings')) {
      // rez.usersettings = obj.usersettings;
      if (obj.usersettings.length > 0) {
        if (obj.usersettings[0].hasOwnProperty('_id')) rez.idusersettings = obj.usersettings[0]._id;
        if (obj.usersettings[0].hasOwnProperty('name')) rez.name = obj.usersettings[0].name;
        if (obj.usersettings[0].hasOwnProperty('surname')) rez.surname = obj.usersettings[0].surname;
        if (obj.usersettings[0].hasOwnProperty('birthday')) rez.birthday = obj.usersettings[0].birthday;
      }
    }
    if (obj.hasOwnProperty('usersocial')) rez.usersocial = obj.usersocial;
    if (obj.hasOwnProperty('phones')) rez.phones = obj.phones;

    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    // let obj: UserDto = new UserDto();
    let obj;
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('registerdate')) obj.registerdate = postObj.registerdate;
    if (postObj.hasOwnProperty('email')) obj.email = postObj.email;
    if (postObj.hasOwnProperty('statusemail')) obj.statusemail = postObj.statusemail;
    if (postObj.hasOwnProperty('password')) {
      obj.password = postObj.password;
      obj = await this.authService.processPassword(obj);
    }
    if (postObj.hasOwnProperty('statuspassword')) obj.statuspassword = postObj.statuspassword;
    if (postObj.hasOwnProperty('hash')) obj.hash = postObj.hash;



    return obj;
  }

  // --------------------
  async deleteOtherData(id: string) {
    if (id) {
      const userRole = await this.userRoleService.getByField('iduser', id) as any;
      if (userRole != null) await this.userRoleService.delete(userRole.id);
      const userSettings = await this.userSettingsService.getByField('iduser', id) as any;
      if (userSettings != null) await this.userSettingsService.delete(userSettings.id);
      // const userRole = await this.userRoleService.getByField('iduser', id) as UserRoleDto;
      // if (userRole != null) await this.userRoleService.delete(userRole.id);
      // const userSettings = await this.userSettingsService.getByField('iduser', id) as UserSettingsDto;
      // if (userSettings != null) await this.userSettingsService.delete(userSettings.id);
      // const student = await this.studentService.getByField('iduser', id) as StudentDto;
      // if (student != null) await this.studentService.delete(student.id);
      // const phone = await this.phoneService.getByField('iduser', id) as PhoneDto;
      // if (phone != null) await this.phoneService.delete(phone.id);
      // const teacher = await this.teacherService.getByField('iduser', id) as TeacherDto;
      // if (teacher != null) await this.teacherService.delete(teacher.id);
      // const address = await this.addressService.getByField('iduser', id) as AddressDto;
      // if (address != null) await this.addressService.delete(address.id);
      // const social =await this.socialService.getByField('iduser', id) as SocialDto;
      // if (social != null) await this.socialService.delete(social.id);
    }
  }
  // UNVERIFIED Temporary

  async checkUserNotification(obj: any): Promise<any> {
    //Temporary
    let rez = {};
    rez = obj;
    return rez;
  }

  //--------------
  // async updateHash(id: string, putObj: PutUserDto): Promise<Idto> {
  //   const obj = await this.userRepository.save(putObj);
  //   if (obj.modifiedCount === 0) return null;
  //   const objUpdated = await this.getById(id);
  //   const notification = await this.checkUserNotification(obj);
  //   return objUpdated;
  // }
  async updateHash(id: string, putObj: any): Promise<Idto> {
    const obj = await this.userRepository.save(putObj);
    if (obj.modifiedCount === 0) return null;
    const objUpdated = await this.getById(id);
    const notification = await this.checkUserNotification(obj);
    return objUpdated;
  }

  //--------------
  async singUp_getObjects(req: SignUpDto): Promise<any[]> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const tf = new RequestFilterDTO();
    tf.field = 'email';
    tf.values = [req.email];

    rLDTO.filters.push(tf);

    return await this.userRepository.findAll(rLDTO);
  }

  singUp_PrepareInitResult(): ResultSignInDTO {
    const rez = new ResultSignInDTO();
    rez.err = false;
    rez.mustchangepassword = false;
    rez.messages = [];
    return rez;
  }

  // prepareUserRegister(email: string, password: string): PostUserDto {
  //   const obj: PostUserDto = new PostUserDto();
  //   obj.email = email;
  //   obj.password = password;
  //   obj.registerdate = ToolsDate.getTimeStamp();
  //   obj.statusemail = Status.INACTIVE;
  //   obj.statuspassword = Status.ACTIVE;
  //   obj.status = Status.ACTIVE;
  //   obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   return obj;
  // }

  prepareUserRegister(email: string, password: string): any {
    // const obj: PostUserDto = new PostUserDto();
    let obj
    obj.email = email;
    obj.password = password;
    obj.registerdate = ToolsDate.getTimeStamp();
    obj.statusemail = Status.INACTIVE;
    obj.statuspassword = Status.ACTIVE;
    obj.status = Status.ACTIVE;
    obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
    return obj;
  }

  // prepareUserRegisterByAdmin(postObj: CreateUserAdminDto): PostUserDto {
  //   const obj: PostUserDto = new PostUserDto();
  //   obj.email = postObj.email;
  //   obj.password = postObj.password;
  //   obj.registerdate = ToolsDate.getTimeStamp();
  //   obj.statusemail = Status.INACTIVE;
  //   obj.statuspassword = Status.TEMPORARY;
  //   obj.status = Status.ACTIVE;
  //   obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   return obj;
  // }

  // prepareUserRegisterByAdmin(postObj: any): PostUserDto {
  //   const obj: PostUserDto = new PostUserDto();
  //   obj.email = postObj.email;
  //   obj.password = postObj.password;
  //   obj.registerdate = ToolsDate.getTimeStamp();
  //   obj.statusemail = Status.INACTIVE;
  //   obj.statuspassword = Status.TEMPORARY;
  //   obj.status = Status.ACTIVE;
  //   obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   return obj;
  // }

  prepareUserRegisterByAdmin(postObj: any): any {
    // const obj: PostUserDto = new PostUserDto();
    let obj
    obj.email = postObj.email;
    obj.password = postObj.password;
    obj.registerdate = ToolsDate.getTimeStamp();
    obj.statusemail = Status.INACTIVE;
    obj.statuspassword = Status.TEMPORARY;
    obj.status = Status.ACTIVE;
    obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
    return obj;
  }

  // prepareUserUpdateByAdmin(postObj: UpdateUserAdminDto): PostUserDto {
  //   const obj: PostUserDto = new PostUserDto();
  //   obj.email = postObj.email;
  //   return obj;
  // }

  prepareUserUpdateByAdmin(postObj: any) {
    // const obj: PostUserDto = new PostUserDto();
    let obj;
    obj.email = postObj.email;
    return obj;
  }

  // async updateUserByAdmin(
  //   id: string,
  //   putObj: UpdateUserAdminDto,
  // ): Promise<Idto> {
  //   const obj = await this.userRepository.update(
  //     id,
  //     this.prepareUserUpdateByAdmin(putObj),
  //   );
  //   if (obj.modifiedCount === 0) return null;
  //   const objUpdated = await this.getById(id);
  //   const notification = await this.checkUserNotification(obj);
  //   return objUpdated;
  // }
  async updateUserByAdmin(
    id: string,
    putObj: any,
  ): Promise<Idto> {
    const obj = await this.userRepository.update(
      id,
      this.prepareUserUpdateByAdmin(putObj),
    );
    if (obj.modifiedCount === 0) return null;
    const objUpdated = await this.getById(id);
    const notification = await this.checkUserNotification(obj);
    return objUpdated;
  }

  // async createUserByAdmin(postObj: CreateUserAdminDto): Promise<any> {
  //   const obj: any = await this.save(this.prepareUserRegisterByAdmin(postObj));
  //   if (obj == null) return null;
  //   const setDefaultRole: any = await this.userRoleService.setDefaultRole(
  //     obj.id,
  //   );
  //   if (setDefaultRole == null) return null;
  //   return obj;
  // }

  async createUserByAdmin(postObj: any): Promise<any> {
    const obj: any = await this.save(this.prepareUserRegisterByAdmin(postObj));
    if (obj == null) return null;
    const setDefaultRole: any = await this.userRoleService.setDefaultRole(
      obj.id,
    );
    if (setDefaultRole == null) return null;
    return obj;
  }

  // prepareUserRegisterFromSocial(email: string): PostUserDto {
  //   const obj: PostUserDto = new PostUserDto();
  //   obj.email = email;
  //   obj.status = Status.ACTIVE;
  //   obj.password = '';
  //   obj.registerdate = ToolsDate.getTimeStamp();
  //   obj.statusemail = Status.ACTIVE;
  //   obj.statuspassword = Status.ACCOUNT_REGISTER_SOCIAL;
  //   obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   return obj;
  // }

  prepareUserRegisterFromSocial(email: string): any {
    // const obj: PostUserDto = new PostUserDto();
    let obj;
    obj.email = email;
    obj.status = Status.ACTIVE;
    obj.password = '';
    obj.registerdate = ToolsDate.getTimeStamp();
    obj.statusemail = Status.ACTIVE;
    obj.statuspassword = Status.ACCOUNT_REGISTER_SOCIAL;
    obj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
    return obj;
  }

  async singUp(req: SignUpDto): Promise<ResultSignInDTO> {
    let rez = this.singUp_PrepareInitResult();
    const objects = await this.singUp_getObjects(req);
    if (objects.length > 0) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(
        MessageTypes.USER_FOUND_IN_SYSTEM,
      );
      return rez;
    }

    const obj: any = await this.save(
      this.prepareUserRegister(req.email, req.password),
    );
    rez.obj = obj;
    const setDefaultRole = await this.userRoleService.setDefaultRole(obj.id);

    if (setDefaultRole == null) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(
        MessageTypes.USER_DEFAULT_ROLE_ERROR,
      );
      return rez;
    }

    rez = this.authService.singIn_Processmustchangepassword(rez);
    rez = await this.authService.singIn_processAccessToken(rez);
    return rez;
  }
  async findUserByEmail(email: string): Promise<Idto> {
    const req: SignUpDto = new SignUpDto();
    req.email = email;
    const objects = await this.singUp_getObjects(req);

    if (!objects.length) {
      return null;
    }
    const obj = this.toDto(objects[0]);
    return obj;
  }
  //------------------ Reset
  // async resetCode(obj: ResetPasswordCodeDto): Promise<ResultObjectDTO> {
  //   const rez: ResultObjectDTO = new ResultObjectDTO();
  //   const req: SignUpDto = new SignUpDto();
  //   req.email = obj.email;
  //   const objects = await this.singUp_getObjects(req);

  //   if (!objects.length) {
  //     return null;
  //   }

  //   const resetCodeObj: ResetCodeDto = new ResetCodeDto();
  //   const response = CommonTools.generateRandomStringWithMD5Hash(6);
  //   const putObj: PutUserDto = new PutUserDto();
  //   putObj.hash = response.hash;
  //   const tmpObj: any = this.toDto(objects[0]);
  //   const user = await this.updateHash(tmpObj.id, putObj);

  //   if (user === null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_UPDATE);
  //     return rez;
  //   }
  //   resetCodeObj.code = response.randomString;
  //   // console.log(resetCodeObj.code)
  //   rez.err = false;
  //   rez.messages = MessageTypes.processMessage(MessageTypes.RESET_CODE_SUCCESS);
  //   const notification = await this.checkUserNotification(obj);
  //   return rez;
  // }


  async resetCode(obj: any): Promise<ResultObjectDTO> {
    const rez: ResultObjectDTO = new ResultObjectDTO();
    const req: SignUpDto = new SignUpDto();
    req.email = obj.email;
    const objects = await this.singUp_getObjects(req);

    if (!objects.length) {
      return null;
    }

    // const resetCodeObj: ResetCodeDto = new ResetCodeDto();
    let resetCodeObj
    const response = CommonTools.generateRandomStringWithMD5Hash(6);
    // const putObj: PutUserDto = new PutUserDto();
    let putObj
    putObj.hash = response.hash;
    const tmpObj: any = this.toDto(objects[0]);
    const user = await this.updateHash(tmpObj.id, putObj);

    if (user === null) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_UPDATE);
      return rez;
    }
    resetCodeObj.code = response.randomString;
    // console.log(resetCodeObj.code)
    rez.err = false;
    rez.messages = MessageTypes.processMessage(MessageTypes.RESET_CODE_SUCCESS);
    const notification = await this.checkUserNotification(obj);
    return rez;
  }

  // async resetPassword(obj: ResetPasswordDto): Promise<ResultObjectDTO> {
  //   const rez: ResultObjectDTO = new ResultObjectDTO();
  //   const user: any = await this.findUserByEmail(obj.email);
  //   if (user == null) return null;
  //   if (!CommonTools.isHashMatching(obj.code, user.hash)) return null;
  //   const putObj: PutUserDto = new PutUserDto();
  //   putObj.password = obj.password;
  //   putObj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   const updateUser: Idto = await this.save(putObj, user.id);
  //   if (updateUser == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_UPDATE);
  //     return rez;
  //   }
  //   const notification = await this.checkUserNotification(obj);
  //   rez.err = false;
  //   rez.messages = MessageTypes.processMessage(
  //     MessageTypes.RESET_PASSWORD_SUCCESS,
  //   );

  //   return rez;
  // }

  async resetPassword(obj: any): Promise<ResultObjectDTO> {
    const rez: ResultObjectDTO = new ResultObjectDTO();
    const user: any = await this.findUserByEmail(obj.email);
    if (user == null) return null;
    if (!CommonTools.isHashMatching(obj.code, user.hash)) return null;
    // const putObj: PutUserDto = new PutUserDto();
    let putObj
    putObj.password = obj.password;
    putObj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
    const updateUser: Idto = await this.save(putObj, user.id);
    if (updateUser == null) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_UPDATE);
      return rez;
    }
    const notification = await this.checkUserNotification(obj);
    rez.err = false;
    rez.messages = MessageTypes.processMessage(
      MessageTypes.RESET_PASSWORD_SUCCESS,
    );

    return rez;
  }

  // async modifyPassword(obj: ModifyPasswordDto): Promise<ResultObjectDTO> {
  //   const rez: ResultObjectDTO = new ResultObjectDTO();
  //   const user: any = await this.findUserByEmail(obj.email);
  //   if (user == null) return null;
  //   let checkPassword = await this.authService.isCorectPass(
  //     obj.currentpassword,
  //     user.password,
  //   );
  //   if (user.statuspassword == Status.ACCOUNT_REGISTER_SOCIAL)
  //     checkPassword = true;
  //   if (!checkPassword) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_PASSWORD_NOTCORRECT,
  //     );
  //     return rez;
  //   }
  //   const putObj: PutUserDto = new PutUserDto();
  //   putObj.password = obj.newpassword;
  //   putObj.statuspassword = Status.ACTIVE;
  //   putObj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   const updateUser: Idto = await this.save(putObj, user.id);
  //   if (updateUser == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_UPDATE);
  //     return rez;
  //   }
  //   const notification = await this.checkUserNotification(obj);
  //   rez.err = false;
  //   rez.messages = MessageTypes.processMessage(
  //     MessageTypes.RESET_PASSWORD_SUCCESS,
  //   );

  //   return rez;
  // }

  async modifyPassword(obj: any): Promise<ResultObjectDTO> {
    const rez: ResultObjectDTO = new ResultObjectDTO();
    const user: any = await this.findUserByEmail(obj.email);
    if (user == null) return null;
    let checkPassword = await this.authService.isCorectPass(
      obj.currentpassword,
      user.password,
    );
    if (user.statuspassword == Status.ACCOUNT_REGISTER_SOCIAL)
      checkPassword = true;
    if (!checkPassword) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(
        MessageTypes.USER_PASSWORD_NOTCORRECT,
      );
      return rez;
    }
    // const putObj: PutUserDto = new PutUserDto();
    let putObj
    putObj.password = obj.newpassword;
    putObj.statuspassword = Status.ACTIVE;
    putObj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
    const updateUser: Idto = await this.save(putObj, user.id);
    if (updateUser == null) {
      rez.err = true;
      rez.messages = MessageTypes.processMessage(MessageTypes.USER_NOT_UPDATE);
      return rez;
    }
    const notification = await this.checkUserNotification(obj);
    rez.err = false;
    rez.messages = MessageTypes.processMessage(
      MessageTypes.RESET_PASSWORD_SUCCESS,
    );

    return rez;
  }

  // async updatePassword(id: string, obj: ModifyPasswordAdminDto): Promise<Idto> {
  //   const user: Idto = await this.getById(id);
  //   if (user == null) return null;
  //   const putObj: PutUserDto = new PutUserDto();
  //   putObj.password = obj.password;
  //   putObj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
  //   putObj.statuspassword = Status.TEMPORARY;
  //   const updateUser: Idto = await this.save(putObj, id);
  //   if (updateUser == null) return null;
  //   const notification = await this.checkUserNotification(obj);

  //   return updateUser;
  // }

  async updatePassword(id: string, obj: any): Promise<Idto> {
    const user: Idto = await this.getById(id);
    if (user == null) return null;
    // const putObj: PutUserDto = new PutUserDto();
    let putObj
    putObj.password = obj.password;
    putObj.hash = CommonTools.generateMD5HashFromRandomDigitString(6);
    putObj.statuspassword = Status.TEMPORARY;
    const updateUser: Idto = await this.save(putObj, id);
    if (updateUser == null) return null;
    const notification = await this.checkUserNotification(obj);

    return updateUser;
  }

  // async createUserForSocial(email: string): Promise<UserDto> {
  //   const obj = await this.save(this.prepareUserRegisterFromSocial(email)) as UserDto;
  //   if (obj == null) return null;
  //   const setDefaultRole = await this.userRoleService.setDefaultRole(obj.id);
  //   if (setDefaultRole == null) return null;
  //   return obj;
  // }

  async createUserForSocial(email: string): Promise<any> {
    const obj = await this.save(this.prepareUserRegisterFromSocial(email)) as any;
    if (obj == null) return null;
    const setDefaultRole = await this.userRoleService.setDefaultRole(obj.id);
    if (setDefaultRole == null) return null;
    return obj;
  }

  // async getUserFullName(id: string): Promise<string> {

  //   const obj = await this.userSettingsService.getByField('iduser', id) as UserSettingsDto;
  //   if (obj == null) return '';
  //   const fullName = obj.name + ' ' + obj.surname;
  //   return fullName;
  // }

  async getUserFullName(id: string): Promise<string> {

    const obj = await this.userSettingsService.getByField('iduser', id) as any;
    if (obj == null) return '';
    const fullName = obj.name + ' ' + obj.surname;
    return fullName;
  }


  // async registerUser(obj: RegisterUserFirstStepDto): Promise<ResultSignInDTO> {
  //   let rez = this.singUp_PrepareInitResult();

  //   const checkUser = await this.getByField('email', obj.email);
  //   if (checkUser != null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_FOUND_IN_SYSTEM,
  //     );
  //     return rez;
  //   }
  //   const userObjectToAdd = this.prepareUserRegister(obj.email, obj.password);
  //   const user = await this.save(userObjectToAdd) as UserDto;
  //   if (user == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_ADD_ERROR,
  //     );
  //     return rez;
  //   }

  //   const userSettings = new UserSettingsDto();
  //   userSettings.iduser = user.id;
  //   if (obj.hasOwnProperty('name') && obj.name) userSettings.name = obj.name;
  //   if (obj.hasOwnProperty('surname') && obj.surname) userSettings.surname = obj.surname;
  //   if (obj.hasOwnProperty('birthday')) userSettings.birthday = obj.birthday;
  //   if (obj.hasOwnProperty('idlanguage') && obj.idlanguage) userSettings.idlanguage = obj.idlanguage;
  //   const userSettingsObj = await this.userSettingsService.save(userSettings) as UserSettingsDto;
  //   if (userSettingsObj == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_SETTINGS_ADD_ERROR,
  //     );
  //     return rez;
  //   }

  //   const setDefaultRole = await this.userRoleService.setDefaultRole(user.id);
  //   if (setDefaultRole == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_DEFAULT_ROLE_ERROR,
  //     );
  //     return rez;
  //   }

  //   const studentToAdd = new StudentDto();
  //   studentToAdd.iduser = user.id;
  //   studentToAdd.status = Status.ACTIVE;
  //   if (obj.hasOwnProperty('notificationtype1')) studentToAdd.notificationtype1 = obj.notificationtype1;
  //   const student = await this.studentService.save(studentToAdd);
  //   if (student == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_ALREADY_STUDENT,
  //     );
  //     return rez;
  //   }

  //   const phoneToAdd = new PhoneDto();
  //   if (obj.hasOwnProperty('idtypephone') &&
  //     obj.hasOwnProperty('phonenumber') &&
  //     obj.hasOwnProperty('countrycode')) {
  //     phoneToAdd.idtypephone = obj.idtypephone;
  //     phoneToAdd.countrycode = obj.countrycode;
  //     phoneToAdd.phonenumber = obj.phonenumber;
  //     phoneToAdd.status = Status.INACTIVE;
  //     phoneToAdd.iduser = user.id;
  //     if (phoneToAdd.idtypephone &&
  //       phoneToAdd.countrycode &&
  //       phoneToAdd.phonenumber) await this.phoneService.save(phoneToAdd);
  //   }

  //   rez.roles = await this.userRoleService.getUserRoles(user.id);
  //   rez.usersettings = userSettingsObj;
  //   rez.obj = user;

  //   rez = this.authService.singIn_Processmustchangepassword(rez);
  //   rez = await this.authService.singIn_processAccessToken(rez);
  //   return rez;
  // }


  // async registerTeacher(obj: BecomeTeacherDto): Promise<ResultSignInDTO> {
  //   let rez = this.singUp_PrepareInitResult();

  //   const checkUser = await this.teacherService.getByField('iduser', obj.iduser);
  //   if (checkUser != null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_ALREADY_TEACHER,
  //     );
  //     return rez;
  //   }

  //   obj.status = Status.TEACHER_UNVERIFIED;
  //   const teacher = await this.teacherService.save(obj) as TeacherDto;
  //   if (teacher == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.OBJECT_WRONG_BODY,
  //     );
  //     return rez;
  //   }


  //   const setDefaultRole = await this.userRoleService.setTeacherRole(teacher.iduser);
  //   if (setDefaultRole == null) {
  //     rez.err = true;
  //     rez.messages = MessageTypes.processMessage(
  //       MessageTypes.USER_DEFAULT_ROLE_ERROR,
  //     );
  //     return rez;
  //   }


  //   rez.roles = await this.userRoleService.getUserRoles(teacher.iduser);
  //   rez.usersettings = await this.userSettingsService.getUserSettingsByIdUser(teacher.iduser);
  //   rez.obj = await this.getById(teacher.iduser) as UserDto;

  //   rez = this.authService.singIn_Processmustchangepassword(rez);
  //   rez = await this.authService.singIn_processAccessToken(rez);
  //   return rez;
  // }

}
