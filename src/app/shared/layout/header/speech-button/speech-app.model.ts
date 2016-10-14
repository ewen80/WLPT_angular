declare var $:any;
declare var smartSpeechRecognition:any;
import {config} from '../../../smartadmin.config'

export class SpeechAppModel {

  start() {


    // Add our commands to smartSpeechRecognition
    smartSpeechRecognition.addCommands(config.commands);

    if (smartSpeechRecognition) {
      // activate plugin
      smartSpeechRecognition.start();
      // add btn class
      $('body').addClass("voice-command-active");
      // play sound
      $.speechApp.playON();
      // set localStorage when switch is on manually
      if (config.voice_localStorage) {
        localStorage.setItem('sm-setautovoice', 'true');
      }

    } else {
      // if plugin not found
      alert("speech plugin not loaded");
    }

  }

  stop() {

    if (smartSpeechRecognition) {
      // deactivate plugin
      smartSpeechRecognition.abort();
      // remove btn class
      $('body').removeClass("voice-command-active");
      // sound
      $.speechApp.playOFF();
      // del localStorage when switch if off manually
      if (config.voice_localStorage) {
        localStorage.setItem('sm-setautovoice', 'false');
      }
      // remove popover if visible
      if ($('#speech-btn .popover').is(':visible')) {
        $('#speech-btn .popover').fadeOut(250);
      }
    }

  }

  // play sound
  playON() {

    var audioElement = document.createElement('audio');

    if (navigator.userAgent.match('Firefox/'))
      audioElement.setAttribute('src', config.sound_path + 'voice_on' + ".ogg");
    else
      audioElement.setAttribute('src', config.sound_path + 'voice_on' + ".mp3");

    //$.get();
    audioElement.addEventListener("load", function () {
      audioElement.play();
    }, true);

    if (config.sound_on) {
      audioElement.pause();
      audioElement.play();
    }
  }

  playOFF() {

    var audioElement = document.createElement('audio');

    if (navigator.userAgent.match('Firefox/'))
      audioElement.setAttribute('src', config.sound_path + 'voice_off' + ".ogg");
    else
      audioElement.setAttribute('src', config.sound_path + 'voice_off' + ".mp3");

    $.get();
    audioElement.addEventListener("load", function () {
      audioElement.play();
    }, true);

    if (config.sound_on) {
      audioElement.pause();
      audioElement.play();
    }
  }

  playConfirmation() {

    var audioElement = document.createElement('audio');

    if (navigator.userAgent.match('Firefox/'))
      audioElement.setAttribute('src', config.sound_path + 'voice_alert' + ".ogg");
    else
      audioElement.setAttribute('src', config.sound_path + 'voice_alert' + ".mp3");

    $.get();
    audioElement.addEventListener("load", function () {
      audioElement.play();
    }, true);

    if (config.sound_on) {
      audioElement.pause();
      audioElement.play();
    }
  }
}
