import 'reflect-metadata';
import 'dotenv/config.js';
//import { Container } from 'inversify';

import {createAppContainer} from './app/app.container.js';
import {Application} from './libs/interface/index.js';
import { Component } from './libs/enum/index.js';

const app = createAppContainer().get<Application>(Component.App);
await app.init();
