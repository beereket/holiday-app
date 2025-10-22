import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {registerLicense} from '@syncfusion/ej2-base'
import { App } from './app/app';

registerLicense('Ngo9BigBOggjGyl/Vkd+XU9FcVRDXHxLfkx0RWFcb1x6dFxMZFRBJAtUQF1hTH9TdEdiXX1cc3RWRWdcWkd3');
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
