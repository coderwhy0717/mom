/* eslint-disable */
import React, { memo,useEffect, useRef, useState } from 'react'
import LogicFlow from "@logicflow/core"
import { PaintingWrappar } from './style';
import { DndPanel,BpmnElement ,Control, MiniMap } from "@logicflow/extension";
// import UserTask from "@/common/UserTask";
import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";
import { ContextPad } from "@/common/ContextPad";
import setContextPad from "@/common/setContextPad";
import setDndPanel from "@/common/setDndPanel";
import { BpmnAdapter } from '@logicflow/extension';
import { Modal } from 'antd';
import ReactJson from 'react-json-view';
import {dataAmend} from '@/utils/data-amend'
import theme from './theme'
export default memo(function WYPainting() {
    const refContainer = useRef();
    const id = useRef(0)
    const [ lfc,setLfc ] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [datas,setdatas] = useState({})
      // 注册插件
    LogicFlow.use(BpmnAdapter); 
    const obj = {
      "T100" : {
        type:"circle",
        judge: 'Y',
        text:'T100：工序1',
      }
    }

    useEffect(() => {
          console.log(id.current,id,"id")
        const lf = new LogicFlow({
            container: refContainer.current,
            grid: true,
            style: theme,
            plugins: [BpmnElement, DndPanel, ContextPad, Control, MiniMap],
            adjustEdge: false,//允许调整边
            adjustNodePosition: false,//是否允许拖动节点
            hideAnchors: true,//是否隐藏节点的锚点，静默模式下默认隐藏
            stopScrollGraph: true, // 鼠标滚动
            stopZoomGraph: false, //缩放
            nodeTextEdit: false,//允许节点文本可以编辑
            // nodeTextDraggable: true,//允许节点文本可以拖拽
            // edgeTextDraggable: true//允许边文本可以拖拽
            // stopMoveGraph: true,//禁止拖动画布
          });
          lf.setTheme(theme);//样式
          setContextPad(lf);
          setDndPanel(lf);
          setLfc(lf)
          // 添加导航栏
        lf.extension.control.addItem({
          iconClass: "custom-minimap",
          title: "",
          text: "导航",
          onMouseEnter: (lf, ev) => {
            const position = lf.getPointByClient(ev.x, ev.y);
            lf.extension.miniMap.show(
              position.domOverlayPosition.x - 120,
              position.domOverlayPosition.y + 35
            );
        
          },
          onClick: (lf, ev) => {
            const position = lf.getPointByClient(ev.x, ev.y);
            lf.extension.miniMap.show(
              position.domOverlayPosition.x - 120,
              position.domOverlayPosition.y + 35
            );
          }
        
        })
        // 初始化数据
          lf.render({
            nodes: [
              {
                id: id.current,
                type: "circle",
                x: 150,
                y: 100,
                text: "开始",
                properties: {
                  Control:'Y',
                  Repetition:'Y',
                  Seq:''
                }
              }
            ]
          })
          //拖拽初始化 id 鼠标松开
            document.querySelector(".lf-dndpanel").addEventListener("mousedown", (e) => {
              // console.log(e,"e")
              console.log(id.current,"id.current")
              const text = e.target.parentElement.innerText
              const textContent = e.target.parentElement.innerText
              if(text === "结束") {
                lf.dnd.startDrag({
                    type: "bpmn:endEvent",
                    id: ++id.current,
                    text
                })
              }else if(text === "开始") {
                lf.dnd.startDrag({
                  type: obj.T100.type,
                  id: ++id.current,
                  text
              })
              }else{
                 // 获取文本div
                  const divtext = document.querySelector(".lf-node-text-auto-wrap-content")
                  console.log(divtext,"divtext")
                  // const menuItem = document.createElement("div")
                lf.dnd.startDrag({
                  type: obj.T100.type,
                  id: ++id.current,
                  text: "Seq："+ id.current + '\n' + textContent + '\n' +"Control: " + obj.T100.judge + '\n' +"Repetition: " + obj.T100.judge ,
                  properties: {
                    Control:'Y',
                    Repetition:'Y',
                    Seq: ""
                  }
              })
              console.log(e,"false")
              }
              
            });
            
          // 禁止编辑
            const eb = document.querySelector("#editButton");
            const put = document.querySelector("#editInput");
              eb.addEventListener("click", () => {
                console.dir(eb,"eb")
                console.log( lf.getGraphData()," lf.getGraphData()")
                if(put.value) {
                  console.dir(put,"first")
                  const isEdit = eb.getAttribute("data-edit");
                  console.log(isEdit);
                  const isEditable = isEdit === "true";
                  eb.setAttribute("data-edit", !isEditable);
                  eb.innerText = !isEditable ? "编辑中..." : "编辑";
                  lf.updateEditConfig({
                    adjustEdge: isEditable,
                    adjustNodePosition: !isEditable,
                    hideAnchors: isEditable,
                  })
                }else {
                  alert("请输入工号")

                }
            })
           
        },[id])
        
// 方法
        const changeData = () => {
          setIsModalVisible(true);
          const a = lfc.getGraphData()
          // console.log(a) 数据转换
          setdatas(dataAmend(a))
        }
     
        const handleOk = () => {
          setIsModalVisible(false);
        };
      
        const handleCancel = () => {
          setIsModalVisible(false);
        };
 
  return (
    <PaintingWrappar>
      <div className='divBox'>
        <div className='data' onClick={e => changeData()}>查看数据</div>
        <input id='editInput' placeholder='请输入工号' />w
        <button id='editButton' data-edit="false" >编辑</button>
      </div>
      {/* 查看数据 */}
      <Modal title="数据" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          {/* <pre>{JSON.stringify(datas, null, 4)}</pre> */}
          {/* 美化 json数据 html */}
          <ReactJson  src={datas} name={false} 
                      displayDataTypes={false}
                      displayObjectSize={false}
                      quotesOnKeys={false} />
      </Modal>
      <div className="dome" ref={refContainer}></div>
    </PaintingWrappar>
  )
})
