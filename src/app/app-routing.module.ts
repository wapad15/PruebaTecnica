import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { PersonajesComponent } from './personajes/personajes.component';

const appRoutes:Routes =[
{
  path: "",
  component: LoginComponent,
},
{
  path: "login",
  component: LoginComponent,
},
{
  path: "estudiantes",
  component: EstudiantesComponent,
},
{
  path: "profesores",
  component: ProfesoresComponent,
},
{
  path: "personajes",
  component: PersonajesComponent,
},

]

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
