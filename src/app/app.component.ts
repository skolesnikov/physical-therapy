import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pageTitle: string = 'Physical Therapy Professional Center';
  address: string = "17B Firstfield Rd., Ste. 105, Gaithersburg, MD 20878";
  phone: string = "301-990-1449";
  fax: string = "301-990-1016";
  email: string = "info@ptpro.comcastbiz.net";
  website: string = "PhysicalTherapyProCenter.com";
}
