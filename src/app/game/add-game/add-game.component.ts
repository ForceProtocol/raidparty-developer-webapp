import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  addGameForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addGameForm = this.fb.group({});
  }

  ngOnInit() {
  }

}
