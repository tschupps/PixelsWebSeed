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

  val grid = new Grid(5,5)
  val pixels = Controller(grid,grid)

  val tui = new Tui(pixels)
  val gui = new Gui(pixels)
  gui.visible = true

  //val gameController = Sudoku.controller
  //def tui =  gameController.gridToString + GameStatus.message(gameController.gameStatus)

  def pixel = Action {
    Ok(views.html.index(tui.printTui()))
  }

  def game = Action {
    Ok(views.html.pixels(pixels))
  }
  def help = Action {
    //gameController.createNewGrid
    Ok(views.html.welcome("welcomeTest"))
  }
}