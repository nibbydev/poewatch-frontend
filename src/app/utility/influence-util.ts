export class InfluenceUtil {

  public static readonly influences = ['shaper', 'elder', 'crusader', 'redeemer', 'hunter', 'warlord'];

  public static isInfluence(influence: string): boolean {
    return this.influences.includes(influence);
  }

}
