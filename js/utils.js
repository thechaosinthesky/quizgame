QuizGame.Utils = {
    createCookie: function(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = QuizGame.storagePrefix + name + "=" + value + expires + "; path=/";
    },

    readCookie: function(name) {
        var nameEQ = QuizGame.storagePrefix + name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    eraseCookie: function(name) {
        createCookie(QuizGame.storagePrefix + name,"",-1);
    },

};

QuizGame.Storage = {
    get: function(name) {
        if(QuizGame.demoMode){
            //return chrome.storage.local.get(QuizGame.storagePrefix + name);
            try {
                return localStorage.getItem(QuizGame.storagePrefix + name);
            }
            catch(err) {
                console.log(err);
                console.log("RETURNING NUL");
                return null;
            }
        }
        else{
            return QuizGame.Utils.readCookie(name);
        }
    },

    set: function(name, value) {
        if(QuizGame.demoMode){
            //return chrome.storage.local.set(QuizGame.storagePrefix + name, value);
            try {
                localStorage.setItem(QuizGame.storagePrefix + name, value);
                return value;
            }
            catch(err) {
                console.log(err);
                return value;
            }
        }
        else{
            return QuizGame.Utils.createCookie(name, value, 7);
        }
    },

    store: function(name,value) {
        try {
            localStorage.setItem(QuizGame.storagePrefix + name, value);
            return true;
        }
        catch(err) {
            console.log(err);
            console.log("Cant store it");
            return null;
        }
        localStorage.setItem(QuizGame.storagePrefix + name, value);
    },

    read: function(name) {
        try {
            return localStorage.getItem(QuizGame.storagePrefix + name);
        }
        catch(err) {
            console.log(err);
            console.log("RETURNING NUL");
            return null;
        }
    },

    remove: function(name) {
        localStorage.removeItem(QuizGame.storagePrefix + name);
    },

};