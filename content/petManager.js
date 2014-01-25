// petManager.js contains all pets and has
// a global update function that updates all pets.

MovementState = {
    LEFT : 0,
    RIGHT : 1,
    STOP : 2
}

var petManager = (function petManager() {

    var petList = [];

    function resetMoveTime(pet) {
        var randTime = (Math.random()*2 + 2)*1000;
        console.log("randTime: "+randTime);
        window.setTimeout(function() {
            var randNum = Math.random();
            console.log("randNum: "+randNum);
            if(randNum < 0.33)
            {
                pet.currentState = MovementState.LEFT;
            }
            else if(randNum < 0.66)
            {
                pet.currentState = MovementState.RIGHT;
            }
            else
            {
                pet.ccurrentState = MovementState.STOP;
            }
            resetMoveTime(pet);
        }, randTime);
    }

    return {
        addPet: function(pXPos, moveSpeed) {
            var body = $(document.createElement("div"));
            body.addClass("pet");

            $("body").append(body);

            $(body).click(function() {
                $(body).css('background-color', 'blue');
            });

            var curPet = {
                body: body,
                currentState: MovementState.STOP,
                xPos: pXPos,
                moveSpeed: moveSpeed,
                update: function () {
                    switch (this.currentState) {
                        case MovementState.LEFT:
                            this.xPos -= this.moveSpeed;
                            break;
                        case MovementState.RIGHT:
                            this.xPos += this.moveSpeed;
                            break;
                        default:
                        //don't move
                    }
                    $(this.body).css("left", this.xPos + "px");
                }
            };

            resetMoveTime(curPet);

            petList.push(curPet)
        },
        update: function() {
            for (var i = 0; i < petList.length; i++) {
                petList[i].update();
            }
        }
    }
}());