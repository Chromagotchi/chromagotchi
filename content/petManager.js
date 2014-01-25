// petManager.js contains all pets and has
// a global update function that updates all pets.

var petManager = (function petManager() {

    var petList = [];

    function updateMove(pet) {
        switch (pet.currentMoveState) {
            case MovementState.LEFT:
                console.log("L");
                pet.xPos -= pet.moveSpeed;
                break;
            case MovementState.RIGHT:
                console.log("R");
                pet.xPos += pet.moveSpeed;
                break;
            default:
            //don't move
        }
    }

    function resetMoveTime(pet) {
        var randTime = (Math.random() * 2 + 2) * 1000;
        window.setTimeout(function() {
            var randNum = Math.random();
            if(randNum < 0.33)
            {
                pet.currentMoveState = MovementState.LEFT;
                pet.body.spState(2);
                console.log("Left");
                pet.body.spStart();
            }
            else if(randNum < 0.66)
            {
                pet.currentMoveState = MovementState.RIGHT;
                pet.body.spState(1);
                console.log("Right");
                pet.body.spStart();
            }
            else
            {
                pet.currentMoveState = MovementState.STOP;
                pet.body.spStop(1);
            }
            resetMoveTime(pet);
        }, randTime);
    }

    return {
        updatePetColors: function(color) {
            for (var i=0; i<petList.length; i++) {
                var curPet = petList[i];
                curPet.body.css("background-color", color);
            }
        },
        addPet: function(pXPos, moveSpeed) {
            var body = $(document.createElement("div"));
            body.addClass("pet");

            $("body").append(body);

            body.sprite({fps: 12, no_of_frames: 3});

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
