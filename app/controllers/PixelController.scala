package controllers

import javax.inject._

import de.htwg.se.pixels.util.Observer
import play.api.libs.streams.ActorFlow
import play.api.mvc._
//import de.htwg.se.sudoku.Sudoku
//import de.htwg.se.sudoku.controller.controllerComponent.GameStatus

import de.htwg.se.pixels.aview.gui.Gui
import de.htwg.se.pixels.aview.tui.Tui
import de.htwg.se.pixels.controller.Controller
import de.htwg.se.pixels.model.impl.Grid


@Singleton
class PixelController @Inject()(cc: ControllerComponents) extends AbstractController(cc) with Observer {

  val userGrid = new Grid(1,1)
  val sysGrid = new Grid(1,1)
  val pixels = Controller(userGrid,sysGrid)

  val tui = new Tui(pixels)
  val gui = new Gui(pixels)
  gui.visible = true

  var newState = pixels.gridUser


  //val gameController = Sudoku.controller
  //def tui =  gameController.gridToString + GameStatus.message(gameController.gameStatus)

  def pixel = Action {
    Ok(views.html.index("Welcome to Pixels"))
    //Ok("Please select a game")
  }

  def game(number: Int) = Action {
    Ok(views.html.pixels(pixels, number))
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

  pixels.addObserver(this)
  def update() = {
    socket
    //newState = pixels.getState
    //refreshGrid()
  }

  def refreshGrid()= {
    for(r <- 0 until pixels.gridSys.getRow){
      for(c<-0 until pixels.gridSys.getCol){
        val newR = r+1
        val newC = c+1
        colorCell(newR.toString + newC.toString, newState.getValue(r+1,c+1).value.toString)
      }
    }
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      PixelsWebSocketActorFactory.props(out)
    }
  }
}