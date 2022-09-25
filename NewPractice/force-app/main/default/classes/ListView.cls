public with sharing class ListView {
    public ListView() {

    }

    @AuraEnabled(Cacheable=true)
    public static list<Account> myGetList(){
        return [select id , Name from Account];
    }
            @AuraEnabled(Cacheable=true)  
            public static list<objectPermissions> getObject(){
                return [SELECT Id, SObjectType,PermissionsRead,PermissionsCreate,PermissionsDelete,PermissionsViewAllRecords,PermissionsModifyAllRecords, Parent.label, Parent.IsOwnedByProfile
        FROM ObjectPermissions
        WHERE (ParentId
        IN (SELECT PermissionSetId
        FROM PermissionSetAssignment
        WHERE Assignee.Name = 'Chris Christino')) limit 10];
            }


            @AuraEnabled
            public static list<FieldPermissions> getFields(){
                return [SELECT Parent.Name, Field, PermissionsRead, PermissionsEdit FROM FieldPermissions WHERE SObjectType =: 'Account'];
            }
        }
