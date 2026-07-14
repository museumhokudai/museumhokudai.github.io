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
        position: { lat: 43.0910415, lng: 141.3457667 },
    });
    mapElement.append(marker);
    const marker2 = new AdvancedMarkerElement({
        position: { lat: 44.0910415, lng: 141.3457667 },
    });
    mapElement.append(marker2);
}

void init();
