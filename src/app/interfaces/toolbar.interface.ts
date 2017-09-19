import {ToolbarMenuInterface} from "./toolbar-menu.interface";
import {ToolbarButton} from "./toolbar-button.interface";

export interface ToolbarInterface {

  hidden: boolean;
  color: string;
  title: string;
  menu: ToolbarMenuInterface[];
  backOption: ToolbarMenuInterface;
  rightButton: ToolbarButton;
  leftButton: ToolbarButton;
  hiddenLeftMenu: boolean;

}
