import React, {useState} from 'react'
import './Login.scss'
import {Form, Input, Button, Checkbox} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login(){

    const [isError, setIsError] = useState(false)
    const usersList = [
        {
            login: 'test',
            password: 'test123'
        }
    ]

    const submitForm = (values) => {
        const user = usersList.find(item => item.login === values.login)
        if(!user || user.password !== values.password){
            setIsError(true)
        } else {
            window.location.replace(window.location.origin + '/themes')
        }
    }


    return (
        <div className='login_bg'>
            <div className='login_form'>
                <h1 className='login_title'>
                    Вход
                </h1>
                <div className={['login_error', isError ? 'active' : ''].join(' ')}>
                    Неверное имя пользователя или пароль
                </div>
                <Form
                    className='form'
                    onFinish={submitForm}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item name='login' rules={[{required: true, message:'Введите логин!'}]}>
                        <Input className='form_input' prefix={<UserOutlined />} placeholder='Логин'/>
                    </Form.Item>
                    <Form.Item name='password' rules={[{required: true, message: 'Ввеидте пароль!'}]}>
                        <Input.Password className='form_input' prefix={<LockOutlined />} placeholder='Пароль'/>
                    </Form.Item>
                    <Form.Item name='remember_me' valuePropName='checked'>
                        <Checkbox defaultChecked={false}> Запомнить меня </Checkbox>
                    </Form.Item>
                    <Button htmlType='submit' type='primary' className='form_button'>Вход</Button>
                </Form>
            </div>
        </div>
    )
}
