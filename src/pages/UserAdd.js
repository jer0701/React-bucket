import React from 'react';
import formProvider from "../utils/formProvider";
import FormItem from "../components/FormItem";

class UserAdd extends React.Component {
    /*constructor() {
        super();
        this.state = {
            form: {
                name: {
                    vaild: false,
                    value: "",
                    error: ""
                },
                age: {
                    valid: false,
                    value: 0,
                    error: ""
                },
                gender: {
                    valid: false,
                    value: "",
                    error: ""
                }
            }
        };
    }

    handleValueChange(field, value, type="string") {
        //由于表单的值都是字符串，我们可以根据传入type为number来手动转换value的类型为number类型
        if(type === "number") {
            value = +value;
        }

        const {form} = this.state;

        const newFieldObj = {value, valid: true, error: ""};

        switch(field) {
            case "name" : {
                if (value.length >= 5) {
                  newFieldObj.error = '用户名最多4个字符';
                  newFieldObj.valid = false;
                } else if (value.length === 0) {
                  newFieldObj.error = '请输入用户名';
                  newFieldObj.valid = false;
                }
                break;
            }
            case 'age': {
                if (value > 100 || value <= 0) {
                  newFieldObj.error = '请输入1~100之间的数字';
                  newFieldObj.valid = false;
                }
                break;
            }
            case 'gender': {
                if (!value) {
                  newFieldObj.error = '请选择性别';
                  newFieldObj.valid = false;
                }
                break;
            }

        }
        this.setState({
            form: {
                ...form, //...是es6的用法，相当于form.slice()
                [field]: newFieldObj
            }
        });
    }*/

    handleSubmit(e) {
        //阻止表单submit时间自动跳转页面的动作
        e.preventDefault();
        //alert(JSON.stringify(this.state));

        const {form: {name, age, gender}, formValid} = this.props;
        if(!formValid) {
            alert("请填写正确地信息后重试");
            return;
        }

        fetch("http://localhost:3000/user", {
            method: "post",
            //使用fetch提交的json数据需要使用JSON.stringify转换成字符串
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then( (res) => res.json() )
          .then( (res) => {
            //当添加成功时，返回的json对象中应包含一个有效的id字段
            //所以可以使用res.id来判断是否添加成功
            if(res.id) {
                alert("添加用户成功");
            } else {
                alert("添加失败");
            }
          }).catch( (err) => console.error(err) );
    }

    render() {
        const {form: {name, age, gender}, onFormChange} = this.props;
        return (<div>
                    <header>
                        <h1>添加用户</h1>
                    </header>

                    <main>
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
                    </main>
                </div>);
    }
}

UserAdd = formProvider({
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
})(UserAdd);

export default UserAdd;