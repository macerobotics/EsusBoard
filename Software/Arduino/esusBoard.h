/**
  ******************************************************************************
  * @file    esusBoard.h
  * @author  Mace Robotics
  * @version 0.9
  * @date    30/10/2017
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
#define I2 6
#define I3 7

#define M1_IN1 16   
#define M1_IN2 5     

// motor 2
#define M2_IN1 4  
#define M2_IN2 0

// init esus board
void initEsusBoard();

// motors
void motors1_set(unsigned int speed, boolean direction);
void motors2_set(unsigned int speed, boolean direction);
void motors_stop(void);
void motors_init(void);
void MCP3008_init();

// read analog inputs
unsigned int MCP3008_read(int channel);

// read battery input tension
float battery_read();

/*************************/
/**** Wifi functions ****/

// init wifi server
void initServerWifi();

// Wifi
boolean dataWifiAvailable(void);

// Wifi
String readStringClientWifi(void);

void sendStringClientWifi(String data);

void sendFloatClientWifi(float data);

String Extract_StringWifi(String data);

#endif