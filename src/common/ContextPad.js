import { message } from 'antd';
const COMMON_TYPE_KEY = "menu-common";
const NEXT_X_DISTANCE = 200;
const NEXT_Y_DISTANCE = 100;
// // 更新文本 存储id

class ContextPad {
  constructor({ lf }) {
    this.menuTypeMap = new Map();
    this.lf = lf;
    this.__menuDOM = document.createElement("div");
    this.__menuDOM.className = "lf-inner-context";
    this.menuTypeMap.set(COMMON_TYPE_KEY, []);
    this.evet = ''
   
  }

  render(lf, container) {
    this.container = container;
    
      let isshow = true
      // 双击节点
    lf.on("node:dbclick",({e,data}) => {
      if(!this.lf.graphModel.editConfigModel.adjustNodePosition) return
      if(e.path[1].children[0].className !== "lf-node-text--auto-wrap-inner") return
      if(isshow) {
        e.path[1].children[0].style.display = "none"
        const menuItem = document.createElement("input")
        menuItem.className = 'inputText'
        e.path[1].insertBefore(menuItem, e.path[1].children[0]);
        const arr =  e.path[1].children[1].innerHTML.split("：")
        menuItem.value = arr[1]
        isshow = false
      }
      console.log(e,"ss")
      console.log(data,"data1")
      
      this.evet = e
    })

    lf.on("node:click", ({ data,e}) => {
      this._activeData = data;
      // 传进去Data
      if(this.lf.graphModel.editConfigModel.adjustNodePosition) {
        this.createContextMenu(data,e);
        return
      }
      // 引入全局提示信息
      message.warning('请点击编辑');
      console.log(e,"es")
      console.log(data,"data");
      // console.log(this.lf,"lf")
    
    });
 
    lf.on("edge:click", ({ data }) => {
      // 获取右上角坐标
      this._activeData = data;
      if(this.lf.graphModel.editConfigModel.adjustNodePosition) {
        this.createContextMenu();
        return
      }
       // 引入全局提示信息
       message.warning('请点击编辑');
       console.log(data,"edge")
    });
    lf.on("edge:dbclick",({e} ) => {
       console.log("边双击")
    })
    // 点击画布 
    lf.on("blank:click", (e) => {
      if(!this.lf.graphModel.editConfigModel.adjustNodePosition) {
        message.warning('请点击编辑');
        return
      }
       // 引入全局提示信息
       this.hideContextMenu();
       console.log(this._activeData,"this._activeData")

       const inputText = document.querySelector(".inputText");
      // if(!inputText.value) return
      // 没有输入东西时
      if(!inputText) return
      if(!inputText.value) {
        // 删除第0个孩子 
        this.evet.path[1].removeChild(this.evet.path[1].children[0])
        // 第一个孩子变成第0个孩子
        this.evet.path[1].children[0].style.display = "block"
        // 重新初始化
        isshow = true
        return
      }
      if(this.evet.path[1].children[1].style.display === "none") {
        // console.log(this._activeData.text.value,"inputText")
        // 去重
        const arrnya = this._activeData.text.value.split(`\n`)
        console.log(arrnya,"arrny")
        // 设置文本值
        this.lf.updateText(this._activeData.id,"Seq：" + inputText.value + "\n" + arrnya[1] + "\n" + arrnya[2] + "\n" + arrnya[3])
        // 删除第0个孩子 
        this.evet.path[1].removeChild(this.evet.path[1].children[0])
        // 第一个孩子变成第0个孩子
        this.evet.path[1].children[0].style.display = "block"
        // 重新初始化
        isshow = true
      }

    });
  }

  setAttributes() {
    this.isAnimation = true;
  }
  setContextMenuByType = (type, menus) => {
    this.menuTypeMap.set(type, menus);
  };
  /**
   * 隐藏菜单
   */
  hideContextMenu() {
    console.log("ABCD")
    this.__menuDOM.innerHTML = "";
    this.__menuDOM.style.display = "none";
    if (this.isShow) {
      this.container.removeChild(this.__menuDOM);
    }
    this.lf.off(
      "node:delete,edge:delete,node:drag,graph:transform",
      this.listenDelete
    );
    this.isShow = false;
  }
  /**
   * 显示指定元素菜单
   * @param data 节点id、节点类型、菜单位置
   */
  showContextMenu(data) {
    console.log(data,"id")
    if (!data || !data.id) {
      console.warn("请检查传入的参数");
      return;
    }
    this._activeData = data;
    this.createContextMenu();
  }
 
  setContextMenuItems(menus) {
    this.menuTypeMap.set(COMMON_TYPE_KEY, menus);
  }
  /**
   * 获取新菜单位置
   */
  getContextMenuPosition() {
    const data = this._activeData;
    const Model = this.lf.graphModel.getElement(data.id);
    if (!Model) {
      console.warn(`找不到元素${data.id}`);
      return;
    }
    let x;
    let y;
    if (Model.BaseType === "edge") {
      x = Number.MIN_SAFE_INTEGER;
      y = Number.MAX_SAFE_INTEGER;
      const edgeData = Model.getData();
      x = Math.max(edgeData.startPoint.x, x);
      y = Math.min(edgeData.startPoint.y, y);
      x = Math.max(edgeData.endPoint.x, x);
      y = Math.min(edgeData.endPoint.y, y);
      if (edgeData.pointsList) {
        edgeData.pointsList.forEach((point) => {
          x = Math.max(point.x, x);
          y = Math.min(point.y, y);
        });
      }
    }
    if (Model.BaseType === "node") {
      x = data.x + Model.width / 2;
      y = data.y - Model.height / 2;
    }
    return this.lf.graphModel.transformModel.CanvasPointToHtmlPoint([x, y]);
  }
  
  createContextMenu(data,e) {
    const { isSilentMode } = this.lf.options;
    // console.log(isSilentMode,"1  isSilentMode")
    // 静默模式不显示菜单
    if (isSilentMode) {

      return;
    }
    let items = this.menuTypeMap.get(this._activeData.type) || [];
    items = items.concat(this.menuTypeMap.get(COMMON_TYPE_KEY));
    const menus = document.createDocumentFragment();
    items.forEach((item) => {
      // console.log(item,"2 item")
      const menuItem = document.createElement("div");

      menuItem.className = "lf-context-item";
      const imgdiv = document.createElement("div");
      const imgdivs = document.createElement("div");
      const header = document.createElement("div");
      const img = document.createElement("img");
      if(item.label === 'control') {
        header.innerHTML = item.label + "："
      }else {
        header.innerHTML = item.label + "："
      }
      // yes / no 添加css 改变颜色
      if(item.text) {
        imgdiv.innerHTML = item.text;
        imgdivs.innerHTML = item.texts;
        imgdiv.className = "lf-context-img";
        imgdivs.className = "lf-context-img";
        if(item.texts === "NO") {
          imgdivs.className = "lf-context-imgNO";
        }
        
    // 点击判断 两个div 的 yes
        imgdiv.addEventListener("click", (index) => {
          this.hideContextMenu();
          const shan = data.text.value
        const arrny = shan.split(`\n`)
        // console.log(shan.split(`\n`))
        console.log(shan)
        console.log(arrny)
          // console.log(item,"aaa")
          // console.log(index,"indexsss")
          if (item.callback) {
                // console.log(item.callback,"item.callback")
                item.callback(this._activeData);
          } else {
                // 只判断YES  imgdiv的类型
                if(item.label === 'control') {
                    this.lf.setProperties(data.id,{
                      Control:'Y'
                    })
                    this.lf.updateText(data.id,(arrny[0] + "\n" + arrny[1]+'\n Control: Y \n'+ arrny[3]))
                     // 为YES的时候改变 节点圆圈 颜色
                    e.path[6].children[0].attributes[6].value = '#187dff'
                    e.path[1].attributes.style.value =  'color: #187dff'
                    return
                }
                  this.lf.setProperties(data.id,{
                    Repetition:'Y'
                  })
                  this.lf.updateText(data.id,(arrny[0] + "\n" + arrny[1] + '\n' + arrny[2] +'\n Repetition: Y'))
                  // const shan = data.text.value
                  // this.lf.updateText(data.id,shan + 'Y')
            }
        });
    //imgdivs 文本是NO的点击 
        imgdivs.addEventListener("click", (index) => {
          this.hideContextMenu();
          // console.log(item,"aaa")
          // console.log(index,"indexsss")
          const shan = data.text.value
          const arrny = shan.split(`\n`)
        // console.log(shan.split(`\n`))
        // console.log(shan)
        // console.log(arrny)
          if (item.callback) {
                item.callback(this._activeData);
          } else {
                // 只判断YES  imgdiv的类型
                if(item.label === 'control') {
                      this.lf.setProperties(data.id,{
                      Control:'N'
                    })
                    this.lf.updateText(data.id,arrny[0] + "\n" + arrny[1]+ '\n Control: N \n' + arrny[3])
                    // 为NO的时候改变 节点圆圈 颜色
                  //  console.dir(e.path[1])
                  //   console.dir(e.path[6],"N")
                    e.path[6].children[0].attributes[6].value = '#777'
                    e.path[1].attributes.style.value =  'color: #777'
                    // e.path[6].children[0].attributes[6].color = '#777'
                    return
                }
                  this.lf.setProperties(data.id,{
                    Repetition:'N'
                  })
                  this.lf.updateText(data.id,arrny[0] + "\n" + arrny[1] + '\n' + arrny[2] +'\n Repetition: N')

            }
        });

        menuItem.appendChild(header)
      
        menuItem.appendChild(imgdiv);
        menuItem.appendChild(imgdivs)
      }else {
        img.src = item.icon;
        img.className = "lf-context-img";
        img.addEventListener("click", (index) => {
          this.hideContextMenu();
          if (item.callback) {
            console.log(item.callback,"item.callback")
            item.callback(this._activeData);
          } else {
            console.log("no",index)
          }
        });
        menuItem.appendChild(img);
      }
      
      if (item.className) {
        menuItem.className = `${menuItem.className} ${item.className}`;
      }
      menus.appendChild(menuItem);
    });
    this.__menuDOM.innerHTML = "";
    this.__menuDOM.appendChild(menus);
    this.showMenu();
  }

  addNode(node, y) {
    const isDeep = y !== undefined;
    if (y === undefined) {
      y = node.y;
    }
    const nodeModel = this.lf.getNodeModelById(node.sourceId);
    const leftTopX = node.x - 100 + NEXT_X_DISTANCE;
    const leftTopY = y - node.y / 2 - 20;
    const rightBottomX = node.x + 100 + NEXT_X_DISTANCE;
    const rightBottomY = y + node.y / 2 + 20;
    const exsitElements = this.lf.getAreaElement(
      [leftTopX, leftTopY],
      [rightBottomX, rightBottomY]
    );
    console.log(exsitElements);
    if (exsitElements.length) {
      y = y + NEXT_Y_DISTANCE;
      this.addNode(node, y);
      return;
    }
    const newNode = this.lf.addNode({
      type: node.type,
      x: node.x + 200,
      y,
      properties: node.properties
    });

    let startPoint;
    let endPoint;
    if (isDeep) {
      startPoint = {
        x: node.x,
        y: node.y + nodeModel.height / 2
      };
      endPoint = {
        x: newNode.x - newNode.width / 2,
        y: newNode.y
      };
    }
    this.lf.addEdge({
      sourceNodeId: node.sourceId,
      targetNodeId: newNode.id,
      startPoint,
      endPoint
    });
  }

  showMenu() {
    const [x, y] = this.getContextMenuPosition();
    this.__menuDOM.style.display = "flex";
    this.__menuDOM.style.top = `${y}px`;
    this.__menuDOM.style.left = `${x + 10}px`;
    this.container.appendChild(this.__menuDOM);
    // 菜单显示的时候，监听删除，同时隐藏
    !this.isShow &&
      this.lf.on(
        "node:delete,edge:delete,node:drag,graph:transform",
        this.listenDelete
      );
    this.isShow = true;
  }

  listenDelete = () => {
    this.hideContextMenu();
  };
}

ContextPad.pluginName = "contextPad";

export { ContextPad };
