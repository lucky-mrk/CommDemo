public with sharing class totalAmount {
    @AuraEnabled(cacheable=true)
    public static Property__c methodName(string sid){
        string is= sid;
        Property__c p = [select id , Total__c from Property__c where id=: is];
        return p;
    }
}
    
