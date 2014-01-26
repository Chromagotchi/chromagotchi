var sprites = (function sprites() {

    return {
        pandaWave: {
            info: {
                dir: "url(http://blakethiessen.com/images/chromogotchi/pandaWave.png)",
                width: "120px",
                height: "138px"
            },
            animation: {
                no_of_frames: 16,
                fps: 6,
                on_last_frame: function(obj) {
                    obj.spStop(true);
                }
            }
        },
        pandaWalkLeft: {
            info: {
                dir: "url(http://blakethiessen.com/images/chromogotchi/pandaWalkLeft.png)",
                width: "97px",
                height: "146px"
            },
            animation: {
                no_of_frames: 8,
                fps: 6
            }
        },
        pandaWalkRight: {
            info: {
                dir: "url(http://blakethiessen.com/images/chromogotchi/pandaWalkRight.png)",
                width: "97px",
                height: "146px"
            },
            animation: {
                no_of_frames: 8,
                fps: 6
            }
        },
        pandaJump: {
            info: {
                dir: "url(http://blakethiessen.com/images/chromogotchi/pandaJump.png)",
                width: "127px",
                height: "163px"
            },
            animation: {
                no_of_frames: 8,
                fps: 6,
                on_last_frame: function(obj) {
                    obj.spStop(true);
                }
            }
        },
        pandaGrab: {
            info: {
                dir: "url(http://blakethiessen.com/images/chromogotchi/pandaGrab.png)",
                width: "132px",
                height: "144px"
            },
            animation: {
                no_of_frames: 13,
                fps: 6,
                on_last_frame: function(obj) {
                    obj.spStop(true);
                }
            }
        },
        pandaSwat: {
            info: {
                dir: "url(http://blakethiessen.com/images/chromogotchi/pandaSwat.png)",
                width: "127px",
                height: "139px"
            },
            animation: {
                no_of_frames: 11,
                fps: 6,
                on_last_frame: function(obj) {
                    obj.spStop(true);
                }
            }
        }
    }
}());

