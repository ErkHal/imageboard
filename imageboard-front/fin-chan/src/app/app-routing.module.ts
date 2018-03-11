import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleThreadComponent } from './single-thread/single-thread.component';
import { ThreadsComponent } from './threads/threads.component';

const routes: Routes = [
  { path: '', redirectTo: 'threads', pathMatch: 'full' },
  { path: 'threads', component: ThreadsComponent },
  { path: 'threads/:id', component: SingleThreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
