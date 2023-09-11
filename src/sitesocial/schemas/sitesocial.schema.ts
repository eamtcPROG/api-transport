import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type SiteSocialDocument = HydratedDocument<SiteSocial>;

@Schema()
export class SiteSocial extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  link: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeSocial' })
  idtypesocial: string;

  @Prop()
  status: number;
}

export const SiteSocialSchema = SchemaFactory.createForClass(SiteSocial);