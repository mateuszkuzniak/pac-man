import { DIRECTIONS, OBJECT_TYPE } from "./setup.js";

class Ghost {
  constructor(speed = 5, startPos, movement, name) {
    this.speed = speed;
    this.startPos = startPos;
    this.pos = startPos;
    this.movement = movement;
    this.name = name;
    this.dir = DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }

  shouldMove = () => {
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
    return false;
  };

  getNextMove = (objectExists) => {
    const { nextMovePos, direction } = this.movement(
      this.pos,
      this.dir,
      objectExists
    );
    return { nextMovePos, direction };
  };

  makeMove = () => {
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

    return {
      classesToRemove: [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name],
      classesToAdd: this.isScared
        ? [...classesToAdd, OBJECT_TYPE.SCARED]
        : classesToAdd,
    };
  };

  setNewPos = (nextMovePos, direction) => {
    this.pos = nextMovePos;
    this.dir = direction;
  };
}

export default Ghost;
