import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';
import { DynamicFormsBootstrapUIModule } from '@ng2-dynamic-forms/ui-bootstrap';
import { NgUploaderModule } from 'ngx-uploader';

import { EntityModule } from '../../common/entity/entity.module';
import { CommonFormComponent } from '../../common/form/';

import { routing } from './ca.routing';

import { CertificateAuthorityListComponent } from './ca-list/';
import { CertificateAuthorityImportComponent } from './ca-import/';
import { CertificateAuthorityInternalComponent } from './ca-internal/';
import { CertificateAuthorityIntermediateComponent } from './ca-intermediate/';
import { CertificateAuthorityDeleteComponent } from './ca-delete/';

@NgModule({
  imports: [
    EntityModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsBootstrapUIModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgUploaderModule,
    routing
  ],
  declarations: [
     CertificateAuthorityListComponent,
     CertificateAuthorityImportComponent,
     CertificateAuthorityInternalComponent,
     CertificateAuthorityIntermediateComponent,
     CertificateAuthorityDeleteComponent,
  ],
  providers: [
  ]
})
export class CertificateAuthorityModule {}