import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
        id:"",
        name : "",
        status:false
        }
      }
    componentWillMount(){
        if(this.props.task){
            this.setState({
              id:this.props.task.id,
              name:this.props.task.name,
              status:this.props.task.status
            })
                console.log(this.props.task)
        
                console.log(this.state)
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps && nextProps.task){
            this.setState({
             id:nextProps.task.id,
             name:nextProps.task.name,
             status:nextProps.task.status
            })
               
        } else if(!nextProps.task){
            this.setState({
                id:"",
                name : "",
                status:false
            })
        }
    }

    onCloseForm =()=>{
        this.props.onCloseForm()
    }
    onChange =(event)=>{
        var target = event.target
        var name =target.name;
        var value =  target.value
        if(name ==='status')
        {
            value =target.value === "true"?true:false
        }
        this.setState({
            [name]:value
        })
        // console.log(target);
        // console.log(event)
    }
    onSubmit = (event)=>{
        event.preventDefault()
       
        this.props.onSubmit(this.state)
        //huybo la tra lai form cu
        this.onClear();
        this.onCloseForm()
    }
    onClear =()=>{
        this.setState({
            name:"",
            status:true
        })
    }
    render() {
        var {id}= this.state
        return (
            <div>
                <div className="panel panel-warning">
                    <div className="panel-heading">
        <h3 className="panel-title">
            {id ==="" ? "Theem cong viec" :"cap nhap cong viec "}
        </h3>
                        <span className="fa fa-times-circle text-right"
                        onClick= {this.onCloseForm}
                        >
                            
                        </span>

                    </div>

                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" className="form-control" name="name" value ={this.state.name} onChange ={this.onChange}/>
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control" required="required" name="status" value ={this.state.status} onChange ={this.onChange}>
                                <option value="true">Kích Hoạt</option>
                                <option value="false">Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                                <button 
                                onClick ={this.onClear}
                                type="button" className="btn btn-danger">Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
         
            </div>
        );
    }
}

export default TaskForm;