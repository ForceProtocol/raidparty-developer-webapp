import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

const IMAGE_FORMATS = ["png", "jpg", "jpeg"];

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  addGameForm: FormGroup;
  fileData: any;
  gameId: any = null;
  imageUrl: string = "assets/images/image.png";
  imageFormatError: boolean = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private toaster: ToastrService,
              private gameService: GameService,
              private activatedRoute: ActivatedRoute ) {
    this.createForm();
  }

  ngOnInit() {
    this.gameId = this.activatedRoute.snapshot.params.gameId;
    if (this.gameId) {
      this.gameService.getGame(this.gameId)
        .subscribe((game) => {
          this.addGameForm.patchValue({
            title: game.title,
            description: game.description,
            platform: game.platform,
            link: game.link
          })
        })
    }
  }

  createForm() {

    this.addGameForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      platform: ['', Validators.required],
      link: ['', Validators.required],
      avatar: []
    });
  }

  create() {
    this.addGameForm.value.avatar = this.fileData
    this.gameService.create(this.addGameForm.value)
      .subscribe((data: any) => {
        this.toaster.success('Success', "Your game added", {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/game/added'], { queryParams: { gameId: data.gameId }});
      },
      (errorObj) => {
        this.toaster.error('Error', errorObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      })
  }

  update() {
    this.gameService.update(this.addGameForm.value, this.gameId)
      .subscribe((data) => {
        this.toaster.success('Success', "Your game updated successfully", {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/games/list']);
      },
      (errorObj) => {
        this.toaster.error('Error', errorObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      })
  }

  upload(fileInput) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileData = fileInput.target.files[0];
      if (IMAGE_FORMATS.includes(this.fileData.type.split("/")[1])) {
        this.imageFormatError = false;
        let reader = new FileReader();

        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
        }

        reader.readAsDataURL(this.fileData);
      } else {
        this.imageFormatError = true;
      }
    }
  }
}
