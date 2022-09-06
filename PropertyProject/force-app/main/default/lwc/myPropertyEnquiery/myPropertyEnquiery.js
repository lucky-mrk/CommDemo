import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin} from 'lightning/navigation';
export default class MyPropertyEnquiery extends NavigationMixin (LightningElement){
    @api objectName;
    @api propertyId;
 
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: "Feedback Submitted",
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
