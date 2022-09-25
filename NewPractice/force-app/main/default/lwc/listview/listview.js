import { LightningElement ,track ,wire} from 'lwc';
//import myGetList from '@salesforce/apex/ListView.myGetList';
import getObject from '@salesforce/apex/ListView.getObject';
import { NavigationMixin} from 'lightning/navigation';

export default class Listview extends NavigationMixin(LightningElement) {

@track data;
@track nameobj;
   /* @track columns = [
        { label: 'Id', fieldName: 'Id',  hideDefaultActions : 'true'}, 
        { label: 'Name', fieldName: 'Name', type: 'text', hideDefaultActions : 'true'}];*/


        @track columns = [
            { label: 'Id', fieldName:'Id',hideDefaultActions : 'true'},
           
            { label: 'SobjectType', fieldName: 'SobjectType', type: 'button', sortable: "true", hideDefaultActions : 'true',
            typeAttributes: { label: { fieldName: 'SobjectType' }, target: '_blank', name: 'recLink', variant: 'Base' },
            },
            { label: 'PermissionsRead',type:'text', fieldName: 'PermissionsRead',hideDefaultActions : 'true'},
            { label: 'PermissionsCreate',type:'Boolean', fieldName: 'PermissionsCreate',hideDefaultActions : 'true'},
            { label: 'PermissionsDelete',type:'Boolean', fieldName: 'PermissionsDelete',hideDefaultActions : 'true'},
            { label: 'PermissionsViewAllRecords',type:'Boolean', fieldName: 'PermissionsViewAllRecords',hideDefaultActions : 'true'},
            { label: 'PermissionsModifyAllRecords',type:'Boolean', fieldName: 'PermissionsModifyAllRecords',hideDefaultActions : 'true'}
        ];

        @wire(getObject)
        wiredListView({data,error}){
            console.log(data);
            if(data){
                this.data = data;
                console.log(this.data);
               // nameobj = data.SobjectType ;
            }
            else if(error){
                this.data = undefined;
            }
        }

        fetchrecord(event) {
            const actionName = event.detail.action.name;
            console.log('actionName' + JSON.stringify(actionName));
            const row = event.detail.row;
            // this.orderidvalue = row[this.Name];
            // console.log('orderidvalue' + this.orderidvalue);
            console.log('row' + JSON.stringify(row));
    
            //alert(row.Id);
            switch (actionName) {
                case 'recLink':
    
                   /* this[NavigationMixin.Navigate]({
                        type: 'standard__objectPage',
                        attributes: {
                            objectName : row.SobjectType,
                            objectApiName: 'ElixirSuite__Prescription_Order__c',
                            actionName: 'list',
                        }*/
                         //alert(row.SobjectType);
                        let cmpDef = {
                            componentDef: "c:relatedfieldlistview",
                            attributes: {
                                objectApiName : row.SobjectType
                            }
                          };
                      
                          let encodedDef = btoa(JSON.stringify(cmpDef));
                          this[NavigationMixin.Navigate]({
                            type: "standard__webPage",
                            attributes: {
                              url: "/one/one.app#" + encodedDef
                            }
                          });
                        
                    break;
    
                default:
                    break;
            }
    }
}

       
        

