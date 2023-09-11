import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from 'src/auth/auth.module';
import AppModule from 'src/app/app.module';
import { CommonTools } from 'src/app/tools/commontools';

import { TypeGenderSchema } from 'src/nomenclature/schemas/typegender.schema'

import { TypeGenderService } from './services/typegender.service';
import { TypeGenderValueService } from './services/typegendervalue.service';
import { TypeGenderRepository } from './repositories/typegender.repository';
import LanguageModule from 'src/language/language.module';
import UserModule from 'src/user/user.module'; 
import { TypeGenderValueSchema } from './schemas/typegendervalue.schema';
import { TypeGenderValueRepository } from './repositories/typegendervalue.repository';
import { AdminTypeGenderController } from './controllers/admin.typegender.controller';

import { TypeSpecialtySchema } from './schemas/typespecialty.schema';
import { TypeSpecialtyValueSchema } from './schemas/typespecialtyvalue.schema';
import { GeneralNomenclatureRepository } from './repositories/generalnomenclature.repository';
import { GeneralNomenclatureValueRepository } from './repositories/generalnomenclaturevalue.repostory';
import { TypeSpecialtyValueRepository } from './repositories/typespecialtyvalue.repository';
import { TypeSpecialtyRepository } from './repositories/typespecialty.repository';
import { TypeSpecialtyValueService } from './services/typespecialtyvalue.service';
import { TypeSpecialtyService } from './services/typespecialty.service';
import { AdminTypeSpecialtyController } from './controllers/admin.typespecialty.controller';


import { TypeExperienceSchema } from './schemas/typeexperience.schema';
import { TypeExperienceValueSchema } from './schemas/typeexperiencevalue.schema';

import { TypeExperienceValueRepository } from './repositories/typeexperiencevalue.repository';
import { TypeExperienceRepository } from './repositories/typeexperience.repository';
import { TypeExperienceValueService } from './services/typeexperiencevalue.service';
import { TypeExperienceService } from './services/typeexperience.service';

import { AdminTypeExperienceController } from './controllers/admin.typeexperience.controller';


import { TypeProfessionalismLevelSchema } from './schemas/typeprofessionalismlevel.schema';
import { TypeProfessionalismLevelValueSchema } from './schemas/typeprofessionalismlevelvalue.schema';

import { TypeProfessionalismLevelValueRepository } from './repositories/typeprofessionalismlevelvalue.repository';
import { TypeProfessionalismLevelRepository } from './repositories/typeprofessionalismlevel.repository';
import { TypeProfessionalismLevelValueService } from './services/typeprofessionalismlevelvalue.service';
import { TypeProfessionalismLevelService } from './services/typeprofessionalismlevel.service';

import { AdminTypeProfessionalismLevelController } from './controllers/admin.typeprofessionalismlevel.controller';


import { TypeStudiesSchema } from './schemas/typestudies.schema';
import { TypeStudiesValueSchema } from './schemas/typestudiesvalue.schema';

import { TypeStudiesValueRepository } from './repositories/typestudiesvalue.repository';
import { TypeStudiesRepository } from './repositories/typestudies.repository';
import { TypeStudiesValueService } from './services/typestudiesvalue.service';
import { TypeStudiesService } from './services/typestudies.service';

import { AdminTypeStudiesController } from './controllers/admin.typestudies.controller';

import { TypeOccupationSchema } from './schemas/typeoccupation.schema';
import { TypeOccupationValueSchema } from './schemas/typeoccupationvalue.schema';

import { TypeOccupationValueRepository } from './repositories/typeoccupationvalue.repository';
import { TypeOccupationRepository } from './repositories/typeoccupation.repository';
import { TypeOccupationValueService } from './services/typeoccupationvalue.service';
import { TypeOccupationService } from './services/typeoccupation.service';

import { AdminTypeOccupationController } from './controllers/admin.typeoccupation.controller';

import { TypeDisciplineSchema } from './schemas/typediscipline.schema';
import { TypeDisciplineValueSchema } from './schemas/typedisciplinevalue.schema';
import { TypeDisciplineValueRepository } from './repositories/typedisciplinevalue.repository';
import { TypeDisciplineRepository } from './repositories/typediscipline.repository';
import { TypeDisciplineValueService } from './services/typedisciplinevalue.service';
import { TypeDisciplineService } from './services/typediscipline.service';

import { AdminTypeDisciplineController } from './controllers/admin.typediscipline.controller';


import { TypeLessonSchema } from './schemas/typelesson.schema';
import { TypeLessonValueSchema } from './schemas/typelessonvalue.schema';
import { TypeLessonValueRepository } from './repositories/typelessonvalue.repository';
import { TypeLessonRepository } from './repositories/typelesson.repository';
import { TypeLessonValueService } from './services/typelessonvalue.service';
import { TypeLessonService } from './services/typelesson.service';

import { AdminTypeLessonController } from './controllers/admin.typelesson.controller';



import { TypeTargetGroupSchema } from './schemas/typetargetgroup.schema';
import { TypeTargetGroupValueSchema } from './schemas/typetargetgroupvalue.schema';
import { TypeTargetGroupValueRepository } from './repositories/typetargetgroupvalue.repository';
import { TypeTargetGroupRepository } from './repositories/typetargetgroup.repository';
import { TypeTargetGroupValueService } from './services/typetargetgroupvalue.service';
import { TypeTargetGroupService } from './services/typetargetgroup.service';

import { AdminTypeTargetGroupController } from './controllers/admin.typetargetgroup.controller';




import { TypeInternetConnectionSchema } from './schemas/typeinternetconnection.schema';
import { TypeInternetConnectionValueSchema } from './schemas/typeinternetconnectionvalue.schema';
import { TypeInternetConnectionValueRepository } from './repositories/typeinternetconnectionvalue.repository';
import { TypeInternetConnectionRepository } from './repositories/typeinternetconnection.repository';
import { TypeInternetConnectionValueService } from './services/typeinternetconnectionvalue.service';
import { TypeInternetConnectionService } from './services/typeinternetconnection.service';

import { AdminTypeInternetConnectionController } from './controllers/admin.typeinternetconnection.controller';


import { TypeHardwareSchema } from './schemas/typehardware.schema';
import { TypeHardwareValueSchema } from './schemas/typehardwarevalue.schema';
import { TypeHardwareValueRepository } from './repositories/typehardwarevalue.repository';
import { TypeHardwareRepository } from './repositories/typehardware.repository';
import { TypeHardwareValueService } from './services/typehardwarevalue.service';
import { TypeHardwareService } from './services/typehardware.service';

import { AdminTypeHardwareController } from './controllers/admin.typehardware.controller';


import { TypeSocialSchema } from './schemas/typesocial.schema';
import { TypeSocialValueSchema } from './schemas/typesocialvalue.schema';
import { TypeSocialValueRepository } from './repositories/typesocialvalue.repository';
import { TypeSocialRepository } from './repositories/typesocial.repository';
import { TypeSocialValueService } from './services/typesocialvalue.service';
import { TypeSocialService } from './services/typesocial.service';

import { AdminTypeSocialController } from './controllers/admin.typesocial.controller';

import { TypePhoneSchema } from './schemas/typephone.schema';
import { TypePhoneValueSchema } from './schemas/typephonevalue.schema';
import { TypePhoneValueRepository } from './repositories/typephonevalue.repository';
import { TypePhoneRepository } from './repositories/typephone.repository';
import { TypePhoneValueService } from './services/typephonevalue.service';
import { TypePhoneService } from './services/typephone.service';

import { AdminTypePhoneController } from './controllers/admin.typephone.controller';

import { TypeAgreementSchema } from './schemas/typeagreement.schema';
import { TypeAgreementValueSchema } from './schemas/typeagreementvalue.schema';
import { TypeAgreementValueRepository } from './repositories/typeagreementvalue.repository';
import { TypeAgreementRepository } from './repositories/typeagreement.repository';
import { TypeAgreementValueService } from './services/typeagreementvalue.service';
import { TypeAgreementService } from './services/typeagreement.service';

import { AdminTypeAgreementController } from './controllers/admin.typeagreement.controller';

import { CountrySchema } from './schemas/country.schema';
import { CountryValueSchema } from './schemas/countryvalue.schema';
import { CountryValueRepository } from './repositories/countryvalue.repository';
import { CountryRepository } from './repositories/country.repository';
import { CountryValueService } from './services/countryvalue.service';
import { CountryService } from './services/country.service';

import { AdminCountryController } from './controllers/admin.country.controller';


import { TypeLocalitySchema } from './schemas/typelocality.schema';
import { TypeLocalityValueSchema } from './schemas/typelocalityvalue.schema';
import { TypeLocalityValueRepository } from './repositories/typelocalityvalue.repository';
import { TypeLocalityRepository } from './repositories/typelocality.repository';
import { TypeLocalityValueService } from './services/typelocalityvalue.service';
import { TypeLocalityService } from './services/typelocality.service';

import { AdminTypeLocalityController } from './controllers/admin.typelocality.controller';


import { TypeBlogCategorySchema } from './schemas/typeblogcategory.schema';
import { TypeBlogCategoryValueSchema } from './schemas/typeblogcategoryvalue.schema';
import { TypeBlogCategoryValueRepository } from './repositories/typeblogcategoryvalue.repository';
import { TypeBlogCategoryRepository } from './repositories/typeblogcategory.repository';
import { TypeBlogCategoryValueService } from './services/typeblogcategoryvalue.service';
import { TypeBlogCategoryService } from './services/typeblogcategory.service';

import { AdminTypeBlogCategoryController } from './controllers/admin.typeblogcategory.controller';



import { TypeFilterSchema } from './schemas/typefilter.schema';
import { TypeFilterValueSchema } from './schemas/typefiltervalue.schema';

import { TypeFilterValueRepository } from './repositories/typefiltervalue.repository';
import { TypeFilterRepository } from './repositories/typefilter.repository';
import { TypeFilterValueService } from './services/typefiltervalue.service';
import { TypeFilterService } from './services/typefilter.service';

import { AdminTypeFilterController } from './controllers/admin.typefilter.controller';



import { TypeCourseSchema } from './schemas/typecourse.schema';
import { TypeCourseValueSchema } from './schemas/typecoursevalue.schema';
import { TypeCourseValueRepository } from './repositories/typecoursevalue.repository';
import { TypeCourseRepository } from './repositories/typecourse.repository';
import { TypeCourseValueService } from './services/typecoursevalue.service';
import { TypeCourseService } from './services/typecourse.service';

import { AdminTypeCourseController } from './controllers/admin.typecourse.controller';




import { TypePriceSchema } from './schemas/typeprice.schema';
import { TypePriceValueSchema } from './schemas/typepricevalue.schema';
import { TypePriceValueRepository } from './repositories/typepricevalue.repository';
import { TypePriceRepository } from './repositories/typeprice.repository';
import { TypePriceValueService } from './services/typepricevalue.service';
import { TypePriceService } from './services/typeprice.service';

import { AdminTypePriceController } from './controllers/admin.typeprice.controller';

import { TypeGenderController } from './controllers/typegender.controller';
import { TypeSpecialtyController } from './controllers/typespecialty.controller';
import { TypeExperienceController } from './controllers/typeexperience.controller';
import { TypeProfessionalismLevelController } from './controllers/typeprofessionalismlevel.controller';
import { TypeStudiesController } from './controllers/typestudies.controller';
import { TypeOccupationController } from './controllers/typeoccupation.controller';
import { TypeDisciplineController } from './controllers/typediscipline.controller';
import { TypeLessonController } from './controllers/typelesson.controller';
import { TypeTargetGroupController } from './controllers/typetargetgroup.controller';
import { TypeInternetConnectionController } from './controllers/typeinternetconnection.controller';
import { TypeHardwareController } from './controllers/typehardware.controller';
import { TypeSocialController } from './controllers/typesocial.controller';
import { TypePhoneController } from './controllers/typephone.controller';
import { TypeAgreementController } from './controllers/typeagreement.controller';
import { CountryController } from './controllers/country.controller';
import { TypeLocalityController } from './controllers/typelocality.controller';
import { TypeBlogCategoryController } from './controllers/typeblogcategory.controller';
import { TypeFilterController } from './controllers/typefilter.controller';
import { TypeCourseController } from './controllers/typecourse.controller';
import { TypePriceController } from './controllers/typeprice.controller';


@Module({
    imports: [
        forwardRef(() => AppModule),
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
        forwardRef(() => LanguageModule),

        MongooseModule.forFeature([

            { name: 'TypeGender', schema: TypeGenderSchema },
            { name: 'TypeGenderValue', schema: TypeGenderValueSchema },
            { name: 'TypeSpecialty', schema: TypeSpecialtySchema },
            { name: 'TypeSpecialtyValue', schema: TypeSpecialtyValueSchema },

            { name: 'TypeExperience', schema: TypeExperienceSchema },
            { name: 'TypeExperienceValue', schema: TypeExperienceValueSchema },

            { name: 'TypeProfessionalismLevel', schema: TypeProfessionalismLevelSchema },
            { name: 'TypeProfessionalismLevelValue', schema: TypeProfessionalismLevelValueSchema },


            { name: 'TypeStudies', schema: TypeStudiesSchema },
            { name: 'TypeStudiesValue', schema: TypeStudiesValueSchema },


            { name: 'TypeOccupation', schema: TypeOccupationSchema },
            { name: 'TypeOccupationValue', schema: TypeOccupationValueSchema },


            { name: 'TypeDiscipline', schema: TypeDisciplineSchema },
            { name: 'TypeDisciplineValue', schema: TypeDisciplineValueSchema },


            { name: 'TypeLesson', schema: TypeLessonSchema },
            { name: 'TypeLessonValue', schema: TypeLessonValueSchema },

            { name: 'TypeTargetGroup', schema: TypeTargetGroupSchema },
            { name: 'TypeTargetGroupValue', schema: TypeTargetGroupValueSchema },

            { name: 'TypeInternetConnection', schema: TypeInternetConnectionSchema },
            { name: 'TypeInternetConnectionValue', schema: TypeInternetConnectionValueSchema },


            { name: 'TypeHardware', schema: TypeHardwareSchema },
            { name: 'TypeHardwareValue', schema: TypeHardwareValueSchema },

            { name: 'TypeSocial', schema: TypeSocialSchema },
            { name: 'TypeSocialValue', schema: TypeSocialValueSchema },

            { name: 'TypePhone', schema: TypePhoneSchema },
            { name: 'TypePhoneValue', schema: TypePhoneValueSchema },

            { name: 'TypeAgreement', schema: TypeAgreementSchema },
            { name: 'TypeAgreementValue', schema: TypeAgreementValueSchema },

            { name: 'Country', schema: CountrySchema },
            { name: 'CountryValue', schema: CountryValueSchema },

            { name: 'TypeLocality', schema: TypeLocalitySchema },
            { name: 'TypeLocalityValue', schema: TypeLocalityValueSchema },


            { name: 'TypeBlogCategory', schema: TypeBlogCategorySchema },
            { name: 'TypeBlogCategoryValue', schema: TypeBlogCategoryValueSchema },


            { name: 'TypeFilter', schema: TypeFilterSchema },
            { name: 'TypeFilterValue', schema: TypeFilterValueSchema },


            { name: 'TypeCourse', schema: TypeCourseSchema },
            { name: 'TypeCourseValue', schema: TypeCourseValueSchema },


            { name: 'TypePrice', schema: TypePriceSchema },
            { name: 'TypePriceValue', schema: TypePriceValueSchema },
        ]),
    ],
    controllers: [
        AdminTypeGenderController,
        AdminTypeSpecialtyController,
        AdminTypeExperienceController,

        AdminTypeProfessionalismLevelController,

        AdminTypeStudiesController,

        AdminTypeOccupationController,

        AdminTypeDisciplineController,

        AdminTypeLessonController,

        AdminTypeTargetGroupController,

        AdminTypeInternetConnectionController,

        AdminTypeHardwareController,

        AdminTypeSocialController,

        AdminTypePhoneController,
        AdminTypeAgreementController,
        AdminCountryController,
        AdminTypeLocalityController,

        AdminTypeBlogCategoryController,


        AdminTypeFilterController,


        AdminTypeCourseController,


        AdminTypePriceController,


        //-------------------------
        TypeGenderController,
        TypeSpecialtyController,
        TypeExperienceController,
        TypeProfessionalismLevelController,
        TypeStudiesController,
        TypeOccupationController,
        TypeDisciplineController,
        TypeLessonController,
        TypeTargetGroupController,
        TypeInternetConnectionController,
        TypeHardwareController,
        TypeSocialController,
        TypePhoneController,
        TypeAgreementController,
        CountryController,
        TypeLocalityController,
        TypeBlogCategoryController,
        TypeFilterController,
        TypeCourseController,
        TypePriceController,
    ],
    providers: [
        TypeGenderService,
        TypeGenderRepository,

        CommonTools,

        TypeGenderValueService,
        TypeGenderValueRepository,

        TypeSpecialtyValueRepository,
        TypeSpecialtyRepository,

        TypeSpecialtyValueService,
        TypeSpecialtyService,


        // GeneralNomenclatureRepository,
        // GeneralNomenclatureValueRepository,


        TypeExperienceValueRepository,
        TypeExperienceRepository,

        TypeExperienceValueService,
        TypeExperienceService,


        TypeProfessionalismLevelValueRepository,
        TypeProfessionalismLevelRepository,

        TypeProfessionalismLevelValueService,
        TypeProfessionalismLevelService,


        TypeStudiesValueRepository,
        TypeStudiesRepository,

        TypeStudiesValueService,
        TypeStudiesService,

        TypeOccupationValueRepository,
        TypeOccupationRepository,

        TypeOccupationValueService,
        TypeOccupationService,


        TypeDisciplineValueRepository,
        TypeDisciplineRepository,

        TypeDisciplineValueService,
        TypeDisciplineService,


        TypeLessonValueRepository,
        TypeLessonRepository,

        TypeLessonValueService,
        TypeLessonService,


        TypeTargetGroupValueRepository,
        TypeTargetGroupRepository,

        TypeTargetGroupValueService,
        TypeTargetGroupService,


        TypeInternetConnectionValueRepository,
        TypeInternetConnectionRepository,

        TypeInternetConnectionValueService,
        TypeInternetConnectionService,

        TypeHardwareValueRepository,
        TypeHardwareRepository,

        TypeHardwareValueService,
        TypeHardwareService,

        TypeSocialValueRepository,
        TypeSocialRepository,

        TypeSocialValueService,
        TypeSocialService,

        TypePhoneValueRepository,
        TypePhoneRepository,

        TypePhoneValueService,
        TypePhoneService,

        TypeAgreementValueRepository,
        TypeAgreementRepository,

        TypeAgreementValueService,
        TypeAgreementService,

        CountryValueRepository,
        CountryRepository,

        CountryValueService,
        CountryService,

        TypeLocalityValueRepository,
        TypeLocalityRepository,

        TypeLocalityValueService,
        TypeLocalityService,


        TypeBlogCategoryValueRepository,
        TypeBlogCategoryRepository,

        TypeBlogCategoryValueService,
        TypeBlogCategoryService,


        TypeFilterValueRepository,
        TypeFilterRepository,

        TypeFilterValueService,
        TypeFilterService,


        TypeCourseValueRepository,
        TypeCourseRepository,
        TypeCourseValueService,
        TypeCourseService,


        TypePriceValueRepository,
        TypePriceRepository,

        TypePriceValueService,
        TypePriceService,
    ],
    exports: [
        TypeSpecialtyRepository,
        TypeGenderRepository,
        TypePriceRepository,
        TypeCourseRepository,
        TypeFilterRepository,
        TypeBlogCategoryRepository,
        TypeLocalityRepository,
        CountryRepository,
        TypeAgreementRepository,
        TypePhoneRepository,
        TypeSocialRepository,
        TypeHardwareRepository,
        TypeInternetConnectionRepository,
        TypeTargetGroupRepository,
        TypeLessonRepository,
        TypeDisciplineRepository,
        TypeOccupationRepository,
        TypeStudiesRepository,
        TypeProfessionalismLevelRepository,
        TypeExperienceRepository
    ],
})
export default class NomenclatureModule { }
