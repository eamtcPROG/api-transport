import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type LabelValueDocument = HydratedDocument<LabelValue>;

@Schema()
export class LabelValue extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
  idlanguage: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Label' })
  idlabel: string;

  // @Prop()
  // attribute: string;

  @Prop()
  value: string;

  @Prop()
  updatedate: number;
}

export const LabelValueSchema = SchemaFactory.createForClass(LabelValue);


