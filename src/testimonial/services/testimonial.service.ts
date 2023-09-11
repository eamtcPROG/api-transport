import { Inject, Injectable, forwardRef, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestimonialRepository } from '../repositories/testimonial.repository';
import { TestimonialDto } from '../dto/testimonial.dto';
import { Testimonial } from '../schemas/testimonial.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { PostTestimonialDto } from '../dto/posttestimonial.dto';
import { ToolsDate } from 'src/app/tools/tooldate';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { Status } from 'src/app/tools/status';




@Injectable()
export class TestimonialService
    extends GeneralService<TestimonialRepository, null>
    implements IService {
    constructor(
        private readonly testimonialRepository: TestimonialRepository,
        protected readonly configService: ConfigService,
    ) {
        super(testimonialRepository);
    }

    getKeys(): any[] {
        const rez = [];

        return rez;
    }

    toDto(obj: any): Idto {
        const rez = new TestimonialDto();

        rez.id = this.testimonialRepository.getParsedIdStr(obj._id);
        if (obj.hasOwnProperty('iduser') && obj.iduser) rez.iduser = this.testimonialRepository.getParsedIdStr(obj.iduser);
        if (obj.hasOwnProperty('idteacher') && obj.idteacher) rez.idteacher = this.testimonialRepository.getParsedIdStr(obj.idteacher);
        if (obj.hasOwnProperty('idcourse') && obj.idcourse) rez.idcourse = this.testimonialRepository.getParsedIdStr(obj.idcourse);
        if (obj.hasOwnProperty('date')) rez.date = obj.date;
        if (obj.hasOwnProperty('message')) rez.message = obj.message;
        if (obj.hasOwnProperty('rating')) rez.rating = obj.rating;
        if (obj.hasOwnProperty('status')) rez.status = obj.status;
        if (obj.hasOwnProperty('date')) rez.date = obj.date;

        if (obj.hasOwnProperty('user') && obj.user) {
            rez.user = obj.user;
            if (obj.user.hasOwnProperty('email')) rez.user_email = obj.user.email;
            if (obj.user.hasOwnProperty('usersettings')) {
              if (obj.user.usersettings.length > 0) {
                rez.usersettings = obj.user.usersettings[0];
                if (obj.user.usersettings[0].hasOwnProperty('name')) rez.user_name = obj.user.usersettings[0].name;
                if (obj.user.usersettings[0].hasOwnProperty('surname')) rez.user_surname = obj.user.usersettings[0].surname;
              }
            }
      
          }
          if (obj.hasOwnProperty('teacher')) {
            rez.teacher = obj.teacher;
            if (obj.teacher.hasOwnProperty('user')) {
              if (obj.teacher.user.hasOwnProperty('email')) rez.teacher_email = obj.teacher.user.email;
              if (obj.teacher.user.hasOwnProperty('usersettings')) {
                if (obj.teacher.user.usersettings[0].hasOwnProperty('name') && obj.teacher.user.usersettings[0].hasOwnProperty('surname')) {
                  rez.teacher_fullname = obj.teacher.user.usersettings[0].name + ' ' + obj.teacher.user.usersettings[0].surname;
      
                }
              }
            }
      
          }
        if (obj.hasOwnProperty('course') && obj.course) rez.course = obj.course;

        return rez;
    }

    async parseForSave(postObj: any): Promise<Idto> {
        const obj: TestimonialDto = new TestimonialDto();
        if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
        if (postObj.hasOwnProperty('iduser') && postObj.iduser) obj.iduser = postObj.iduser;
        if (postObj.hasOwnProperty('idteacher') && postObj.idteacher) obj.idteacher = postObj.idteacher;
        if (postObj.hasOwnProperty('idcourse') && postObj.idcourse) obj.idcourse = postObj.idcourse;
        if (postObj.hasOwnProperty('message')) obj.message = postObj.message;
        if (postObj.hasOwnProperty('rating')) obj.rating = postObj.rating;
        if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
        else obj.status = Status.ACTIVE;
        obj.date = ToolsDate.getTimeStamp();

        return obj;
    }


}