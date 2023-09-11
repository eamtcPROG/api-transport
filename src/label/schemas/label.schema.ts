import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type LabelDocument = HydratedDocument<Label>;

@Schema()

export class Label extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  identifier: string;

  @Prop()
  type: number;

  @Prop()
  status: number;
  
}

export const LabelSchema = SchemaFactory.createForClass(Label);