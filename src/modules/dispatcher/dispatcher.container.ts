import { Container } from 'inversify';

import { Component } from '../../libs/enum/index.js';
import {DispatcherServiceInterface, DispatcherRepositoryInterface} from '../../libs/interface/index.js';
import {DispatcherController} from './dispatcher.controller.js';
import {DispatcherService} from './dspatcher.service.js';
import {DispatcherRepository} from './dspatcher.repository.js';

export function createDispatcherContainer() {
  const dispatcherContainer = new Container();

  dispatcherContainer.bind<DispatcherController>(Component.DispatcherController).to(DispatcherController).inSingletonScope();
  dispatcherContainer.bind<DispatcherServiceInterface>(Component.DispatcherService).to(DispatcherService).inSingletonScope();
  dispatcherContainer.bind<DispatcherRepositoryInterface>(Component.DispatcherRepository).to(DispatcherRepository).inSingletonScope();

  return dispatcherContainer;
}
