import { Reply } from './reply';

export interface Thread {
  _id?: string,
  message: string,
  file?: File,
  timestamp?: string,
  replies?: Reply[],
}
