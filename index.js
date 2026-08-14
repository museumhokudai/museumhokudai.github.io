'use strict';
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const mapElement = document.querySelector('gmp-map');

async function readStream(inFile) {
    console.log("readStream come");
    const fs = require("fs");
    const server = require("http").createServer();
    server.on("request", (req, res) => {
        const readable = fs.createReadStream(inFile);
        readable.pipe(res);
    console.log(readable);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
}

async function init() {
    // Request needed libraries.
    const [{ AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('marker'),
        google.maps.importLibrary('maps'),
    ]);

    readStream("test-file.txt");

    const marker = new AdvancedMarkerElement({
        position: { lat: 43.07279381676491, lng: 141.34222381221747 },
    });
    const marker2 = new AdvancedMarkerElement({
        position: { lat: 43.068632, lng: 141.350516 },
    });
    mapElement.append(marker2);
    mapElement.append(marker);

    const posTbl = [{position:{lat:43.065866, lng:141.362682},},
                    {position:{lat:43.062961, lng:141.353696},},
                    {position:{lat:43.064740, lng:141.346918},},
                    ];
    for (let i = 0; posTbl.length > i; ++i) {
        console.log(posTbl[i]);
        mapElement.append(new AdvancedMarkerElement(posTbl[i]));
    }
}

void init();
