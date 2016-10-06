#include <esusBoard.h>
#include <Servo.h>

Servo myservo;

void setup() 
{

  // init esus board
  initEsusBoard();

  myservo.attach(2);

}

void loop() 
{

  myservo.write(180); 
 
  delay(1000);
  
  myservo.write(50); 
    
  delay(1000);

}
