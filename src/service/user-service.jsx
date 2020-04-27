import MUtil from "util/mm.jsx";
const _mm=new MUtil();

class User{
    //用户登录
      login(info){
       return  _mm.request({
            type:"post",
            url:"/manage/user/login.do",
            data:info
        })
      }
      //检查用户输入的登录信息是否合法
      checkLoginInfo(info){
          let username=$.trim(info.username),
          password=$.trim(info.password);
          if(typeof username !== "string"||username.length===0){
              return{
                  status:false,
                  msg:"用户名为空"
              }
          }
          if(typeof password !== "string"||password.length===0){
            return{
                status:false,
                msg:"密码为空"
            }
        }
        return {
            status:true,
            msg:"验证通过"
        }
      }
      //用户退出登录
      logOut(){
      return  _mm.request({
            type:"post",
            url:"/user/logout.do",
        })
      }
      //获取用户列表
      getUserList(pageNum){
          return  _mm.request({
            type:"post",
            url:"/manage/user/list.do",
            data:{pageNum}
        })
      }
}
export default User;