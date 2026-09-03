'use strict';
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const mapElement = document.querySelector('gmp-map');

function getCenter(resjson) {
    let minLat=-300,maxLat=300;
    let minLng=-300,maxLng=300;
    for (let i = 0; resjson.ary.length > i; ++i) {
        if (minLat>resjson.ary[i].lat) {
            minLat=resjson.ary[i].lat;
        } else if (maxLat<resjson.ary[i].lat) {
            maxLat=resjson.ary[i].lat;
        }
        if (minLng>resjson.ary[i].lng) {
            minLng=resjson.ary[i].lng;
        } else if (maxLng<resjson.ary[i].lng) {
            maxLng=resjson.ary[i].lng;
        }
    }
    let lat = (maxLat-minLat)/2;
    let lng = (maxLng-minLng)/2;
    return lat,lng;
}

async function init() {
    const fname="https://museumhokudai.github.io/testPosition.json";
    try {
        const res=await fetch(fname);
        if (res.ok) {
            const [{ AdvancedMarkerElement }] = await Promise.all([
                google.maps.importLibrary('marker'),
                google.maps.importLibrary('maps'),
            ]);
            const resjson=await res.json();
            let cLat,cLng=getCenter(resjson);
            console.log(cLat,cLng);
            for (let i = 0; resjson.ary.length > i; ++i) {
                console.log(resjson.ary[i]);
                mapElement.append(new AdvancedMarkerElement(resjson.ary[i]));
            }
            mapElement.zoom=8;
            mapElement.innerMap.setOptions({
                center:{lat:cLat,lng:cLng}
            });
            console.log(mapElement.center);
            console.log(mapElement.center.lat);
            console.log(mapElement.center.lng);
            /*
            mapElement.center.lat=0;
            mapElement.center.lng=0;
            */
        } else {
            console.log("not ok");
        }
    } catch (error) { 
        console.error(error.message);
    }

    /*
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
    */
}

void init();
