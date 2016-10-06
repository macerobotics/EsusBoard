/**
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

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');

Blockly.Arduino.servo_move = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + value_pin] = 'Servo servo_' + value_pin + ';\n';
  Blockly.Arduino.setups_['setup_servo_' + value_pin] = 'servo_' + value_pin + '.attach(' + value_pin + ');\n';
  var code = 'servo_' + value_pin + '.write(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + value_pin] = 'Servo servo_'+value_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_' + value_pin] = 'servo_' + value_pin + '.attach(' + value_pin + ');\n';

  var code = 'servo_' + value_pin + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.servo_attached = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+value_pin] = 'Servo servo_'+value_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+value_pin] = 'servo_'+value_pin+'.attach('+value_pin+');\n';

  var code = 'servo_'+value_pin+'.attached()';  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.servo_detach = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+value_pin] = 'Servo servo_'+value_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+value_pin] = 'servo_'+value_pin+'.attach('+value_pin+');\n';
  
  var code = 'servo_'+value_pin+'.detach();';
  return code;
};

Blockly.Arduino.servo_rot_continue = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + value_pin] = 'Servo servo_' + value_pin + ';\n';
  Blockly.Arduino.setups_['setup_servo_' + value_pin] = 'servo_' + value_pin + '.attach(' + value_pin + ');\n';
  var code = 'servo_' + value_pin + '.write(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino.servo_rot_continue_param = function() {
  var value_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var degree = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_etat = this.getFieldValue('ETAT');
  
  if (dropdown_etat == "FORWARD") var value_degree = 90 + parseInt(degree);
  if (dropdown_etat == "BACKWARD") var value_degree = 90 - parseInt(degree);

  Blockly.Arduino.includes_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo' + value_pin] = 'Servo servo_' + value_pin + ';\n';
  Blockly.Arduino.setups_['setup_servo_' + value_pin] = 'servo_' + value_pin + '.attach(' + value_pin + ');\n';
  var code = 'servo_' + value_pin + '.write(' + value_degree + ');\n';
  return code;
};