import React, {Component} from 'react';
import TaskForm from "./Components/TaskForm"
import Control from "./Components/Control"
import TaskList from "./Components/TaskList"
class App extends Component{
constructor(props){
  super(props);
  this.state = {
    tasks : [],
    isDisplayForm:false,
    taskEditing:null,
    filter:{
      name:"",
      status:-1
    },
    keyword:"",
    sortBy:"name",
    sortValue:1
  }
}
componentWillMount(){
  if(localStorage && localStorage.getItem("tasks")){
    var tasks =JSON.parse(localStorage.getItem("tasks"))
    this.setState({
      tasks:tasks
    })
  }
}
    // onGenerateData = ()=>{
    //   var tasks =[
    //     {
    //       id: this.generateId(),
    //       name:"hoc",
    //       status:true
    //     },
    //      {
    //       id: this.generateId() ,
    //       name:"chowi",
    //       status:false
    //     }
    //   ]
    //   this.setState({
    //     tasks:tasks
    //   })
    //   localStorage.setItem("tasks",JSON.stringify(tasks))
    //   // console.log(tasks)
    // }

    s4(){
      return Math.random()+Math.random()
    }
    generateId(){
      return this.s4()
    }
    onToggleForm= ()=>{
      if(this.state.isDisplayForm && this.state.taskEditing !==null){
        this.setState({
          isDisplayForm:true,
          taskEditing:null
        })
      }
      else{
        this.setState({
          isDisplayForm:!this.state.isDisplayForm,
          taskEditing:null
        })
      }
    }
    onCloseForm =()=>{
      this.setState({
        isDisplayForm:false
      })
    }
    onSubmit =(data)=>{
      console.log(data)
      var {tasks} = this.state
      if(data.id){
        var index = this.findIndex(data.id)
        tasks[index] = data;
      }
      else {
       
        data.id = this.generateId()
         tasks.push(data)
      }
      
      //  console.log(data)
       this.setState({
         tasks:tasks
       })
       localStorage.setItem("tasks",JSON.stringify(tasks))
    }
    onUpdateStatus =(id)=>{
      var index = this.findIndex(id)
      var {tasks} = this.state
      console.log(id)
      console.log(index)
      if(index!==1){
        tasks[index].status =!tasks[index].status
        this.setState({
          tasks:tasks
        })
        localStorage.setItem("tasks",JSON.stringify(tasks))
      }
    }
    onDelete =(id)=>{
      var index = this.findIndex(id)
      var {tasks} = this.state
      console.log(id)
      console.log(index)
      if(index!==1){
       tasks.splice(index,1)
        this.setState({
          tasks:tasks,
          isDisplayForm:false
        })
        localStorage.setItem("tasks",JSON.stringify(tasks))
      }
    }
    onUpdate =(id)=>{
      var index = this.findIndex(id)
      var {tasks} = this.state
     this.setState({
       taskEditing:tasks[index],
       isDisplayForm:true,

     })
    //  console.log(this.state.taskEditing)
    }

    findIndex =(id)=>{
      var {tasks} = this.state
      var resolve = -1
      tasks.forEach((task,item)=>{
        if(task.id === id)
        {
          resolve = item
        }
        
      })
      return resolve
    }
    onFilter =(filterName,filterStatus)=>{
      filterStatus = parseInt(filterStatus,10)
       this.setState({
         filter:{
           name:filterName.toLowerCase(),
           status:filterStatus
         }
       })
    }
    onSearch =(keyword)=>{
      this.setState({
        keyword:keyword
      })
    }
    onSort =(sortBy,sortValue)=>{
     this.setState({
       sortBy:sortBy,
       sortValue:sortValue
     })
    }
render(){
  var {tasks,isDisplayForm,taskEditing,filter,keyword,sortBy,sortValue} = this.state;
  console.log(filter)
  if(filter){
    if(filter.name){
      tasks =tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(filter.name) !== -1
      })
    }
  
      tasks = tasks.filter((task)=>{
        if(filter.status=== - 1){
          return task
        }
        else 
        {
          return task.status ===(filter.status===1?true:false)
        }
      })
    
  }
  if(keyword){
    tasks =tasks.filter((task)=>{
      return task.name.toLowerCase().indexOf(keyword) !== -1
  })
}
  if(sortBy ==="name"){
    tasks.sort((a,b)=>{
      if(a.name >b.name)
      return sortValue
      else if(a.name <b.name)
      return -sortValue
    })
  }else{
    tasks.sort((a,b)=>{
      if(a.status >b.status)
      return -sortValue
      else if(a.status <b.status)
      return sortValue
    })
  }
  var elmTaskForm = isDisplayForm ?<
  
  TaskForm onSubmit={this.onSubmit} 
  task = {taskEditing}
  onCloseForm={this.onCloseForm}/>:" ";
  return(
    <div>
<div className="container">
  <div className="text-center">
      <h1>Quản Lý Công Việc</h1>
      <hr/>
  </div>
  <div className="row">
      <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
      
          {elmTaskForm}
      </div>
      <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                 <button onClick={this.onToggleForm } type="button" className="btn btn-primary">
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                {/* <button type="button" className="btn btn-danger ml-5" onClick={()=>this.onGenerateData()}>
                   requestData
                </button> */}
            <Control
            onSearch ={this.onSearch}
            onSort ={this.onSort}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList tasks ={tasks} onUpdateStatus={this.onUpdateStatus}
                  onDelete = {this.onDelete}
                  onUpdate = {this.onUpdate}
                  onFilter = {this.onFilter}
                  />
              </div>
            </div>    
      </div>
  </div>
</div>

</div>
  );
}
}
export default App;
