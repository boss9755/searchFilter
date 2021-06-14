import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    marginBottom:20,
    maxWidth: 800,
    borderRadius: 30,
    border: 1
  }
}));


function App() {
  //const [place, setPlace] = useState([]);
  const [search, setSearch] = useState("");
  const [filterPlace, setFilterPlace] = useState([]);

//Get API  
  /*useEffect(() => {
    axios
      .get(`http://localhost:9000/trips`)
      .then((res) => {
        setPlace(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);*/
  useEffect(() => {
    axios
      .get(`http://localhost:9000/trips?q=${search}`)
      .then((res) => {
        setFilterPlace(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [search]);
  
//Search filter
  /*useEffect(() => {
    setFilterPlace(
      place.filter((place) =>
        place.title.includes(search) || place.tags.includes(search)
      )
    );
  }, [search,place]);*/

  return (
    <div>
    <Container maxWidth="sm">
      <h1>Trip On The Way!</h1>
      <form>
        <TextField id="standard-basic" onChange={(e) => setSearch(e.target.value)} fullWidth label=""/>
      </form>
      <br/>
    </Container>
      {filterPlace.map((place,id) => (
      <PlaceDetail key={id} {...place} />
      ))}
    </div>
  );
}

const PlaceDetail = (props) => {
  const {title, description, photos, tags} = props;
  const classes = useStyles();
  
  return ( 
    <Paper className = {classes.paper}>
    <Container fixed>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <ins>หมวดหมู่</ins>
        {tags.map((data) => (
          <li>{data}</li>
        ))}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <p>
        {photos.map((photos) => (
          <img src={photos} alt="" style = {{width: "350px", height: "200px" }}></img>
        ))}
      </p>
    </Container>
    </Paper>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;