import { LightningElement,api } from 'lwc';
 import
export default class MyPropertyPricing extends LightningElement {
    @api property;
    @api propertyFound;
}