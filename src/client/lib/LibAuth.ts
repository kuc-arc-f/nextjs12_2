// LibAuth
import LibCookie from '../lib/LibCookie'
//
//export default  {
const LibAuth = {
  valid_login: function(props){
    try{
      let ret = true
      const key: string = process.env.COOKIE_KEY_USER_ID
      const user_id = LibCookie.get_cookie(key)
//console.log(user_id)
      if(user_id == null){
        location.href ="/login";
        ret = false
      }      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, valid_login');
    }
  },
  get_uid: function(){
    try{
      let ret = ""
//      const key = process.env.REACT_APP_COOKIE_USER_ID
      const key = process.env.COOKIE_KEY_USER_ID
      const user_id = LibCookie.get_cookie(key)
//console.log(user_id)
      if(user_id !== null){
        ret = user_id
      }      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_uid');
    }
  },      
  get_user: function(mail , users){
    try{
      let ret = null
      users.forEach(function(item){
//            console.log(item.id );
        if(item.mail === mail){
          ret = item
        }
      });      
//console.log(items)
      return ret
    } catch (e) {
      console.error(e);
      throw new Error('Error , get_user');
    }        
  },
}
export default LibAuth;
