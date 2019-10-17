export class Category {
  id: number;
  name: string;
  display: string;
  groups: Group[];
}

export class Group {
  id: number;
  name: string;
  display: string;
}
