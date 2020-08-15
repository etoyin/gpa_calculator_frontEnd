import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      courses: [
        {
          name: "",
          units: 0,
          scores: 0,
          points: 0,
        },
        {
          name: "",
          units: 0,
          scores: 0,
          points: 0,
        }
      ],
      gp: ""
    }
  }
  addField(){
    console.log("hdhdh")
    this.setState(prevState => ({ 
    	courses: [...prevState.courses, {
        name: "",
        units: 0,
        scores: 0,
        points: 0,
      }
    ]
    }))
  }
  pointsCal(i){
    let courses = [...this.state.courses];
    if(courses[i].scores !== 0){
      if(courses[i].scores >= 75){
        courses[i].points = 4.0;
        this.setState({courses})
      }
      if(courses[i].scores >= 70 && courses[i].scores < 75){
        courses[i].points = 3.5;
        this.setState({courses})
      }
      if(courses[i].scores >= 65 && courses[i].scores < 70){
        courses[i].points = 3.25;
        this.setState({courses})
      }
      if(courses[i].scores >= 60 && courses[i].scores < 65){
        courses[i].points = 3.0;
        this.setState({courses})
      }
      if(courses[i].scores >= 55 && courses[i].scores < 60){
        courses[i].points = 2.75;
        this.setState({courses})
      }
      if(courses[i].scores >= 50 && courses[i].scores < 55){
        courses[i].points = 2.5;
        this.setState({courses})
      }
      if(courses[i].scores >= 45 && courses[i].scores < 50){
        courses[i].points = 2.25;
        this.setState({courses})
      }
      if(courses[i].scores >= 40 && courses[i].scores < 45){
        courses[i].points = 2.0;
        this.setState({courses})
      }
      if(courses[i].scores < 40){
        courses[i].points = 0;
        this.setState({courses})
      }
    }
  }

  createUI(){
    return this.state.courses.map((el, i) => (
      <tr key={i} className="info">
        <td>
          <input 
            type="text" 
            name="name" 
            required
            value={el.name} 
            onChange={this.handleChange.bind(this, i)}/>          
        </td>
        <td>
          <input 
            type="number" 
            name="units"
            max="6"
            min="1"
            value={el.units}
            required
            onChange={this.handleChange.bind(this, i)}/>
        </td>
        <td>
          <input 
            type="number" 
            max="100"
            min="0"
            name="scores" 
            value={el.scores}
            required
            onChange={this.handleChange.bind(this, i)}/>
        </td>
        <td>
          <input 
            type="number" 
            name="points" 
            value={el.points} />
        </td>
        <td>
          <button type="button" className="btn1" onClick={this.removeField.bind(this, i)}>
            <i class="fas fa-trash-alt"></i>
          </button>        
        </td>
      </tr>        
    ))
  }
  removeField(i){
    let courses = [...this.state.courses];
    courses.splice(i, 1);
    this.setState({ courses });
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.courses);
    let totalPoints = this.state.courses.reduce( (prev, curr) => {
      return prev + (Number(curr.units) * Number(curr.points)); 
    }, 0);
    let units = this.state.courses.reduce( (prev, curr) => {
      return prev + Number(curr.units); 
    }, 0);
    let result = (totalPoints / units);

    this.setState({
      gp: result
    })
  }
  handleChange(i, e) {
    const { name, value } = e.target;
    let courses = [...this.state.courses];
    courses[i] = {...courses[i], [name]: value};
    this.setState({ courses }, this.pointsCal.bind(this, i));
    
 }

  render() {
    return (
      <div className="main-block">
        <div className="left-part">
          <i className="fas fa-graduation-cap"></i>
          <h1>Fill the form and Click Submit</h1>
          <p>Your GPA will appear here!</p>
          <h1>{Math.round(this.state.gp * 100) / 100}</h1>
          <div >
            
          </div>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="title">
            <i className="fas fa-pencil-alt"></i> 
            <h2>Calculate your GPA</h2>
          </div>
          <table>
          <tr>
            <th>Course Code</th>
            <th>Course Unit</th>
            <th>Score</th>
            <th>Points</th>
            <th></th>
          </tr>
          {this.createUI()}
        </table>
          <button className="btn10" onClick={this.addField.bind(this)}>
            <i class="fas fa-plus"></i>
          </button>
          <button type="submit" href="/">Submit</button>
        </form>
      </div>
    );
  }
}

export default Home;
