class MyClass {
  private readonly a?: string;
  private readonly b: string;
  private c: string;
  private d: string;
  private static readonly E: number = 5_000;

  constructor(a: string = "a", c: string = "c") {
    this.a = undefined;
    this.b = "b";
    this.c = c;
  }

  async init(): Promise<void> {
    this.d = "d";
  }

  async funcA(): Promise<void> {
    this.c = "hello world";
    console.log(this.c);
    console.log(this.d);
  }

  static async funcB(): Promise<void> {
    console.log("static function");
  }
}

async function mainClasses() {
  await MyClass.funcB();
  const myClass: MyClass = new MyClass();
  await myClass.funcA();
  await myClass.init();
  await myClass.funcA();
}

mainClasses();
