import { HttpStatus, Res } from '@nestjs/common';
import ResultObjectDTO from '../dto/resultobject.dto';
import Idto from '../interfaces/idto.interface';
import { MessageDto } from '../dto/message.dto';

export class MessageTypes {
  public static MESSAGE_SUCCESS = 1;
  public static MESSAGE_WARNING = 2;
  public static MESSAGE_ERROR = 3;
  public static MESSAGE_VALIDATION = 4;
  
  public static OBJECT_DELETE_SUCCESS = 201;

  public static RESET_CODE_SUCCESS = 202;
  public static RESET_PASSWORD_SUCCESS = 203;
  public static ACTION_SUCCESS = 204;

  public static OBJECT_NOT_FOUND = 1000;
  public static OBJECT_FOUND = 1002;
  public static JWT_REQUIRED = 1001;
  public static OBJECT_PARENT_NOT_FOUND = 1003;
  public static OBJECT_WRONG_BODY = 1004;
  public static ROLE_FIXED = 1005;


  public static USER_NOT_FOUND = 2000;
  public static USER_NOT_ACTIVE = 2001;
  public static USER_PASSWORD_NOTCORRECT = 2002;
  public static USER_FOUND_IN_SYSTEM = 2003;

  public static USER_NOT_UPDATE = 2004;
  public static USER_SOCIAL_ERROR = 2005;
  public static USER_DEFAULT_ROLE_ERROR = 2006;
  public static USER_WRONG_HASH = 2007;
  public static USER_ALREADY_TEACHER = 2008;

  public static OBJECT_ALREADY_IN_DATABASE = 2009;

  public static USER_ALREADY_STUDENT = 2010;

  public static USER_ADD_ERROR = 2011;
  public static USER_SETTINGS_ADD_ERROR = 2012;
  

  public static MESSAGES = {
    201: {
      code: 201,
      type: MessageTypes.MESSAGE_SUCCESS,
      label: 'Object deleted with success',
    },
    202: {
      code: 202,
      type: MessageTypes.MESSAGE_SUCCESS,
      label: 'Reset code sent',
    },
    203: {
      code: 203,
      type: MessageTypes.MESSAGE_SUCCESS,
      label: 'The password was changed',
    },
    204: {
      code: 204,
      type: MessageTypes.MESSAGE_SUCCESS,
      label: 'Action success',
    },
    1000: {
      code: 1000,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Object not found',
    },
    1001: {
      code: 1001,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'JWT required',
    },
    1002: {
      code: 1002,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Object already in database',
    },
    1003: {
      code: 1003,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Parent object not found in database',
    },
    1004: {
      code: 1004,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Wrong body structure',
    },
    1005: {
      code: 1005,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Role can not be deleted because is fixed',
    },
    2000: {
      code: 2000,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User not found',
    },
    2001: {
      code: 2001,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User not active',
    },
    2002: {
      code: 2002,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User password incorrect',
    },
    2003: {
      code: 2003,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User was found in system',
    },
    2004: {
      code: 2004,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User was not updated',
    },
    2005: {
      code: 2005,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User social error object',
    },
    2006: {
      code: 2006,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User role error occurred when trying to add the object',
    },
    2007: {
      code: 2007,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User hash did not match',
    },
    2008: {
      code: 2008,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User is already a teacher',
    },
    2009: {
      code: 2009,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Object is already in database',
    },
    2010: {
      code: 2010,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User is already a student',
    },
    2011: {
      code: 2011,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User add to database error',
    },
    2012: {
      code: 2012,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'User settings add to database error',
    },
  };

  public static processMessage(
    keys: number | number[],
  ): MessageDto[] {
    const rez: MessageDto[] = [];

    if (Array.isArray(keys)) {
      for (const item of keys) {
        const t = MessageTypes.processMessageItem(item);
        if (t != null) rez[rez.length] = t;
      }
    } else {
      const t = MessageTypes.processMessageItem(keys);
      if (t != null) rez[rez.length] = t;
    }

    return rez;
  }

  public static processMessageItem(
    key: number,
  ): MessageDto {
    if (MessageTypes.MESSAGES[key] == undefined) return null;

    const item = MessageTypes.MESSAGES[key];

    const rez = new MessageDto();
    rez.code = item.code;
    // temporar
    rez.message = item.label;
    rez.mestype = item.type;

    return rez;
  }
}
