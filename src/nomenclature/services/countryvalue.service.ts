import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CountryValueRepository } from '../repositories/countryvalue.repository';

import { CountryService } from './country.service';

import { GeneralNomenclatureValueService } from './generalnomenclaturevalue.service';
import { LanguageService } from 'src/language/services/language.service';
@Injectable()
export class CountryValueService extends GeneralNomenclatureValueService<CountryValueRepository,CountryService>{
    constructor(
        private readonly typeRepository: CountryValueRepository,
        protected readonly configService: ConfigService,
        protected readonly languageService:LanguageService,
        @Inject(forwardRef(() => CountryService))
        private readonly typeValueService: CountryService,
    ) {
        super(typeRepository,typeValueService,languageService);
     }
}