class StorageWrapper {
  constructor(private storage: Storage) {}

  public store(scriptName: string, data: Object): void;
  public store(scriptName: string, data: string): void;
  public store(scriptName: string, data: string | Object): void {
    this.storage.setItem(scriptName, JSON.stringify(data));
  }

  public get<T>(scriptName: string): T {
    return JSON.parse(this.storage.getItem(scriptName) ?? "");
  }
}

const MicroscriptStorage = new StorageWrapper(globalThis.sessionStorage);

export default MicroscriptStorage;
