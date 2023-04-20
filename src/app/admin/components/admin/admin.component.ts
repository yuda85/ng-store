import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product/services/product.service';
import { ProductFormComponent } from 'src/app/shared/components/product-form/product-form.component';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  public displayedColumns: Array<string> = [];
  public dataSource: MatTableDataSource<IProduct> = new MatTableDataSource();

  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.productService.getProducts$().subscribe((data) => {
      this.initTable(data);
      this.initFilterAndPagination();
    });

    this.productService.fetchProducts();
  }

  editProduct(id: string): void {
    this.router.navigate(['admin/edit', id]);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {});
    this.sub.add(
      dialogRef.afterClosed().subscribe((result: IProduct) => {
        console.log(result);
        console.log('The dialog was closed');
        this.productService.addNewProduct(result);
      })
    );
  }

  private initTable(data: IProduct[]): void {
    console.log('all products', data);
    this.displayedColumns = Object.keys(data[0]);
    this.displayedColumns.push('edit');
    this.dataSource = new MatTableDataSource(data);
  }

  initFilterAndPagination() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.initFilterAndPagination();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
