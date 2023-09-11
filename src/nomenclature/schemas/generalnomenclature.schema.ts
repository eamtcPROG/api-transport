import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from 'src/app/interfaces/ischema.interface';

@Schema()
export class GeneralNomenclatureSchema extends Document implements Ischema {
  @Prop()
  id: string;

  @Prop()
  ordercriteria: number;

  @Prop()
  status: number;
}
