import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { AnyObject, Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from "src/app/interfaces/ischema.interface";

export type FilePermissionDocument = HydratedDocument<FilePermission>;

@Schema()
export class FilePermission extends Document implements Ischema{
  @Prop()
  id: string;

  @Prop()
  criteria: string;

  @Prop()
  value: string;
  
}

export const FilePermissionSchema = SchemaFactory.createForClass(FilePermission);


