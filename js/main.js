
QuizGame.Models.Question = Backbone.Model.extend({

    defaults: {
        "operation":  "+",
        "level":  1,
        "guess": NaN,
        "correct": null
    },

    initialize: function() {
        var that = this;

        if(!this.get("numbers")){
            this.generateNumbers(this.get("level"));
        }

        this.generateExpression();

        this.on('change:guess', function() {
            that.validate();
        });
    },

    validate: function() {
        var that = this;
        var guess = this.attributes.guess;
        if(guess === 0 || guess) {

            if (!this.attributes.answer) {
                this.caclulateAnswer();
            }

            // for multi digits give them a chance to keep typing
            if(this.attributes.answer > 9 && guess < 9){

                setTimeout(function(){
                    if(that.attributes.guess == guess){
                        that.checkAnswer();
                    }
                }, 3300);
            }
            else{
                this.checkAnswer();
            }
        }
    },

    checkAnswer: function() {
        this.set({correct: (this.attributes.guess == this.attributes.answer)});
    },

    caclulateAnswer: function() {
        var operation = this.attributes.operation;
        var answer = this.attributes.numbers.reduce(function(a, b) {
            if(operation == "+"){
                return a + b;
            }
            else{
                return a - b;
            }
        })

        this.set({answer:answer});
    },

    generateExpression: function() {
        this.set({"expression": this.get("numbers").join(" "+ this.get("operation") + " ") + " ="});
    },

    generateNumbers: function(level) {
        var numbers = [];
        var numberLevel = 1;

        switch(level) {
            case 4:
                // Hard Addition, normal Addition, subtraction, or 3 easy addition numbers
                var sublevel = Math.floor((Math.random() * 4) + 1);
                switch(sublevel) {
                    case 4:
                        // Addition, 3 Numbers 1 through 5
                        this.generateAdditionNumbers(3, 1);
                        break;
                    case 3:
                        // Subtraction
                        this.set({"operation":"-"});
                        var first = this.generateNumber(2);
                        numbers.push(first);
                        numbers.push(Math.floor((Math.random() * first) + 1));
                        this.set({numbers: numbers});
                        break;
                    case 2:
                        // Addition, 2 Numbers 1 through 10
                        this.generateAdditionNumbers(2, 2);
                        break;
                    case 1:
                        // Addition Numbers 1 through 10
                        this.generate2AdditionNumbers();
                        break;
                    default: this.set({numbers: numbers});;
                }

                break;
            case 3:
                // Addition and some subtraction
                var sublevel = Math.floor((Math.random() * 2) + 1);
                if(sublevel == 1){
                    this.generate2AdditionNumbers();
                }
                else{
                    this.set({"operation":"-"});
                    var first = this.generateNumber(2);
                    numbers.push(first);
                    numbers.push(Math.floor((Math.random() * first) + 1));
                    this.set({numbers: numbers});
                }
                break;
            case 2:
                // Addition Numbers 1 through 10
                this.generate2AdditionNumbers();
                break;
            case 1:
                // Addition Numbers 1 through 5
                this.generateAdditionNumbers(2, 1);
                break;
            default: this.set({numbers: numbers});;
        }

    },

    generateNumber: function(level) {
        var number = 0;
        switch(level) {
            case 4:
                number = Math.floor((Math.random() * 20) + 1);
                break;
            case 3:
                number = Math.floor((Math.random() * 20) + 0);
                break;
            case 2:
                number = Math.floor((Math.random() * 10) + 1);
                break;
            case 1:
                number = Math.floor((Math.random() * 5) + 0);
                break;
            default: number = 0;
        }
        return number;
    },

    generate2AdditionNumbers: function() {
        var numbers = [];
        numberLevel = Math.floor((Math.random() * 2) + 1);
        numbers.push(this.generateNumber(numberLevel));
        if(numberLevel == 2){
            numberLevel = 1;
        }
        else{
            numberLevel = Math.floor((Math.random() * 2) + 1);
        }
        numbers.push(this.generateNumber(numberLevel));
        this.set({numbers: numbers});
    },

    generateAdditionNumbers: function(numbersLength, level) {
        var numbers = [];
        for (var numberIndex = 0; numberIndex < numbersLength; numberIndex++) {
            numbers.push(this.generateNumber(level));
        }
        this.set({numbers: numbers});
    }

});

QuizGame.Views.Question = Backbone.View.extend({

    template: QuizGame.Templates.question,

    classes: ["text-warning", "text-info", "text-success", "text-danger", "text-primary"],

    events: {
        'keyup .question-input': 'validate'
    },

    initialize: function(options) {
        var that = this;
        this.index = options.index;
        this.$parentEl = options.$parentEl;

        this.model.on('change:correct', function() {
            that.answered();
        });

        this.render();
    },

    render: function() {
        var that = this;
        var id = "#question" + this.index;
        var template = _.template(this.template);
        var obj = this.model.toJSON();
        obj.index = this.index;
        obj.classes = this.classes[this.index % this.classes.length];

        if(this.$parentEl.find(id).length){
            this.$parentEl.find(id).replaceWith(template(obj));
            this.$el = this.$parentEl.find(id);
        }
        else{
            this.$parentEl.append(template(obj));
            this.$el = this.$parentEl.find(id);
            this.$input = this.$el.find('.question-input');
            if(this.index == 0){
                this.$input.focus();
            }
            this.delegateEvents();
        }
    },

    validate: function(e) {
        var $input = $(e.currentTarget);
        var val = $input.val();
        if(val && val.length > 0){
            this.model.set({"correct": null}, {silent: true});
            var guess = parseInt(val);
            this.model.set({guess:guess});
        }
    },

    answered: function() {
        var that = this;
        if(this.model.get("correct")){
            if(!QuizGame.demoMode){
                QuizGame.Particle.triggerSuccess();
            }

            this.$el.removeClass('answer-incorrect');
            this.$el.addClass('answer-correct');
            this.model.set({expression: this.model.get("expression") + " " + this.model.get("answer")});
            this.render();

            var questionsRight = 2 + this.index;
            var heightOffset = (questionsRight * QuizGame.quizView.questionHeight);
            var transitionTime = 1000;

            // Focus next
            var $nextQuestion = this.$el.next();
            if($nextQuestion.length){
                $nextQuestion.find('.question-input').focus();
            }
            else{
                // Last question,
                // todo. any cloud and parachute relatied stuff belongs in the game view, not quiz view
                heightOffset += 100;
                transitionTime += 5000;

                var windowHeight = $(window).height();

                var $parachuteMan = $('.parachute-man');
                $parachuteMan.animate({
                    top: windowHeight + 'px',
                }, transitionTime);

                setTimeout(function(){
                    $('.tooltip').animate({
                        top: windowHeight + 'px',
                    }, transitionTime);
                }, 500);
            }

            // Move clouds
            QuizGame.quizView.$cloudmask.animate({
                top: QuizGame.quizView.cloudOffset + heightOffset + 'px',
            }, transitionTime);

            // Show message
            QuizGame.gameView.showSuccess();
        }
        else{
            if(!QuizGame.demoMode){
                QuizGame.Particle.triggerFail();
            }

            this.$el.removeClass('answer-correct');
            this.$el.addClass('answer-incorrect');

            this.$el.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
                that.$el.delay(200).removeClass('answer-incorrect');
            });

            that.model.set({guess: NaN}, {silent:true});
            setTimeout(function(){
                that.$input.val('');
            }, 1500);

            QuizGame.gameView.showError();
        }
    },

});

QuizGame.Views.Quiz = Backbone.View.extend({

    template: QuizGame.Templates.quiz,

    events: {
        "click .btn-reset" : "reset"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var template = _.template(this.template, {});
        this.$el.html(template);

        this.questions = new Backbone.Collection([]);

        this.addQuestions();

        this.delegateEvents();
    },

    addQuestions: function() {
        for (var addQuestion = 0; addQuestion < QuizGame.options.questionsLength; addQuestion++) {
            var question = new QuizGame.Models.Question();
            this.questions.add(question);
            new QuizGame.Views.Question({model:question, $parentEl: this.$el.find('form'), index: addQuestion});
        }
    },

    reset: function() {
        QuizGame.gameView.reset();
    },

});

QuizGame.Views.Login = Backbone.View.extend({

    template: QuizGame.Templates.login,

    events: {
        "click .btn-submit": "login"
    },

    initialize: function(options) {
        this.type = options.type;

        this.el = options.el;
        this.$el = $(this.el);

        if(options.show){
            this.render();
        }

    },

    render: function() {
        QuizGame.$spinner.hide();

        var template = _.template(this.template, {});

        QuizGame.$mask.show();

        if(!this.$el.length){
            this.$el = $(".login-container");
            if(!this.$el.length){
                $("body").append('<div class="login-container well"></div>');
                this.$el = $(".login-container");
            }
        }

        this.$el.html(template);

        this.delegateEvents();
    },

    login: function(e) {
        e.preventDefault();
        var email = this.$el.find(".input-email").val();
        var password = this.$el.find(".input-password").val();

        QuizGame.Particle.api.login({ username: email, password: password })
            .then(function(result) {

                var token = result.body.access_token;
                QuizGame.Utils.createCookie('t', token, 7);
                //QuizGame.Storage.store('t', token);

                // Store thie index of the device,
                // todo, add a ui to select the device from a dropdown to store the device index in the cookie
                QuizGame.Utils.createCookie('d', '5', 7);
                //QuizGame.Storage.store('d', '5');

                QuizGame.getDeviceID();

            }, function(err) {
                console.error(err);
            });
    },
});


QuizGame.Views.Game = Backbone.View.extend({

    events: {
        //"click .icon":          "open",
        //"click .button.edit":   "openEditDialog",
        //"click .button.delete": "destroy"
    },

    initialLoadTime: 5000,
    loadTime: 1000,
    fadeTime: 2000,
    initialLoad:true,

    sounds:{
        error: ["try_again1.wav", "try_again2.mp3"],
        success: ["yeah1.wav", "yeah2.flac", "bomb1.wav", "bomb2.wav", "bomb3.wav"]
    },

    initialize: function() {
        var that = this;

        this.$el.addClass("game-" + QuizGame.options.game);

        this.render();
    },

    render: function() {
        var template = _.template(QuizGame.Templates[QuizGame.options.game], {});
        this.$el.html(template);

        QuizGame.quizView = new QuizGame.Views.Quiz({el: ".quiz"});

        QuizGame.quizView.$el.append('<div class="cloudmask"><div class="cloudline"></div></div>');

        QuizGame.quizView.$cloudmask = $('.cloudmask');

        QuizGame.quizView.cloudOffset = 115;

        QuizGame.quizView.questionHeight = 95;

        var loadTime = this.loadTime;
        var fadeTime = this.fadeTime;
        if(this.initialLoad){
            loadTime = this.initialLoadTime;
        }


        console.log(this.initialLoad);
        console.log(loadTime);

        setTimeout(function(){
            var audio = new Audio('sound/joshuaempyre_arcade.wav');
            audio.play();
        }, 2000);

        setTimeout(function(){
            QuizGame.$spinner.css("display", "none");
            QuizGame.$mask.addClass('loaded');
            QuizGame.$mask.fadeTo( "slow", 0 );
            QuizGame.$mask.fadeTo( fadeTime, 0 );
            //that.render();
        }, loadTime);

        setTimeout(function(){
            QuizGame.$mask.css("display", "none");
        }, (loadTime + fadeTime));

        setTimeout(function(){
            QuizGame.quizView.$cloudmask.animate({
                top: QuizGame.quizView.cloudOffset + QuizGame.quizView.questionHeight + 'px',
            }, 800);
        }, loadTime);


        // Testmode
        //QuizGame.$spinner.css("display", "none");
        //QuizGame.$mask.css("display", "none");
        //QuizGame.quizView.$cloudmask.animate({
        //    top: QuizGame.quizView.cloudOffset + QuizGame.quizView.questionHeight + 'px',
        //}, 800);


        this.initialLoad = false;
    },

    reset: function() {
        QuizGame.quizView.$cloudmask.css("bottom", 0);
        QuizGame.$mask.removeClass('loaded');
        QuizGame.$mask.css("display", "block");
        QuizGame.$mask.css("opacity", 1);
        //QuizGame.$mask.show();
        window.scrollTo(0, 0);

        console.log("SHWO");
        this.render();
    },

    showError: function() {
        var $parachuteMan = $('.parachute-man');
        $parachuteMan.tooltip('destroy');

        var tooltipClass = 'tooltip-' + Date.now();
        setTimeout(function(){
                $parachuteMan.tooltip({
                    title:"Try Again!",
                    placement: "left",
                    template:'<div class="tooltip tooltip-danger ' + tooltipClass + '" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                }).tooltip('show');
            },
            200);

        setTimeout(function(){
                $('.' + tooltipClass).hide();
            },
            3000);

        var soundIndex = Math.floor((Math.random() * this.sounds.error.length) + 0);
        var audio = new Audio('sound/' + this.sounds.error[soundIndex]);
        audio.play();
    },

    showSuccess: function() {
        var $parachuteMan = $('.parachute-man');
        $parachuteMan.tooltip('destroy');

        var tooltipClass = 'tooltip-' + Date.now();
        setTimeout(function(){
                $parachuteMan.tooltip({
                    title:"YES",
                    placement: "left",
                    template:'<div class="tooltip tooltip-success ' + tooltipClass + '" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                }).tooltip('show');
            },
            200);

        setTimeout(function(){
                $('.' + tooltipClass).hide();
            },
            3000);

        var soundIndex = Math.floor((Math.random() * this.sounds.success.length) + 0);
        var audio = new Audio('sound/' + this.sounds.success[soundIndex]);
        audio.play();
    },

});


QuizGame.QuizGameRouter = Backbone.Router.extend({

    routes: {
        "back": "back",
        "login": "login",
        "game/:game": "init_game",
        "game/:game/subject/:subject": "init_game",
        "demo": "demo",
        "demo/:game": "demo",
        "demo/:game/subject/:subject": "demo",
        "level/:level": "load_level",
    },

    initialize: function (options) {
        Backbone.history.start({pushSate: true});
        //this.options = $.extend({}, this.defaultOptions, options);

        if(QuizGame.Particle.getToken()){
            QuizGame.Particle.getDeviceID();
        }
        else{
            if(!QuizGame.demoMode){
                this.navigate("login", {trigger: true});
            }
        }
    },

    init_game: function (game, subject = QuizGame.options.subject) {
        console.log("Loading Game: " + game);

        if(!game){
            this.navigate("game" + QuizGame.options.game + "/subject/" + QuizGame.options.subject, {trigger: true});
        }
        else{
            console.log("Loading Subject: " + subject);

            this.load_game(game, subject);
        }
    },

    load_game: function (game, subject) {
        this.hidelogin();
        QuizGame.gameView = new QuizGame.Views.Game({el: QuizGame.options.el});
    },

    login: function () {
        console.log("Login Route");

        QuizGame.loginView = new QuizGame.Views.Login({show:true});
    },

    hidelogin: function () {
        if(QuizGame.loginView && QuizGame.loginView.$el){
            QuizGame.loginView.$el.remove();
        }
    },

    demo: function (game, subject = QuizGame.options.subject) {
        console.log("GODEMO");
        QuizGame.demoMode = true;

        if(!game){
            game = QuizGame.options.game;
            //this.navigate("demo/" + QuizGame.options.game + "/subject/" + QuizGame.options.subject, {trigger: true});
        }

        this.load_game(game, subject);
    },

});

