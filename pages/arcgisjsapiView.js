/*global*/

(function() {
  'use strict';

  window.ArcgisjsapiView = function() {
    /**
     * @function cleanup
     * Perform any cleanup that needs to happen to stop rendering the current model.
     * This is called right before the active engine for the preview window is switched.
     */
    this.cleanup = function() {
      console.log('arcgisjsapi-cleanup');
      window.vscode.postMessage({
        command: 'showWarningMessage',
        message: 'arcgisjsapi-cleanup'
      });
    };
    this.startPreview = function() {
      var rootPath = document.getElementById('gltfRootPath').textContent;
      var fileName = document.getElementById('gltfFileName').textContent;
      console.log('arcgisjsapi-startPreview: ' + rootPath + fileName);
      window.vscode.postMessage({
        command: 'showWarningMessage',
        message: 'arcgisjsapi-startPreview: ' + rootPath + fileName
      });
      require([
        'esri/Map',
        'esri/views/SceneView',
        'esri/layers/GraphicsLayer',
        'esri/Graphic'
      ], function(Map, SceneView, GraphicsLayer, Graphic) {

        var view = new SceneView({
          container: 'arcgisjsapiDiv',
          map: new Map({
            ground: {
              navigationConstraint: {
                type: 'none'
              },
              opacity: 0
            }
          }),
          ui: {
            components: []
          },
          qualityProfile: 'high',
          environment: {
            background: {
              type: 'color',
              color: [30, 30, 30, 1]
            },
            starsEnabled: false,
            atmosphereEnabled: false
          }
        });

        var graphicsLayer = new GraphicsLayer();
        // point at the Head Quarter of khronos group (Beaverton, USA -> https://www.khronos.org/about/contact/)
        var point = {
          type: 'point', // autocasts as new Point()
          x: -122.791595,
          y: 45.452292,
          z: 0
        };

        var url = rootPath + fileName;
        var gltfSymbol = {
          type: 'point-3d',
          symbolLayers: [
            {
              type: 'object',
              resource: {
                href: url
              }
            }
          ]
        };

        var pointGraphic = new Graphic({
          geometry: point,
          symbol: gltfSymbol
        });

        graphicsLayer.add(pointGraphic);
        view.map.add(graphicsLayer);

        view.when(function() {
          graphicsLayer.when(function() {
            view.goTo(
              {
                target: graphicsLayer.graphics,
                tilt: 60
              },
              {
                animate: false
              }
            );
          });
        });
      });
    };
  };
})();
