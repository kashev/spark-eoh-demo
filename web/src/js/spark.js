/*
 * spark-eoh-demo
 * Kashev Dalmia - kashev.dalmia@gmail.com
 */


var app = angular.module('sparkEohDemo', ['firebase']);

app.controller('sparkController',
               ['$scope', '$firebaseObject', '$http', function($scope, $firebaseObject, $http){
    angular.element(document).ready(function(){
        $scope.number_top_spacers = 5;
        $scope.number_leds = 8;
        $scope.number_bottom_spacers = 1;

        $scope.total_rows = ($scope.number_top_spacers +
                             $scope.number_leds +
                             $scope.number_bottom_spacers + 1);
        $scope.spark_height = document.getElementById("spark-img").height;
        $scope.table_row_height = ('' +
                                   $scope.spark_height / $scope.total_rows +
                                   'px');

        $scope.getNumber = function(num) {
            return new Array(num);
        };

        var ref = new Firebase("https://spark-eoh-demo.firebaseio.com/");
        var sync_object = $firebaseObject(ref);
        sync_object.$bindTo($scope, "data");

        $scope.ledNumber = function(num){
            return $scope.number_leds - num - 1;
        };

        $scope.toggleLed = function(led_pin){
            $scope.data[led_pin] = !$scope.data[led_pin];
            var url = "https://api.spark.io/v1/devices/53ff70065075535143191087/led";
            var access_token = "ec20aa7394c5178500f6395b9a03190e15f65c6b";
            var params = led_pin + ',';
            if ($scope.data[led_pin]) {
                params += 'HIGH';
            } else {
                params += 'LOW';
            }

            /*
             * TODO: I cannot figure out for the life of me why jQuery works
             *       here, but Angular does not. In an ideal world, Angular's
             *       $http would be used instead of $.ajax.
             */

            // $http({
            //     method: 'POST',
            //     url: url,
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     params: {
            //         'access_token':access_token,
            //         'params' : params
            //     }
            // }).success(function(){}).error(function(){});

            $.ajax({
                  type: "POST",
                  url: url,
                  data: {
                    'access_token': access_token,
                    'params' : params
                },
                  success: function(){},
                  error: function(){},
                  dataType: "application/x-www-form-urlencoded"
            });
        };
    });
}]);
