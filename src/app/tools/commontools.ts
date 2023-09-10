import { Headers } from '@nestjs/common';
import RequestListDTO from '../dto/requestlist.dto';
import ResultDeleteDTO from '../dto/resultdelete.dto';
import ResultAddDTO from '../dto/resultadd.dto';
import * as crypto from 'crypto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';

export class CommonTools {
  public static headers: Record<string, string>;
  public static setHeaders(headers: Record<string, string>): void {
    CommonTools.headers = headers;
  }
  public static getHeader(key: string): string {

    if (CommonTools.headers.hasOwnProperty(key))
      return CommonTools.headers[key];

    return CommonTools.headers[key.toLowerCase()] || null;
  }

  public static setTotalPages(
    data?: RequestListDTO,
    totalObjects?: number,
  ): number {
    const onpage = data?.onpage ?? 0;
    let total = totalObjects ?? 0;
    total = onpage ? Math.ceil(total / onpage) : 1;
    return total;
  }

  public static toDeleteResult(value: boolean): ResultDeleteDTO {
    const result = new ResultDeleteDTO();
    result.deleted = value;
    return result;
  }
  public static toAddResult(value: boolean): ResultAddDTO {
    const result = new ResultAddDTO();
    result.added = value;
    return result;
  }

  public static prepareFullUrlgetId(obj: any): string {
    return obj.hasOwnProperty('_id') ? obj._id.toString() : '';
  }

  public static prepareFullUrlgetValueField(obj: any, field: string): string {
    if(obj.hasOwnProperty(field) && obj[field]) return obj[field].toString();

    if (!obj.hasOwnProperty('_values')) return '';
    if (!obj._values.hasOwnProperty(field)) return '';

    return obj._values[field].toString();
  }

  public static stripTags(input: string): string {
    return input.replace(/<\/?[^>]+(>|$)/g, '');
  }

  public static prepareFullUrlClearText(text: string): string {
    text = CommonTools.stripTags(text);
    text = text.toLowerCase();

    const r1 = /[^a-z0-9_\s\/]/g;
    text = text.replace(r1, ' ');

    const r2 = /\s+/g;
    text = text.replace(r2, ' ');
    
    text = text.trim();
    
    const r3 = /\s/g;
    text = text.replace(r3, '-');
    
    const r4 = /\/\//g;
    text = text.replace(r4, '/');

    return text;
  }

  public static prepareFullUrl(
    obj: any,
    mainPath: string,
    nameField?: string,
  ): object {
    nameField = nameField != undefined ? nameField : 'name';
    const _id = CommonTools.prepareFullUrlgetId(obj);
    const _url = CommonTools.prepareFullUrlgetValueField(obj, 'url');
    const _name = CommonTools.prepareFullUrlgetValueField(obj, nameField);

    if (_url != '') {
      obj.fullurl = `/${_url}`;
    } else {
      obj.fullurl = `/${mainPath}/${_id}`;
      if (_name != '') obj.fullurl += `/${_name}`;
    }

    obj.fullurl = CommonTools.prepareFullUrlClearText(obj.fullurl);

    return obj;
  }

  
  public static generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
  public static generateRandomDigitString(length: number): string {
    const digits = '0123456789';
    const digitsLength = digits.length;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digitsLength));
    }

    return result;
  }
  public static generateMD5Hash(input: string): string {
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
  }

  public static generateMD5HashFromRandomDigitString(length: number): string {
    return CommonTools.generateMD5Hash(
      CommonTools.generateRandomDigitString(length),
    );
  }

  public static generateRandomStringWithMD5Hash(length: number): any {
    const randomString = CommonTools.generateRandomDigitString(length);
    const hash = CommonTools.generateMD5Hash(randomString);
    const obj = {
      randomString: randomString,
      hash: hash,
    };
    return obj;
  }

  public static isHashMatching(
    plainText: string,
    hashToCompare: string,
  ): boolean {
    const md5Hash = CommonTools.generateMD5Hash(plainText);
    return md5Hash === hashToCompare;
  }

  private nameFromToStringRegexFunction = /^function\s?([^\s(]*)/;

  public functionName(object: any, defaultName: string): string {
    let result = '';

    if (typeof object === 'function') {
      result =
        object.name ||
        object.toString().match(this.nameFromToStringRegexFunction)[1];
    } else if (typeof object.constructor === 'function') {
      result = this.functionName(object.constructor, defaultName);
    }
    return result || defaultName;
  }

  public arrayIntersect(arr1: any[], arr2: any[]): any[] {
    const rez = [];

    for (const i of arr1) {
      if (arr2.indexOf(arr1[i]) == -1) continue;
      rez[rez.length] = arr1[i];
    }

    return rez;
  }

  public static incrementLastCharacter(str: string): string {
    str = str.slice(-4);
    const lastChar = str.slice(-1);
    const restOfString = str.slice(0, -1);

    if (lastChar === 'Z') {
      return this.incrementLastCharacter(restOfString) + 'A';
    } else {
      const incrementedChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
      return restOfString + incrementedChar;
    }
  }
  public static populateObject(
    customPopulate?: Array<string>,
  ): RequestPopulateDTO {
    const populateArray = customPopulate ?? ['values', 'idlanguage','media'];
    const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
    requestPopulateDTO.populates = populateArray;
    return requestPopulateDTO;
  }

  public static rtrimSymbolWithRegex(originalString: string, symbolToRemove: string): string {
    const regex = new RegExp(`${symbolToRemove}$`);
    return originalString.replace(regex, '');
  }
}
