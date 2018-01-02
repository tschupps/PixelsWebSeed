package controllers

import akka.actor._

object PixelsWebSocketActorFactory {
  def props(out: ActorRef) = Props(new PixelsWebSocketActor(out))
}