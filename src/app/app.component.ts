import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { ElementRef } from '@angular/core';
import { SocialService } from "./social.service";

interface Friend {
  name: string;
  likeCount: number;
  enableBtn: boolean;
}

interface Friends {
  name: Friend
}

@Component({
  selector: "app-social",
  template: `<div class="app-wrapper">
    <!-- Implement your solution here -->
    <h1>My Friends</h1>
    <h3 *ngIf="failureMessage">{{failureMessage}}</h3>
    <ul>
      <li *ngFor="let frnd of topFriends" attr.data-test-id="li-{{frnd.name}}">
        <span>{{frnd.name}} </span>
        <button #someVar attr.data-test-id ="button-{{frnd.name.toLowerCase()}}" (click)="updateLikes(frnd)" >Like {{frnd.likeCount}}</button>
      </li>
    </ul>
  </div>`,
})

export class SocialComponent implements AfterViewInit {
  public topFriends: any[] = [];
  public friends: any[] = [];
  public failureMessage: string = '';
  public enableButton: boolean = true;
  @ViewChild('someVar') el: ElementRef;

  constructor(public socialSrv: SocialService) {
    this.friends = this.socialSrv.getFriends().body.friends;
    this.friends.sort((a, b) => b.likeCount - a.likeCount);

    for (let i = 0; i < 5; i++) {
      let temp = {
        name: this.friends[i].name,
        likeCount: this.friends[i].likeCount,
        enableBtn: true
      }
      this.topFriends.push(temp);
    }

    console.log(`top friends: ${JSON.stringify(this.topFriends)}`)

  }
  ngAfterViewInit(): void {
    this.el.nativeElement.setAttribute('disabled', true);
  }

  updateLikes(frnd: any): number {
    let likes = this.socialSrv.likeFriend(frnd.name);
    frnd.likeCount = likes;
    frnd.enableBtn = false;

    this.topFriends.sort((a,b) => b.likeCount - a.likeCount)

    return likes;
  }



}
