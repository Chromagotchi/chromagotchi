// petManager.js contains all pets and has
// a global update function that updates all pets.


var petManager = (function petManager() {

    var petList = [];

    function updateMove(pet) {
        switch (pet.currentMoveState) {
            case MovementState.LEFT:
                pet.xPos -= pet.moveSpeed;
                break;
            case MovementState.RIGHT:
                pet.xPos += pet.moveSpeed;
                break;
            default:
            //don't move
        }
    }

    function resetMoveTime(pet) {
        var randTime = (Math.random()*2 + 2)*1000;
        window.setTimeout(function() {
            var randNum = Math.random();
            console.log("randNum: "+randNum);
            if(randNum < 0.33)
            {
                pet.currentMoveState = MovementState.LEFT;
            }
            else if(randNum < 0.66)
            {
                pet.currentMoveState = MovementState.RIGHT;
            }
            else
            {
                pet.currentMoveState = MovementState.LEFT;
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

            });

            $(body).drags();

            var gravityAccel = 1;

            var curPet = {
                body: body,
                currentPetState: PetState.WANDERING,
                currentMoveState: MovementState.STOP,
                xPos: pXPos,
                yPos: 300,
                moveSpeed: moveSpeed,
                update: function () {
                    switch (this.currentPetState) {
                        case PetState.WANDERING:
                            updateMove(this);
                            break;
                        case PetState.SLEEPING:

                        case PetState.TIRED:
                            updateMove(this);
                            break;
                        case PetState.EATING:
                        case PetState.HUNGRY:
                            updateMove(this);
                            break;
                        case PetState.PLAYING:
                            updateMove(this);
                            break;
                        case PetState.NAUGHTY:
                            updateMove(this);
                            break;
                    }
                    if (this.body.hasClass("draggable")) {
                        this.xPos = this.body.position().left;
                        this.yPos = this.body.position().top;
                    }
                    else {
                        var maxFallHeight = $(window).height() - this.body.height();
                        if (this.yPos < maxFallHeight)
                        {
                            this.yPos += gravityAccel += 0.2;
                        }
                        else
                        {
                            this.yPos = maxFallHeight;
                            gravityAccel = 1;
                        }

                        this.body.css("left", this.xPos + "px");
                        this.body.css("top", this.yPos + "px");
                    }
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
