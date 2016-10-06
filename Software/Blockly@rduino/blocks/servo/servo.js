﻿/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour("#2475FA");
	this.setHelpUrl(Blockly.Msg.ARDUINO_SERVO_MOVE_HELPURL);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_INPUT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	this.appendValueInput("PIN")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_INPUT2);
    this.appendValueInput("DEGREE")
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_MOVE_DEGREE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_SERVO_MOVE_TOOLTIP);
  }
};

Blockly.Blocks.servo_read_degrees = {
  init: function() {
    this.setColour("#2475FA");
	this.setHelpUrl(Blockly.Msg.ARDUINO_SERVO_READ_DEGREES_HELPURL);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARDUINO_SERVO_READ_DEGREES_INPUT1)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	this.appendValueInput("PIN")
        .setCheck('Number')
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_READ_DEGREES_INPUT2);    
	this.setOutput(true, 'Number');
    this.setTooltip(Blockly.Msg.ARDUINO_SERVO_READ_DEGREES_TOOLTIP);
  }
};

Blockly.Blocks.servo_attached = {
  init: function() {
	this.setColour("#2475FA");
	this.setHelpUrl('http://www.arduino.cc/playground/ComponentLib/servo');
    this.appendValueInput("PIN")
		.setCheck('Number')
        .appendField(Blockly.Msg.ARDUINO_SERVO_ATTACHED)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize))
        .appendField(Blockly.Msg.ARDUINO_SERVO_PIN);
    this.setOutput(true, 'Boolean');
    this.setTooltip('true if the servo is attached to pin; false otherwise. ');
  }
};

Blockly.Blocks.servo_detach = {
  init: function() {
    this.setColour("#2475FA");
	this.setHelpUrl('http://www.arduino.cc/playground/ComponentLib/servo');
	this.setInputsInline(false);
    this.appendValueInput("PIN")
		.setCheck('Number')
        .appendField(Blockly.Msg.ARDUINO_SERVO_DETACH)
        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Release a pin from servo driving.');
  }
};

Blockly.Blocks.servo_rot_continue = {
  init: function() {
    this.setColour("#2475FA");
    this.setHelpUrl(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_HELPURL);
	this.appendDummyInput()
		.appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_TEXT)
		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur_rot_continue.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	this.appendValueInput("PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
		.setCheck('Number')
        .appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_INPUT1);
    this.setInputsInline(true);
	this.appendValueInput("SPEED")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
      	.appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_INPUT2);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_TOOLTIP);
  }
};

Blockly.Blocks.servo_rot_continue_param = {
  init: function() {
    this.setColour("#2475FA");
    this.setHelpUrl(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_HELPURL);
	this.appendDummyInput()
		.appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_TEXT)
		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/servo/servomoteur_rot_continue.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
	this.appendValueInput("PIN")
        .setAlign(Blockly.ALIGN_RIGHT)
		.setCheck('Number')
        .appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_INPUT1);
    this.setInputsInline(true);
	this.appendValueInput("SPEED")
		.setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
      	.appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_INPUT3);
	this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_INPUT4)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.ADAFRUIT_MOTORSHIELD_AVANT, "FORWARD"], [Blockly.Msg.ADAFRUIT_MOTORSHIELD_ARRIERE, "BACKWARD"]]), 'ETAT');    
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARDUINO_SERVO_ROT_CONTINUE_TOOLTIP);
  }
};