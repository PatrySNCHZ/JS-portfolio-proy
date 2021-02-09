// import modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

// import components
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

// constante appRoutes de tipo Routes en el que definir las rutas
const appRoutes: Routes = [
    {path: '', component: AboutComponent},
    {path: 'sobre-mi', component: AboutComponent},
    {path: 'proyectos', component: ProjectsComponent},
    {path: 'crear-proyecto', component: CreateComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'proyecto/:id', component: DetailComponent},
    {path: 'editar-proyecto/:id', component: EditComponent},
    // creación ruta 404 para que dirija a ErrorComponent si sucede un error 

    {path: '**', component: ErrorComponent}
];

// exportar configuración de las rutas

// servicio de rutas
export const appRoutingProviders: any[] = [];
// routing que llama al RouterModule que llama a forRoot y carga nuestro appRoutes
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);




