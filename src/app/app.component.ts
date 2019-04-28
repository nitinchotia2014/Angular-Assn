import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Assignment';
    values: any;
    results: any;
    sortedresults: any;
    results2: any;
    username: string;
    details: any;
    types: any;
    order: any;
    reverse: boolean = false;
    sortType: string = 'login';
    detailsview: boolean = true;

    // results2 = [
    //     { name: 1, language: 2 },
    //     { name: 3, language: 4 },
    //     { name: 5, language: 6 },
    //     { name: 7, language: 8 },
    //     { name: 9, language: 10 }        
    // ]; 

    constructor(private http: HttpClient) { 
        this.types = ['Sort By A-Z', 'Sort by Z-A', 'Sort by Rank (Asc)', 'Sort by Rank (Desc)'];
        this.order = {
            type: 'Sort By A-Z'    
        }
    }

    filterChanged(selectedValue:string){
        console.log('value is ', selectedValue);
        if (selectedValue == 'Sort By A-Z') {
            this.sortType = 'login';
            this.reverse = false;
        } else if (selectedValue == 'Sort by Z-A') { 
            this.sortType = 'login';
            this.reverse = true;
        } else if (selectedValue == 'Sort by Rank (Asc)') { 
            this.sortType = 'score';
            this.reverse = false;
        } else if (selectedValue == 'Sort by Rank (Desc)') { 
            this.sortType = 'score';
            this.reverse = true;
        }
    }

    search(event: any) {
        this.values = event.target.parentElement.previousSibling.value;
        return this.http.get('https://api.github.com/search/users?q=' + this.values)
            .subscribe(
                (response) => { 
                    this.results = response.items;
                    console.log(this.results);
                },
                (error) => console.log(error)
            );
            
    }

    detailsView(i, e) { 
        console.log(i);
        this.details = i;
        this.detailsview = !this.detailsview;
        this.username = e.login;
        return this.http.get('https://api.github.com/users/' + this.username + '/repos')
            .subscribe(
                (response) => { 
                    this.results2 = response;
                    // console.log(this.results2);
                },
                (error) => console.log(error)
            );
    }
}
