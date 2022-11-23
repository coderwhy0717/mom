import styled from 'styled-components'

export const PaintingWrappar = styled.div`
    .dome {
        font-family: sans-serif;
        text-align: center;
        width: 100% !important;
            height: 800px !important;
        .lf-graph {
            width: 100% !important;
            height: 800px !important;
        }
    }
    .lf-dndpanel {
        height: 80vh !important;
        /* width: 200px; */
        overflow-y: scroll;
    }
    .lf-custom-edge-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .custom-edge {
        flex: 1;
        border-radius: 8px;
        border: 1px solid black;
        background-color: white;
    }
    .lf-edge {
        background-color: #fff !important;
    }
    .divBox {
        position: absolute;
        left: 0;
        right: 0;
        width: 50%;
        display: flex;
        justify-content: center;
        /* background-color: red; */
        z-index: 1;
        margin-left: 100px;
        text-align: center;
        #editButton {
            margin-left: 5px;
            border: 1px #187dff solid;
            border-radius: 5px;
            cursor: pointer;
            background-color: #187dff;
            color: #fff;
            &:hover {
                background-color: #183dff;
            }
        }
        #editInput {
            border: 1px #187dff solid;
            margin-left: 100px;
        }
        .data {
            background-color: #fff;
            border: 1px solid #ccc;
            width: 80px;
            padding: 3px;
            text-align: center;
            font-size: 12px;
            &:hover {
                background-color: #ecf5ff;
                color: #409eff;
                border: 1px solid #c6e2ff;
                cursor: pointer;
            }
        }
    }
    
.lf-context-item {
    display: flex;
    align-items: center;
    /* width: auto; */
    background: none !important;
}


    /* .custom-cls {
        color: red !important;
        background-color: red !important;
    } */
    
    /* .lf-dnd-item {
        width: 80px;
            display: inline-block;
        }
        .lf-dnd-item:first-of-type {
            display: block;
        } */
`