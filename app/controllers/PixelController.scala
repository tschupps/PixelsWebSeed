package controllers

import javax.inject._

import play.api.mvc._
//import de.htwg.se.sudoku.Sudoku
//import de.htwg.se.sudoku.controller.controllerComponent.GameStatus

import de.htwg.se.pixels.aview.gui.Gui
import de.htwg.se.pixels.aview.tui.Tui
import de.htwg.se.pixels.controller.Controller
import de.htwg.se.pixels.model.impl.Grid


@Singleton
class PixelController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  val userGrid = new Grid(1,1)
  val sysGrid = new Grid(1,1)
  val pixels = Controller(userGrid,sysGrid)

  val tui = new Tui(pixels)
  val gui = new Gui(pixels)
  gui.visible = true

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
}