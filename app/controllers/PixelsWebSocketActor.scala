package controllers

import akka.actor.{Actor, ActorRef}

class PixelsWebSocketActor(out: ActorRef) extends Actor {
  def receive = {
  case msg: String =>
  out ! ("0" + pixels.userGrid.toJson)
}

  def sendJsonToClient = {
  println("Received event from Controller")
  out ! (gameController.toJson.toString)
}
}
