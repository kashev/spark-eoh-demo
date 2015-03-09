/*
 * spark-eoh-demo
 * Kashev Dalmia - kashev.dalmia@gmail.com
 */


var app = angular.module('sparkEohDemo', ['firebase']);

app.controller('sparkController', function($scope, $firebaseObject){
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

            // TODO: send to spark.
        };
    });
});
