import styled from 'styled-components'

export const LoginWrapper = styled.div`
    height: 100vh;
    background: url(${require('@/assets/img/bn3_01.jpg')}) no-repeat top right;
    object-fit: cover;
    padding-top: 6rem;
    .login {
        position: relative;
        left:33rem; 
        padding: 2rem  2rem 1rem;
        max-width: 25rem;
        box-shadow: 1px 1px 10px 4px rgba(100,100,100,.5);
        background: rgba(105, 172, 214,.5);
        .title {
            font-size: 1.5rem;
            padding-bottom: 2rem;
            text-align: center;
        }
        .login-form-forgot {
            float: right;
        }
        .ant-col-rtl .login-form-forgot {
            float: left;
        }
        .login-form-button {
            width: 100%;
        }
        .ant-checkbox-wrapper {
        }
    }
`