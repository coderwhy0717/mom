const theme = {
  // baseNode: {
  //   fill: "rgb(255, 230, 204)",
  //   stroke: "green",
  //   strokeDasharray: ""
  // },
  // 矩形
  rect: {
    fill: "#FFFFFF",
    stroke: "red",
    strokeDasharray: "",
    // className: "custom-cls",
    radius: 30
  },
  // 圆
  // circle: {
  //   r: 10,
  //   // stroke: "red",
  //   fill: "#fff"
  // },
  // 菱形
  diamond: {
    fill: "#238899"
  },
  // 椭圆形
  ellipse: {
    strokeWidth: 3
  },
  // 多边形
  polygon: {
    strokeDasharray: "none"
  },
  anchor: {
    r: 3,
    fill: "#9a9312",
    hover: {
      fill: "red"
    }
  },
  nodeText: {
    fontSize: 14,
    fontWeight:600,
    color: "#0a71f7",
    overflowMode: "autoWrap"
  },
  baseEdge: {
    strokeWidth: 1,
    strokeDasharray: "3,3"
  },
  edgeText: {
    textWidth: 60,
    overflowMode: "autoWrap",
    background: {
      fill: "#919810"
    }
  },
  polyline: {
    offset: 20,
    strokeDasharray: "none",
    strokeWidth: 3,
    stroke: "#187dff"
  },
  bezier: {
    stroke: "red",
    adjustLine: {
      strokeWidth: 2,
    },
    adjustAnchor: {
      stroke: "blue",
      fill: "green"
    }
  },
  arrow: {
    offset: 10, // 箭头长度
    verticalLength: 3, // 箭头垂直于边的距离
    fill: "none",
  },
  anchorLine: {
    stroke: "red"
  },
  snapline: {
    stroke: "red"
  },
  edgeAdjust: {
    r: 10
  },
  outline: {
    stroke: "red",
    hover: {
      stroke: "green"
    }
  }
};

export default theme;
