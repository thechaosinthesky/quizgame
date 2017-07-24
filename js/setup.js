var QuizGame = {
    defaultOptions: {
        el: "#quizgame",
        game: "parachuter",
        subject: "math",
        level:1,
        questionsLength: 8,
        storagePrefix: "QUIZGAME_",
    },

    testMode:false,
    Particle: {},
    Templates: {},
    Models: {},
    Views: {},
    Utils: {},
    Storage: {},

    init: function(options){
        this.options = $.extend({}, this.defaultOptions, options);

        this.$mask = $('.spinner-mask');
        this.$spinner = $('.spinner-container');

        this.router = new QuizGame.QuizGameRouter();
    },

    showMask: function(){
        this.$spinner.removeClass('loaded');
        this.$mask.show();
        this.$spinner.show();
    },

    hideMask: function(){
        this.$spinner.hide();
        this.$mask.hide();
    },

    fadeSpinner: function(){
        this.$spinner.addClass('loaded');
        this.fadeMask();
    },

    fadeMask: function(){
        $('.spinner-container').fadeTo( "slow", 0 );
        $('.spinner-container').fadeTo( 2000, 0 );
    },

    getLevel: function(){
        var level = this.options.level;
        var levels = QuizGame.Storage.read("levels");
        console.log(levels);
        if(levels){
            var subjectLevel = levels[this.options.subject];
            if(subjectLevel){
                level = parseInt(subjectLevel);
            }
        }

        console.log("RETURNING FOR get level " + level);

        this.options.level = level;
        return level;
    },

    setLevel: function(level){
        var levels = QuizGame.Storage.read("levels");
        if(!levels){
            levels = {};
        }
        levels[this.options.subject] = level;
        QuizGame.Storage.store("levels", levels);

        this.options.level = level;
        return level
    },

};