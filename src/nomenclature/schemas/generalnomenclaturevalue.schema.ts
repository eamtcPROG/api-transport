import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import Ischema from 'src/app/interfaces/ischema.interface';

@Schema()
export class GeneralNomenclatureValueSchema extends Document implements Ischema {
    @Prop()
    id: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Language' })
    idlanguage: string;
  
    @Prop()
    name: string;
}
