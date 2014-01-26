var bedManager = (function bedManager() {

    var bedList = [];

    return {
        addBed: function(pXPos, pYPos) {
            console.log("addBed called");
            var body = $(document.createElement("div"));
            body.addClass("bed");

            $("body").append(body);

            $(body).drags();

            var gravityAccel = 1;

            var curBed = {
                body: body,
                xPos: pXPos,
                yPos: pYPos,
                update: function (petList) {
                    if (this.body.hasClass("draggable")) {
                        this.xPos = this.body.position().left;
                        this.yPos = this.body.position().top;
                    }
                    else {
                        var maxFallHeight = $(window).height() - this.body.height();
                        // loop through pets and check collisions on heads.
                        for (var i = 0; i < petList.length; i++) {
                            var curPet = petList[i];
                            var petX = curPet.xPos;
                            var petY = curPet.yPos;
                            var petWidth = curPet.body.width();
                            var left = this.xPos - this.body.width() / 2;
                            var right = this.xPos + this.body.width() / 2;

                            //when pet collides with bed:
                            if (Math.abs(this.xPos - petX) < 30 &&
                                Math.abs(this.yPos - petY) < 30) {
                                console.log("Sleeping!");
                                var eatStartTime = new Date().getTime();
                                var currentTime = new Date().getTime()
                                curPet.setState(PetState.SLEEPING);

                                window.setTimeout( function() {i
                                    console.log("Done sleeping!")
                                    $(".bed").remove();
                                    var newEnergy = curPet.energyLevel + 0.2;
                                    if(newEnergy > 1)
                                        curPet.energyLevel = 1;
                                    else
                                        curPet.energyLevel = newEnergy;
                                    curPet.setStateBasedOnNeeds();
                                }, 6000);
                            }
                        }

                        if (this.yPos < maxFallHeight) {
                            this.yPos += gravityAccel += .02;;
                        }
                        else {
                            this.yPos = maxFallHeight;
                        }
                    }


                    this.body.css("left", this.xPos + "px");
                    this.body.css("top", this.yPos + "px");
                }
            }

            bedList.push(curBed);
        },
        update: function(petList) {
            for (var i = 0; i < bedList.length; i++) {
                bedList[i].update(petList);
            }
        }
    }
}());


