import 'reflect-metadata';
import 'dotenv/config.js';
import { Container } from 'inversify';

import {createAppContainer} from './app/app.container.js';
import {createAppealContainer} from './modules/appeal/appeal.container.js';
import {Application} from './libs/interface/index.js';
import {createDispatcherContainer} from './modules/dispatcher/dispatcher.container.js';
import { Component } from './libs/enum/index.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createAppContainer(),
    createAppealContainer(),
    createDispatcherContainer()
  );

  const application = mainContainer.get<Application>(Component.App);
  await application.init();
}

bootstrap();
