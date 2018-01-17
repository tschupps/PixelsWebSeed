package controllers

import javax.inject._

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import de.htwg.se.pixels.util.Observer
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import akka.stream.Materializer
import de.htwg.se.pixels.aview.gui.Gui
import de.htwg.se.pixels.aview.tui.Tui
import de.htwg.se.pixels.controller.Controller
import de.htwg.se.pixels.model.IGrid
import de.htwg.se.pixels.model.impl.Grid

import scala.swing.Reactor


@Singleton
class PixelController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc){

  val userGrid = new Grid(1,1)
  val sysGrid = new Grid(1,1)
  val pixels = Controller(userGrid,sysGrid)

  //val tui = new Tui(pixels)
  //val gui = new Gui(pixels)
  //gui.visible = true

  var newState = pixels.gridUser


  //val gameController = Sudoku.controller
  //def tui =  gameController.gridToString + GameStatus.message(gameController.gameStatus)

  def pixel = Action {
    Ok(views.html.index("Pixels."))
    //Ok("Please select a game")
  }

  def game(number: Int) = Action {
    Ok(views.html.pixels(pixels, number))
  }

  def index() = Action {
    Ok(views.html.index2())
  }

  def help = Action {
    //gameController.createNewGrid
    Ok(views.html.welcome("How To Pixels"))
  }

  def colorCell(id: String, color: String) = Action{
    val row = id.charAt(0).toInt - 48 + 1
    val col = id.charAt(1).toInt - 48 + 1
    pixels.colourCell(row, col, color)
    Ok("test")
  }

  def getTip(id: String) = Action{
    val row = id.charAt(0).toInt - 48 + 1
    val col = id.charAt(1).toInt - 48 + 1
    if(pixels.tip(row, col))
      Ok("Right")
    else
      Ok("Wrong")
  }

  def undo() = Action{
    pixels.undo
    Ok("undo")
  }

  def testAll() = Action{
    if(pixels.testAll())
      Ok("Gewonnen")
    else
      Ok("not finished yet")
  }

  object PixelsWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new PixelsWebSocketActor(out))
    }
  }

  class PixelsWebSocketActor(out: ActorRef) extends Actor with Observer{
    pixels.addObserver(this)
    def update() = {
      newState = pixels.getState
      out ! (toJson(newState))
    }

    def receive = {
      case msg: String => println("not used")
    }
  }

  def toJson(grid: IGrid) = {
    println(grid.getCol)
    println(grid.getRow)
    var json = "{\"cells\":{\n"
    for(r <- 0 until grid.getRow){
      for(c<-0 until grid.getCol) {
        json = json + ("\"")
        json = json +(r.toString)
        json = json +(c.toString)
        json = json +("\":")
        json = json +("\"" + grid.getValue(r + 1, c + 1).value.toString + "\"")
        if(r < grid.getRow-1 || c < grid.getCol-1) {
          json = json + ","
        }
        json = json + ("\n")
      }
    }
    json = json +("}\n")
    json = json +("}\n")
    json
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      PixelsWebSocketActorFactory.create(out)
    }
  }
}