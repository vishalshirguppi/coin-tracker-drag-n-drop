import React from "react";
import axios from "axios";
import CoinCards from "./CoinCards";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class CoinList extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      coinList: [],
      favorites: []
    };
  }

  componentDidMount() {
    axios
      .get("https://api.coinmarketcap.com/v2/ticker/?limit=10")
      .then(response => {
        const responseData = response.data.data;
        let coinList = [];
        Object.keys(responseData).map((key, index) => {
          coinList.push(responseData[key]);
        });
        this.setState(() => ({ coinList }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let coin = this.state.coinList.filter(coin => {
      if (coin.name == id) {
        // remove the coin dragged from the List
        let coinListAfterFilter = this.state.coinList.filter(altCoin => {
          return altCoin.name !== id;
        });
        this.setState(() => ({ coinList: coinListAfterFilter }));
        return coin;
      }
    });
    this.setState(() => ({ favorites: [...this.state.favorites, coin["0"]] }));
  };

  render() {
    return (
      <Grid container spacing={24}>
        {console.log(this.state)}
        <Grid item xs={12} sm={6}>
          <Card className="container-card">
            <CardContent>
              <Typography align="center" variant="display1">
                List
              </Typography>
              <CoinCards coinList={this.state.coinList} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            className="container-card"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "favorite")}
          >
            <CardContent>
              <Typography align="center" variant="display1">
                Favorites
              </Typography>
              <Typography variant="caption" gutterBottom align="center">
                Drag a Coin from the List and Drop here!
              </Typography>
              <CoinCards coinList={this.state.favorites} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

CoinList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoinList);
