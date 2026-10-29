import QtQuick

Item {
  id: root
  property var bar
  property string moduleName
  property var settings
  property string stamp: Qt.formatDateTime(new Date(), "ddd d MMM  HH:mm")

  implicitWidth: pill.width + 8
  implicitHeight: bar ? bar.barSize : 26

  Timer {
    interval: 1000; running: true; repeat: true
    onTriggered: root.stamp = Qt.formatDateTime(new Date(), "ddd d MMM  HH:mm")
  }

  Rectangle {
    id: pill
    anchors.centerIn: parent
    width: label.implicitWidth + 28
    height: parent.height - 4
    radius: height / 2
    color: bar ? Qt.alpha(bar.background, 0.85) : "#222"
    border.width: 1
    border.color: bar ? Qt.alpha(bar.foreground, 0.3) : "#555"

    Text {
      id: label
      anchors.centerIn: parent
      text: root.stamp
      color: bar ? bar.foreground : "white"
      font.family: bar ? bar.fontFamily : "monospace"
      font.pixelSize: 12
    }
  }
}
