import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule, BsDropdownModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnterpriseComponent } from './Enterprise/Enterprise.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule  } from 'ngx-toastr';
import { DashboardComponent  } from 'src/app/dashboard/dashboard/dashboard.component';


import { EnterpriseService } from './_services/enterprise.service';

import { DateTimeFormatPipePipe } from './_helpers/DateTimeFormatPipe.pipe';
import { EnterpriseEditComponent } from './EnterpriseEdit/EnterpriseEdit.component';


@NgModule({
   declarations: [
      AppComponent,
      EnterpriseComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      DashboardComponent,
      EnterpriseEditComponent
   ],
   imports: [
      BrowserModule,
      TooltipModule.forRoot(),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ToastrModule.forRoot({
         preventDuplicates: true,
         timeOut: 3000,
         progressBar: true
      }),
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule

   ],
   providers: [
      EnterpriseService

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
