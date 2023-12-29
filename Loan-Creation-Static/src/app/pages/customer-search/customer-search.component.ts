import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/core/services/loan-data.service';
import { states, customerStatus, customerType } from '../modules/loan-creation/Static data/static';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']

})
export class CustomerSearchComponent implements OnInit {
  customerDetails: any
  customer: any = []
  custData: any;
  Mobile: any;
  custCode: any;
  houseName: any;
  searchText = '';
  filtereddataArray: any = [];
  states: any[] = [];
  customerStatus: any = [] = [];
  customerType: any[] = [];
  isVisible: boolean = false;
  isCollapsed: boolean = true;
  createdLoanData: any[] = [];
  signLoader: boolean = false;

  isModalVisible: boolean = false;
  showList: boolean = false;
  hoveredRowIndex: number | null = null;
  searchKeywords: any
  // items: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  tooltipTitle = "Description";
  tooltipText = "A transmission is a machine in a transmission system, which provides controlled application of the power. A transmission is a machine in a transmission system, which provides controlled application of the power.";
  data = "A transmission is a machine in a transmission system, which provides controlled application of the power"
  dtTrigger: Subject<any> = new Subject();
  headingArray: any[] = [
    {
      title: 'Customer Info',
      sort: false
    },
    {
      title: 'Active Loans',
      sort: false
    }, {
      title: 'Transactions',
      sort: false
    }, {
      title: 'Descriptions',
      sort: false
    }, {
      title: 'Actions',
      sort: false,
    },
  ]
  advancedSearchForm: FormGroup;
  initialAdvancedFormValues: any;

  constructor(public dialogRef: MatDialogRef<CustomerSearchComponent>, private localStorageService: LocalStorageService, private toastr: ToastrService,  private formBuilder: FormBuilder,) {
    this.advancedSearchForm = this.formBuilder.group({
      CustomerType: new FormControl('Customer Type'),
      CustomerStatus:new FormControl('Customer Status'),
      State: new FormControl('State'),
      RoadLaneArea: new FormControl(''),
      OrganizationLevel: new FormControl('Organization Level'),
      OrgUnitCode: new FormControl(''),
      OrganizationUnit: new FormControl('')
    });
  }
  ngOnInit() {
    //storing customer details to local storage//Sajana
    this.initialAdvancedFormValues = this.advancedSearchForm.value;
    this.states = states;
    this.customerStatus = customerStatus;
    this.customerType = customerType;
    // this.localStorageService.clearLocalStorage();
    this.createdLoanData = this.localStorageService.getDataFromLocalStorage()
    if (!this.createdLoanData.length) {
      this.customer = [
        {
          riskType: 'High', 
          code: 655,
          name: 'Ajay',
          profile: "assets/images/users/avatar-8.jpg",
          address: 'puthiyaveedu ullor trivandram kerala',
          mobile: '9567965316',
          biometric: 'pending',
          adhar: 'verified',
          crm_code: 'ID-4897852458',
          pan: 'verified',
          ActiveLoans:
          {
            id: ['0012/4789/2023 (MSL)', '0012/4789/2023 (AAA)', '0012/4789/2023 (MHL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Medium',
          code: 656,
          name: 'midhunlal M M',
          profile: "assets/images/users/avatar-8.jpg",
          address: 'lal bavans , kannur kerala',
          mobile: '9567965318',
          biometric: 'pending',
          adhar: 'verified',
          crm_code: 'ID-4897852359',
          pan: 'verified',
          ActiveLoans:


          {
            id: []
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Low',
          code: 325,
          name: 'Krishna Kumar',
          profile: "assets/images/users/avatar-2.jpg",
          address: 'Suite 804 3526 Douglas Green, Jaskolskiville, IN 21832-8',

          mobile: '9567965317',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852459',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', ' new loan', 'Repay']

          , Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'High',
          code: 999,
          name: 'Boby jose',
          profile: "assets/images/users/avatar-2.jpg",
          address: 'Suite 754 4131 Kisha Tunnel, Lake Kurtisstad, MI 82596',
          mobile: '9567965318',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852456',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', ' new loan', 'Repay']

          , Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Medium',
          code: 698,
          name: 'Rajesh kumar reddy andres',
          profile: "assets/images/users/avatar-4.jpg",
          address: 'Suite 885 675 Leonora Port, East Gonzaloberg, MN 31389-4995',
          mobile: '9567965319',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852455',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', ' new loan', 'Repay']

          , Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Low',
          code: 845,
          name: 'Midhunlal',
          profile: "assets/images/users/avatar-3.jpg",
          address: 'Apt. 619 470 Sara Camp, Port Carloshire, DE 38878',
          mobile: '9567965320',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852451',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', ' new loan', 'Repay']

          , Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'High',
          code: 452,
          name: 'George',
          profile: "assets/images/users/avatar-3.jpg",
          address: 'Suite 882 7480 Coleman Ferry, East Julissaport, HI 74204',
          mobile: '9567965321',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852450',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Medium',
          code: 701,
          name: 'Rahul',
          profile: "assets/images/users/avatar-4.jpg",
          address: 'Suite 882 7480 Kollam Ferry, Wesr Julissaport, HI 7987',
          mobile: '8281400428',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852460',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Low',
          code: 702,
          name: 'Priya',
          profile: "assets/images/users/avatar-5.jpg",
          address: 'Suite 7897 7480 kannur Ferry, South Julissaport, HI 111',
          mobile: '8281457428',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897855460',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Low',
          code: 705,
          name: 'Maya',
          profile: "assets/images/users/avatar-6.jpg",
          address: 'Suite 589 987 londin Ferry, Western Julissaport, HI 7987',
          mobile: '8281400427',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4895852460',
          pan: 'verified',
          ActiveLoans:

          {
            id: []
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ]
        },
        {
          riskType: 'Medium',
          code: 704,
          name: 'Boby ',
          profile: "assets/images/users/avatar-7.jpg",
          address: 'Suite 778 7480 Kollam Ferry, Julissaport, HI 7987',
          mobile: '8281470428',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-48978558460',
          pan: 'verified',
          ActiveLoans:

          {
            id: [' 0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ]
        },
        {
          riskType: 'Low',
          code: 705,
          name: 'Basil',
          profile: "assets/images/users/avatar-8.jpg",
          address: 'Suite 882 5898 thrissur Ferry, Wesr Julissaport, HI 7987',
          mobile: '8885400428',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4887850460',
          pan: 'verified',
          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],


        },
        {
          riskType: 'Medium',
          code: 150,
          name: 'Bass therifiertete',
          profile: "assets/images/users/avatar-3.jpg",
          address: 'Apt. 592 27827 White Shoal, East Mortonmouth, KS 42808-4984',
          mobile: '9889251120',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852457',
          pan: 'verified',

          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],

        },
        {
          riskType: 'Low',
          code: 167,
          name: 'Ned kumaaaaaaaaar',
          profile: "assets/images/users/avatar-3.jpg",
          address: '89981 Danyell Shoals, South Spencerview, NM 61392',
          mobile: '9889251120',
          biometric: 'verified',
          adhar: 'verified',
          crm_code: 'ID-4897852457',
          pan: 'verified',

          ActiveLoans:

          {
            id: ['0012/4789/2023 (MSL)']
          },


          type: ['closure', 'Top Up', 'Renewal', ' new loan', 'Repay'],

          Description: [
            {
              points: ['PEP Status is Good', 'Is the Muthoot Employee', 'points: PEP Status is Good']
            },
          ],


        },
      ]
      this.localStorageService.saveDataToLocalStorage(this.customer)
    }
  }

  dtOptions: any = {
    pagingType: 'full_numbers',
    searching: false,
    pageLength: 10,
    info: true,
    ordering: false,
    paging: true,
    select: true,
    language:
    {
      searchPlaceholder: 'serach a employee'
    },

    "order": [],
    "columnDefs": [{
      "targets": 'no-sort',
      "orderable": false,
    }],

    colReorder: true,
    lengthMenu: [5, 10, 15, 20],
    columns: this.headingArray,
    responsive: true,
  };

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filtereddataArray.slice(startIndex, endIndex);
  }



  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.currentPage = newPage;
    }
  }

  getPages(): number[] {
    const pageCount = this.totalPages();
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  totalPages(): number {
    return Math.ceil(this.filtereddataArray.length / this.itemsPerPage);
  }

  onKeyup(event: KeyboardEvent) {
    const key = event.keyCode || event.charCode;
    if (key === 13) {
    } else if (
      key === 8 || key === 46 ||
      (key === 8 && 17) ||
      (key === 8 && 16) ||
      (key === 46 && 17)
    ) {
      // this.searchCustomer()
    }

  }
  isNumber(s: any): boolean {
    return !isNaN(Number(s));
  }

  searchCustomer() {
    // Call loader function when search input is valid
    let custName = '';
    let pattern = /^[6-9][0-9]*$/
    if (this.Mobile == undefined || this.Mobile == "") {
      this.searchKeywords = [this.custData, this.Mobile, this.custCode, this.houseName];
    }
    else if (this.Mobile != undefined || this.Mobile != "") {
      if (pattern.test(this.Mobile)) {
        this.searchKeywords = [this.custData, this.Mobile, this.custCode, this.houseName];
      } else {
        this.searchKeywords = [];
        return
      }
    }

    let createdLoanData = this.localStorageService.getDataFromLocalStorage();
    // this.searchKeywords = [this.custData, this.Mobile, this.custCode, this.houseName];
    // Check if at least 3 characters are entered in any search input

    this.loader();
    const minSearchLength = 3;
    const isSearchLengthValid = this.searchKeywords.some((keyword: string | number) => keyword && keyword.toString().length >= minSearchLength);


    if (isSearchLengthValid) {
      this.isVisible = false;
      this.signLoader = true;
      setTimeout(() => {
        this.filtereddataArray = createdLoanData.filter(item => {
          if (this.isNumber(this.custData)) {
            custName = item.code?.toString().toLowerCase(); // Convert to lowercase if it's a number
            this.searchKeywords[0] = parseInt(this.searchKeywords[0]);
          } else {
            custName = item.name?.toLowerCase();
          }
          const mobile_num = item.mobile?.toString().toLowerCase()
          const crm_code = item.crm_code?.toString().toLowerCase();
          const address = item.address?.toLowerCase();

          return (!this.custData || custName.includes(this.searchKeywords[0]?.toString().toLowerCase()))
            && (!this.Mobile || mobile_num.includes(this.searchKeywords[1]?.toLowerCase()))
            && (!this.custCode || crm_code.includes(this.searchKeywords[2]?.toLowerCase()))
            && (!this.houseName || address.includes(this.searchKeywords[3]?.toLowerCase()));

        });
        this.signLoader = false;
        this.isVisible = this.filtereddataArray.length > 0;
        this.dtTrigger.next(null);
      }, 2000)
      
    }
    else if (!isSearchLengthValid) {

      this.isVisible = false;
      this.signLoader = false;
      this.filtereddataArray = [];
      this.toastr.warning('Please enter at least 3 characters in one of the search inputs', 'Info');

    }
    else {
      this.loader(); // Call loader function when search input is valid
      this.isVisible = false;
      this.filtereddataArray = [];
    }


  }

  // mask mobile number ||Ajay
  maskMobileNumber(mobileNumber: string): string {
    const maskedNumber = mobileNumber.slice(0, 3) + '*****' + mobileNumber.slice(8);
    return maskedNumber;
  }

  saveCustomerDetails(customerDetails: any) {
    this.localStorageService.saveCustomer(customerDetails);
    this.localStorageService.setCustomer(customerDetails);
    let customer = this.localStorageService.getCustomer()
    this.dialogRef.close({ data: customer })
  }

  //Function for loader || ajay
  loader() {
    this.isVisible = false;
    this.signLoader = true;
    setTimeout(() => {
      this.signLoader = false;

    }, 2000)
  }

  //Function to show and hide mattooltip for "More" ||Ajay
  showListDiv(index: number): void {
    this.hoveredRowIndex = index;
  }

  hideListDiv(): void {
    this.hoveredRowIndex = null;
  }

  clearForm():void {
    if(this.isCollapsed){
      this.advancedSearchForm.setValue(this.initialAdvancedFormValues);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe the DataTables
    this.dtTrigger.unsubscribe();
  }
}
