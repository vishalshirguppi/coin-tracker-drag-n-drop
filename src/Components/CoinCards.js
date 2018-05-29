import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 175,
    margin: 5
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  colorPrimary: {
    color: "red"
  },
  colorSecondary: {
    color: "green"
  }
};

const onDragStart = (ev, id) => {
  console.log('dragstart', id);
  ev.dataTransfer.setData("id", id);
}

const CoinCards = props => {
  const { classes } = props;
  return (
    <div>
      {props.coinList.map(coin => {
        return (
          <Card
            className={classes.card}
            key={coin.id}
            raised={true}
            draggable
            onDragStart={e => onDragStart(e, coin.name)}
          >
            <CardContent>
              <Typography variant="headline" component="h2">
                <i className={"cc " + coin.symbol} title="ADA" /> {coin.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {coin.symbol}
              </Typography>
              <Typography component="p" variant="title">
                $ {coin.quotes.USD.price}
              </Typography>
              <Typography
                component="p"
                className={
                  coin.quotes.USD.percent_change_24h >= 0
                    ? classes.colorSecondary
                    : classes.colorPrimary
                }
              >
                24hr Change: {coin.quotes.USD.percent_change_24h} %
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

CoinCards.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoinCards);
