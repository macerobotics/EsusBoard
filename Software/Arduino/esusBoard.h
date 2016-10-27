/**
  ******************************************************************************
  * @file    esusBoard.h
  * @author  Mace Robotics
  * @version 0.6
  * @date    27/10/2016
  * @brief   lib for Esus board
  *
 *******************************************************************************/

#ifndef _ESUS_BOARD_H
#define _ESUS_BOARD_H

#include <SPI.h>
#include <ESP8266WiFi.h>

#define MAX_SPEED 1023 // maximum speed
#define DIR_FORWARD true // forward direction
#define DIR_BACK false // back direction

// ADC MCP3008
#define CS_ADC 15
#define ADC_CH0 0b01100100
#define A0 0
#define A1 1
#define A2 2
#define A3 3
#define A4 4
#define A5 5

// init esus board
void initEsusBoard();

// motors
void motors1_set(unsigned int speed, boolean direction);
void motors2_set(unsigned int speed, boolean direction);

// read analog inputs
unsigned int MCP3008_read(int channel);

// read battery input tension
float battery_read();


void initServerWifi();


// Wifi
boolean dataWifiAvailable(void);

// Wifi
String readStringClientWifi(void);

void sendStringClientWifi(String data);

void sendFloatClientWifi(float data);

String Extract_StringWifi(String data);

#endif