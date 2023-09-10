import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Res,
    Post,
    Body,
    UseInterceptors,
    UseGuards
} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
    ApiBody,
    ApiConsumes,
} from '@nestjs/swagger';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
// import { UserDto } from 'src/user/dto/user.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
// import { ResetPasswordCodeDto } from 'src/user/dto/resetpasswordcode.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { UserService } from 'src/user/services/user.service';
// import { ResetPasswordDto } from '../dto/resetpassword.dto';
// import { ModifyPasswordDto } from '../dto/modifypassword.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';

@ApiTags('user')
@Controller('user')
@UseGuards(GeneralAdminGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Generate code for changing the password' })
    @ApiConsumes('application/json')
    // @ApiBody({ type: ResetPasswordCodeDto })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'User not found',
    })
    @Post('/password-reset-code')
    // @UseInterceptors(new PrepareObjectBody(ResetPasswordCodeDto))
    public async postResetCode(@Res() res, @Body() body): Promise<ResultObjectDTO> {
        
        const obj = await this.userService.resetCode(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.USER_NOT_FOUND,
            );
        }

        return ToolsGenerateResponse.getOk(res, obj);
    }

    @ApiOperation({ summary: 'Reset password' })
    @ApiConsumes('application/json')
    // @ApiBody({ type: ResetPasswordDto })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'User not found',
    })
    @Post('/reset-password')
    // @UseInterceptors(new PrepareObjectBody(ResetPasswordDto))
    public async resetPassword(@Res() res, @Body() body): Promise<ResultObjectDTO> {
        
        const obj = await this.userService.resetPassword(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.USER_NOT_FOUND,
            );
        }

        if (obj.err) {
            return await ToolsGenerateResponse.getErr(res, HttpStatus.CONFLICT, obj);
        }

        return ToolsGenerateResponse.getOk(res, obj);
    }

    @ApiOperation({ summary: 'Modify password' })
    @ApiConsumes('application/json')
    // @ApiBody({ type: ModifyPasswordDto })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'User not found',
    })
    @Post('/modify-password')
    // @UseInterceptors(new PrepareObjectBody(ModifyPasswordDto))
    public async modifytPassword(@Res() res, @Body() body): Promise<ResultObjectDTO> {
        
        const obj = await this.userService.modifyPassword(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.USER_NOT_FOUND,
            );
        }

        if (obj.err) {
            return await ToolsGenerateResponse.getErr(res, HttpStatus.CONFLICT, obj);
        }

        return ToolsGenerateResponse.getOk(res, obj);
    }
}
