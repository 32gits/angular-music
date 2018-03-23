import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DrumModuleComponent } from './drum-module/drum-module.component';
import { DrumButtonComponent } from './drum-module/drum-button/drum-button.component';
import { SynthModuleComponent } from './synth-module/synth-module.component';


@NgModule({
  declarations: [
    AppComponent,
    DrumModuleComponent,
    DrumButtonComponent,
    SynthModuleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
