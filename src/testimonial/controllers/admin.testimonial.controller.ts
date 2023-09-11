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
  import ResultObjectDTO from 'src/app/dto/resultobject.dto';
  import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
  import { MessageTypes } from 'src/app/tools/messagetypes';
  import { TestimonialDto } from '../dto/testimonial.dto';
  import { TestimonialService } from '../services/testimonial.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  import { PostTestimonialDto } from '../dto/posttestimonial.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
  
  @ApiTags('admin/testimonial')
  @Controller('admin/testimonial')
  @UseGuards(GeneralAdminGuard)
  export class AdminTestimonialController {
    constructor(private testimonialService: TestimonialService) {}
  
    @ApiOperation({ summary: 'Add Testimonial' })
    @ApiBody({ type: PostTestimonialDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: TestimonialDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostTestimonialDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.testimonialService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.USER_ALREADY_TEACHER,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Get Testimonial list' })
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
        req.requestList.populate.addToPopulates(['idcourse','iduser','values','idteacher','usersettings']);
      const obj = await this.testimonialService.getAll(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.testimonialService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }
  
    @ApiOperation({ summary: 'Get Testimonial by ID' })
    @ApiParam({ name: 'id', description: 'Testimonial id', required: true })
    @ApiOkResponse({
      type: TestimonialDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Testimonial not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.testimonialService.getById(params.id,CommonTools.populateObject(['idcourse','iduser','values','idteacher','usersettings']))
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Delete Testimonial by ID' })
    @ApiParam({ name: 'id', description: 'Testimonial id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Testimonial not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.testimonialService.delete(params.id);
      if (obj.deleted === false) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getSuccessObject(
        res,
        HttpStatus.OK,
        MessageTypes.OBJECT_DELETE_SUCCESS,
      );
    }
  
    @ApiOperation({ summary: 'Update Testimonial by ID' })
    @ApiParam({ name: 'id', description: 'Testimonial id', required: true })
    @ApiBody({ type: PostTestimonialDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: TestimonialDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Testimonial not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(PostTestimonialDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.testimonialService.save(body,params.id);
  
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
  