export class NavLink {
  id: number;
  display: string;
  href: string;
  isNew: boolean;

  constructor(id: number, display: string, href: string, isNew: boolean) {
    this.id = id;
    this.display = display;
    this.href = href;
    this.isNew = isNew;
  }
}
