import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [HelloComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [HelloComponent],
})
export class AppModule {}
