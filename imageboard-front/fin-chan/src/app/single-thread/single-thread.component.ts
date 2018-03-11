import { Component, OnInit } from '@angular/core';
import { Thread } from '../models/thread';
import { ActivatedRoute } from '@angular/router';
import { PostingService } from '../services/posting.service';

@Component({
  selector: 'app-single-thread',
  templateUrl: './single-thread.component.html',
  styleUrls: ['./single-thread.component.scss']
})
export class SingleThreadComponent implements OnInit {

  thread: Thread;

  replyMessage: string;

  constructor(private route: ActivatedRoute,
              private postingService: PostingService) { }

  ngOnInit() {
    this.loadContent();
  }

  //reply to this thread
  reply() {
    this.postingService.replyToThread(this.replyMessage, this.thread._id)
      .subscribe(response => {
        console.log(response);
        this.loadContent();
      });
  }

  //Refresh replies
  loadContent() {
    this.route.params.subscribe(params => {
       const id = params['id'];

       this.postingService.getSingleThread(id)
        .subscribe((response: Thread[]) => {
          console.log(response);
          this.thread = response[0];
        })
     });
  }
}
