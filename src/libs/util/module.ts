import {ClassConstructor, plainToInstance} from 'class-transformer';

import {QueryParamsDto} from '../../modules/dispatcher/dto/query-params.dto.js';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export const matchShiftValue = (dto: QueryParamsDto): QueryParamsDto => {
  const queryParams = {
    from: dto.from < dto.to ? dto.from : dto.to,
    to: dto.to > dto.from ? dto.to : dto.from
  };

  return queryParams;
};

