export interface IEntityBase {
  parse(json: any): any ;
}

export abstract class EntityBase<T>{

  public static parseArray<T extends EntityBase<T>>(constructorFn: new () => T, json: any[]): T[]{
    let array: T[] = [];
    json.forEach((object, index) => {
      array.push(new constructorFn().parse(object));
    });
    return array;
  }

  public parse(json: any): any {
    this.setAttributes(json);
    return this.getObject();
  }

  abstract setAttributes(input: Object): void;
  abstract getObject(): T;
}
