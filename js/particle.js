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

    //getDeviceIndex: function(){
    //    if(!this.deviceIndex){
    //        this.deviceIndex = QuizGame.Utils.readCookie('d');
    //        //this.token = QuizGame.Storage.read('d');
    //    }
    //
    //    return this.deviceIndex;
    //},

    getDeviceID: function(){
        if(!this.particleDeviceID){
            this.particleDeviceID = QuizGame.Utils.readCookie('d');
            console.log("RETURNING DEVICE ID");
            console.log(this.particleDeviceID);
        }

        if(!this.particleDeviceID){
            var that = this;
            var deviceIndex = 5;
            var token = this.getToken();
            console.log("TOKEN ID");
            console.log(token);

            if(token){
                var devicesPr = this.api.listDevices({ auth: token });
                devicesPr.then(
                    function(response){
                        var devices = response.body;
                        console.log("DEVICES:");
                        console.log(devices);
                        console.log(deviceIndex);
                        that.particleDeviceID = devices[deviceIndex].id;
                        console.log(that.particleDeviceID);
                        QuizGame.Utils.createCookie('d', that.deviceID, 7);
                        if(QuizGame.loginView && QuizGame.loginView.$el){
                            QuizGame.loginView.$el.remove();
                        }
                        QuizGame.router.navigate("game/" + QuizGame.options.game, {trigger: true});
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

    //USING THE INDEX FROM THE COOKIE
    //getDeviceID: function(){
    //    if(!this.particleDeviceID){
    //        var that = this;
    //        var deviceIndex = this.getDeviceIndex();
    //        var token = this.getToken();
    //        console.log("TOKEN ID");
    //        console.log(token);
    //
    //        if(token){
    //            var devicesPr = this.api.listDevices({ auth: token });
    //            devicesPr.then(
    //                function(response){
    //                    var devices = response.body;
    //                    console.log("WHAHA");
    //                    console.log(devices);
    //                    console.log(deviceIndex);
    //                    that.deviceID = devices[deviceIndex].id;
    //                    console.log(that.deviceID);
    //                    if(QuizGame.loginView && QuizGame.loginView.$el){
    //                        QuizGame.loginView.$el.remove();
    //                    }
    //                    QuizGame.router.navigate("game/" + QuizGame.options.game, {trigger: true});
    //                },
    //                function(err) {
    //                    console.log('List devices call failed: ', err);
    //                    QuizGame.router.navigate("login", {trigger: true});
    //                }
    //            );
    //        }
    //        else{
    //            console.log(QuizGame.router);
    //            QuizGame.router.navigate("login", {trigger: true});
    //        }
    //    }
    //},

    call: function(particleFunction, argument){
        var fnPr = this.api.callFunction({
            deviceId: this.deviceID,
            name: particleFunction,
            argument: argument,
            auth: this.token
        });

        console.log('Calling Particle:', fnPr);

        fnPr.then(
            function (data) {
                console.log('Function called succesfully:', data);
            }, function (err) {
                console.log('An error occurred:', err);
            });
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