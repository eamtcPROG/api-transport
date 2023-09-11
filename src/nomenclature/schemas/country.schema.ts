import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { GeneralNomenclatureSchema } from 'src/nomenclature/schemas/generalnomenclature.schema'
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;

@Schema()
export class Country extends GeneralNomenclatureSchema {
   
}

export const CountrySchema = SchemaFactory.createForClass(Country);


