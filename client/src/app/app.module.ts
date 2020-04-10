import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker.component';
import { DimensionPickerComponent } from './dimension-picker/dimension-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EmojiPickerComponent,
    DimensionPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PickerModule,
    ClipboardModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
