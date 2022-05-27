import request from "@/utils/request";

export default {
    createSalesInfo(logisticsVo) {
        return request({
            url: '/servicesales/sales/initSalesInfo',
            method: 'post',
            data: logisticsVo
        })
    },
    getSalesList() {
        return request({
            url: '/servicesales/sales/getSalesList',
            method: 'get'
        })
    },
    submitApply(salesInfo) {
        return request({
            url: '/servicesales/sales/submitApply',
            method: 'post',
            data: salesInfo
        })
    },
    getStatusData(status) {
        return request({
            url: `/servicesales/sales/getStatusData/${status}`,
            method: 'get'
        })
    }
}
