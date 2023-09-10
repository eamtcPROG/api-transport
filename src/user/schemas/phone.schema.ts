import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type PhoneDocument = HydratedDocument<Phone>;

@Schema()
export class Phone extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop()
  phonenumber: string;

  @Prop()
  countrycode: string;

  @Prop()
  status: number;

  @Prop()
  activationcode: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypePhone' })
  idtypephone: string;

  @Prop()
  iduser: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);