import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import 'react-bootstrap'
import { Col, Container, Row } from 'react-bootstrap';


const getlocalstorage =()=>{
  let userdata =localStorage.getItem("userdata");
  if(userdata){
    return(userdata=JSON.parse(localStorage.getItem("userdata")));
  }
  else{
    return[];
  }
  }
  
function CreatePost() {
  const [id, setId] = useState("");
  const [post_id, setPostId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
   const Data={
    post_id,name,email,body
   }
  const [userdata, setUserData] = useState(getlocalstorage());
  const navigate = useNavigate();



  useEffect(()=>{
    localStorage.setItem("userdata",JSON.stringify(userdata))
  },[userdata])
  const AddData = () => {
  const api='https://gorest.co.in/public/v2/comments/'
    console.log(id)
    axios.post(api, Data,{ headers:
      {"Authorization" : `Bearer ${'3ba9c6cb07331c5b006b56354ec8dd932cdc82c5d11ac8e67ced488e180323db'}`,
      'Content-Type': 'application/json'
     } }).then(function(res){
         console.log(res.data[0]);
         return res.data[0];
     });
    if (name.trim().length !== 0 && email.trim().length !== 0) {
      setUserData([...userdata, { id: id,post_id:post_id,name:name,email:email ,body:body}])
      setId("");
      setPostId("");
      setName("");
      setEmail("");
      setBody("");
      navigate('/')
    }
    else {
      alert("Please enter a value")
    }
  }
  const DeleteData = () => {
    setUserData([]);
  }

  return (
    <>
     <Container className='contact-content debug-border'>
     {/* <Row className="justify-content-center m-4">
                    
                </Row> */}
                <Row className="justify-content-center m-4">
                    <Col md={4} className="text-center text-md-right">
                        <input type='text' placeholder="Enter post_Id" className='form-control' value={post_id} onChange={(e => setPostId(e.target.value))}></input>
                    </Col>
                </Row>
                <Row className="justify-content-center m-4">
                    <Col md={4} className="text-center text-md-right">
                        <input type='text' placeholder="Enter a name" className='form-control' value={name} onChange={(e => setName(e.target.value))}></input>
                    </Col>
                </Row>
                <Row className="justify-content-center m-4">
                    <Col md={4} className="text-center text-md-right">
                        <input type='text' placeholder="Enter an email" className='form-control' value={email} onChange={(e => setEmail(e.target.value))}></input>
                    </Col>
                </Row>
                <Row className="justify-content-center m-4">
                    <Col md={4} className="text-center text-md-right">
                        <input type='text' placeholder="Enter a body" className='form-control' value={body} onChange={(e => setBody(e.target.value))}></input>
                    </Col>
                </Row>
                <Row className="justify-content-center m-2">
                    <Col md={8} className="text-center text-md-right">
                        <button className='btn btn-primary btn-lg' onClick={AddData }>Submit</button>
                        <button className="btn btn-danger btn-lg m-2" type="button" onClick={DeleteData}>Delete</button>
                    </Col>
                </Row>
       </Container>
     
      
     <Link to={'/'} className="backtohomepagelink" >Back to Home Page</Link>
    </>
  )
}

export default CreatePost;