import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DynamicFormControlModel, DynamicFormService, DynamicCheckboxModel, DynamicInputModel, DynamicSelectModel, DynamicRadioGroupModel } from '@ng2-dynamic-forms/core';
import { GlobalState } from '../../../../global.state';
import { RestService, WebSocketService } from '../../../../services/';

@Component({
  selector: 'app-bootenv-add',
  template: `<entity-add [conf]="this"></entity-add>`
})
export class BootEnvironmentCloneComponent {

  protected route_success: string[] = ['system', 'bootenv'];
  protected resource_name: string = 'system/bootenv';
  protected pk: any;
  protected formModel: DynamicFormControlModel[];

  constructor(protected router: Router, protected route: ActivatedRoute, protected rest: RestService, protected ws: WebSocketService, protected formService: DynamicFormService, protected _state: GlobalState) {
  }

  preInit(entityAdd: any) {
    this.route.params.subscribe(params => {
      this.pk = params['pk'];
      this.formModel = [
        new DynamicInputModel({
          id: 'name',
          label: 'Name',
        }),
        new DynamicInputModel({
          id: 'source',
          label: 'Source',
          value: this.pk,
          disabled: true
        }),
      ];
    });
  }

}