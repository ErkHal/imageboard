import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reply } from '../models/reply';
import { Thread } from '../models/thread';

@Injectable()
export class PostingService {

  newThread = new FormData();

  selectedFile: File;

  rootUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {}

  //Fetches threads from server
  getAllThreads() {
    return this.http.get(this.rootUrl + 'posts');
  }

  //Fetch single thread from server
  getSingleThread(id) {
    return this.http.get(this.rootUrl + 'posts/' + id);
  }

  //Starts a new thread and uploads file to server
  startThread(message) {
    console.log(message);
    this.newThread.set('message', message);
    this.newThread.set('file', this.selectedFile);
    console.log(this.newThread);
    return this.http.post(this.rootUrl + 'posts', this.newThread);
  }

  //Post a reply to a thread
  replyToThread(replyMessage: string, threadID: string) {

    const reply = new FormData();

    reply.set('message', replyMessage);
    reply.set('file', this.selectedFile);

    return this.http.post(
      this.rootUrl + 'posts/' + threadID,
      reply);
  }

  /*
  Sets selected file to selectedFile variable.
  From there it is used in startThread and replyToThread methods.
  */
  onFileSelect(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
}
