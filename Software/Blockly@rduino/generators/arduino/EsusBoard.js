'use strict';

goog.provide('Blockly.Arduino.EsusBoard');

goog.require('Blockly.Arduino');

goog.provide('Blockly.Blocks.conversion');

goog.require('Blockly.Blocks');


Blockly.Arduino['EsusBoard_init'] = function() {
  Blockly.Arduino.definitions_['define_ss'] = '#include <esusBoard.h>\n';
  Blockly.Arduino.setups_['serial_begin'] = 'initEsusBoard();';
  return "";
};

Blockly.Arduino['EsusBoard_motor1'] = function() {
  var dropdown_speed = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = Blockly.Arduino.valueToCode(this, 'NEW_LINE', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'motors1_set(' + dropdown_speed + ', ' + dropdown_stat + ');\n';
  return code;
};

Blockly.Arduino['EsusBoard_motor2'] = function() {
  var dropdown_speed = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = Blockly.Arduino.valueToCode(this, 'NEW_LINE', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'motors2_set(' + dropdown_speed + ', ' + dropdown_stat + ');\n';
  return code;
};

Blockly.Arduino['EsusBoard_analog'] = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'MCP3008_read(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['EsusBoard_WifiConfig'] = function() {
  Blockly.Arduino.definitions_['define_wifi'] = '#include <ESP8266WiFi.h>\n';
  Blockly.Arduino.definitions_['define_server'] = 'WiFiServer server(80);';
  Blockly.Arduino.definitions_['client_begin'] = "WiFiClient client;";
  var value_ssid = Blockly.Arduino.valueToCode(this, 'Text_ssid', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_password = Blockly.Arduino.valueToCode(this, 'Text_password', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'WiFi.begin(' + value_ssid + ', ' + value_password + ');\n';
  Blockly.Arduino.setups_['wifi'] = code;
  Blockly.Arduino.setups_['server_begin'] = "server.begin();";
  return 'WiFiClient client = server.available();\n';
};

Blockly.Arduino['EsusBoard_WifiClientAvailable'] = function() {
  var code = 'client != true';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['EsusBoard_WifiClientWait'] = function() {
  return 'client = server.available();\n';
};


Blockly.Arduino['EsusBoard_ReadStream'] = function() {
  var code = "client.readStringUntil('\\r')";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['conversion_toString'] = function(block) {
	var value_name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC);
	var code = 'String('+value_name+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino['EsusBoard_indexOf'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'indexOf(' + argument0 + ')';
  }
  //return varName + '.' + argument0 + ';\n';
  var code = varName + '.' + argument0 + '';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

