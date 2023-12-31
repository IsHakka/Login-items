import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './index.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { createArticleAPI, getArticleById, getChannelAPI, updateArticleAPI } from '../../api/article';
import useChannel from '../../hooks/useChannel';
import { useNavigate } from 'react-router-dom';

const { Option } = Select

const Publish = () => {
    // 獲取頻道列表
    const { channelList } = useChannel()
    const navigate = useNavigate();
    const onFinish = (formValue) => {
        console.log(formValue);
        //檢查封面數量是不是根圖片列表一樣
        if (imageList.length !== imageType) {
            return message.warning('封面類型根所選圖片數量不一')
        }
        const { content, title, channel_id } = formValue
        // 按照文檔格式處理收集到的資料
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                })
            },
            channel_id
        }
        // 調用不同接口
        if (articleId) {
            // 更新接口
            updateArticleAPI({ ...reqData, id: articleId })
            message.success('修改成功!');
            navigate('/article')
        } else {
            createArticleAPI(reqData);
            message.success('發布成功!');
            navigate('/article')
        }

    }
    // 上傳回調
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log('上傳中', value);
        setImageList(value.fileList)
        console.log(imageList);
    }

    // 切換圖片封面類型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }
    // 回填數據
    const [searchParms] = useSearchParams();
    const articleId = searchParms.get('id');
    // 獲取實例函數
    const [form] = Form.useForm()
    useEffect(() => {
        // 通過id取得數據
        async function getArticleDetail() {
            const res = await getArticleById(articleId);
            // 回填資料
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type
            });
            // 回填圖片列表
            setImageType(res.data.cover.type)
            // 回填圖片
            setImageList(res.data.cover.images.map(url => {
                return { url }
            }))
        }
        // 有id才用此函數回填
        if (articleId) {
            getArticleDetail()
        }

    }, [articleId, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首頁</Link> },
                        { title: `${articleId ? '編輯文章' : '發布文章'}` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="標題"
                        name="title"
                        rules={[{ required: true, message: '請輸入文章標題' }]}
                    >
                        <Input placeholder="請輸入文章標題" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="頻道"
                        name="channel_id"
                        rules={[{ required: true, message: '請選擇文章頻道' }]}
                    >
                        <Select placeholder="請選擇文章頻道" style={{ width: 400 }}>
                            {/* value被選中後會自動收集起來做完提交字段 */}
                            {
                                channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>一張</Radio>
                                <Radio value={3}>三張</Radio>
                                <Radio value={0}>無</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            // 文件框樣式
                            listType="picture-card"
                            // 控制顯示上傳列表
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            maxCount={imageType}
                            onChange={onChange}
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}

                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请輸入文章内容' }]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请輸入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                馬上分佈
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish