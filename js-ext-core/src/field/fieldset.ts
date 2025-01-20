import { forOwn, has, map } from "lodash-es";
import { HexStr } from "../util";

import { FieldTypes, Fields } from "./common";

export abstract class FieldSet {
  // //////////////////////////////////////////////////////////
  // Child classes MUST override below properties and methods

  // An 1-byte type enum
  public static type: number = -1;

  // Human readable name of the type. Appears in error messages.
  public static typeName: string;

  // Fields declaration
  public static fieldTypes: FieldTypes;

  // End override
  // //////////////////////////////////////////////////////////

  // shortcuts for this._static.*.
  public readonly type: number = -1;
  public readonly typeName: string = "";
  public readonly fieldTypes: FieldTypes = {};

  // Fields in their canonical forms.
  protected fields: Fields = {};

  constructor() {
    this.type = this._static.type;
    this.typeName = this._static.typeName;
    this.fieldTypes = this._static.fieldTypes;
  }

  // A workaround to read child class's static members.
  private get _static(): typeof FieldSet {
    return this.constructor as typeof FieldSet;
  }

  // Fields accessors

  // Reset all fields from an object
  public setFields(obj: Fields): void {
    this.fields = {};
    forOwn(this.fieldTypes, (fieldType, name) => {
      if (obj[name] === undefined) {
        this.fields[name] = null;
        return;
      }

      try {
        this.fields[name] = fieldType.canonicalize(obj[name]);
      } catch (e) {
        throw new Error(`Cannot set field '${name}' to '${JSON.stringify(obj[name])}': ${e}`);
      }
    });
  }

  // Reset all fields from the array
  public setFieldsFromArray(names: string[], array: any[]): void {
    this.fields = {};
    for (let i = 0; i < array.length; i++) {
      const name = names[i];
      const fieldType = this.fieldTypes[name];
      if (!fieldType) {
        throw new Error(`Unknown field '${name}' for '${this.typeName}' (type ${this.type})`);
      }

      try {
        this.fields[name] = fieldType.canonicalize(array[i]);
      } catch (e) {
        throw new Error(`Cannot set field '${name}' to '${JSON.stringify(array[i])}': ${e}`);
      }
    }
  }

  // Get one field
  public getField(name: string): any {
    const value = this.fields[name];
    if (value == null) {
      throw new Error(`Missing field '${name}' for '${this.typeName}' (type ${this.type})`);
    }
    return value;
  }

  // Get many fields as an array
  public getFields(names: string[]): any[] {
    return map(names, (name) => this.getField(name));
  }

  public toObject(): Fields {
    return this.fields;
  }

  throwTypeError(msg: string): never {
    throw new Error(`${msg} for '${this.typeName}' (type ${HexStr.fromNumber(this.type)})`);
  }
}

// Instantiable child class of TypedFields
export interface ConcreteFieldSet<T extends FieldSet> {
    type: number;
    fieldTypes: FieldTypes;
    new(): T;
}

export class FieldSetFactory<T extends FieldSet> {
  private registry: { [type: number]: ConcreteFieldSet<T> } = {};
  private requiredFields: string[];

  constructor(requiredFields?: string[]) {
    this.requiredFields = requiredFields || [];
  }

  public add(cls: ConcreteFieldSet<T>) {
    const type = cls.type;
    const fieldTypes = cls.fieldTypes;

    if (type === -1) {
      throw new Error("Cannot register TypedFields: Missing type");
    }
    if (this.registry[type]) {
      throw new Error(`Cannot register TypedFields: type ${type} already registered`);
    }

    if (!fieldTypes) {
      throw new Error("Cannot register TypedFields: Missing fieldTypes");
    }
    for (const name of this.requiredFields) {
      if (!fieldTypes[name]) {
        throw new Error(`Cannot register TypedFields: Missing required field '${name}'`);
      }
    }

    this.registry[type] = cls;
  }

  public has(type?: any): boolean {
    if (HexStr.isHex(type)) {
      return has(this.registry, HexStr.toNumber(type));
    } else {
      return has(this.registry, type);
    }
  }

  public lookup(type?: any): ConcreteFieldSet<T> {
    if (!this.has(type)) {
      throw new Error(`Unsupported type '${HexStr.fromNumber(type)}'`);
    }

    if (HexStr.isHex(type)) {
      return this.registry[HexStr.toNumber(type)];
    } else {
      return this.registry[type];
    }
  }

  public fromObject(fields: Fields): T {
    const ctor = this.lookup(fields?.type);
    const instance = new ctor();
    instance.setFields(fields);
    return instance;
  }
}
