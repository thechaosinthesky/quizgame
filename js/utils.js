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
    store: function(name,value) {
        localStorage.setItem(QuizGame.storagePrefix + name, value);
    },

    read: function(name) {
        return localStorage.getItem(QuizGame.storagePrefix + name);
    },

    remove: function(name) {
        localStorage.removeItem(QuizGame.storagePrefix + name);
    },

};