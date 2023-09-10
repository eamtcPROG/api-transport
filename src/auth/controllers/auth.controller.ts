import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { SignInDto } from '../dto/signin.dto';
import ResultSignInDTO from '../dto/resultsignin.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { AuthService } from '../services/auth.service';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { AccessTokenGuard } from 'src/app/guards/accessToken.guard';
import { UseGuards } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { UserService } from 'src/user/services/user.service';
import { SocialSignInDto } from '../dto/socialsignin.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { SignInHashDto } from '../dto/signinhash.dto';
import { AuthGuard } from '@nestjs/passport';
// import { RegisterUserFirstStepDto } from 'src/user/dto/registeruserfirststep.dto';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
import { MessageTypes } from 'src/app/tools/messagetypes';
// import { BecomeTeacherDto } from 'src/user/dto/becometeacher.dto';

@ApiTags('auth')
@Controller('auth')
@UseGuards(GeneralAdminGuard)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @UseGuards(AccessTokenGuard)
  @Get('/test')
  public async test(@Res() res, @Param() params, @Req() req) {
    const p = req.query.p != undefined ? req.query.p : '';
    let h = await this.authService.getEncryptedPass(p);
    // console.log(h);
    return res.status(HttpStatus.OK).json({ p: p, h: h });
  }

  @ApiOperation({ summary: 'Refresh JWT' })
  @ApiOkResponse({
    type: ResultSignInDTO,
    description: 'Return user information',
  })
  @UseGuards(AccessTokenGuard)
  @Get('/refresh')
  public async refresh(
    @Res() res,
    @Headers() headers: Record<string, string>,
  ): Promise<ResultSignInDTO | null> {
    const rez = await this.authService.refreshToken(headers.authorization);

    if (rez.err) {
      return ToolsGenerateResponse.getErr(res, HttpStatus.NOT_FOUND, rez);
    }

    return ToolsGenerateResponse.getOk(res, rez);
  }

  @ApiOperation({ summary: 'Sign in user by Identifier and Password' })
  @ApiConsumes('application/json')
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    type: ResultSignInDTO,
    description: 'Return user information',
  })
  @Post('/signin')
  @UseInterceptors(new PrepareObjectBody(SignInDto))
  public async signin(
    @Body() body,
    @Res() res,
  ): Promise<ResultSignInDTO | null> {
    const rez = await this.authService.singIn(body);

    if (rez.err) {
      return ToolsGenerateResponse.getErr(res, HttpStatus.NOT_FOUND, rez);
    }

    return ToolsGenerateResponse.getOk(res, rez);
  }

  @ApiOperation({ summary: 'Sign in user by id and hash' })
  @ApiConsumes('application/json')
  @ApiBody({ type: SignInHashDto })
  @ApiOkResponse({
    type: ResultSignInDTO,
    description: 'Return user information',
  })
  @Post('/signin-hash')
  @UseInterceptors(new PrepareObjectBody(SignInHashDto))
  public async signInHash(
    @Body() body,
    @Res() res,
  ): Promise<ResultSignInDTO | null> {
    const rez = await this.authService.singInHash(body);

    if (rez.err) {
      return ToolsGenerateResponse.getErr(res, HttpStatus.NOT_FOUND, rez);
    }

    return ToolsGenerateResponse.getOk(res, rez);
  }

  @ApiOperation({ summary: 'Sign in user using socials' })
  @ApiConsumes('application/json')
  @ApiBody({ type: SocialSignInDto })
  @ApiOkResponse({
    type: ResultSignInDTO,
    description: 'Return user information',
  })
  @Post('/signin-social')
  @UseInterceptors(new PrepareObjectBody(SocialSignInDto))
  public async signInSocial(
    @Body() body,
    @Res() res,
  ): Promise<ResultSignInDTO | null> {
    const rez = await this.authService.signInSocial(body);

    if (rez.err) {
      return ToolsGenerateResponse.getErr(res, HttpStatus.NOT_FOUND, rez);
    }

    return ToolsGenerateResponse.getOk(res, rez);
  }

  @ApiOperation({ summary: 'Sign up user in system' })
  @ApiConsumes('application/json')
  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({
    type: ResultSignInDTO,
    description: 'Return user information',
  })
  @Post('/signup')
  @UseInterceptors(new PrepareObjectBody(SignUpDto))
  public async signup(
    @Body() body,
    @Res() res,
  ): Promise<ResultSignInDTO | null> {
    const rez = await this.userService.singUp(body);

    if (rez.err) {
      return ToolsGenerateResponse.getErr(res, HttpStatus.CONFLICT, rez);
    }

    return ToolsGenerateResponse.getOk(res, rez);
  }

  // @ApiOperation({ summary: 'Register user first step' })
  // @ApiConsumes('application/json')
  // @ApiBody({ type: RegisterUserFirstStepDto })
  // @ApiOkResponse({
  //   type: ResultSignInDTO,
  //   description: 'Return user information',
  // })
  // @Post('/register')
  // @UseInterceptors(new PrepareObjectBody(RegisterUserFirstStepDto))
  // public async registerUser(
  //   @Body() body,
  //   @Res() res,
  // ): Promise<ResultSignInDTO | null> {
  //   const rez = await this.userService.registerUser(body);

  //   if (rez.err) {
  //     return ToolsGenerateResponse.getErr(res, HttpStatus.NOT_FOUND, rez);
  //   }

  //   return ToolsGenerateResponse.getOk(res, rez);
  // }

  // @ApiOperation({ summary: 'Register user teacher' })
  // @ApiConsumes('application/json')
  // @ApiBody({ type: BecomeTeacherDto })
  // @ApiOkResponse({
  //   type: ResultSignInDTO,
  //   description: 'Return user information',
  // })
  // @Post('/register/teacher')
  // @UseInterceptors(new PrepareObjectBody(BecomeTeacherDto))
  // public async registerTeacher(
  //   @Body() body,
  //   @Res() res,
  // ): Promise<ResultSignInDTO | null> {
  //   const rez = await this.userService.registerTeacher(body);

  //   if (rez.err) {
  //     return ToolsGenerateResponse.getErr(res, HttpStatus.NOT_FOUND, rez);
  //   }

  //   return ToolsGenerateResponse.getOk(res, rez);
  // }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    console.log("googleAuthRedirectgoogleAuthRedirectgoogleAuthRedirect", req);
    // Handle the redirection after Google authentication
    // const user = req.user; // User information from GoogleStrategy validate function
    // Implement your logic to create or update the user in your system
  }
}
