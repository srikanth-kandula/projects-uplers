import { Component } from "@angular/core";
//import { catchError, map, tap } from 'rxjs/operators';
import { SocialService } from "./social.service";

interface Friend {
  name: string;
  likeCount: number;
  enableBtn: boolean;
}

@Component({
  selector: "app-social",
  template: ` <div class="app-wrapper">
    <h1>My Friends</h1>
    <h3 *ngIf="failureMessage">{{failureMessage}}</h3>
    <ul>
      <li *ngFor="let frnd of topFriends" attr.data-test-id="li-{{frnd.name}}">
        <span>{{frnd.name}} </span>
        <button attr.data-test-id ="button-{{frnd.name.toLowerCase()}}" (click)="updateLikes(frnd)" [disabled]="!frnd.enableBtn" >Like {{frnd.likeCount}}</button>
      </li>
    </ul>
  </div> `,
})
export class SocialComponent {

  public topFriends: any[] = [];
  public friends: any[] = [];
  public failureMessage: string = '';
  public enableButton: boolean = true;

  constructor(public socialSrv: SocialService) {

    this.socialSrv.getFriends().subscribe(
      response => {
        console.log(`getFriends-response: ${JSON.stringify(response)}`);

        if (response.status === 200) {
          this.friends = response.body.friends;
          this.friends.sort((a, b) => b.likeCount - a.likeCount);

          for (let i = 0; i < 5; i++) {
            let frn = {
              name: this.friends[i].name,
              likeCount: this.friends[i].likeCount,
              enableBtn: true
            }
            this.topFriends.push(frn);
          }
        }

        console.log(`getFriends-topFriends: ${JSON.stringify(this.topFriends)}`);
      },
      error => {
        console.log(`getFriends-error: ${JSON.stringify(error)}`);
        this.failureMessage = "Fetching friends has failed";
      }
    );

  }

  updateLikes(frnd: Friend): number {
    let likes: number;
    this.socialSrv.likeFriend(frnd.name).subscribe(
      response => {
        console.log(`response-likeFriend: ${JSON.stringify(response)}`);
        if (response.status === 200) {
          likes = response.body.likeCount;
          frnd.likeCount = likes;
          frnd.enableBtn = false;
          this.topFriends.sort((a, b) => b.likeCount - a.likeCount);
        }

        console.log(`topFriends-likeFriend: ${JSON.stringify(this.topFriends)}`);
      },
      error => {
        console.log(`error-likeFriend: ${JSON.stringify(error)}`);
        this.failureMessage = "Liking friend has failed";
      }
    );

    return likes;
  }

}
