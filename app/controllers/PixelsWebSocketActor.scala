package controllers

import akka.actor.{Actor, ActorRef}

class PixelsWebSocketActor(out: ActorRef) extends Actor {
  def receive = {
  case msg: String =>
  out ! (gameController.toJson.toString)
  println("Sent Json to Client"+ msg)
}

  def sendJsonToClient = {
  println("Received event from Controller")
  out ! (gameController.toJson.toString)
}
}
