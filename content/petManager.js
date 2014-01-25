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
                $(body).css('background-color', 'blue');
            });

            var curPet = {
                body: body,
                currentPetState: PetState.WANDERING,
                currentMoveState: MovementState.STOP,
                xPos: pXPos,
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
