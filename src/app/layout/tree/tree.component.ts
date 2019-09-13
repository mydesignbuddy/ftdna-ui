import { FlatTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }]
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
        children: [{ name: "Broccoli" }, { name: "Brussel sprouts" }]
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins" }, { name: "Carrots" }]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"]
})
export class TreeComponent {
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  dataSource: MatTreeFlatDataSource<FoodNode, { expandable: boolean; name: string; level: number; }>;

  treeFlattener: MatTreeFlattener<FoodNode, { expandable: boolean; name: string; level: number; }>;

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level
    };
  }

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      node => node.level,
      node => node.expandable,
      node => node.children
    );
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
