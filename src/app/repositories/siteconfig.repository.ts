import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { SiteConfig } from '../schemas/siteconfig.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import Ischema from 'src/app/interfaces/ischema.interface';

import { CommonTools } from 'src/app/tools/commontools';




@Injectable()
export class SiteConfigRepository extends GeneralRepository implements IRepository {
    constructor(
        @InjectModel('SiteConfig')
        private readonly siteConfigModel: Model<SiteConfig>,

        @Inject(forwardRef(() => ConfigService))
        protected readonly configService: ConfigService,

    ) {
        super();
        this.setModel(siteConfigModel);
        this.setMainPart('SiteConfig');
        this.setConfigService(this.configService);
    }

    async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {

        return obj;
    }

    // processAgregateForList(
    //     _model: Model<Ischema>,
    //     options: object,
    //     info?: RequestListDTO,
    //     forCount?: boolean,
    // ): any {

    //     const tAgregate = this.processAgregateForListValues(
    //         info
    //     );


    //     tAgregate.push({
    //         $match: options,
    //     });

    //     if (forCount) {
    //         tAgregate.push({
    //             $count: 'total',
    //         });
    //     }

    //     return _model.aggregate(tAgregate);
    // }

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
                        const re = new RegExp(value, 'i');
                        tOr.push({ identifier: re });
                    }
                }
                if (tOr.length) {
                    tAnd.push({ $or: tOr });
                }
            }
          
            if (filter.field == 'identifier') {
                const tOr = [];
                const values = filter.values;
                if (Array.isArray(values)) {
                    for (const value of values) {
                        tOr.push({ identifier: value });
                    }
                }
                if (tOr.length) {
                    tAnd.push({ $or: tOr });
                }
            }
            if (filter.field == 'value') {
                const tOr = [];
                const values = filter.values;
                if (Array.isArray(values)) {
                    for (const value of values) {
                        tOr.push({ value: value });
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

    async findOneSortBy(input: string): Promise<any> {
        return await this.siteConfigModel.findOne().sort(input).exec();
      }
}
