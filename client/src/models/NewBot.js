'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var util = require('util');
var Bot = require('slackbots');

var NewBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'Uninvited Robot';
    this.user = null;
    this.url = "https://wedding--photo-test.herokuapp.com/pictures";
    this.jokes = [ "I bought some shoes off of a drug dealer. I don't know what he laced them with but I've been trippin' all day."

        , "A mexican magician tells the audience he will disappear on the count of 3. He says, 'Uno, dos...' and then *poof* … he disappeared without a tres!"

        , "What do you call the security guards outside of Samsung. The guardians of the galaxy!"

        , "I think I want a job cleaning mirrors. It's something I could really see myself doing."

        , "Why are there fences around a graveyard? Because people are dying to get in!"

        , "Two satellites decided to get married. The wedding wasn't much, but the reception was incredible!"

        , "What do you call a belt made out of watches? A waist of time!"

        , "What kind of shoes does a pedophile wear? White vans."

        , "What's the difference between a snow man and a snow woman? Snow balls!"

        , "Did you hear about the guy who invented the knock knock joke?He won the 'no-bell' prize!"
        , "Beep"

        , "Bzzzzt" ]
};

util.inherits(NewBot, Bot);

NewBot.prototype.run = function () {
    NewBot.super_.call( this, this.settings );

    this.on( 'start', this._onStart );
    this.on( 'message', this._onMessage );
};

NewBot.prototype._onStart = function () {
    this._loadBotUser();
    this._welcomeMessage();
};

NewBot.prototype._loadBotUser = function () {
    for( var i = 0; i < this.users.length; i++ ) {
        if( this.users[i].name === 'uninvited_robot' ) {
            this.id = this.users[i].id;
        }
    }
};

NewBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel( this.channels[0].name, "Hello, I am a robot" );
    this.haveSomeFun();
};

Newbot.prototype.haveSomeFun = function() {
    setInterval( function() {
        var i = Math.floor( Math.random() * ( max - min + 1 )) + min;
        this.postMessageToChannel( this.channels[0].name, this.jokes[i] );
    }.bind( this ), 1200000)
}

NewBot.prototype._isChatMessage = function ( message ) {
    return message.type === 'message' && Boolean( message.text );
};

NewBot.prototype._isChannelConversation = function( message ) {
    return typeof message.channel === 'string';
};

NewBot.prototype._isFromNewBot = function( message ) {
    return message.subtype === "bot_message";
};

module.exports = NewBot;