import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from './../../assets/error.png'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select ,Popconfirm} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_TW'
import useChannel from '../../hooks/useChannel'
import { useEffect, useState } from 'react'
import { delArticleAPI, getArticleListAPI } from '../../api/article'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigate = useNavigate()
    const { channelList } = useChannel()
    // 準備列數據
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={90} height={60} alt="" />
            }
        },
        {
            title: '標題',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '狀態',
            dataIndex: 'status',
            render: data => data === 1 ? <Tag color="warning">待審核</Tag> : <Tag color="success">審核通過</Tag>
        },
        {
            title: '發布時間',
            dataIndex: 'pubdate'
        },
        {
            title: '閱讀數',
            dataIndex: 'read_count'
        },
        {
            title: '評論數',
            dataIndex: 'comment_count'
        },
        { 
            title: '點讚數',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>navigate(`/publish?id=${data.id}`)}/>
                        <Popconfirm
                            title="Delete the task"
                            description="確定要刪除嗎?"
                            onConfirm={()=>onConfirm(data)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>

                    </Space>
                )
            }
        }
    ]

    // 篩選功能
    // 1.準備參數
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 8
    })

    // 獲取文章列表
    const [list, setlist] = useState([]);
    const [count, setCount] = useState(0)

    useEffect(() => {
        async function getList() {
            const res = await getArticleListAPI(reqData)
            setlist(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
    }, [reqData])

    // 獲取篩選數據
    const onFinish = (formValue) => {
        // 把表單收集到的數據放到參數中(不可變方式)
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD')

        })
    }

    // 分頁
    const onPageChange = (page) => {
        console.log(page)
        // 修改依賴項，觸發重新渲染
        setReqData({
            ...reqData,
            page
        })
    }

    // 刪除文章
    const onConfirm = async(data)=>{
        await delArticleAPI(data.id)
        setReqData({
            ...reqData
        })
    }
    
    return (

        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首頁</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="狀態" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={1}>待審核</Radio>
                            <Radio value={2}>審核通過</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="頻道" name="channel_id">
                        <Select
                            placeholder="請選擇文章頻道"
                            style={{ width: 120 }}
                        >
                            {
                                channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            篩選
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card title={`根據條件共查詢到 ${count} 條結果`}>

                <Table rowKey="id" columns={columns} dataSource={list} pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }} />
            </Card>
        </div>
    );
};

export default Article;