import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type SocialDocument = HydratedDocument<Social>;

@Schema()
export class Social extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  link: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeSocial' })
  idtypesocial: string;

  @Prop()
  iduser: string;
}

export const SocialSchema = SchemaFactory.createForClass(Social);