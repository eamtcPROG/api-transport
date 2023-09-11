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
    Query,
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
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { CommonTools } from 'src/app/tools/commontools';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';

import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { AddNomenclatureDto } from '../dto/addnomenclature.dto';
import { ResultTypeDto } from '../dto/resulttype.dto';
import { TypePopulateDto } from '../dto/typepopulate.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';


@UseGuards(GeneralAdminGuard)
export abstract class MainGeneralNomenclatureController {

    protected abstract getTypeService(): any;
    protected abstract getTypeValueService(): any;
    protected abstract getTypeObjectPopulate(): string;


    @ApiOperation({ summary: 'Get list' })
    @ApiOkResponse({
        type: ResultListDTO,
        description: 'Result List in type: ResultListDTO',
    })
    @ApiQuery({
        name: 'page',
        type: 'integer',
        description: 'Page number, default: 1',
        required: false,
    })
    @ApiQuery({
        name: 'onpage',
        type: 'integer',
        description: 'Elements on page',
        required: false,
    })
    @ApiQuery({
        name: 'filters',
        type: 'string',
        description: 'Filters',
        required: false,
    })
    @ApiQuery({
        name: 'order',
        type: 'string',
        description: 'Field for ordering',
        required: false,
    })
    @Get('/')
    @UseInterceptors(ParseParamsList)
    public async getList(
        @Res() res,
        @Param() params,
        @Req() req,
    ): Promise<ResultListDTO> {
        req.requestList.populate = req.requestList.populate ?? new RequestPopulateDTO();
        req.requestList.populate.populates = req.requestList.populate.populates ?? [];

        req.requestList.populate.populates.push('typeobject', 'values','media');
        const obj = await this.getTypeService().getAll(req.requestList);

        // const obj = await this.getTypeValueService().getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.getTypeService().getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get by ID' })
    @ApiParam({ name: 'id', description: 'Type id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: TypePopulateDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Object not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params, @Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {

        let obj = null;
        if (idlanguage == undefined) obj = await this.getTypeService().getById(params.id, CommonTools.populateObject(['typeobject', 'values', 'idlanguage','media']));
        else obj = await this.getTypeService().getById(params.id, CommonTools.populateObject(['typeobject', 'values', 'idlanguage','media']), idlanguage);
        // const obj = await this.getTypeValueService().findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }



 
}
