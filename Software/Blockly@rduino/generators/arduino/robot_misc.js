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
 * @fileoverview Helper functions for generating sensor blocks - sumo robots
 * Written to facilitate programming of sumo and mini-sumo robots
 * Thanks to Fred Lin for building BlockyDuino!
 * @author erickennedy@outlook.com  Eric Kennedy
 */

goog.provide('Blockly.Arduino.sensors');

goog.require('Blockly.Arduino');


Blockly.Arduino.setup_button_wait_il = function() {
  //var wait_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var wait_pin = this.getFieldValue('PIN');  
  Blockly.Arduino.definitions_["define_button_wait"] = ""+
   "   const int buttonPin = "+wait_pin+";\n"+
   "   int buttonState = 0;\n"+
	"   void WaitForButton (){\n"+
	"   buttonState = digitalRead(buttonPin);\n"+
	"   while(buttonState == LOW) {buttonState = digitalRead(buttonPin);}}\n";
 Blockly.Arduino.setups_['setup_button_wait'] = " pinMode(buttonPin, INPUT);\n"+
 '   WaitForButton();\n'+
 '	 delay(5000);\n';
  var code = '';
  return code;
};

Blockly.Arduino.setup_button_wait_iph = function() {
  //var wait_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var wait_pin = this.getFieldValue('PIN');
   Blockly.Arduino.definitions_["define_button_wait"] = ""+
   "   const int buttonPin = "+wait_pin+";\n"+
   "   int buttonState = 0;\n"+
	"   void WaitForButton (){\n"+
	"   buttonState = digitalRead(buttonPin);\n"+
	"   while(buttonState == HIGH) {buttonState = digitalRead(buttonPin);}}\n";
 Blockly.Arduino.setups_['setup_button_wait'] = " pinMode(buttonPin, INPUT_PULLUP);\n"+
 '   WaitForButton();\n'+
 'delay(5000);\n';
  var code = '';
  return code;
};

Blockly.Arduino.fourpin_ranger = function() {
  // var dropdown_tpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
   var dropdown_epin = this.getFieldValue('PIN2');
   var dropdown_tpin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_["define_fourpin_"+dropdown_tpin] = "  const int pingPin"+dropdown_tpin+" = "+dropdown_tpin+";\n"+
  "  const int sensorPin"+dropdown_epin+" = "+dropdown_epin+";\n";
   Blockly.Arduino.definitions_['define_ping'] = "long Ping"+dropdown_tpin+"()\n"+
"{\n"+
      "// The PING))) is triggered by a HIGH pulse of 2 or more microseconds.\n"+
      "// Give a short LOW pulse beforehand to ensure a clean HIGH pulse:\n"+
      "digitalWrite(pingPin"+dropdown_tpin+", LOW);\n"+
      "delayMicroseconds(2);\n"+
      "digitalWrite(pingPin"+dropdown_tpin+", HIGH);\n"+
      "delayMicroseconds(2);\n"+
      "digitalWrite(pingPin"+dropdown_tpin+", LOW);\n"+
      "// A different pin is used to read the signal from the PING))): a HIGH\n"+
      "long microseconds = pulseIn(sensorPin"+dropdown_epin+", HIGH);\n"+
      "return microseconds / 74 / 2;\n"+
"}\n";
 Blockly.Arduino.setups_["setup_fourpin_"+dropdown_tpin] = "pinMode(pingPin"+dropdown_tpin+", OUTPUT);\n"+
 "  pinMode(sensorPin"+dropdown_epin+", INPUT);\n";
//  code = "analogRead("+dropdown_tpin+")"";
  var code = "";
  var code = "Ping"+dropdown_tpin+"()";
  return code;
 }; 
 
 // Blockly.JavaScript['play_notes'] = function(block) {
 // var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
 // var value_volume = Blockly.JavaScript.valueToCode(block, 'volume', Blockly.JavaScript.ORDER_ATOMIC);
  //var dropdown_note = block.getFieldValue('Note');
  // TODO: Assemble JavaScript into code variable.
  //var code = '...';
  //return code;
//};

Blockly.Arduino.play_notes_z = function() {
  var note_letter = this.getFieldValue("NOTE");
  var note_duration = Blockly.Arduino.valueToCode(this,"DUR", Blockly.Arduino.ORDER_ATOMIC) || '200'
  var note_volume = Blockly.Arduino.valueToCode(this,"VOL", Blockly.Arduino.ORDER_ATOMIC) || '15'
  Blockly.Arduino.includes_["includes_button_wait"] = "//Playing Zumo notes requires the Pololu Zumo Buzzer Libraries to work\n" +
  "#include <ZumoBuzzer.h>\n"+
   "//ZumoBuzzer buzzer;\n"+
   "//To play music, you'll want to write code direct - see library examples";
  var code = "";
  var code = 'buzzer.stopPlaying();\n'+
  'buzzer.playNote('+note_letter+','+note_duration+','+note_volume+');\n';
 return code;
};

Blockly.Arduino.IR_serial_decoder = function() {
 //var dropdown_ipin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
 var dropdown_ipin = this.getFieldValue('PIN');
  Blockly.Arduino.includes_["includes_IR"] = "//Playing this requires the IR Remote Libraries to work\n" +
  "//Credit to Ken Shirriff, Enjoying Electronics, dablondeemu and Instructables  \n"+
  "#include <IRremote.h>\n";
  Blockly.Arduino.definitions_["define_IR_serial_decoder"] = "int IRpin = "+dropdown_ipin+";\n"+
  "IRrecv irrecv(IRpin);\n"+
   "decode_results results;\n";   
  Blockly.Arduino.setups_["setup_IR_serial_decoder"] = "pinMode(IRpin, INPUT);\n"+
 "  Serial.begin(9600);\n"+
 "  irrecv.enableIRIn();\n";
  var code = "";
  var code = "if (irrecv.decode(&results))\n "+
  " {\n"+
  "   Serial.println(results.value, DEC); // Print the Serial 'results.value'\n"+
  "   irrecv.resume();   // Receive the next value\n"+
  "  }\n";
  return code;
};

Blockly.Arduino.IR_get_blink = function() {
  // var dropdown_ipin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
   var dropdown_lpin = this.getFieldValue('PIN2');
   var dropdown_ipin = this.getFieldValue('PIN');
   var IR_number = Blockly.Arduino.valueToCode(this, 'IR_NUM', Blockly.Arduino.ORDER_ATOMIC) 
  Blockly.Arduino.includes_["includes_IR"] = "//Playing this requires the IR Remote Libraries to work\n" +
  "//Credit to Ken Shirriff, Enjoying Electronics, dablondeemu and Instructables  \n"+
  "#include <IRremote.h>\n";
  Blockly.Arduino.definitions_["define_IR_get_blink"] = "int IRpin = "+dropdown_ipin+";\n"+
  "int LEDpin = "+dropdown_lpin+";\n"+
  "boolean LEDon = true; // initializing LEDon as true\n"+
  "IRrecv irrecv(IRpin);\n"+
  "decode_results results;\n"; 
Blockly.Arduino.setups_["setup_IR_get_blink"] = "pinMode(IRpin, INPUT);\n"+
 "  pinMode(LEDpin, OUTPUT);\n"+
 "  Serial.begin(9600);\n"+
 "  irrecv.enableIRIn();\n";
  var code = "";
  var code = "if (irrecv.decode(&results))\n "+
  " {\n"+
  "   Serial.println(results.value, DEC); // Print the Serial 'results.value'\n"+
  "   irrecv.resume();   // Receive the next value\n"+
  "  }\n"+
  "if (results.value == "+IR_number+")\n "+
  " {\n"+
   "if (LEDon == true)   // is LEDon equal to true? \n "+
   " {\n"+
  "   LEDon = false; \n"+
  "   digitalWrite(LEDpin, HIGH);\n"+
  "  delay(100);      // keeps the transition smooth\n"+
  "  }\n"+
     "else \n "+
   " {\n"+
  "   LEDon = true; \n"+
  "   digitalWrite(LEDpin, LOW);\n"+
  "  delay(100);      // keeps the transition smooth\n"+
  "  }\n"+
    "  }\n";
  return code;
 }; 

 Blockly.Arduino.IR_get= function() {
  // var dropdown_ipin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
   var dropdown_ipin = this.getFieldValue('PIN');
  Blockly.Arduino.includes_["includes_IR"] = "//Playing this requires the IR Remote Libraries to work\n" +
  "//Credit to Ken Shirriff, Enjoying Electronics, dablondeemu and Instructables  \n"+
  "#include <IRremote.h>\n";
   Blockly.Arduino.definitions_["define_IR_get"] = "unsigned long IRCode = 0;\n"+
  "int IRpin = "+dropdown_ipin+";\n"+
  "IRrecv irrecv(IRpin);\n"+
  "decode_results results;\n"+ 
   "unsigned long IRRequest ()\n "+
   "{\n"+
   "  unsigned long IRResult = 0;\n"+
   "  if (irrecv.decode(&results)) \n"+
   "     {\n"+
   "      IRResult = results.value;\n"+
   "      irrecv.resume();   // Receive the next value\n"+
   "     }\n"+
   "   return IRResult;\n"+
   "  }\n";
 Blockly.Arduino.setups_["setup_IR_get_blink"] = "pinMode(IRpin, INPUT);\n"+
  "  irrecv.enableIRIn();\n";

  var code = "";
  var code =  "IRRequest()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
 }; 
