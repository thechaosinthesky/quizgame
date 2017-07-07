var QuizGame = {
    defaultOptions: {
        el: "#quizgame",
        game: "parachuter",
        subject: "math",
        questionsLength: 8
    },

    Templates: {},
    Models: {},
    Views: {},

    init: function(options){
        this.options = $.extend({}, this.defaultOptions, options);

        this.router = new QuizGame.QuizGameRouter();
        this.gameView = new QuizGame.Views.Game({el: QuizGame.options.el});



        //setTimeout(function(){
        //    var audio = new Audio('sound/joshuaempyre_arcade.wav');
        //    audio.play();
        //}, 2000);
        //
        //setTimeout(function(){
        //    $('.spinner-container').addClass('loaded');
        //    $('.spinner-container').fadeTo( "slow", 0 );
        //    $('.spinner-container').fadeTo( 2000, 0 );;
        //}, 5000);
        //
        //setTimeout(function(){
        //    $('.spinner-container').css("display", "none");
        //}, 7000);

        $('.spinner-container').css("display", "none");
    }
};