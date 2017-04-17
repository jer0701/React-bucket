import React from 'react';

class UserAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            age: 0,
            gender: ''
        };
    }

    handleValueChange(field, value, type="string") {
        //由于表单的值都是字符串，我们可以根据传入type为number来手动转换value的类型为number类型
        if(type === "number") {
            value = +value;
        }

        this.setState({
            [field]: value
        });
    }

    handleSubmit(e) {
        //阻止表单submit时间自动跳转页面的动作
        e.preventDefault();
        alert(JSON.stringify(this.state));
    }

    render() {
        const {name, age, gender} = this.state;
        return (<div>
                    <header>
                        <h1>添加用户</h1>
                    </header>

                    <main>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <label>用户名：</label>
                            <input type="text" value={name} onChange={(e) => this.handleValueChange("name", e.target.value)}/>
                            <br/>
                            <label>年龄：</label>
                            <input type="number" value={age || ""} onChange={(e) => this.handleValueChange("age", e.target.value, "number")}/>
                            <br/>
                            <label>性别：</label>
                            <select value={gender} onChange={(e) => this.handleValueChange("gender", e.target.value)}>
                                <option value="">请选择</option>
                                <option value="male">男</option>
                                <option value="female">女</option>
                            </select>
                            <br/>
                            <br/>
                            <input type="submit" value="提交" />
                        </form>
                    </main>
                </div>);
    }
}

export default UserAdd;