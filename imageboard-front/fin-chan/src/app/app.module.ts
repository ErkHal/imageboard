import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ThreadsComponent } from './threads/threads.component';
import { PostingService } from './services/posting.service';
import { FilepathPipe } from './filepath.pipe';
import { SingleThreadComponent } from './single-thread/single-thread.component';
import { ThreadPreviewComponent } from './templates/thread-preview/thread-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreadsComponent,
    FilepathPipe,
    SingleThreadComponent,
    ThreadPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [PostingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
