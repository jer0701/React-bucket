import React from 'react';
import FormItem from "../components/FormItem";
import formProvider from "../utils/formProvider";
import request from '../utils/request';

class UserEditor extends React.Component {

    handleSubmit(e) {
        //阻止表单submit时间自动跳转页面的动作
        e.preventDefault();
        //alert(JSON.stringify(this.state));

        const {form: {name, age, gender}, formValid, editTarget} = this.props;
        if(!formValid) {
            alert("请填写正确地信息后重试");
            return;
        }

        let editType = "添加";
        let apiUrl = "http://localhost:3000/user";
        let method = "post";

        if (editTarget) {
            editType = "编辑";
            apiUrl += "/" + editTarget.id;
            method = "put";
        }
        request(method,apiUrl, {
            //使用fetch提交的json数据需要使用JSON.stringify转换成字符串
                name: name.value,
                age: age.value,
                gender: gender.value

        })
          //.then( (res) => res.json() )
          .then( (res) => {
            //当添加成功时，返回的json对象中应包含一个有效的id字段
            //所以可以使用res.id来判断是否添加成功
            if(res.id) {
                alert(editType + "用户成功");
                this.context.router.push("/user/list");
                return;
            } else {
                alert(editType + "失败");
            }
          }).catch( (err) => console.error(err) );
    }

    componentWillMount () {
        const {editTarget, setFormValues} = this.props;
        if (editTarget) {
          setFormValues(editTarget);
        }
    }

    render() {
        const {form: {name, age, gender}, onFormChange} = this.props;
        return (
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <FormItem label="用户名：" valid={name.valid} error={name.error} >
                                <input type="text" value={name.value} onChange={(e) => onFormChange("name", e.target.value)}/>
                            </FormItem>

                            <FormItem label="年龄：" valid={age.valid} error={age.error} >
                                <input type="number" value={age.value || ""} onChange={(e) => onFormChange("age", e.target.value)}/>
                            </FormItem>

                            <FormItem label="性别：" valid={gender.valid} error={gender.error}>
                                <select value={gender.value} onChange={(e) => onFormChange("gender", e.target.value)}>
                                    <option value="">请选择</option>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                            </FormItem>
                            <br/>
                            <input type="submit" value="提交" />
                        </form>
                );
    }
}

//以下这句话如果放在formProvider方法后面就会不生效
// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserEditor = formProvider({
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: '请输入用户名'
      },
      {
        pattern: /^.{1,4}$/,
        error: '用户名最多4个字符'
      }
    ]
  },
  age: {
    defaultValue: 0,
    rules: [
      {
        pattern: function (value) {
          return value >= 1 && value <= 100;
        },
        error: '请输入1~100的年龄'
      }
    ]
  },
  gender: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return !!value;
        },
        error: '请选择性别'
      }
    ]
  }
})(UserEditor);

export default UserEditor;