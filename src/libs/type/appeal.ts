import {StatusAppeal} from '../enum/index.js';

export type DataAppeal = {
  id: string;
  created_at: Date;
  client: string;
  email: string;
  topic_appeal: string;
  appeal: string;
  status: StatusAppeal;
  statusResponse: string;
};

export type DataCancelAllAppeals = {
  statusResponse: string[],
  resultOperation: string
};
