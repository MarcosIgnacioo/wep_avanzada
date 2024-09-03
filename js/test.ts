
class Foo {
  x:number
  y:number
  color:string
  constructor(x:number, y:number, color:string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  bar(buzz:boolean):number {
    console.log(buzz)
    return 1;
  }
}
