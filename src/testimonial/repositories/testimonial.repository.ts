import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { Testimonial } from '../schemas/testimonial.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import { CourseRepository } from 'src/course/repositories/course.repository';
import { TeacherRepository } from 'src/teacher/repositories/teacher.repository';
import { UserRepository } from 'src/user/repositories/user.repository';


@Injectable()
export class TestimonialRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('Testimonial')
    private readonly testimonialModel: Model<Testimonial>,
    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,

    private readonly userRepository: UserRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly courseRepository: CourseRepository,
    
  ) {
    super();
    this.setModel(testimonialModel);
    this.setMainPart('Testimonial');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;
    
    if (populate.populates.includes('iduser') && obj.iduser)
      obj.user = await this.userRepository.findById(obj.iduser, populate);
    
    if (populate.populates.includes('idteacher') && obj.idteacher)
        obj.teacher = await this.teacherRepository.findById(obj.idteacher, populate);

    if (populate.populates.includes('idcourse') && obj.idcourse)
        obj.course = await this.courseRepository.findById(obj.idcourse, populate);
    
    
      return obj;
  }

  processOptionForList(info?: RequestListDTO): object {
    if (info == null) return {};

    if (info.filters == null) return {};
    const rez: any = {};

    const tAnd = [];
    for (const filter of info.filters) {
      if (filter.field == 'search') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            const re = this.getParsedRegExp(value);
            tOr.push({ message: re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'iduser') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ iduser: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'idteacher') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ idteacher: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'idcourse') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ idcourse: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'status') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const v = parseInt(value);
            tOr.push({ status: v });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'rating') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const v = parseInt(value);
            tOr.push({ rating: v });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
    }

    if (tAnd.length) {
      rez.$and = tAnd;
    }

    return rez;
  }
}
