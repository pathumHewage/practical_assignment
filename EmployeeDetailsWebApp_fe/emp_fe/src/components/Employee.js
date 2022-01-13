import React,{Component} from 'react';
import { variables } from '../Variables';
import swal from 'sweetalert2';

export class Employee extends Component{

    

  

    constructor(props){
        super(props);
        
        this.state={

            departments:[],
            employees:[],
            modalTitle:"",
            EmployeeId:0,
            EmployeeFirstName:"",
            EmployeeLastName:"",
            EmailAddress:"",
            DateOfBirth:"",
            Age:"",
            Salary:"",
            Department:"",

            EmployeeFirstNameError:"",
            EmployeeLastNameError:"",
            EmailAddressError:"",
            DateOfBirthError:"",
            AgeError:"",
            SalaryError:"",
            DepartmentError:"",


            
        }
    }

    //validate data
  validate = () => {
    let EmployeeFirstNameError = "";
    let EmployeeLastNameError = "";
    let EmailAddressError = "";
    let DateOfBirthError = "";
    let AgeError = "";
    let SalaryError = "";
    let DepartmentError = "";

    if (!this.state.EmployeeFirstName) {
        EmployeeFirstNameError = "*First Name is Required!";
    }

    if (!this.state.EmployeeLastName) {
        EmployeeLastNameError = "*Last Name is Required!";
    }
  

    if (!this.state.EmailAddress) {
        EmailAddressError = "*  Email is Required!";
    }
    else if (
      !this.state.EmailAddress.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ) {
        EmailAddressError = "*Please Enter valid Email!";
    }

    if (!this.state.DateOfBirth) {
        DateOfBirthError = "* date of birth   is Required";
    }
   

   
    if (!this.state.Department) {
        DepartmentError = "* Department  is Required";
    }
    

    if (!this.state.Salary) {
        SalaryError = "*  Salary is Required";
    }
      else if (this.state.Salary.toString().match("-")) {
        SalaryError = "* Salary not be Negetive!";
      } else if (!this.state.Salary.toString().match("([0-9]{4})$")) {
        SalaryError = "* Salary be more than 1000";
      }


    if (
        EmployeeFirstNameError ||
        EmployeeLastNameError ||
        EmailAddressError ||
        DateOfBirthError ||
        SalaryError ||
        DepartmentError
      
    ) {
      this.setState({
        EmployeeFirstNameError,
        EmployeeLastNameError,
        EmailAddressError,
        DateOfBirthError,
        SalaryError,
        DepartmentError,
       
      });
      return false;
    }

    return true;
  }

  //get data
    refreshList(){

        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });

        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }



    
    changeEmployeeFirstName =(e)=>{
        
        this.setState({EmployeeFirstName:e.target.value});
        this.setState({EmployeeFirstNameError:""});
    }
    changeEmployeeLastName =(e)=>{

        this.setState({EmployeeLastName:e.target.value});
        this.setState({EmployeeLastNameError:""});
    }
    changeEmailAddress =(e)=>{
      this.setState({EmailAddress:e.target.value});
      this.setState({EmailAddressError:""});
    }
    changeDateOfBirth =(e)=>{
        this.setState({DateOfBirth:e.target.value});
       let age = this.getAge(e.target.value);
       console.log(age)
       this.setState({Age:age});
       this.setState({DateOfBirthError:""});

    }
    
    changeAge =(e)=>{
        this.setState({Age:e.target.value});
    }
    changeSalary =(e)=>{
        this.setState({Salary:e.target.value});
        this.setState({SalaryError:""});
    }
    changeDepartment =(e)=>{
        this.setState({Department:e.target.value});
        this.setState({DepartmentError:""});
    }







    addClick(){
        this.setState({

            modalTitle:"Add Employee",

            EmployeeId:0,
            EmployeeFirstName:"",
            EmployeeLastName:"",
            EmailAddress:"",
            DateOfBirth:"",
            Age:"",
            Salary:"",
            Department:""
            
        });
    }
    editClick(emp){
        this.setState({

            modalTitle:"Edit Employee",

            EmployeeId:emp.EmployeeId,
            EmployeeFirstName:emp.EmployeeFirstName,
            EmployeeLastName:emp.EmployeeLastName,
            EmailAddress:emp.EmailAddress,
            DateOfBirth:emp.DateOfBirth,
            Age:emp.Age,
            Salary:emp.Salary,
            Department:emp.Department
        });
    }



    //insert data 
    createClick(){

        const isValid= this.validate();

        const {EmployeeFirstName,EmployeeLastName,EmailAddress,DateOfBirth,Age,Salary,Department}= this.state;
        const data={

            EmployeeFirstName:EmployeeFirstName,
 
            EmployeeLastName:EmployeeLastName,
 
            EmailAddress:EmailAddress,
 
            DateOfBirth:DateOfBirth,

            Age:Age,

            Salary:Salary,

            Department:Department
            
            
 
        }

        if(isValid ){

               fetch(variables.API_URL+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                EmployeeFirstName:this.state.EmployeeFirstName,
                EmployeeLastName:this.state.EmployeeLastName,
                EmailAddress:this.state.EmailAddress,
                DateOfBirth:this.state.DateOfBirth,
                Age:this.state.Age,
                Salary:this.state.Salary,
                Department:this.state.Department
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            //alert(result);
            swal.fire("inserted", "insert Successfully !!", "success");
            this.refreshList();
            this.setState({});
        },(error)=>{
            //alert('Failed');
            swal.fire("Failed", "Failed!!", "warning");
        })

        }
        
      

 
    }

     //update data 

    updateClick(){
        fetch(variables.API_URL+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({

                EmployeeId:this.state.EmployeeId,
                EmployeeFirstName:this.state.EmployeeFirstName,
                EmployeeLastName:this.state.EmployeeLastName,
                EmailAddress:this.state.EmailAddress,
                DateOfBirth:this.state.DateOfBirth,
                Age:this.state.Age,
                Salary:this.state.Salary,
                Department:this.state.Department
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            //alert('gg');
            swal.fire("updated", "updated Successfully !!", "success");
            this.refreshList();
        },(error)=>{
            //alert('Failed');
            swal.fire("Failed", "Failed !!", "warning");
        })
    }
   
   
     //delete  data 

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'employee/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            //alert(result);
            swal.fire("Deleted", "Delete Successfully !!", "success");
            this.refreshList();
        },(error)=>{
           // alert('Failed');
            swal.fire("Failed", "Failed !!", "warning");
        })
        }
    }

    //Age calculate

    getAge(dateString) 
{
    console.log(dateString)
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    console.log('age '+age)
    return age;
}



    
  

    render(){
        const {
            departments,
            employees,
            modalTitle,

            EmployeeId,
            EmployeeFirstName,
            EmployeeLastName,
            EmailAddress,
            DateOfBirth,
            Age,
            Salary,
            Department
            

        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-success m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Employee
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
        EmployeeId
        </th>
        <th>
        Employee First Name
        </th>
        <th>
        Employee Last Name
        </th>
        <th>
        Email Address
        </th>
        <th>
        Date Of Birth
        </th>
        <th>
        Age
        </th>
        <th>
        Salary
        </th>
        <th>
        Department
        </th>
        <th>
        Options
        </th>
    </tr>
    </thead>
    <tbody>
        {employees.map(emp=>
            <tr key={emp.EmployeeId}>
                
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeFirstName}</td>
                <td>{emp.EmployeeLastName}</td>
                <td>{emp.EmailAddress}</td>
                <td>{emp.DateOfBirth.substr(0,10)}</td>
                <td>{emp.Age}</td>
                <td>{emp.Salary}</td>
                <td>{emp.Department}</td>
               
                <td>
                <button type="button"
                className="btn btn-warning mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                

                <button type="button"
                className="btn btn-danger mr-1"
                onClick={()=>this.deleteClick(emp.EmployeeId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body justify-content-center">
    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
     
     <div className="p-2 w-50 bd-highlight justify-content-center ">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Employee First Name</span>
            <input type="text" className="form-control"
            value={this.state.EmployeeFirstName}
            onChange={this.changeEmployeeFirstName}/>
              <div style={{fontSize:12 ,color:"red"}}>

                {this.state.EmployeeFirstNameError}

                </div>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Employee Last Name</span>
            <input type="text" className="form-control"
            value={EmployeeLastName}
            onChange={this.changeEmployeeLastName}/>

            <div style={{fontSize:12 ,color:"red"}}>

            {this.state.EmployeeLastNameError}

            </div>

        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Email Address</span>
            <input type="email" className="form-control"
            value={EmailAddress}
            onChange={this.changeEmailAddress}/>

              <div style={{fontSize:12 ,color:"red"}}>

                {this.state.EmailAddressError}

            </div>

        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Date of Birth</span>
            <input type="Date" className="form-control"
            value={DateOfBirth}
            onChange={this.changeDateOfBirth}/>
              <div style={{fontSize:12 ,color:"red"}}>

                {this.state.DateOfBirthError}

                </div>
        </div>




        <div className="input-group mb-3">
            <span className="input-group-text">Age</span>
            <input type="number"  className="form-control"
             value={Age} 
             placeholder="Age auto generated"
            onChange={this.changeAge} disabled/>
           


        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Salary</span>
            <input type="number" className="form-control"
            value={Salary}
            onChange={this.changeSalary}/>
             <div style={{fontSize:12 ,color:"red"}}>

                {this.state.SalaryError}

            </div>


        </div>

         <div className="input-group mb-3">
            <span className="input-group-text">Department</span>
            <select className="form-select"
            onChange={this.changeDepartment}
            value={Department}>
                {departments.map(dep=><option key={dep.DepartmentId}>
                    {dep.DepartmentName}
                </option>)}
            </select>
            <div style={{fontSize:12 ,color:"red"}}>

            {this.state.DepartmentError}
            

            </div>

        </div>


        <div className='d-flex justify-content-end'>
        {EmployeeId==0?
        <button type="button"
        className="btn btn-primary float-start "
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {EmployeeId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

    </div>


     </div>
    
      
         

    </div>



   </div>

</div>
</div> 
</div>


</div>
        )
    }
}