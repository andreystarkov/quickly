/*
* @Author: Andrey Starkov
* @Date:   2016-04-15 16:44:51
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 17:00:09
*/

import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'RobotoDraft, Fira Sans, Helvetica, sans-serif',
  palette: {
    primary1Color: Colors.yellowA400,
    primary2Color: Colors.lightGreen500,
    primary3Color: Colors.blueGrey800,
    accent1Color: Colors.yellowA400,
    accent2Color: Colors.deepOrange800,
    accent3Color: Colors.green800,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: #f8f7f3,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.brown600,
  }
};
