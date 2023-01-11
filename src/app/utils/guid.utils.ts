import { v4 as uuidv4 } from 'uuid';

export abstract class GuidUtils {
  static newGuid(): string {
    return uuidv4();
  }
}
