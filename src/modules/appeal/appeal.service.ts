import { inject, injectable } from 'inversify';

import {AppealDto} from './dto/appeal.dto.js';
import {Component} from '../../libs/enum/index.js';
import {DataAppeal} from '../../libs/type/index.js';
import {AppealServiceInterface, AppealRepositoryInterface} from '../../libs/interface/index.js';

@injectable()
export class AppealService implements AppealServiceInterface {
  constructor(
    @inject(Component.AppealRepository) private readonly appealRepository: AppealRepositoryInterface
  ) {}

  public async create(dto: AppealDto): Promise<DataAppeal> {
    const dataAppeal = await this.appealRepository.create(dto);

    return dataAppeal;
  }
}
