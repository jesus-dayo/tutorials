var app = angular.module('app', ['ui.grid','ui.grid.pagination']);
  
app.controller('StudentCtrl', ['$scope','StudentService', function ($scope,StudentService) {
   var paginationOptions = {
     pageNumber: 1,
	 pageSize: 5,
	 sort: null
   };	
	
   StudentService.getStudents(paginationOptions.pageNumber,
		   paginationOptions.pageSize).success(function(data){
	  $scope.gridOptions.data = data.content;
 	  $scope.gridOptions.totalItems = data.totalElements;
   });
   
   $scope.gridOptions = {
    paginationPageSizes: [5, 10, 20],
    paginationPageSize: paginationOptions.pageSize,
    useExternalPagination: true,
    enableColumnMenus:false,
    columnDefs: [
      { name: 'studentId' },
      { name: 'name' },
      { name: 'gender' },
      { name: 'age' }
    ],
    onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          paginationOptions.pageNumber = newPage;
          paginationOptions.pageSize = pageSize;
          StudentService.getStudents(newPage,pageSize).success(function(data){
        	  $scope.gridOptions.data = data.content;
         	  $scope.gridOptions.totalItems = data.totalElements;
          });
        });
     }
  };
  
}]);

app.service('StudentService',['$http', function ($http) {
	
	function getStudents(pageNumber,size) {
        return  $http({
          method: 'GET',
          url: 'student/get?page='+pageNumber+'&size='+size
        });
    }
	
    return {
    	getStudents:getStudents
    };
	
}]);
