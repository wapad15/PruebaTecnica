import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EndPointService } from '../services/end-point.service';
import { Personaje } from '../models/personaje';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit,AfterViewInit  {

  
    
  public length= 10;
  public pageSizeOptions = [5,10,20,50];
  public pageSize = 10;
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
  ngOnInit(){

    this.service.getStudentsd().subscribe(
      (res)=>{
        let students: any[] =[];
        res.forEach((estudent: any) => {
          
          students.push({
            name: estudent.name,
            patronus: estudent.patronus,
            dateOfBirth: estudent.dateOfBirth,
            image: estudent.image,
          })
        });
        
        this.setDataState(students)
      }
    )
  }
    
  setDataState(Students:any){
  
    this.dataSource = new MatTableDataSource<any>([...Students]);

  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
