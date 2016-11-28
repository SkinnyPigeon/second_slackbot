'use strict';

var util = require('util');
var Bot = require('slackbots');

var NewBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'Uninvited Robot';
    this.user = null;
    this.no = 0;
    this.jokes = [ "I bought some shoes off of a drug dealer. I don't know what he laced them with but I've been trippin' all day."

    , "A mexican magician tells the audience he will disappear on the count of 3. He says, 'Uno, dos...' and then *poof* … he disappeared without a tres!"

    , "What do you call the security guards outside of Samsung. The guardians of the galaxy!"

    , "I think I want a job cleaning mirrors. It's something I could really see myself doing."

    , "Why are there fences around a graveyard? Because people are dying to get in!"

    , "Two satellites decided to get married. The wedding wasn't much, but the reception was incredible!"

    , "What do you call a belt made out of watches? A waist of time!"

    , "What kind of shoes does a pedophile wear? White vans."

    , "What's the difference between a snow man and a snow woman? Snow balls!"

    , "Did you hear about the guy who invented the knock knock joke? He won the 'no-bell' prize!"
    , "Beep"

    , "Bzzzzt"

    , "How did the hipster burn his mouth? He sipped his coffee before it was cool!"

    , "Why did the scarecrow get promoted? He was outstanding in his field!"

    , "Why did Mozart kill all his chickens? Because when he asked them who the best composer was, they'd all say 'Bach bach bach!'"

    , "What's the best thing about Switzerland? I don't know, but their flag is a huge plus."

    , "What's the difference between ignorance and Apathy? I don't know and I don't care."

    , "Why did Cinderella get kicked off the soccer team? Because she kept running from the ball!"

    , "Why cant a nose be 12 inches long? Because then it'll be a foot!"

    , "My grandad has the heart of a lion and a lifetime ban from the zoo." ];
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
    this.haveSomeFun();
};

NewBot.prototype._loadBotUser = function () {
    for( var i = 0; i < this.users.length; i++ ) {
        if( this.users[i].name === 'uninvited_robot' ) {
            this.id = this.users[i].id;
        }
    }
};

NewBot.prototype._welcomeMessage = function () {
    console.log( this.channels );
    // this.postMessageToChannel( this.channels[2].name, "Hello, I am a robot" );
};

NewBot.prototype.haveSomeFun = function() {
    setInterval( function() {
        console.log( this.no );
        if( this.no >= 1 ) {
            var max = this.jokes.length;
            var min = 0;
            var i = Math.floor( Math.random() * ( max - min + 1 )) + min;
            this.postMessageToChannel( this.channels[2].name, this.jokes[i] );
            this.no = 0;
        }
    }.bind( this ), 5000 )
};

NewBot.prototype._onMessage = function( message ) {
    if ( this._isChatMessage( message ) &&
     this._isChannelConversation( message ) &&
     !this._isFromNewBot( message )) {
        console.log( message );
        this.no += 1;
    }
};

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