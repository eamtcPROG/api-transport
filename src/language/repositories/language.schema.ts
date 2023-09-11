import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type LanguageDocument = HydratedDocument<Language>;

@Schema()
export class Language extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  cod2: string;

  @Prop()
  cod3: string;

  @Prop()
  status: number;
  
  @Prop()
  ordercriteria: number;

  @Prop()
  hmtlcode: string;

  @Prop()
  updatedate: number;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);


