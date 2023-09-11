import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CountryValue } from '../schemas/countryvalue.schema';
import { ConfigService } from '@nestjs/config';
import { GeneralNomenclatureValueRepository } from './generalnomenclaturevalue.repostory';
import { LanguageRepository } from 'src/language/repositories/language.repository';
@Injectable()
export class CountryValueRepository extends GeneralNomenclatureValueRepository<LanguageRepository> {
  constructor(
    @InjectModel('CountryValue')
    private readonly model: Model<CountryValue>,
    @Inject(forwardRef(() => LanguageRepository))
    protected readonly repository: LanguageRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
    
  ) {
    super(repository);
    this.setModel(model);
    this.setMainPart('CountryValue');
    this.setConfigService(this.configService);
  }

  
}
