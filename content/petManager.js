// petManager.js contains all pets and has
// a global update function that updates all pets.

var petManager = (function petManager() {
    var petList = [];
    var leftXBound = 0;
    var rightXBound = $(window).width();
    var tabStatus = 'CUR'; // Options are 'CUR', 'LEFT', and 'RIGHT'

    function checkXBounds(pet) {
        if (pet.xPos === undefined || pet.yPos === undefined)
            return;
        if ((pet.xPos + pet.body.width()) < leftXBound) {
            // console.log('WE ARE NOW LEFT ' + pet.xPos);
            tabStatus = 'LEFT';
        }
        else if (pet.xPos > rightXBound) {
            // console.log('WE ARE NOW right ' + pet.xPos);
            tabStatus = 'RIGHT';
        }
        else {
            tabStatus = 'CUR';
        }
    }

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
        checkXBounds(pet);
        window.khNodes.removeIntersecting(pet.xPos + pet.body.width() / 2, pet.yPos + 
            pet.body.height() / 2, 45, function() {return true;});
    }

    function resetMoveTime(pet) {
        var randTime = (Math.random() * 2 + 2) * 1000;
        window.setTimeout(function() {
            var randNum = Math.random();
            if(randNum < 0.33)
            {
                pet.currentMoveState = MovementState.LEFT;
                pet.body.spState(2);
                pet.body.spStart();
            }
            else if(randNum < 0.66)
            {
                pet.currentMoveState = MovementState.RIGHT;
                pet.body.spState(1);
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
                defaultMoveSpeed: moveSpeed,
                moveSpeed: moveSpeed,
                update: function () {
                    switch (this.currentPetState) {
                        case PetState.WANDERING:
                            this.moveSpeed = this.defaultMoveSpeed;
                            updateMove(this);
                            break;
                        case PetState.SLEEPING:
                            pet.body.spState(3);
                            pet.body.spStart();
                            break;
                        case PetState.TIRED:
                            this.moveSpeed = this.defaultMoveSpeed/2.0;
                            pet.body.spState(4);
                            pet.body.spStart();
                            updateMove(this);
                            break;
                        case PetState.EATING:
                            pet.body.spState(5);
                            pet.body.spStart();
                            break;
                        case PetState.HUNGRY:
                            pet.body.spState(6);
                            pet.body.spStart();
                            break;
                        case PetState.PLAYING:
                            pet.body.spState(7);
                            pet.body.spStart();
                            updateMove(this);
                            break;
                        case PetState.NAUGHTY:
                            pet.body.spState(8);
                            pet.body.spStart();
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
        },
        setList: function(list) {
            petList = list;
        },
        getList: function() {
            return petList;
        }
    }
}());
