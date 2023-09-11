import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import { GeneralNomenclatureValueSchema } from 'src/nomenclature/schemas/generalnomenclaturevalue.schema'

export type CountryValueDocument = HydratedDocument<CountryValue>;

@Schema()
export class CountryValue extends GeneralNomenclatureValueSchema {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Country' })
  idtype: string;

}

export const CountryValueSchema = SchemaFactory.createForClass(CountryValue);


