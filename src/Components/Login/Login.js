import React, {useState} from 'react'
import './Login.scss'
import {Form, Input, Button, Checkbox} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useStore} from "../../store/store";
import {ru_kz_dict} from "../../dictionaries/ru_kz_dict";

export default function Login(){

    const language = useStore(state => state.language)

    const changeLanguage = useStore(state => state.changeLanguage)

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
                    {
                        ru_kz_dict.vhod[language]
                    }
                </h1>
                <div className={['login_error', isError ? 'active' : ''].join(' ')}>
                    {
                        ru_kz_dict.login_oshibka[language]
                    }
                </div>
                <Form
                    className='form'
                    onFinish={submitForm}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item name='login' rules={[{required: true, message: ru_kz_dict.vvedite_login[language]}]}>
                        <Input className='form_input' prefix={<UserOutlined />} placeholder='Логин'/>
                    </Form.Item>
                    <Form.Item name='password' rules={[{required: true, message: ru_kz_dict.vvedite_parol[language]}]}>
                        <Input.Password className='form_input' prefix={<LockOutlined />} placeholder='Пароль'/>
                    </Form.Item>
                    <Form.Item name='remember_me' valuePropName='checked'>
                        <Checkbox defaultChecked={false}> {ru_kz_dict.zapomnitb[language]} </Checkbox>
                    </Form.Item>
                    <Button htmlType='submit' type='primary' className='form_button'>{ru_kz_dict.vhod[language]}</Button>
                </Form>
                <div className='login_language'>
                    <div className={['login_language_item', language === 'ru' ? 'language_active' : ''].join(' ')} onClick={() => changeLanguage('ru')}>
                        Ру
                    </div>
                    /
                    <div className={['login_language_item', language === 'kz' ? 'language_active' : ''].join(' ')} onClick={() => changeLanguage('kz')}>
                        Кз
                    </div>
                </div>
            </div>
        </div>
    )
}
