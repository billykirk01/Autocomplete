import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public snackBar: MatSnackBar) { }

  myControl: FormControl = new FormControl();

  textAreaText: string = "";

  inputText: string = "";

  options = [];

  sortedOptions = [];

  filteredSortedOptions: Observable<string[]>;

  refreshList() {
    this.filteredSortedOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    var inputArray = this.inputText.split(" ")
    var interestWord = inputArray[inputArray.length - 1]
    var filteredList = this.sortedOptions.filter(option =>
      option[0].toLowerCase().indexOf(interestWord.toLowerCase()) === 0);

    if (val.substring(val.length - 1, val.length) == " ") {
      return [];
    }
    else {
      return filteredList
    }
  }

  trainModel() {

    if (this.textAreaText != "") {
      this.openSnackBar("Model trained")
    }

    this.options = this.textAreaText
      .replace(/[^a-zA-Z '-]/g, "")
      .toLowerCase()
      .split(' ');

    var wordCounts = {}

    for (let word of this.options) {
      if (!wordCounts[word]) {
        wordCounts[word] = 1;
      } else {
        wordCounts[word]++;
      }
    }

    var items = Object.keys(wordCounts).map(function (key) {
      return [key, wordCounts[key]];
    });

    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    this.sortedOptions = items;

    this.refreshList();
  }

  selected(selection: String) {
    var array = this.inputText.split(" ")
    var matchText = array.pop()
    if (array.length == 0) {
      if (/^[A-Z]/.test(matchText)) {
        return selection.charAt(0).toUpperCase() + selection.slice(1);
      }
      else {
        return selection
      }
    }
    else {
      if (/^[A-Z]/.test(matchText)) {
        console.log("this the culprit" + matchText)
        return array.join(" ") + " " + selection.charAt(0).toUpperCase() + selection.slice(1);
      }
      else {
        return array.join(" ") + " " + selection
      }

    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 1000,
    });
  }

}
