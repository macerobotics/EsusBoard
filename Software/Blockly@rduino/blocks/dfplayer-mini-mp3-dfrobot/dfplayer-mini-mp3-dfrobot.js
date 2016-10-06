﻿// define blocks
'use strict';

Blockly.Blocks['lp2i_mp3_init'] = {
  init: function() {
    this.appendDummyInput()
		.appendField(Blockly.Msg.lp2i_mp3_init)
		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/dfplayer-mini-mp3-dfrobot/dfplayer-mini-mp3-dfrobot.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.appendValueInput("Pin_Rx")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_init_Pin_Rx);		
    this.appendValueInput("Pin_Tx")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_init_Pin_Tx);		
    this.appendValueInput("Pin_Busy")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_init_Pin_Busy);		
    this.appendValueInput("Volume")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_init_Volume);		
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#F39800");
    this.setTooltip('');
    this.setHelpUrl('http://blogpeda.ac-poitiers.fr/techno-jean-mace/2016/02/07/utilisation-dun-module-audio-le-dfplayer-mini-mp3-de-dfrobot-avec-blockly-arduino/');
  }
};
Blockly.Blocks['lp2i_mp3_play'] = {
  init: function() {
    this.appendDummyInput()
		.appendField(Blockly.Msg.lp2i_mp3)
		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/dfplayer-mini-mp3-dfrobot/dfplayer-mini-mp3-dfrobot.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));					
    this.appendValueInput("Wait")
		.setCheck('Boolean')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_Wait);	
    this.appendValueInput("File")
		.setCheck('Number')
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_File);		
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#F39800");
    this.setTooltip('');
    this.setHelpUrl('http://blogpeda.ac-poitiers.fr/techno-jean-mace/2016/02/07/utilisation-dun-module-audio-le-dfplayer-mini-mp3-de-dfrobot-avec-blockly-arduino/');
  }
};
Blockly.Blocks['lp2i_mp3_volume'] = {
  init: function() {
    this.appendDummyInput()
		.appendField(Blockly.Msg.lp2i_mp3_Volume)
		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/dfplayer-mini-mp3-dfrobot/dfplayer-mini-mp3-dfrobot.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));			
    this.appendValueInput("Volume")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.lp2i_mp3_Volume_Input);			
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#F39800");
    this.setTooltip('');
    this.setHelpUrl('http://blogpeda.ac-poitiers.fr/techno-jean-mace/2016/02/07/utilisation-dun-module-audio-le-dfplayer-mini-mp3-de-dfrobot-avec-blockly-arduino/');
  }
};