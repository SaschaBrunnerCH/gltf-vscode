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
                var map = new Map({
                    basemap: 'dark-gray'
                });

                var view = new SceneView({
                    container: 'arcgisjsapiDiv',
                    map: map,
                    camera: {
                        tilt: 60,
                        position: {
                            latitude: 45.32855,
                            longitude: -122.791595,
                            z: 9000 // altitude in meters
                        }
                    }
                });
                console.log(view);

                var graphicsLayer = new GraphicsLayer();
                // point at the Head Quarter of khronos group (Beaverton, USA -> https://www.khronos.org/about/contact/)
                var point = {
                    type: 'point', // autocasts as new Point()
                    x: -122.791595,
                    y: 45.452292,
                    z: 1000
                };

                //var url = rootPath + fileName;
                var gltfSymbol = {
                    type: 'point-3d',
                    symbolLayers: [
                        {
                            type: 'object',
                            width: 1000,
                            height: 1000,
                            resource: {
                                primitive: 'sphere'
                                //href: url
                            },
                            material: {
                                color: 'white'
                            }
                        }
                    ]
                };

                var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: gltfSymbol
                });

                graphicsLayer.add(pointGraphic);
                map.add(graphicsLayer);
            });
        };
    };
})();
