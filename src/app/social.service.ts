import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SocialService {
  public getFriends() {
    return {
      "body": {
        "friends": [
          {
            "name": "John",
            "likeCount": 5
          },
          {
            "name": "Mary",
            "likeCount": 9
          },
          {
            "name": "Elon",
            "likeCount": 12
          },
          {
            "name": "Jeff",
            "likeCount": 2
          },
          {
            "name": "Sophie",
            "likeCount": 15
          },
          {
            "name": "Mia",
            "likeCount": 3
          }
        ]
      }
    }
  }

  public likeFriend(name: string): number {
    let likes: number;

    switch(name) {
      case 'Sophie':
        likes = 9;
        break;
      case 'Elon':
        likes = 13;
        break;
      case 'Mary':
        likes = 10;
        break;
      case 'John':
        likes = 7;
        break;
      case 'Mia':
        likes = 4;
        break;
      default:
        likes = 0;
        break;
    }

    return likes;
  }
}