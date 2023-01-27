import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { TransformTypePipe } from './transform-type.pipe';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [AppComponent, TableComponent, TransformTypePipe, FilterComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
