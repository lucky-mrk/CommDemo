public with sharing class fieldsView{
    public fieldsView() {

    }
    @AuraEnabled(Cacheable=true)  
    public static list<FieldPermissions> getFields(String objName){
            
        return [SELECT Parent.Name, Field, PermissionsRead, PermissionsEdit FROM FieldPermissions WHERE SObjectType =: objName limit 10];
    }
}
