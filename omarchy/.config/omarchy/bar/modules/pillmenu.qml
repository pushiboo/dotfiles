import QtQuick

Item {
  id: root
  property var bar
  property string moduleName
  property var settings

  implicitWidth: pill.width + 8
  implicitHeight: bar ? bar.barSize : 26

  Rectangle {
    id: pill
    anchors.centerIn: parent
    width: label.implicitWidth + 28
    height: parent.height - 4
    radius: height / 2
    color: area.containsMouse ? (bar ? bar.foreground : "white")
                              : (bar ? Qt.alpha(bar.background, 0.85) : "#222")
    border.width: 1
    border.color: bar ? Qt.alpha(bar.foreground, 0.3) : "#555"

    Text {
      id: label
      anchors.centerIn: parent
      text: "◆  Menu"
      color: area.containsMouse ? (bar ? bar.background : "black")
                                : (bar ? bar.foreground : "white")
      font.family: bar ? bar.fontFamily : "monospace"
      font.pixelSize: 12
    }
    MouseArea {
      id: area
      anchors.fill: parent
      hoverEnabled: true
      onClicked: if (bar) bar.run("omarchy-menu")
    }
  }
}
