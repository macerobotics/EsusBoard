/**
  ******************************************************************************
  * @file    esusBoard.cpp
  * @author  Mace Robotics
  * @version 0.2
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
  MCP3008_init();
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
 * @param  speed (0 to 1023) and direction (DIR_FORWARD or DIR_BACK)
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


/**********************************************************
 * @brief  MCP3008_read
 * @param  Channel (0 to 7)
 * @retval None
**********************************************************/
unsigned int MCP3008_read(int channel)
{
byte high, low;
unsigned int data;
  
  digitalWrite(CS_ADC, LOW);

  SPI.transfer((channel << 2) + 0b1100000);

  high = SPI.transfer(0);
  
  low = SPI.transfer(0);
  
  digitalWrite(CS_ADC, HIGH);
  
  data = word(high, low);

  data = (data >> 6);// décalage à droite pour obtenir les 10 bits

  return(data);
}

// end file