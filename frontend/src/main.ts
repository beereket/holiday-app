import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {registerLicense} from '@syncfusion/ej2-base'
import { App } from './app/app';

registerLicense('Ngo9BigBOggjGyl/Vkd+XU9FcVRDX3xLe0x0RWFcb1p6d1BMYVhBNQtUQF1hTH9SdEBjXXxbdHRTRWFaWkd3');
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
