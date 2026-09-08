'use strict';
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const mapElement = document.querySelector('gmp-map');

function getCenter(resjson) {
    let minLat=300,maxLat=-300;
    let minLng=300,maxLng=-300;
    for (let i = 0; resjson.ary.length > i; ++i) {
        if (minLat>resjson.ary[i].position.lat) {
            minLat=resjson.ary[i].position.lat;
        }
        if (maxLat<resjson.ary[i].position.lat) {
            maxLat=resjson.ary[i].position.lat;
        }
        if (minLng>resjson.ary[i].position.lng) {
            minLng=resjson.ary[i].position.lng;
        }
        if (maxLng<resjson.ary[i].position.lng) {
            maxLng=resjson.ary[i].position.lng;
        }
    }
    let lat = minLat+(maxLat-minLat)/2;
    let lng = minLng+(maxLng-minLng)/2;
    return [lat,lng];
}

// 中心座標を求めて、そこから一番近いポイントをセンターに置く
function getCenter2(resjson) {
    let x,y,len;
    [x,y]=getCenter(resjson);
    len =99999999999999;
    for (let i = 0; resjson.ary.length > i; ++i) {
        let dx = x-json.ary[i].position.lat;
        let dy = y=json.ary[i].position.lng;
        let l = Math.sqrt((dx*dx)+(dy*dy));
        if (len > l) {
            idx=i;
            len = l;
        }
    }
    return [json.ary[idx].position.lat,json.ary[idx].position.lng];
}


async function init() {
    // URLのパラメータから 'file' の値を取得
    const urlParams = new URLSearchParams(window.location.search);
    const fname = urlParams.get('file');
    if (fname) {
        try {
            const res=await fetch(fname);
            if (res.ok) {
                const [{ AdvancedMarkerElement }] = await Promise.all([
                    google.maps.importLibrary('marker'),
                    google.maps.importLibrary('maps'),
            ]);
                const resjson=await res.json();
                let [cLat,cLng]=getCenter2(resjson);
                for (let i = 0; resjson.ary.length > i; ++i) {
                    mapElement.append(new AdvancedMarkerElement(resjson.ary[i]));
                }
                mapElement.innerMap.setOptions({
                    center:{lat:cLat,lng:cLng}
                });
            } else {
                console.log("not ok");
            }
        } catch (error) { 
            console.error(error.message);
        }
    } else {
        console.error("no file");
    }
}

void init();
