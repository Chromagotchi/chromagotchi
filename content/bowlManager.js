var bowlManager = (function bowlManager() {

  var bowlList = [];

    return {
        addBowl: function(pXPos, pYPos) {
        	console.log("addBowl called");
            var body = $(document.createElement("div"));
            body.addClass("bowl");

            $("body").append(body);

            $(body).drags();

            var gravityAccel = 1;

            var curBowl = {
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
                            var EATING_TIME = 5000;

                            //when pet collides with bowl:
                            if (!curPet.currentlyEating && Math.abs(this.xPos - petX) < 30 &&
                                Math.abs(this.yPos - petY) < 80) {
                                curPet.currentlyEating = true;
                                console.log("Getting full!");
                                var eatStartTime = new Date().getTime();
                                var currentTime = new Date().getTime()
                                curPet.setState(PetState.EATING);
                                
                                window.setTimeout( function() {
                                    console.log("DONE EATING");
                                    $(".bowl").remove();

                                    var newHunger = curPet.hungerLevel + 0.2;
                                    if(newHunger > 1)
                                        curPet.hungerLevel = 1;
                                    else
                                        curPet.hungerLevel = newHunger;

                                    window.setTimeout(function() {
                                        curPet.setStateBasedOnNeeds();
                                        curPet.currentlyEating = false;
                                    }, 1000);
                                }, EATING_TIME);
                            }
                        }

	                        if (this.yPos < maxFallHeight)
	                        {
	                            this.yPos += gravityAccel += 0.1;
	                        }
	                        else {
	                            this.yPos = maxFallHeight;
	                        }
                        }


                        this.body.css("left", this.xPos + "px");
                        this.body.css("top", this.yPos + "px");
                    }
                }

            bowlList.push(curBowl);
        },
        update: function(petList) {
            for (var i = 0; i < bowlList.length; i++) {
                bowlList[i].update(petList);
            }
        }
    }
}());


