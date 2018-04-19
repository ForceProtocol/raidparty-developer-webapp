import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

const IMAGE_FORMATS = ["png", "jpg", "jpeg"];
const PLATFORMS = [{ name: "ios", link: "", selected: false }, { name: "android", link: "", selected: false },
{ name: "pc", link: "", selected: false },
{ name: "playstation", link: "", selected: false }, { name: "xbox", link: "", selected: false }];

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
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
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
    PLATFORMS.forEach((pf) => {
      (this.addGameForm.get('platforms') as FormArray).push(this.createItem(pf));
    })
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }

  createForm() {

    this.addGameForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      avatar: [],
      platforms: this.fb.array([])
    });
  }

  create() {
    if(!this.isPlatformSelected()) {
      this.toaster.error('Please Selected any of the platform from the list', 'Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      return;
    }
    this.addGameForm.value.avatar = this.fileData

    this.gameService.create(this.addGameForm.value)
      .subscribe((data: any) => {
        this.toaster.success('Success', "Your game added", {
          timeOut: 3000,
          positionClass: "toast-top-right"
        });
        this.router.navigate(['/game/added'], { queryParams: { gameId: data.gameId } });
      },
        (errorObj) => {
          this.toaster.error('Error', errorObj.error.err, {
            timeOut: 3000,
            positionClass: "toast-top-center"
          });
        })
  }

  createItem(pf): FormGroup {
    return this.fb.group({
      name: pf.name,
      link: [pf.link, this.isValidLink(pf.name)],
      selected: pf.selected
    });
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
      if (IMAGE_FORMATS.includes(this.fileData.type.split('/')[1])) {
        this.imageFormatError = false;
        const reader = new FileReader();
        this.readFile(this.fileData, reader, (result) => {
          const image = document.createElement('img');
          image.src = result;
          this.imageUrl = result;
          image.onload = () => {
            if (image.width < 250 || image.height < 250 || image.width > 500 || image.height > 500) {
              this.toaster.error('Error', 'Avtar image resolution should be between 250 x 250 and 500 x 500', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              });
            }
          };
        });
      } else {
        this.imageFormatError = true;
      }
    }
  }

  readFile(file, reader, callback) {
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    };

    // Read the file
    reader.readAsDataURL(file);
  }

  isValidLink(platformName: boolean) {
    return (input: FormControl) => {
      let selectedPlatform = this.addGameForm.value.platforms.filter((pf) => pf.name == platformName)[0]
      if (selectedPlatform && selectedPlatform.selected) {
        let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);
        return input.value.match(regex) ? null : { linkInvalid: true }
      } else {
        return null
      }
    };
  }

  isPlatformSelected() {
    return this.addGameForm.value.platforms.filter((pf) => pf.selected).length > 0;
  }
}
