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
                        var foundHead = false;
                        for (var i = 0; i < petList.length; i++) {
                            var curPet = petList[i];
                            var petX = curPet.xPos;
                            var petY = curPet.yPos;
                            var petWidth = curPet.body.width();
                            var left = this.xPos - this.body.width() / 2;
                            var right = this.xPos + this.body.width() / 2;
                            var EATING_TIME = 5000;

                            //when pet collides with bowl:
                            if( Math.abs(this.xPos - petX) < 50){
                                console.log("Getting full!");
                                var eatStartTime = new Date().getTime();
                                var currentTime = new Date().getTime()
                                curPet.setState(PetState.EATING);
                                
                                window.setTimeout( function() {i
                                    console.log("DONE EATING");
                                    $(".bowl").remove();
                                    var newHunger = curPet.hungerLevel + 0.2;
                                    if(newHunger > 1)
                                        curPet.hungerLevel = 1;
                                    else
                                        curPet.hungerLevel = newHunger;
                                    curPet.setStateBasedOnNeeds();
                                }, EATING_TIME);
                            }
                        }

	                        if (this.yPos < maxFallHeight)
	                        {
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

            bowlList.push(curBowl);
        },
        update: function(petList) {
            for (var i = 0; i < bowlList.length; i++) {
                bowlList[i].update(petList);
            }
        }
    }
}());


