import { addProduct, deleteProduct } from './../../store/products.actions';
import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { IProduct } from './../../products.model';
import { IRelatedProduct } from '../../../venues/venues.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';

@Component({
  selector: 'il-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent extends GenericRowComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public dragStart: boolean = false;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public cols: string[] = ['product_name', 'parent', 'qty', 'cost'];

  @Input()
  public products: IProduct[];

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.products && changes.products.currentValue) {
      this.products = changes.products.currentValue;
    }
  }

  public colFunc(): void {
    alert('No implementation yet!');
  }

  public onDelete(item: IProduct): void {
    const { id } = item;
    this.store.dispatch(deleteProduct({ id }));
  }

  public onSave(item: IProduct): void {
    setTimeout(() => {
      if (item)
        this.store.dispatch(addProduct({ item }));
    }, 100);
  }

  public dragStarted = (event: any) => this.dragStart = event;

  public getToolTip(product: IRelatedProduct[]): string {
    let tooltip = '';
    for (const entry of product) {
      tooltip = tooltip + entry.product.label + '\n';
    }
    return tooltip;
  }
}
