import { FormBuilder, FormGroup } from '@angular/forms';
import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { environment } from './../../../../../environments/environment';
import { trigger, transition, style, state, animate } from '@angular/animations';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

export class TableExpandableRowsExample {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'description', 'action-col'];
  expandedElement: PeriodicElement | null;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: '2G1W Dimmer Picture',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
  }, {
    name: 'Helium',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha…`
  }
];

export interface PeriodicElement {
  name: string;
  description: string;
}

@Component({
  selector: 'il-contract-product-category-table',
  templateUrl: './contract-product-category-table.component.html',
  styleUrls: ['./contract-product-category-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ContractProductCategoryTableComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public dataSource = ELEMENT_DATA;
  public columnsToDisplay = ['name', 'description', 'action-col'];
  public expandedElement: PeriodicElement | null;

  public actionState: boolean = false;
  @Input()
  public isRightNavOpen: boolean = false;
  public items: ISimpleItem[] = [
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    },
    {
      label: 'TEST',
      value: 'TEST'
    }
  ];
  public form: FormGroup
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contract_tag: [null]
    })
   }

  ngOnInit() { }

  public onExpand(event: any): void {
    console.log(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.isRightNavOpen)
      this.isRightNavOpen = changes.isRightNavOpen.currentValue;
  }
}
