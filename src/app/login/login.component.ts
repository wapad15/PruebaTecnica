import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router, 
  ) { }

  ngOnInit() {
    this.registerIconsSvg();

  }
    

  registerIconsSvg() {
   
    this.iconRegistry.addSvgIcon('estudiantes', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/students.svg'));
    
  }

  openStudents(){
    this.router.navigate([`estudiantes`]);
  }
  openTeachers(){
    this.router.navigate([`profesores`]);
  }
  openPersonajes(){
    this.router.navigate([`personajes`]);
  }
}