import styled from 'styled-components'

export const HomeWrapper = styled.div`
    position: relative;
    height: 100vh;
    .dv-water-pond-level text {
        display: none;
    }
   
    .water {
        display: flex;
        align-items: center;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
        padding: 2px 4px;
    }
    .ant-tabs-tab-remove {
        margin-left: 4px;
    }
    .ant-tabs-tab-btn {
        font-size: 12px;
    }
    .ant-tabs > .ant-tabs-nav, .ant-tabs > div > .ant-tabs-nav {
            width: 100%;
            background-color: rgba(250, 250, 250) !important;
        }
        .ant-tabs-tab .ant-tabs-tab-with-remove {
            border: 1px solid #000 !important;
        }
        .ant-tabs-nav-list {
            margin-top: .3rem;
        }
        .ant-tabs-top > .ant-tabs-nav::before {
            border-bottom: 1px solid #ccc !important;
        }
        .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
            border: 1px solid #ccc;

        }
        .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active {
            border-bottom-color: #fff !important;
        }
        .ant-tabs-nav-wrap {
        }
    .menu {
        display: flex;
        align-items: center;
        height: 3rem;
        /* background-color: #fff; */
        padding: 0 10rem;
        background: rgba(48, 117, 242,9) !important;
        /* justify-content: space-around; */
        .table-title {
            border-radius: 5px !important;
        }
        .ant-btn {
            /* background: rgba(48, 117, 242); */
            border-color: rgba(48, 117, 242) !important;
            border-radius: 5px !important;
            background: rgba(48, 117, 242) !important;
            font-size: 1.2rem;
            color: #fff;
            height: 100%;
        }
        
        .table-title {
            font-size: 1rem;
            margin-left: 2rem;
            background: rgba(48, 117, 242) !important;
            .ant-btn:hover, .ant-btn:focus {
                color: #fff !important;
                border-color: rgba(105, 192, 255) !important;
                background: rgba(105, 192, 255) !important;
            }
        }
        
    }
`
export const HeaderWrapper = styled.div`
    font-size: 3rem;
    background-color: rgba(0, 80, 179);
    text-align: center;
    color: #fff;
    background-image: linear-gradient(to right,red,blue);
`

export const ContentWrapper = styled.div`
   
`

export const FooterWrapper = styled.div`
    width: 100%;
    height: 5rem;
    font-size: .9rem;
    color: #7a7a7a;
    /* color: rgba(157, 157, 157); */
    border-top: 1px solid #e9e9e9;
    background-color: rgba(251, 251, 251);
    .logo {
        margin: .8rem 0;
        display: flex;
        align-items: center;
        img {
            width: 10rem;
            height: 1.5rem;
            object-fit: cover;
        }
        
    }
    .color {
            margin-left: 5rem;
            color: #9d9d9d;
        }
`