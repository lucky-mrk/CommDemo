/* eslint-disable no-console */
import { LightningElement, track, wire,api } from 'lwc';
import getLatestProperty from '@salesforce/apex/PropertyDetails.getLatestProperty';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin} from 'lightning/navigation';
import getSearchedProperty from '@salesforce/apex/PropertyDetails.getSearchedProperty';
import getUserInfo from '@salesforce/apex/PropertyDetails.getUserInfo';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
 
export default class MyPropertyResult extends NavigationMixin (LightningElement) {
    @track properties;
    @track propOwnerId;
    @track feedbackPropertyId;
    @track propertiesFound;
    @track propId;
    @track payowner;
    @track paymId ;
    @track openOwnerDetails = false;
    @track OpenEnquiryDetails = false;
    @track openPropertyDetails = false;
   @track locFilter;
   @track bedroomFilter;
   @track bathroomFilter;
   @track budgetFilter;
   @track statusFilter;
   @track propertyId;
   @track isButtonDisabled = false;

   @wire(getUserInfo, {}) 
    userData({ error, data }) {
        if(data) {
            if(data.Profile.Name !== "System Administrator" && data.Profile.Name !== "Customer") {    
                this.isButtonDisabled = true;
            }
        } else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }
   
    @wire(getLatestProperty)
    wiredProperties({data,error}){
        if(data){
            this.properties = data;
            this.propertiesFound = true;
        }
        else if(error){
            this.showToast('Error',error.body.message,'error');
           this.propertiesFound = false;
        }
    }
    get propertiesFound() {
        if (this.properties) {
            return true;
        }
        return false;
    }
    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant:variant,
        });  
        this.dispatchEvent(evt);  
    }
    ownerDetailsClick(event){
       
        this.propOwnerId = event.target.value;
        this.openOwnerDetails = true;
    }
    closeOwenerDetails(){
        this.openOwnerDetails=false;    
    }
    feedbackClicked(event){
       
        this.feedbackPropertyId = event.target.value;
        this.OpenEnquiryDetails = true;
    }
    feedbackDetails(){
        this.OpenEnquiryDetails = false;
    }
    navigationClicked(event){
       
        this.feedbackPropertyId = event.target.value;
        this.OpenPropertyDetails = true;
    }
    PropertyDetails(){
        this.OpenPropertyDetails = false;
    }
    
   /* NavigateToPropDetails(event){
        this.propId = event.target.value;
 
        console.log('Inside this.propId' + this.propId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.propId,
                objectApiName: 'Property__c',
                actionName:'view'

            },
            
        });
    }*/
    NavigateToPropDetails(event){
        this.propId = event.target.value;
    let cmpDef = {
        componentDef: "c:myMasterPropertyTab",
        attributes: {
            propertyId :this.propId
        }
      };
  
      let encodedDef = btoa(JSON.stringify(cmpDef));
      this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
          url: "/one/one.app#" + encodedDef
        }
      });}

      NavigateToBuy(event){
        this.paymId = event.target.value;
    let cmpDef = {
        componentDef: "c:payment",
        attributes: {
            propertyId :this.paymId ,
        
        }
      };
  
      let encodedDef = btoa(JSON.stringify(cmpDef));
      this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
          url: "/one/one.app#" + encodedDef
        }
      });}

    
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        registerListener("handelLocFilterChange", this.handelLocFilterChange,this) ;
        registerListener("handelBedRoomChange", this.handelBedRoomChange, this);
        registerListener("handelBathRoomFilterChange", this.handelBathRoomFilterChange, this);
        registerListener("handelBudgetFilterChange", this.handelBudgetFilterChange, this);
        registerListener("handelStatusFilterChange", this.handelStatusFilterChange, this);
         
    }
    disconnectedCallback(){
        unregisterAllListeners(this);    
    }
    handelLocFilterChange(locchange){
        this.locFilter = locchange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom : this.bedroomFilter,
            bathroom :this.bathroomFilter,
            maxbudget: this.budgetFilter,
            status:this.statusFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error =>{
            this.showToast('ERROR',error.body.message,'error');
        });
    }
    handelBedRoomChange(bedroomChange){
        this.bedroomFilter = bedroomChange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter ,
            status:this.statusFilter   
        })
        .then(result => {
               this.properties = result;
        })
        .catch(error => {
            this.showToast('ERROR', error.body.message, 'error');
        });
    }
    handelBathRoomFilterChange(bathroomChange){
        this.bathroomFilter = bathroomChange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter,
            status:this.statusFilter
        })
            .then(result => {
                this.properties = result;
            })
            .catch(error => {
                this.showToast('ERROR', error.body.message, 'error');
            });
    }
    handelBudgetFilterChange(budgetChange){
        this.budgetFilter = budgetChange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter,
            status:this.statusFilter
        })
            .then(result => {
                this.properties = result;
            })
            .catch(error => {
                this.showToast('ERROR', error.body.message, 'error');
            });
    }
    handelStatusFilterChange(statusChange){
        this.statusFilter = statusChange;
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter,
            status:   this.statusFilter
        })
            .then(result => {
                this.properties = result;
            })
            .catch(error => {
                this.showToast('ERROR', error.body.message, 'error');
            });
    }
    
    
}