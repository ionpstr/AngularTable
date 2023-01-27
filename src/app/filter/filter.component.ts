import { Component } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  inputText: string = '';
  selectedType: String[] = [];
  selectedAzienda: String[] = [];
  dataFilter: any;
  types: any;
  azienda: String[];
  constructor(public dataService: DataService) {
    this.dataFilter = dataService.data;
    this.types = Object.keys(dataService.data);
    this.azienda = dataService.azienda;
  }
  handleInput($event: Event) {
    const e = $event.target as HTMLInputElement;
    this.inputText = e.value;
    this.dataService.filter(
      this.inputText,
      this.selectedType,
      this.selectedAzienda
    );
  }
  handleSelectAzienda(event: Event) {
    const e = event.target as HTMLSelectElement;
    const options = Array.from(e.options);
    let values = [];
    for (let i of options) {
      if (i.selected) {
        values.push(i.value);
      }
    }
    this.selectedAzienda = values;
    this.dataService.filter(
      this.inputText,
      this.selectedType,
      this.selectedAzienda
    );
  }
  handleSelectType(event: Event) {
    const e = event.target as HTMLSelectElement;
    const options = Array.from(e.options);
    let values = [];
    for (let i of options) {
      if (i.selected) {
        values.push(i.value);
      }
    }
    this.selectedType = values;
    this.dataService.filter(
      this.inputText,
      this.selectedType,
      this.selectedAzienda
    );
  }
}
