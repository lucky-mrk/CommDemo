import { LightningElement, api,track ,wire} from 'lwc';
import methodName from '@salesforce/apex/totalAmount.methodName';
import pic from '@salesforce/resourceUrl/QR';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin} from 'lightning/navigation';
export default class MyPropertyEnquiery extends NavigationMixin (LightningElement){
    @api objectName;
    @api propertyId;
   
      pic2=pic;

    @wire(methodName , {sid : '$propertyId'} )
    wiredProperties({data,error}){
        
        if(data){
            this.properties = data;
           
        }
        else if(error){
            this.showToast('Error',error.body.message,'error');
           
        }
    }
 
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: "Payment Completed ",
            message: "Success",
            variant: "success"
        });
        this.dispatchEvent(evt);
    }
    cancelHanlder(){
        const fieldArr = this.template.querySelectorAll('lightning-input-field');
        if(fieldArr){
            fieldArr.forEach(field=>{
                field.reset();
            });
        }
    }

   navigateToMainPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                apiName: 'Property_Result'
            }
        });
    }
}
