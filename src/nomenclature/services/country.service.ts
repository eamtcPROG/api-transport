import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CountryRepository } from '../repositories/country.repository';

import { CountryValueService } from './countryvalue.service';

import { GeneralNomenclatureService } from './generalnomenclature.service';
@Injectable()
export class CountryService extends GeneralNomenclatureService<CountryRepository, CountryValueService>{
    constructor(
        private readonly typeRepository: CountryRepository,
        protected readonly configService: ConfigService,
        @Inject(forwardRef(() => CountryValueService))
        private readonly typeValueService: CountryValueService,
    ) {
        super(typeRepository,typeValueService);
        
    }

}