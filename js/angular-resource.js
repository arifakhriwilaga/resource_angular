var app = angular.module('module_crudapi', ['ngResource']);
app.factory('Employee', function($resource) {
    //auth error server "\xA4" ASCII-8BIT to UTF-8
    //fails convert from ascii to utf
    //use window.btoa() , this method will Creates a base-64 encoded ASCII string from a "string" of binary data
    //because in api server only know this encode (if send via header)
    var auth = window.btoa("arifakhri" + ':' + "12345678");
    var base_url = 'http://localhost:8000/';

    function resRequest(methodType, subDomain) {
        return {
            method : methodType,
            url : base_url + subDomain,
            isArray : false,
            headers : {
                'Authorization' : 'Basic ' + auth,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json; charset=UTF-8',
            },

            params : {
                id      : '@id',
                name    : '@name',
                address : '@address',
                birthday: '@birthday',
                gender  : '@gender',
                email   : '@email'
            
            }
        };
    }


    return $resource('', {}, {
        'index' : resRequest('GET', 'api/employee'),
        'show' : resRequest('GET', 'api/employee/:id'),
        'save' : resRequest('POST', 'api/employee/'),
        'update' : resRequest('PUT', 'api/employee/:id'),
        'destroy' : resRequest('DELETE', 'api/employee/:id'),
    });

});

//// create controller that injected services
var app_employee = angular.module('employeeResource', ['module_crudapi']);
app_employee.controller('employeeCtrl', function($scope, Employee) {
    $scope.employees = {};    
    $scope.save_employee = function() {
        $scope.employees = Employee.save({
            
            name : $scope.employee.name,
            address : $scope.employee.address,
            birthday : $scope.employee.birthday,
            gender : $scope.employee.gender,
            email : $scope.employee.email
        
        });
    };
    $scope.list_employees = function() {
        $scope.employees = Employee.index();
        console.log($scope.employees);
    };
    $scope.show_employee = function(id) {
        $scope.employees = Employee.show({
        id : id

        });
    };
    $scope.update_employee = function(id) {
        $scope.employees = Employee.update({
            id : id,
            name : $scope.employees.employee.name,
            address : $scope.employees.employee.address,
            birthday : $scope.employees.employee.birthday,
            gender : $scope.employees.employee.gender,
            email : $scope.employees.employee.email
        });
    };
    $scope.delete_employee = function(id) {
        if (id == null) {
            id = 0;
        }
        $scope.employees = Employee.destroy({
            id : id
        });
    };
});


