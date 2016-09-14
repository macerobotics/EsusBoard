/**
  ******************************************************************************
  * @file    esusBoard.h
  * @author  Mace Robotics
  * @version 0.2
  * @date    09/09/2016
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

void initEsusBoard();

// motors
void motors1_set(unsigned int speed, boolean direction);
void motors2_set(unsigned int speed, boolean direction);

unsigned int MCP3008_read(int channel);

#endif