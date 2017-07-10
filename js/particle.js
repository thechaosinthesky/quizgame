QuizGame.Particle = {
    api: new Particle(),
    token: null,
    deviceIndex: null,
    deviceID: null,
    successFunction: "triggerPulse",
    successArgument: "1",
    failFunction: null,
    failArgument: "",

    getToken: function(){
        if(!this.token){
            this.token = QuizGame.Utils.readCookie('t');
            //this.token = QuizGame.Storage.read('t');
        }

        return this.token;
    },

    getDeviceIndex: function(){
        if(!this.deviceIndex){
            this.deviceIndex = QuizGame.Utils.readCookie('d');
            //this.token = QuizGame.Storage.read('d');
        }

        return this.deviceIndex;
    },

    getDeviceID: function(){
        if(!this.particleDeviceID){
            var that = this;
            var deviceIndex = this.getDeviceIndex();
            var token = this.getToken();
            console.log("TOKEN ID");
            console.log(token);

            if(token){
                var devicesPr = this.api.listDevices({ auth: token });
                devicesPr.then(
                    function(response){
                        var devices = response.body;
                        console.log("WHAHA");
                        console.log(devices);
                        console.log(deviceIndex);
                        that.deviceID = devices[deviceIndex].id;
                        console.log(that.deviceID);
                        QuizGame.loginView.$el.remove();
                        QuizGame.router.navigate(QuizGame.options.game, {trigger: true});
                    },
                    function(err) {
                        console.log('List devices call failed: ', err);
                        QuizGame.router.navigate("login", {trigger: true});
                    }
                );
            }
            else{
                console.log(QuizGame.router);
                QuizGame.router.navigate("login", {trigger: true});
            }
        }
    },

    triggerSuccess: function(){
        if(this.successFunction) {
            var fnPr = this.api.callFunction({
                deviceId: this.deviceID,
                name: this.successFunction,
                argument: this.successArgument,
                auth: this.token
            });

            fnPr.then(
                function (data) {
                    console.log('Function called succesfully:', data);
                }, function (err) {
                    console.log('An error occurred:', err);
                });
        }
    },

    triggerFail: function(){
        if(this.successFunction) {
            var fnPr = this.api.callFunction({
                deviceId: this.deviceID,
                name: this.failFunction,
                argument: this.failArgument,
                auth: this.token
            });

            fnPr.then(
                function (data) {
                    console.log('Function called succesfully:', data);
                }, function (err) {
                    console.log('An error occurred:', err);
                });
        }
    },

};