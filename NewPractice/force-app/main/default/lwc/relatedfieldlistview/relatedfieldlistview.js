import { LightningElement,wire,track ,api} from 'lwc';
import getFields from '@salesforce/apex/fieldsView.getFields';

export default class Relatedfieldlistview extends LightningElement {
@track data;
@api objectApiName;
    @track columns = [
        { label: 'Field', fieldName:'Field' , type: 'text',hideDefaultActions : 'true'},
        
        { label: 'PermissionsRead',type:'text', fieldName: 'PermissionsRead',hideDefaultActions : 'true'},
        { label: 'PermissionsEdit',type:'text', fieldName: 'PermissionsEdit',hideDefaultActions : 'true'}
       
    ];
     

    @wire(getFields , {objName: '$objectApiName'})
    wiredFields({data,error}){
        if(data){
            this.data = data;
            console.log(this.data);
           
        }
        else if(error){
            this.data = undefined;
        }
    }

}