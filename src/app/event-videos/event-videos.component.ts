import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'event-videos',
  templateUrl: './event-videos.component.html',
  styleUrls: ['./event-videos.component.scss']
})
export class EventVideosComponent implements OnInit {

  videolist = [{name:"Fer", string:"6wD4V0rvlDI"},
               {name:"car", string:"6q5smuwgARY"},
               {name:"lom", string:"8g4-Vz69xYM"},
               {name:"tom", string:"15gXlORbThM"},
               {name:"tom", string:"38-M5ZkYzAY"}]

  constructor(private sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  getEmbedUrl(item: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.string);

  }
}
