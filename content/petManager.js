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

    function obtainSingleTextToken(pet) {
        var token = window.khNodes.removeIntersecting(pet.xPos + pet.body.width() / 2, pet.yPos + pet.body.height() / 2, 45);
        if (token)
        {
            var newToken = token.el.cloneNode(true);

            $("body").append($(newToken));

            $(newToken).css("position", "absolute")
                .css("left", token.left - 10 + "px")
                .css("top", token.top - 10 + "px");

            return newToken;
        }
    }

    function updateHunger(pet) {
        if (Math.random() > .99)
        {
            $(obtainSingleTextToken(pet)).addClass("eatenText");
        }
    }

    function updateNaughty(pet) {
        if (Math.random() > .99)
        {
            $(obtainSingleTextToken(pet)).addClass("whackedText");
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

    function setStateBasedOnNeeds(thisPet) {
        if (thisPet.energyLevel < .5)// + Math.random() * 3)
            thisPet.currentPetState = PetState.TIRED;
        else if (thisPet.hungerLevel < .5)// + Math.random() * 3)
            thisPet.currentPetState = PetState.HUNGRY;
        else if (thisPet.happinessLevel < .5)// + Math.random() * 3)
            thisPet.currentPetState = PetState.NAUGHTY;
        else
            thisPet.currentPetState = thisPet.lastCalmState;
    }

    return {
        updatePetColors: function(color) {
            for (var i=0; i<petList.length; i++) {
                var curPet = petList[i];
                curPet.body.css("background-color", color);
            }
        },
        addPet: function(pXPos, moveSpeed) {
            var startTime = new Date().getTime();
            var body = $(document.createElement("div"));
            body.addClass("pet");

            $("body").append(body);

            body.sprite({fps: 12, no_of_frames: 3});

            $(body).drags();

            var gravityAccel = 1;

            var curPet = {
                body: body,
                currentPetState: PetState.WANDERING,
                currentMoveState: MovementState.STOP,
                lastCalmState: PetState.WANDERING,
                xPos: pXPos,
                yPos: 300,
                defaultMoveSpeed: moveSpeed,
                moveSpeed: moveSpeed,
                energyLevel: .6,
                hungerLevel: .6,
                happinessLevel:.6,
                //small values used for easier testing
                update: function () {
                    switch (this.currentPetState) {
                        case PetState.WANDERING:
                            this.moveSpeed = this.defaultMoveSpeed;
                            updateMove(this);
                            break;
                        case PetState.SLEEPING:
                            this.body.spState(3);
                            this.body.spStart();
                            break;
                        case PetState.TIRED:
                            this.moveSpeed = this.defaultMoveSpeed / 2;
                            this.body.spState(4);
                            this.body.spStart();
                            updateMove(this);
                            break;
                        case PetState.EATING:
                            this.body.spState(5);
                            this.body.spStart();
                            break;
                        case PetState.HUNGRY:
                            this.body.spState(6);
                            this.body.spStart();
                            updateHunger(this);
                            break;
                        case PetState.PLAYING:
                            this.body.spState(7);
                            this.body.spStart();
                            updateMove(this);
                            break;
                        case PetState.NAUGHTY:
                            this.body.spState(8);
                            this.body.spStart();
                            updateNaughty(this);
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

            $(body).click(function() {
                if (curPet.currentPetState === PetState.TIRED)
                {
                    curPet.energyLevel += .3;
                    setStateBasedOnNeeds(curPet);
                }
                else if (curPet.currentPetState === PetState.HUNGRY)
                {
                    curPet.hungerLevel += .3;
                    setStateBasedOnNeeds(curPet);
                }
                else if (curPet.currentPetState === PetState.NAUGHTY)
                {
                    curPet.happinessLevel += .3;
                    setStateBasedOnNeeds(curPet);
                }
            });
            
            resetMoveTime(curPet);
            petList.push(curPet);
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
        },
        startNeedsSystem: function() {
            window.setInterval(function() {
                for (var i = 0; i < petList.length; i++) {
                    var thisPet = petList[i];

                    thisPet.energyLevel -= Math.random() / 10;
                    thisPet.hungerLevel -= Math.random() / 10;
                    thisPet.happinessLevel -= Math.random() / 10;

                    // If we're in a good state...
                    if (thisPet.currentPetState < 4) {
                        setStateBasedOnNeeds(thisPet);
                    }
                    console.log("Energy: " + thisPet.energyLevel + " Hunger: " + thisPet.hungerLevel + " Happiness: " + thisPet.happinessLevel);
                    console.log("Current Pet State: " + thisPet.currentPetState);
                }
            }, 10000);
        }
    }
}());
