// petManager.js contains all pets and has
// a global update function that updates all pets.

var petManager = (function petManager() {

    var petList = [];
    var leftXBound = 0;
    var rightXBound = $(window).width();
    var tabStatus = 'CUR'; // Options are 'CUR', 'LEFT', and 'RIGHT'
    var actionExecuted = false;

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
        updateMove(pet);
        if (pet.currentMoveState === MovementState.STOP) {
            if (!actionExecuted)
            {
                // Be naughty...
                console.log("Gonna be naughty");
                if (Math.random() < .33)
                {
                    pet.setAnimation(sprites.pandaGrab);
                    $(obtainSingleTextToken(pet)).addClass("eatenText");
                }
                else if (Math.random() < .67)
                {
                    pet.setAnimation(sprites.pandaGrab);
                    var count = Math.floor(Math.random() * 3) + 1;
                    for (var i = 0; i < count; i++)
                    {
                        $(obtainSingleTextToken(pet)).addClass("eatenText");
                    }
                }
                actionExecuted = true;
            }
        }
        else
            actionExecuted = false;
    }

    function updateNaughty(pet) {
        updateMove(pet);
        if (pet.currentMoveState === MovementState.STOP) {
            if (!actionExecuted)
            {
                // Be naughty...
                console.log("Gonna be naughty");
                if (Math.random() < .33)
                {
                    pet.setAnimation(sprites.pandaSwat);
                    $(obtainSingleTextToken(pet)).addClass("whackedText");
                }
                else if (Math.random() < .67)
                {
                    pet.setAnimation(sprites.pandaSwat);
                    var count = Math.floor(Math.random() * 3) + 1;
                    for (var i = 0; i < count; i++)
                    {
                        $(obtainSingleTextToken(pet)).addClass("whackedText");
                    }
                }
                actionExecuted = true;
            }
        }
        else
            actionExecuted = false;
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
                pet.setAnimation(sprites.pandaWalkLeft);
            }
            else if(randNum < 0.66)
            {
                pet.currentMoveState = MovementState.RIGHT;
                pet.setAnimation(sprites.pandaWalkRight);
            }
            else
            {
                pet.currentMoveState = MovementState.STOP;
                pet.setAnimation(sprites.pandaWave);
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
            var bodyHolder = $(document.createElement("div"));
            bodyHolder.addClass("bodyHolder");

            var animationBodies = {};

            for (var key in sprites) {
                var obj = sprites[key];
                var objInfo = sprites[key].info;

                var body = $(document.createElement("div"));

                body.css("background-image", objInfo.dir)
                    .css("width", objInfo.width)
                    .css("height", objInfo.height)
                    .addClass("pet hiddenPet")
                    .sprite(obj.animation);

                $(bodyHolder).append(body);

                animationBodies[obj.info.dir] = body;
            }

            $(bodyHolder).drags();

            var gravityAccel = 1;

            var curPet = {
                body: bodyHolder,
                animationBodies: animationBodies,
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
                currentlyOccupied: false,
                setAnimation: function(anim) {
                    for (var key in animationBodies) {
                        var animationBody2 = animationBodies[key];
                        if (animationBody2 !== this.animationBodies[anim.info.dir])
                        {
                            animationBody2.addClass("hiddenPet");
                        }
                    }
                    var animationBody = this.animationBodies[anim.info.dir];
                    animationBody.removeClass("hiddenPet");
                    animationBody.spStart();
                },
                playAnimation: function() {
                    $(this.body).spStart();
                },
                setStateBasedOnNeeds: function() {
                    var badNeedSet = false;

                    if (this.happinessLevel < .5)// + Math.random() * 3)
                    {
                        if(this.happinessLevel < 0)
                            this.happinessLevel = 0;
                        this.currentPetState = PetState.NAUGHTY;
                        badNeedSet = true;
                    }
                    else if (this.happinessLevel > 1)
                        this.happinessLevel = 1;
                    if (this.hungerLevel < .5)// + Math.random() * 3)
                    {
                        if(this.hungerLevel < 0)
                            this.hungerLevel = 0;
                        this.currentPetState = PetState.HUNGRY;
                        badNeedSet = true;
                    }
                    else if (this.hungerLevel > 1)
                        this.hungerLevel = 1;
                    if (this.energyLevel < .5)// + Math.random() * 3)
                    {
                        if(this.energyLevel < 0)
                            this.energyLevel = 0;
                        this.currentPetState = PetState.TIRED;
                        badNeedSet = true;
                    }
                    else if (this.energyLevel > 1)
                        this.energyLevel = 1;
                    if (!badNeedSet)
                        this.currentPetState = this.lastCalmState;
                },
                update: function () {
                    switch (this.currentPetState) {
                        case PetState.WANDERING:
                            this.moveSpeed = this.defaultMoveSpeed;
                            updateMove(this);
                            break;
                        case PetState.SLEEPING:
                            break;
                        case PetState.TIRED:
                            this.moveSpeed = this.defaultMoveSpeed / 2;
                            updateMove(this);
                            break;
                        case PetState.EATING:
                            break;
                        case PetState.HUNGRY:
                            updateHunger(this);
                            break;
                        case PetState.PLAYING:
                            if (!this.currentlyOccupied)
                                updateMove(this);
                            break;
                        case PetState.NAUGHTY:
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
                },

                setState: function(state) {
                    this.currentPetState = state;
                }
            };

            curPet.setAnimation(sprites.pandaWave);

            $("body").append(bodyHolder);

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

//                    thisPet.energyLevel -= Math.random() / 10;
                    thisPet.hungerLevel -= Math.random() / 10;
                    thisPet.happinessLevel -= Math.random() / 10;

                    // If we're in a good state...
                    if (thisPet.currentPetState < 6) {
                        thisPet.setStateBasedOnNeeds();
                    }
                    console.log("Energy: " + thisPet.energyLevel + " Hunger: " + thisPet.hungerLevel + " Happiness: " + thisPet.happinessLevel);
                    console.log("Current Pet State: " + thisPet.currentPetState);
                }
            }, 10000);
        }
    }
}());
