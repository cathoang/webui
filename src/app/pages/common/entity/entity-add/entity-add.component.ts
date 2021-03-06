import { ApplicationRef, Component, Injector, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicFormControlModel, DynamicFormService } from '@ng2-dynamic-forms/core';
import { Location } from '@angular/common';

import { GlobalState } from '../../../../global.state';
import { RestService, WebSocketService } from '../../../../services/';

import { Subscription } from 'rxjs';
import { EntityUtils } from '../utils';

@Component({
  selector: 'entity-add',
  templateUrl: './entity-add.component.html',
  styleUrls: ['./entity-add.component.css']
})
export class EntityAddComponent implements OnInit {

  @Input('conf') conf: any;

  public formGroup: FormGroup;
  public error: string;
  public data: Object = {};

  @ViewChildren('component') components;

  private busy: Subscription;

  constructor(protected router: Router, protected rest: RestService, protected ws: WebSocketService, protected formService: DynamicFormService, protected _injector: Injector, protected _appRef: ApplicationRef, protected _state: GlobalState, protected location: Location) {

  }

  ngOnInit() {
    if (this.conf.preInit) {
      this.conf.preInit(this);
    }
    this.formGroup = this.formService.createFormGroup(this.conf.formModel);
    if (this.conf.afterInit) {
      this.conf.afterInit(this);
    }
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.error = null;
    let value = this.formGroup.value;
    for(let i in value) {
      let clean = this.conf['clean_' + i];
      if(clean) {
        value[i] = clean.bind(this.conf)(value[i]);
      }
    }

    if(this.conf.clean) {
      value = this.conf.clean.bind(this.conf)(value);
    }

    this.busy = this.rest.post(this.conf.resource_name + '/', {
      body: JSON.stringify(value),
    }).subscribe((res) => {
      this.router.navigate(new Array('/pages').concat(this.conf.route_success));
    }, (res) => {
      new EntityUtils().handleError(this, res);
    });
  }

  isShow(id:any):any {
    if (this.conf.isBasicMode) {
      if (this.conf.advanced_field.indexOf(id) > -1) {
        return false;
      }
    }
    return true;
  }
}
