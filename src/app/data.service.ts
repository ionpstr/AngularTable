import { Injectable, OnInit } from '@angular/core';
import { Account } from './account';
import data1 from '../assets/accounts.json';
import { types } from './types';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
    this.data = this.map(data1);
    this.types = Object.keys(this.data);
  }
  data: any;
  azienda: String[] = [];
  filteredData: any = [];
  types: any[] = [];
  map(data: any) {
    let dataMap: any = {};
    let iban: any = {};
    if (data['companies'].length > 0) {
      const abi_code = data['companies'][0]['abi_code'];
      const company_name = data['companies'][0]['company_name'];
      if (data['companies'][0]['functions']) {
        const functions = data['companies'][0]['functions'];

        for (let funct of functions) {
          try {
            if (
              funct['accounts'].length > 0 &&
              funct['accounts'][0].hasOwnProperty('types') &&
              funct['accounts'][0].hasOwnProperty('iban')
            ) {
              for (let i = 0; i < funct['accounts'][0]['types'].length; ++i) {
                let aux = funct['accounts'][0]['types'][i]['type'];
                if (iban.hasOwnProperty(aux)) {
                  if (iban[aux].indexOf(funct['accounts'][0]['iban']) >= 0) {
                    continue;
                  }
                  iban[aux].push(funct['accounts'][0]['iban']);
                } else {
                  iban[aux] = [funct['accounts'][0]['iban']];
                }

                const newAccount = new Account(
                  funct['accounts'][0]['types'][i]['is_default_account'],
                  funct['accounts'][0]['types'][i]['account_naming'],
                  company_name,
                  abi_code,
                  funct['accounts'][0]['iban'],
                  funct['accounts'][0]['types'][i]['alias'],
                  funct['accounts'][0]['types'][i]['currency'],
                  funct['accounts'][0]['types'][i]['type']
                );
                let temp = funct['accounts'][0]['types'][i]['type'];
                for (let [key, item] of Object.entries(types)) {
                  if (item.includes(funct['accounts'][0]['types'][i]['type'])) {
                    temp = types[key as keyof typeof types][0];
                  }
                }

                if (this.azienda.indexOf(company_name) < 0) {
                  this.azienda.push(company_name);
                }
                if (dataMap.hasOwnProperty(temp)) {
                  dataMap[temp].push(newAccount);
                } else {
                  dataMap[temp] = [newAccount];
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    this.data = dataMap;
    this.filteredData = dataMap;
    console.log(this.data);

    return dataMap;
  }
  filter(inputText: string, selectedType: String[], selectedAzienda: String[]) {
    this.filteredData = Object.create(this.data);
    if (inputText) {
      for (let key of Object.keys(this.data)) {
        this.filteredData[key] = this.filteredData[key].filter((item: any) => {
          return (
            item?.iban?.toUpperCase().includes(inputText.toUpperCase()) ||
            item?.alias?.toUpperCase().includes(inputText.toUpperCase())
          );
        });
      }
    }
    if (selectedType.length > 0) {
      for (let key of Object.keys(this.data)) {
        this.filteredData[key] = this.filteredData[key].filter((item: any) =>
          selectedType.includes(item?.type)
        );
      }
    }
    if (selectedAzienda.length > 0) {
      for (let key of Object.keys(this.data)) {
        this.filteredData[key] = this.filteredData[key].filter((item: any) =>
          selectedAzienda.includes(item?.company_name)
        );
      }
    }
  }
}
