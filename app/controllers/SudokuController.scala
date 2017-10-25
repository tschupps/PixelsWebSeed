package controllers

import javax.inject._

import play.api.mvc._
import de.htwg.se.sudoku.Sudoku
import de.htwg.se.sudoku.controller.controllerComponent.GameStatus

import de.htwg.se.pixels.aview.gui.Gui
import de.htwg.se.pixels.aview.tui.Tui
import de.htwg.se.pixels.controller.Controller
import de.htwg.se.pixels.model.impl.Grid


@Singleton
class SudokuController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val grid = new Grid(1,1)
  val pixels = Controller(grid,grid)
  //val tui = Tui(pixels)
  val gui = new Gui(pixels)

  gui.visible = true
  val gameController = Sudoku.controller
  def tui =  gameController.gridToString + GameStatus.message(gameController.gameStatus)

  def sudoku = Action {
    Ok(tui)
  }

  def newGrid = Action {
    gameController.createNewGrid
    Ok(tui)
  }
}