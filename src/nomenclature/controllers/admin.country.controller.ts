import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseInterceptors,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

import { TypeGenderService } from '../services/typegender.service';

import { TypeGenderValueService } from '../services/typegendervalue.service';
import { GeneralNomenclatureController } from './generalnomenclature.controller';
import { CountryService } from '../services/country.service';
import { CountryValueService } from '../services/countryvalue.service';

@ApiTags('admin/nomenclature/country')
@Controller('admin/nomenclature/country')
export class AdminCountryController extends GeneralNomenclatureController {

  constructor(
    private typeService: CountryService,
    private typeValueService: CountryValueService
  ) {
    super();
  }

  protected getTypeService() {
    return this.typeService;
  }

  protected getTypeValueService() {
    return this.typeValueService;
  }
  protected getTypeObjectPopulate() {
    return 'typeobject';
  }
  // req.requestList.populate.addToPopulates(['values', 'allvalues']);
}