export abstract class MathUtils {
    static getRandomIntWithMax(max): number {
      return Math.floor(Math.random() * max) + 1;
    }
}
