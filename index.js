'use strict';
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const mapElement = document.querySelector('gmp-map');

async function init() {
    // Request needed libraries.
    const [{ AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('marker'),
        google.maps.importLibrary('maps'),
    ]);

    const marker = new AdvancedMarkerElement({
        position: { lat: 43.07279381676491, lng: 141.34222381221747 },
    });
    const marker2 = new AdvancedMarkerElement({
        position: { lat: 43.068632, lng: 141.350516 },
    });
    mapElement.append(marker2);
    mapElement.append(marker);

    const posTbl = [position:{43.065866, 141.362682},
                    position:{43.062961, 141.353696},
                    position:{43.064740, 141.346918},
                    ];
    for (let i = 0; posTbl.length > i; ++i) {
        console.log(position[i]);
        mapElement.append(new AdvancedMarkerElement({position[i]});
    }
        
}

void init();
