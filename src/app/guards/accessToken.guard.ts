import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import ResultErrorDTO from 'src/app/dto/resulterror.dto';
import { MessageTypes } from 'src/app/tools/messagetypes';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
      if (err || !user) {
          const r = new ResultErrorDTO();
          r.err = true;
          r.messages = MessageTypes.processMessage(MessageTypes.JWT_REQUIRED);
      throw err || new UnauthorizedException(r);
    }
    return user;
  }
  
}
