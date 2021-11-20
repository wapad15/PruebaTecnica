import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EndPointService } from '../services/end-point.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit ,AfterViewInit{
  
  public FilterCasas: FormGroup;
  public casas: Array<any> = [
    {name: 'slytherin'}, 
    {name: 'gryffindor'}, 
    {name: 'ravenclaw'}, 
    {name: 'hufflepuff'},
  ];
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

    this.buildForm();
    this.getInfoPorCasa()
  }
  setDataState(Personajes:any){
    this.dataSource = new MatTableDataSource<any>([...Personajes]);
  }

  getInfoPorCasa(){
    let casa = this.FilterCasas.get('Casas').value
    this.service.getPersonajes(casa).subscribe(
      (res)=>{
        let Personajes: any[] =[];
        res.forEach((docente: any) => {
          
          Personajes.push({
            name: docente.name,
            patronus: docente.patronus,
            dateOfBirth: docente.dateOfBirth,
            image: docente.image,
          })
        });
        
        this.setDataState(Personajes)
        this.ngAfterViewInit()
      }
    )
    
  }
  buildForm() {

    this.FilterCasas = new FormGroup({
      Casas: new FormControl(this.casas[1].name,[Validators.required]),
    });

    
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}
