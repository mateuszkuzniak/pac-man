import { OBJECT_TYPE, DIRECTIONS } from "./setup.js";

class Pacman {
  constructor(speed, startPos) {
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove = () => {
    if (!this.dir) return false;

    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }

    this.timer++;
  };

  getNextMove = (objectExists) => {
    let nextMovePos = this.pos + this.dir.movement;

    if (
      objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExists(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePos = this.pos;
    }

    return {
      nextMovePos,
      direction: this.dir,
    };
  };

  makeMove = () => {
    return {
      classesToRemove: [OBJECT_TYPE.PACMAN],
      classesToAdd: [OBJECT_TYPE.PACMAN],
    };
  };

  setNewPos = (nextMovePos) => {
    this.pos = nextMovePos;
  };

  handleKeyInput = (e, objectExists) => {
    let dir;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      dir = DIRECTIONS[e.key];
    } else {
      return;
    }

    const nextMovePos = this.pos + dir.movement;
    if (
      objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExists(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    )
      return;
    this.dir = dir;
  };
}

export default Pacman;
