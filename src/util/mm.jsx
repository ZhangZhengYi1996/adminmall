class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || "get",
                url: param.url || "",
                dataType: param.dataType || "json",
                data: param.data || null,
                success:res=> {
                    //请求成功
                    if (0 === res.status) {
                        typeof resolve === "function" && resolve(res.data, res.msg);
                    } else if (10 === res.status) {
                        //没有登录，需要登录
                        this.doLogin()
                    } else {
                        typeof reject === "function" && reject(res.msg || res.data);
                    }
                },
                error:err=>  {
                    typeof reject === "function" && reject(err.msg);
                }
            })
        });
    }
    //跳转登录
    doLogin() {
        window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
    }
    //获取url参数
    getUrlParam(name) {
        let queryString = window.location.search.split("?")[1] || "";
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    //错误处理
    errorTips(errMsg) {
        alert(errMsg || "有错误～");
    }
    //成功信息
    successTips(res){
        alert(res || "操作成功～");
    }
    //localstorage 存储
    setStorage(key, value) {
        let dataType = typeof value;
        //json类型
        if (dataType === "object") {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        //基础类型
        else if (["number", "string", "boolean"].indexOf(dataType) >= 0) {
            window.localStorage.setItem(key, value);
        }
        //其他类型
        else {
            alert("该类型不用用于本地存储");
        }
    }
    //取出localstorage存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return "";
        }
    }
    //删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil; 