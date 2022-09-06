({
    doinit : function(component, event, helper) {
var myPageRef = component.get("v.pageReference");
var propId =myPageRef.state.c__PropertyId;
component.set("v.propId",propId);
    }
})
