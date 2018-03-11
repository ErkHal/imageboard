import { Component, OnInit } from '@angular/core';
import { PostingService } from '../services/posting.service';
import { Thread } from '../models/thread';

import { ThreadPreviewComponent } from '../templates/thread-preview/thread-preview.component';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {

  newThreadMessage: string;

  threads: Thread[];

  constructor(private postingService: PostingService) { }

  ngOnInit() {
    this.refreshThreads();
  }

  //Start a new thread
  startNewThread() {

    this.postingService.startThread(this.newThreadMessage)
      .subscribe(response => {
        console.log(response);

        //Clear selected file and textarea
        this.newThreadMessage = null;
        this.postingService.selectedFile = null;

        this.refreshThreads();
      }, err => {
        console.log(err);
      })
  }

  //Fetch threads from server
  refreshThreads() {
    this.postingService.getAllThreads()
      .subscribe((result:Thread[]) => {
        console.log(result);
        this.threads = result.reverse();
      }, err => {
        console.log(err);
      });
  }
}
