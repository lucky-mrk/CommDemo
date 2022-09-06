import { LightningElement,api } from 'lwc';
 
export default class MyPropertyDetails extends LightningElement {
    @api property;
    @api propertyFound;
}