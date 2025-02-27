import { Container } from 'inversify';

import { Component } from '../../libs/enum/index.js';
import {AppealService} from './appeal.service.js';
import {AppealRepository} from './appeal.repository.js';
import {AppealController} from './appeal.controller.js';
import {AppealServiceInterface, AppealRepositoryInterface} from '../../libs/interface/index.js';

export function createAppealContainer() {
  const appealContainer = new Container();

  appealContainer.bind<AppealController>(Component.AppealController).to(AppealController).inSingletonScope();
  appealContainer.bind<AppealServiceInterface>(Component.AppealService).to(AppealService).inSingletonScope();
  appealContainer.bind<AppealRepositoryInterface>(Component.AppealRepository).to(AppealRepository).inSingletonScope();

  return appealContainer;
}
