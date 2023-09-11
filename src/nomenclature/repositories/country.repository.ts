import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Country } from '../schemas/country.schema';

import { GeneralNomenclatureRepository } from './generalnomenclature.repository';
import { CountryValueRepository } from './countryvalue.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import Ischema from 'src/app/interfaces/ischema.interface';
import { ConfigService } from '@nestjs/config';
import { MediaService } from 'src/app/services/media.service';

@Injectable()
export class CountryRepository extends GeneralNomenclatureRepository<CountryValueRepository> {
  constructor(
    @InjectModel('Country')
    private readonly model: Model<Country>,
    @Inject(forwardRef(() => CountryValueRepository))
    protected readonly repository: CountryValueRepository,
    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
    protected readonly mediaService: MediaService,
  ) {
    super(repository,configService,mediaService);
    this.setModel(model);
    this.setMainPart('Country');
    this.setConfigService(this.configService);
  }

  
}