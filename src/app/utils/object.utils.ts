export abstract class ObjectUtils {
  static compareObjects(o1, o2): boolean {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }

  static toUTCIso(date: Date): string {
    return new Date(
      date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()
    ).toISOString();
  }
}
