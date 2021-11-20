import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EndPointService } from '../services/end-point.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit ,AfterViewInit{
  
  public dataSource: MatTableDataSource<any> ;
  public displayedColumns: Array<string> = ['name', 'patronus', 'age', 'image'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private service: EndPointService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngOnInit() {

    this.service.getteachers().subscribe(
      (res)=>{
        let docentes: any[] =[];
        res.forEach((docente: any) => {
          
          docentes.push({
            name: docente.name,
            patronus: docente.patronus,
            dateOfBirth: docente.dateOfBirth,
            image: docente.image,
          })
        });
        
        this.setDataState(docentes)
      }
    )
  }
  setDataState(docentes:any){
  
    this.dataSource = new MatTableDataSource<any>([...docentes]);

  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
