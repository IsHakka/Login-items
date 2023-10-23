// 封裝獲取頻道列表邏輯
import { useEffect, useState } from "react";
import { getChannelAPI } from "../api/article";

function useChannel() {
    // 獲取頻道列表
    // 獲取頻道列表
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI();
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])
    // 把組件中要用到的數據return
    return {
        channelList
    }
}

export default useChannel