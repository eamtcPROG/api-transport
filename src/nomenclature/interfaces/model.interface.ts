import Ischema from "src/app/interfaces/ischema.interface";

export interface ModelInterface extends Ischema {
    _id: string;
    ordercriteria: number;
    status: number;
    // Add other properties here...
}