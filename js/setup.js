var QuizGame = {
    defaultOptions: {
        el: "#quizgame",
        game: "parachuter",
        subject: "math",
        questionsLength: 8,
        storagePrefix: "QUIZGAME_",
        demoMode: false
    },

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

};