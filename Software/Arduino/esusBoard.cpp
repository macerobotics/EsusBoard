/**
  ******************************************************************************
  * @file    esusBoard.cpp
  * @author  Mace Robotics
  * @version 0.1
  * @date    09/09/2016
  * @brief   lib for Esus board
  *
 *******************************************************************************/


#include <Arduino.h>
#include "esusBoard.h"

static void motors_init(void);
static void MCP3008_init();

// motor 1
int M1_IN1 = 16;   
int M1_IN2 = 5;     

// motor 2
int M2_IN1 = 4;   
int M2_IN2 = 0; 


/**********************************************************
 * @brief  initEsusBoard
 * @param  None
 * @retval None
**********************************************************/
void initEsusBoard()
{
  // init H-bridge
  motors_init();
  
  // init ADC MCP3008
  MCP3008_init;
}


/**********************************************************
 * @brief  motors_init
 * @param  None
 * @retval None
**********************************************************/
static void motors_init(void)
{
  pinMode(M1_IN1, OUTPUT);      
  pinMode(M1_IN2, OUTPUT);      

  pinMode(M2_IN1, OUTPUT);      
  pinMode(M2_IN2, OUTPUT);     

  analogWrite(M1_IN1, 0);  
  analogWrite(M1_IN2, 0);  

  analogWrite(M2_IN1, 0);  
  analogWrite(M2_IN2, 0); 
}


/**********************************************************
 * @brief  motors1_set
 * @param  None
 * @retval None
**********************************************************/
void motors1_set(unsigned int speed, boolean direction)
{
  if(speed > MAX_SPEED)
  {
    speed = MAX_SPEED;
  }
  
  if(direction == true)
  {
    analogWrite(M1_IN1, speed);
    analogWrite(M1_IN2, 0);   
  }
  else
  {
    analogWrite(M1_IN2, speed);
    analogWrite(M1_IN1, 0);   
  }
  
}


/**********************************************************
 * @brief  motors2_set
 * @param  None
 * @retval None
**********************************************************/
void motors2_set(unsigned int speed, boolean direction)
{
  if(speed > MAX_SPEED)
  {
    speed = MAX_SPEED;
  }
  
  if(direction == true)
  {
    analogWrite(M2_IN1, speed);
    analogWrite(M2_IN2, 0);   
  }
  else
  {
    analogWrite(M2_IN2, speed);
    analogWrite(M2_IN1, 0);   
  }
  
}


/**********************************************************
 * @brief  MCP3008_init
 * @param  None
 * @retval None
**********************************************************/
static void MCP3008_init()
{
  // Initialisation du bus SPI
  SPI.begin();

  SPI.setBitOrder(MSBFIRST);  // bit le plus à gauche en premier
  SPI.setDataMode(SPI_MODE0); // Mode 0 : données capturées sur front montant d'horloge et transmises sur front descendant 

  // init chip select
  pinMode(CS_ADC, OUTPUT);
  digitalWrite(CS_ADC, HIGH);
  
}

// end file