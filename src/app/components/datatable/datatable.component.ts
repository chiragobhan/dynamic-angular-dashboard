import { Component, inject, ViewChild, computed, ChangeDetectionStrategy, Signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from './../../services/post.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-data-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  private postService = inject(PostService);
  private authService = inject(AuthService);
  username = this.authService.username;
  displayedColumns: string[] = ['id', 'title', 'body'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: Signal<MatTableDataSource<any>> = computed(() => {
    const dataSource = new MatTableDataSource(this.postService.getPosts()());
    
    if (this.paginator) dataSource.paginator = this.paginator;
    if (this.sort) dataSource.sort = this.sort;

    return dataSource;
  });

  constructor() {}

  ngAfterViewInit() {
    this.dataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();

    if (this.dataSource().paginator) {
      this.dataSource().paginator?.firstPage();
    }
  }
}