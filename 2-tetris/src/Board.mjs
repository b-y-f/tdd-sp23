export class Board {
  width
  height

  constructor (width, height) {
    this.width = width
    this.height = height
    this.board = this.createBoard(width, height)
    this.falling = undefined // {posX, posY, blk}
    this.middle = Math.floor(width / 2) // (10x6) middle =5
    this.fixed = []
  }

  #findMiddle (number) {
    return number % 2 === 0 ? number : number + 1
  }

  #cantTick (block) {}

  left () {}

  right () {}

  down () {}

  createBoard () {
    return new Array(this.height)
      .fill('.')
      .map(() => new Array(this.width).fill('.'))
  }

  hasFalling () {
    return this.falling !== undefined
  }

  drop (block) {
    if (this.hasFalling()) {
      throw new Error('already falling')
    }

    if (block.width === 1) {
      // this only work in initial test on small board
      this.board[0][this.middle] = block.shapeArray
      this.falling = { pos_i: 0, pos_j: 1, blk: block }
    } else {
      // this for those shapes
      const startPos = {
        r: 0,
        c: this.middle - this.#findMiddle(Math.floor(block.width / 2))
      }
      for (let i = 0; i < block.height; i++) {
        for (let j = startPos.c; j < block.width + startPos.c; j++) {
          this.board[i][j] = block.shapeArray[i][j - startPos.c]
        }
      }
      this.falling = { pos_i: 1, pos_j: 3, blk: block }
    }
  }

  tick () {
    if (this.falling !== undefined) {
      const { pos_i: posI, pos_j: posJ, blk } = this.falling

      if (blk.width === 1) {
        if (posI === this.height - 1 || this.board[posI + 1][posJ] !== '.') {
          this.falling = undefined
          return
        }
        this.board[posI][posJ] = '.'
        this.board[posI + 1][posJ] = blk.shapeArray
      } else {
        if (
          posI === this.height - 1 ||
          this.board[posI + 1][posJ + 1] !== '.'
        ) {
          this.falling = undefined
          return
        }
        for (let j = 3; j < blk.width + 3; j++) {
          // move botom
          this.board[posI + 1][j] = this.board[posI][j]
          // move top
          this.board[posI][j] = this.board[posI - 1][j]
          this.board[posI - 1][j] = '.'
        }
      }
      this.falling = { pos_i: posI + 1, pos_j: posJ, blk }
    }
  }

  toString () {
    let res = ''
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i]
      for (let j = 0; j < row.length; j++) {
        const tile = this.board[i][j]
        res = res.concat(tile)
      }
      res = res.concat('\n')
    }
    return res
  }
}
