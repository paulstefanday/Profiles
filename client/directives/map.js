import _ from 'lodash';

class CustomMap {

  constructor() {
    this.restrict = 'E';
    this.controllerAs = 'vm';
    this.bindToController = true;
    this.template = `
        <map ng-style="vm.style" zoom="16"
          center="{{ vm.center.latitude }}, {{vm.center.longitude}}"
          draggable="true"
          dragging-cursor="move"
          keyboard-shortcuts="false"
          max-zoom="14"
          min-zoom="6"
          tilt="45"
          disable-default-u-i="true"
          zoom-to-include-markers="auto">

          <bicycling-layer></bicycling-layer>

          <marker animation="DROP" ng-repeat="marker in vm.items" position="{{ marker.latitude }}, {{marker.longitude}}"></marker>

        </map>
    `;

    this.scope = { height:'@', width:'@', feed:'=', markers: '=', position: '@' , center: '=' };

    this.controller = /*@ngInject*/ function($scope){

      this.items = [];

      this.center = { latitude: -33.87, longitude: 151.2 }; // Sydney

      this.style = { width:this.height, height:this.width, position:this.position, float:'left', top: 0, left: 0 };

      $scope.$watchCollection('vm.feed', _.debounce((res) => this.update(res), 500));

      this.update = (res) => _.difference(res, this.items).forEach(item => this.items.push(item))

    }

  }

  link($scope, $element, $attr) { }

}

export default [ 'customMap', CustomMap ]


//http://ngmap.github.io/drawings.html#
//https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/docs/ngMap.map.html
