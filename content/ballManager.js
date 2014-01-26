var ballManager = (function ballManager() {

    var ballList = [];

    return {
        addBall: function(pXPos, pYPos) {
            var body = $(document.createElement("div"));
            body.addClass("ball");

            $("body").append(body);

            $(body).drags();

            var gravityAccel = 1;

            var curBall = {
                body: body,
                xPos: pXPos,
                yPos: pYPos,
                update: function (petList) {
                    if (this.body.hasClass("draggable")) {
                        this.xPos = this.body.position().left;
                        this.yPos = this.body.position().top;
                        gravityAccel = 1;
                    }
                    else {
                        var maxFallHeight = $(window).height() - this.body.height();
                        // loop through pets and check collisions on heads.
                        var foundHead = false;
                        for (var i = 0; i < petList.length; i++) {
                            var curPet = petList[i];
                            var petX = curPet.xPos;
                            var petY = curPet.yPos;
                            var petWidth = curPet.body.width();

                            if (petX - petWidth / 2 < this.xPos && petX + petWidth / 2 > this.xPos) {
                                if (petY < this.yPos + this.body.height()) {
                                    curPet.currentlyOccupied = true;
                                    console.log("GEtting happier!");
                                    curPet.happinessLevel += .025;
                                    if (curPet.happinessLevel > .5) {
                                        curPet.setStateBasedOnNeeds();
                                    }

                                    gravityAccel = -gravityAccel;
                                    this.yPos -= this.yPos + this.body.height() - petY;

                                    foundHead = true;
                                    break;
                                }
                                else if (petY < this.yPos + this.body.height() + 50)
                                {
                                    curPet.setAnimation(sprites.pandaJump);
                                }
                            }
                        }

                        if (this.yPos < maxFallHeight || gravityAccel < 0)
                        {
                            this.yPos += gravityAccel += 0.2;
                        }
                        else if (gravityAccel > 10) {
                            gravityAccel = -gravityAccel;
                        }
                        else {
                            this.yPos = maxFallHeight;
                            gravityAccel = 1;
                        }
                        }


                        this.body.css("left", this.xPos + "px");
                        this.body.css("top", this.yPos + "px");
                    }
                }

            ballList.push(curBall);
        },
        update: function(petList) {
            for (var i = 0; i < ballList.length; i++) {
                ballList[i].update(petList);
            }
        }
    }
}());

