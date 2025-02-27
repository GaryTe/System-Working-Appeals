import {DataAppeal, DataCancelAllAppeals} from '../type/index.js';
import {AnswerDto} from '../../modules/dispatcher/dto/answer.dto.js';
import {GeneralAnswerDto} from '../../modules/dispatcher/dto/general-answer.dto.js';
import {QueryParamsDto} from '../../modules/dispatcher/dto/query-params.dto.js';

export interface DispatcherServiceInterface {
  getAppeal(): Promise<DataAppeal | string>;
  completedAppeal(dto: AnswerDto): Promise<string>;
  cancelAppeal(dto: AnswerDto): Promise<string>;
  cancelAllAppeals(dto: GeneralAnswerDto): Promise<DataCancelAllAppeals | string>
  getAppealsByData(dto: QueryParamsDto): Promise<DataAppeal[] | []>
}

export interface DispatcherRepositoryInterface {
  getAppeal(): Promise<DataAppeal>;
  completedAppeal(dto: AnswerDto): Promise<DataAppeal>;
  cancelAppeal(dto: AnswerDto): Promise<DataAppeal>;
  cancelAllAppeals(): Promise<DataAppeal[] | []>;
  getAppealsByData(dto: QueryParamsDto): Promise<DataAppeal[] | []>
}
