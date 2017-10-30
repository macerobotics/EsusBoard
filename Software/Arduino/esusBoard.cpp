/**
  ******************************************************************************
  * @file    esusBoard.cpp
  * @author  Mace Robotics
  * @version 0.9
  * @date    30/10/2017
  * @brief   lib for Esus board
  *
 *******************************************************************************/


#include <Arduino.h>
#include "esusBoard.h"

WiFiServer esus_wifi_server(80);
WiFiClient client;



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
void motors_init(void)
{
  pinMode(16, OUTPUT);      
  pinMode(5, OUTPUT);      

  pinMode(4, OUTPUT);      
  pinMode(0, OUTPUT);     

  analogWrite(16, 0);  
  analogWrite(5, 0);  

  analogWrite(4, 0);  
  analogWrite(0, 1); 
  
}


/**********************************************************
 * @brief  motors1_set
 * @param  speed (0 to 1023) and direction (DIR_FORWARD or DIR_BACK)
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
 * @brief  motors_stop
 * @param  none
 * @retval None
**********************************************************/
void motors_stop(void)
{
  motors1_set(0,0);
  motors2_set(0,0);
}


/**********************************************************
 * @brief  MCP3008_init
 * @param  None
 * @retval None
**********************************************************/
void MCP3008_init()
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

/**********************************************************
 * @brief  battery_read
 * @param  None
 * @retval None
**********************************************************/
float battery_read()
{
unsigned int data_adc=0;
float Battery_tension=0;

  // init analog input (battery input)
  pinMode(A0, INPUT);

  // read analog digital converter
  data_adc = (unsigned int) analogRead(A0);
  
 Battery_tension = (float)((data_adc*3.1)/1024.0);
 
 Battery_tension = (float)(Battery_tension*11.0 + 1.0);
 
 // init analog input (battery input)
  pinMode(A0, OUTPUT);
 
 return(Battery_tension);
  
}


/**********************************************************
 * @brief  initServerWifi
 * @param  None
 * @retval None
**********************************************************/
void initServerWifi()
{
  esus_wifi_server.begin();
}



/**********************************************************
 * @brief  dataWifiAvailable
 * @param  None
 * @retval None
**********************************************************/
boolean dataWifiAvailable(void)
{
boolean available;
int c=0;

  client = esus_wifi_server.available();
  
  
  while((client != true)and(c < 100))
  {
    client = esus_wifi_server.available();
    delay(50);
	c++;
  }

  if(client == true)
  {
    available = true;
  }
  else
  {
   available = false; 
  }
  
  return(available);
}


/**********************************************************
 * @brief  readStringClientWifi
 * @param  None
 * @retval None
**********************************************************/
String readStringClientWifi(void)
{

  return( String(client.readStringUntil('\r')) );

}


/**********************************************************
 * @brief  sendStringClientWifi
 * @param  None
 * @retval None
**********************************************************/
void sendStringClientWifi(String data)
{
  client.print(data);
}

void sendFloatClientWifi(float data)
{
  client.print(data);
}

/**********************************************************
 * @brief  Extract_StringWifi
 * @param  None
 * @retval None
**********************************************************/
String Extract_StringWifi(String data)
{
String extract;
char cara = 'Z';
unsigned int counter = 0;

 extract = data.substring(5);

  while(cara != '/')
  {
    cara = extract[counter];
    counter++;

    //error
    if(counter > 100)
      cara = '/';
  }

  counter = counter - 1;

  // delete HTTP (5 char)
  counter = counter - 5;

  extract = extract.substring(0,counter);

  return(extract);

}




// end file